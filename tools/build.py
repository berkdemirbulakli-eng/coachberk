"""Build the CoachBerk site from src/pages.

Outputs two versions of the same pages:
  * the static site at the repo root (index.html, *.html, resources/...)
  * GoHighLevel paste-in files in ghl/ (body code + header tracking code per page)

Run from the repo root:  python3 tools/build.py
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "pages"
GHL_OUT = ROOT / "ghl"
SITE = "https://www.coachberk.com"
EMAIL = "berk@coachberk.com"

# Page paths inside the GoHighLevel funnel. These are also the canonical URLs.
# BOOK, ADS and PRIVACY must match the existing funnel steps: check each
# step's gear icon in GHL and update here if they differ, then re-run.
GHL_PATHS = {
    "HOME": "/",
    "ADS": "/google-ads-for-insurance-agencies",
    "SEO": "/insurance-agency-seo",
    "REACT": "/policyholder-reactivation-campaigns",
    "GUIDE": "/insurance-agency-seo-guide",
    "BOOK": "/appointment",
    "CHECKLIST": "/google-ads-and-seo-checklist",
    "PRIVACY": "/private-policy",
}

# Paths for the static copy of the site in this repo.
STATIC_PATHS = {
    "HOME": "/",
    "ADS": "/google-ads-for-insurance-agencies.html",
    "SEO": "/insurance-agency-seo.html",
    "REACT": "/policyholder-reactivation-campaigns.html",
    "GUIDE": "/resources/insurance-agency-seo-guide.html",
    "BOOK": "/free-audit.html",
    "CHECKLIST": SITE + GHL_PATHS["CHECKLIST"],
    "PRIVACY": SITE + GHL_PATHS["PRIVACY"],
}

NAV = [("ADS", "Google Ads"), ("SEO", "SEO"), ("REACT", "Reactivation"), ("GUIDE", "Free Guide")]

ORG = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SITE + "/#org",
    "name": "CoachBerk",
    "url": SITE + "/",
    "description": "Google Ads, SEO and policyholder reactivation campaigns for multi-location and high-volume insurance agencies.",
    "areaServed": "US",
    "knowsAbout": ["Insurance agency marketing", "Google Ads", "Local SEO", "Insurance lead generation", "Customer reactivation campaigns"],
    "email": EMAIL,
}

FONTS = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">'
)


def header(key):
    items = []
    for k, label in NAV:
        cur = ' aria-current="page"' if k == key else ""
        items.append(f'<li><a href="{{{{{k}}}}}"{cur}>{label}</a></li>')
    items.append('<li><a class="btn btn-primary" href="{{BOOK}}">Book a Strategy Call</a></li>')
    return f"""<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <nav class="container nav" aria-label="Main">
    <a class="logo" href="{{{{HOME}}}}">Coach<span>Berk</span></a>
    <button class="nav-toggle" aria-label="Open menu" aria-expanded="false">&#9776;</button>
    <ul class="nav-links">
      {''.join(items)}
    </ul>
  </nav>
</header>"""


FOOTER = f"""<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="logo" href="{{{{HOME}}}}">Coach<span>Berk</span></a>
        <p style="margin-top:14px">Growth marketing built only for insurance agencies: Google Ads, SEO and reactivation campaigns that turn searches and old files into written policies.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="{{{{ADS}}}}">Google Ads for Agencies</a></li>
          <li><a href="{{{{SEO}}}}">Insurance Agency SEO</a></li>
          <li><a href="{{{{REACT}}}}">Reactivation Campaigns</a></li>
        </ul>
      </div>
      <div>
        <h4>Resources</h4>
        <ul>
          <li><a href="{{{{GUIDE}}}}">Insurance Agency SEO Guide</a></li>
          <li><a href="{{{{CHECKLIST}}}}">Google Ads &amp; SEO Checklist</a></li>
          <li><a href="{{{{PRIVACY}}}}">Privacy Policy</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:{EMAIL}">{EMAIL}</a></li>
          <li><a href="{{{{BOOK}}}}">Book a strategy call</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; <span id="year">2026</span> CoachBerk. All rights reserved.</span>
      <span>Built for independent &amp; multi-location insurance agencies.</span>
    </div>
  </div>
</footer>"""


def fill(text, paths):
    return re.sub(r"\{\{([A-Z]+)\}\}", lambda m: paths[m.group(1)], text)


def canonical(meta):
    key = meta.get("key")
    return SITE + (GHL_PATHS[key] if key else meta["path"])


def schemas(meta):
    url = canonical(meta)
    out = [ORG] + meta.get("schema", [])
    if meta.get("key") != "HOME":
        out.append({
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": meta["crumb"], "item": url},
            ],
        })
    text = json.dumps(out, ensure_ascii=False).replace("https://coachberk.com", SITE)
    return [f'<script type="application/ld+json">{json.dumps(s, ensure_ascii=False)}</script>'
            for s in json.loads(text)]


def scope_css(css, scope=".cb"):
    """Prefix every selector with `scope` so the styles can't leak into GHL's page."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)

    def fix_selector(sel):
        sel = sel.strip()
        if sel in ("html", "body"):
            return scope
        if sel.startswith(":root"):
            return scope + sel[5:]
        return f"{scope} {sel}"

    out, i = [], 0
    while i < len(css):
        brace = css.find("{", i)
        if brace == -1:
            break
        prelude = css[i:brace].strip()
        if prelude.startswith("@media"):
            depth, j = 1, brace + 1
            while depth:
                depth += {"{": 1, "}": -1}.get(css[j], 0)
                j += 1
            out.append(f"{prelude}{{{scope_css(css[brace + 1:j - 1], scope)}}}")
        else:
            j = css.index("}", brace) + 1
            sels = ",".join(fix_selector(s) for s in prelude.split(","))
            out.append(f"{sels}{css[brace:j]}")
        i = j
    return "\n".join(out)


def render_static(meta, body):
    url = canonical(meta)
    ld = "\n".join(schemas(meta))
    robots = meta.get("robots", "index, follow")
    page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{meta['title']}</title>
<meta name="description" content="{meta['description']}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{url}">
<meta property="og:type" content="{meta.get('og_type', 'website')}">
<meta property="og:site_name" content="CoachBerk">
<meta property="og:title" content="{meta['title']}">
<meta property="og:description" content="{meta['description']}">
<meta property="og:url" content="{url}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
{FONTS}
<link rel="stylesheet" href="/assets/styles.css">
{ld}
</head>
<body>
{header(meta.get('key'))}
<main id="main">
{body}
</main>
{FOOTER}
<script src="/assets/main.js" defer></script>
</body>
</html>
"""
    return fill(page, STATIC_PATHS)


def render_ghl_body(meta, body, css, js):
    page = f"""<!-- CoachBerk: {meta['crumb']} page. Paste this whole block into one Custom JS/HTML (Code) element. -->
{FONTS}
<style>
{css}
</style>
<div class="cb">
{header(meta.get('key'))}
<main id="main">
{body}
</main>
{FOOTER}
</div>
<script>
{js}
</script>
"""
    return fill(page, GHL_PATHS)


def render_ghl_head(meta):
    return (f"<!-- CoachBerk: {meta['crumb']} page. Paste into Settings > Tracking Code > Header. -->\n"
            f'<link rel="canonical" href="{canonical(meta)}">\n' + "\n".join(schemas(meta)) + "\n")


def main():
    css = scope_css((ROOT / "assets" / "styles.css").read_text())
    js = (ROOT / "assets" / "main.js").read_text().strip()
    GHL_OUT.mkdir(exist_ok=True)
    rows, sitemap = [], []
    for f in sorted(SRC.glob("*.html")):
        head, body = f.read_text().split("\n---\n", 1)
        meta = json.loads(head)
        meta.setdefault("crumb", "Home")
        body = body.strip()

        target = ROOT / ("index.html" if meta["path"] == "/" else meta["path"].lstrip("/"))
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(render_static(meta, body))

        slug = meta.get("ghl")
        if slug:
            (GHL_OUT / f"{slug}.html").write_text(render_ghl_body(meta, body, css, js))
            (GHL_OUT / f"{slug}-header-code.html").write_text(render_ghl_head(meta))
            rows.append((meta, slug))
            sitemap.append(canonical(meta))
        print("built", f.name)

    (ROOT / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join(f"  <url><loc>{u}</loc></url>\n" for u in sitemap) + "</urlset>\n")

    lines = ["# GoHighLevel SEO settings", "",
             "Generated by `tools/build.py`. For each funnel step, copy these into the step's settings.", ""]
    for meta, slug in rows:
        lines += [f"## {meta['crumb']}", "",
                  f"- **Funnel step:** {meta['ghl_step']}",
                  f"- **Path:** `{GHL_PATHS[meta['key']]}`",
                  f"- **Page code (Custom JS/HTML element):** `ghl/{slug}.html`",
                  f"- **SEO title:** {meta['title']}",
                  f"- **SEO description:** {meta['description']}",
                  "- **Social image:** a 1200×630 image with your logo and the page headline",
                  f"- **Header tracking code:** `ghl/{slug}-header-code.html`", ""]
    (GHL_OUT / "SEO-SETTINGS.md").write_text("\n".join(lines))


if __name__ == "__main__":
    main()
