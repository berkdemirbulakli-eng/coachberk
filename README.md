# coachberk.com

Static marketing site for CoachBerk: Google Ads, SEO and reactivation campaigns for larger insurance agencies.
Plain HTML/CSS with no build step, so it can be hosted on GitHub Pages, Netlify, Cloudflare Pages or any web host.

## Pages
| URL | Target search intent |
| --- | --- |
| `/` | insurance agency marketing |
| `/google-ads-for-insurance-agencies.html` | Google Ads / PPC for insurance agencies |
| `/insurance-agency-seo.html` | insurance agency SEO, local SEO |
| `/policyholder-reactivation-campaigns.html` | insurance reactivation / win-back campaigns |
| `/resources/insurance-agency-seo-guide.html` | how to get insurance leads from SEO (long-form guide) |
| `/free-audit.html` | lead capture form |

Every page has a unique title and meta description, a canonical URL, Open Graph tags and JSON-LD schema
(Organization, Service, FAQPage, Article, BreadcrumbList). `sitemap.xml` and `robots.txt` are included.

## Before launch
1. **Contact form:** in `free-audit.html`, replace `YOUR_FORM_ID` with a [Formspree](https://formspree.io) form ID (or point the form at your own endpoint).
2. **Email:** the site uses `berk@coachberk.com` (footer, audit page and schema markup).
3. **Proof:** add real client results, testimonials and a headshot/About section when you have them.
4. **Search Console:** verify the domain in Google Search Console and submit `https://coachberk.com/sitemap.xml`.
5. **Analytics:** add your GA4 / call-tracking snippet in the `<head>` of each page.
6. **Old URLs:** if the previous site had pages at other URLs, set up 301 redirects to the closest new page.
