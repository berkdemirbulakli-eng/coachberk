# Putting the new CoachBerk pages into GoHighLevel

The pages go into your existing **CoachBerk.com** funnel. Each page is two pieces:

| File | Where it goes in GHL |
| --- | --- |
| `ghl/<page>.html` | A **Custom JS/HTML (Code)** element on the page |
| `ghl/<page>-header-code.html` | The page's **Settings → Tracking Code → Header** |

The title, description and path for every page are in [`SEO-SETTINGS.md`](SEO-SETTINGS.md).

| Page | Funnel step | Path |
| --- | --- | --- |
| Home | **Home** (existing, replace content) | `/` |
| Google Ads | **Google Ads Lead System for Insurance Agencies** (existing, replace content) | `/google-ads-for-insurance-agencies` |
| SEO | new step | `/insurance-agency-seo` |
| Reactivation | new step | `/policyholder-reactivation-campaigns` |
| SEO Guide | new step | `/insurance-agency-seo-guide` |

Every "Book a Strategy Call" and "free audit" button goes to your existing **Appointment** step. The SEO page and the Guide also link to your existing **Google Ads and SEO Checklist** step.

---

## Step 0: Check three existing paths

The pages assume these paths for steps you already have:

- Appointment: `/appointment`
- Google Ads Lead System: `/google-ads-for-insurance-agencies`
- Private policy: `/private-policy`

Click each step in the funnel and read the URL shown in **Overview**. If any is different, either:
- change that step's path to match (gear icon next to the URL), or
- tell Claude the real paths so the files can be regenerated. They're set in `GHL_PATHS` at the top of `tools/build.py`.

> If you change the Google Ads step's path, add a redirect from the old path to the new one (**Settings → URL Redirects**), so old links and rankings carry over.

## Step 1: Back up the steps you're replacing

For **Home** and **Google Ads Lead System**, click **Clone Funnel Step** first. You keep a copy of the old page in case you want anything from it.

## Step 2: Create the three new steps

**Add new step or import** → name it (e.g. "Insurance Agency SEO") → set the path from the table → create. Repeat for Reactivation and the SEO Guide.

## Step 3: Paste the page code

For each of the five pages:

1. Open the step and click **Edit** to open the page builder.
2. Delete the existing sections, including any GHL header or menu. The code includes its own menu and footer.
3. Add a **Full Width** section. In its settings, set top and bottom padding to **0**. Do the same for the row and column inside it.
4. Drag in the **Custom JS/HTML** (Code) element.
5. Open the code editor, paste the whole contents of `ghl/<page>.html`, then save.
6. In the builder's **Settings → Background**, set the page background to white.

The builder may show a grey placeholder instead of the design. Use **Preview** to see the real page.

## Step 4: SEO settings for each page

In the page builder, open **Settings**:

1. **SEO Meta Data**: copy in the **SEO title** and **SEO description** from `SEO-SETTINGS.md`. Upload a 1200×630 social image with your logo and the page headline.
2. **Tracking Code → Header**: paste the whole contents of `ghl/<page>-header-code.html`. This adds the structured data Google reads: your business, the service, FAQs, the article and breadcrumbs.
3. **Save**.

> **Canonical tag check:** the header code includes a `<link rel="canonical">` line. After publishing, open the live page, press **Ctrl+U** (view source) and search for `canonical`. If it appears **twice**, GHL already adds one, so delete the line from the header code.

## Step 5: Funnel-wide settings

In the funnel's **Settings** tab:

- **Domain:** `www.coachberk.com`. Make sure the **Home** step is the domain's default page, so it loads at `/`.
- **Favicon:** upload your logo icon.
- **Head tracking code (whole funnel):** your Google Analytics 4 tag, Google Ads tag, and any call-tracking script.

## Step 6: Sitemap and robots.txt

In **Settings → Domains**, open the menu next to `www.coachberk.com`:

1. **XML Sitemap:** select the CoachBerk.com funnel and tick:
   - Home
   - Google Ads
   - Insurance Agency SEO
   - Reactivation
   - SEO Guide
   - Google Ads and SEO Checklist
   - Appointment

   Leave the thank-you pages and old pages unticked, then generate it.
2. **Robots.txt:** set it to:

   ```
   User-agent: *
   Allow: /

   Sitemap: https://www.coachberk.com/sitemap.xml
   ```

## Step 7: Tidy the old pages

Pages like *90dayinsurnaceagencyreboot*, *Unlimited Roadmap2* and *What do business coaches do?* can stay live so existing links keep working.

- Add a link or button on each that goes to `/` (Home), so visitors and Google can reach the new pages.
- On **Thank You** pages, paste this into **Tracking Code → Header** so Google doesn't index them:

  ```html
  <meta name="robots" content="noindex">
  ```

## Step 8: Tell Google

1. **Google Search Console:** add `www.coachberk.com` and verify it with the DNS record it gives you. Then:
   - **Sitemaps** → submit `https://www.coachberk.com/sitemap.xml`.
   - **URL Inspection** → paste each of the five page URLs → **Request indexing**.
2. **Rich Results Test** (search.google.com/test/rich-results): test the Home page and the Guide. You should see *FAQ*, *Organization*, *Article* and *Breadcrumbs* detected.
3. **Google Business Profile:** set the website link to `https://www.coachberk.com/`.

## Step 9: Final check

- [ ] Open each of the five pages on your phone and on desktop
- [ ] Click every menu item, footer link and button. Booking buttons should open your Appointment page.
- [ ] Book a test appointment and confirm it lands in GHL Contacts and emails you at berk@coachberk.com
- [ ] View source (Ctrl+U) on each page and confirm the page text is in the source. That's what Google reads.

If the page text **isn't** in the source, GHL is loading the code after the page loads, and Google may not read it. Tell Claude and the pages can be prepared as a native GHL build instead.
