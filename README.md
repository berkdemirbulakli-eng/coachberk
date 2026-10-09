# coachberk.com

Static marketing site for CoachBerk: Google Ads, SEO and reactivation campaigns for larger insurance agencies.
The live site runs on a **GoHighLevel** funnel. See [`ghl/GHL-SETUP.md`](ghl/GHL-SETUP.md) for how to paste the pages in,
and [`ghl/SEO-SETTINGS.md`](ghl/SEO-SETTINGS.md) for each page's title, description and path.

## Editing
Page content lives in `src/pages/`. Styles are in `assets/styles.css`. After any change, run:

```
python3 tools/build.py
```

This regenerates both the GHL paste-in files in `ghl/` and a static copy of the site at the repo root, used for previews.
GHL page paths (including the Appointment page) are set in `GHL_PATHS` at the top of `tools/build.py`.

## Pages
| GHL path | Target search intent |
| --- | --- |
| `/` | insurance agency marketing |
| `/google-ads-for-insurance-agencies` | Google Ads / PPC for insurance agencies |
| `/insurance-agency-seo` | insurance agency SEO, local SEO |
| `/policyholder-reactivation-campaigns` | insurance reactivation / win-back campaigns |
| `/insurance-agency-seo-guide` | how to get insurance leads from SEO (long-form guide) |
| `/appointment` (existing) | booking: every call-to-action button goes here |

Every page has a unique title and meta description, a canonical URL, Open Graph tags and JSON-LD schema
(Organization, Service, FAQPage, Article, BreadcrumbList). `sitemap.xml` and `robots.txt` are included.

## Before launch
Follow the checklist in [`ghl/GHL-SETUP.md`](ghl/GHL-SETUP.md). It covers paths, SEO settings, sitemap, robots.txt, Search Console and testing.
