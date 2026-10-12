# CoachBerk.com in GoHighLevel: step by step

**How the site works:** every button on every page goes to the **Agency Growth Plan** page. That page has your **GHL form**. When someone fills it in, they go straight to your **Appointment** page to book a call. The lead is saved in GHL Contacts and you get an email.

```
Home / Google Ads / SEO / Reactivation / Free Guide
                 │  (every button)
                 ▼
     Agency Growth Plan page  ──►  GHL form  ──►  Appointment page
                 ▲
   Facebook ads + Google ads also send people here
```

## The pages

| # | Page | Funnel step | Path | Paste into Code element | Paste into Header |
| --- | --- | --- | --- | --- | --- |
| 1 | Agency Growth Plan | new step | `agency-growth-plan` | `fb-1-TOP-code-element.html`, then the GHL form, then `fb-2-BOTTOM-code-element.html` | `<meta name="robots" content="noindex">` |
| 2 | Home | existing **Home** | `/` | `home.html` | `home-header-code.html` |
| 3 | Google Ads | existing **Google Ads Lead System…** | `google-ads-for-insurance-agencies` | `google-ads.html` | `google-ads-header-code.html` |
| 4 | SEO | new step | `insurance-agency-seo` | `seo.html` | `seo-header-code.html` |
| 5 | Reactivation | new step | `policyholder-reactivation-campaigns` | `reactivation.html` | `reactivation-header-code.html` |
| 6 | Free Guide | new step | `insurance-agency-seo-guide` | `seo-guide.html` | `seo-guide-header-code.html` |

All files are in the `ghl` folder. **"Code element" files show the page. "Header" files are invisible: they're only for Google.** Don't mix them up.

---

## Part 1: Build the GHL form (once)

1. Go to **Sites → Forms → Builder**, then **+ Add Form**. Start from blank and name it `Agency Growth Plan`.
2. Add these fields:
   - **Full Name**
   - **Email**
   - **Phone**
   - **Single Line** field called `Agency name`
   - **Dropdown** called `Number of locations`, with the options `1`, `2 to 4`, `5 to 10`, `11 or more`
3. Click the **Submit** button and change its text to `Send Me My Plan`. Set the color to `#0b5fff`.
4. Open **Options** (or **Form settings**). Under **On submit**, choose **Open URL / Redirect** and enter your Appointment page, e.g. `https://www.coachberk.com/appointment`.
5. Click **Save**.

## Part 2: Get an email for every lead (once)

1. Go to **Automation → Workflows**, then **+ Create Workflow** and choose **Start from scratch**.
2. **Add trigger:** *Form Submitted*, with the filter set to form *Agency Growth Plan*.
3. **Add action:** *Send Internal Notification*, type Email, to `berk@coachberk.com`. Subject: `New Growth Plan lead: {{contact.name}}`.
4. Optional: add *Create/Update Opportunity* to put the lead in your pipeline.
5. Click **Save**, then switch the workflow to **Publish**.

## Part 3: Make the Agency Growth Plan page (do this first)

1. In your **CoachBerk.com** funnel, click **+ Add new step**. Name it `Agency Growth Plan` and set the path to `agency-growth-plan`.
2. Click **Edit** and delete anything on the page.
3. **Top block:**
   1. Add a **Full Width** section and set its top and bottom padding to **0**.
   2. Drag in a **Custom JS/HTML** element and click **Open Code Editor**.
   3. Paste **all** of `fb-1-TOP-code-element.html`, then click **Save**.
4. **Form:** add a new section below and set its background to `#f4f7fb`. Drag in a **Form** element and pick *Agency Growth Plan*. Set the width to about 560px, centered.
5. **Bottom block:** add another **Full Width** section with 0 padding below that. Drag in a **Custom JS/HTML** element and paste **all** of `fb-2-BOTTOM-code-element.html`, then click **Save**.
6. Open the page **Settings**:
   - **SEO Meta Data:** Title `Free Agency Growth Plan for Insurance Agencies | CoachBerk`
   - **Tracking Code → Header:** `<meta name="robots" content="noindex">`
7. Click **Save**, then **Preview**. You should see a dark blue top with the headline "Your agency's next 100 policies…", your form, then the rest.

## Part 4: The other five pages (repeat for each)

1. **Back up first:** for **Home** and **Google Ads Lead System**, click **Clone Funnel Step** before changing anything.
2. For SEO, Reactivation and Free Guide, create the new step with **+ Add new step** and the path from the table.
3. Click **Edit** and delete everything on the page, including any old menu.
4. Add a **Full Width** section with padding **0**. Drag in a **Custom JS/HTML** element, paste **all** of the page's *Code element* file, and click **Save**.
5. Open **Settings**:
   - **SEO Meta Data:** copy that page's Title and Description from `SEO-SETTINGS.md`.
   - **Tracking Code → Header:** paste the page's *Header* file.
6. Click **Save**, then **Preview**.

**If Preview is blank:**
- Check you pasted the *Code element* file, not the *Header* file.
- Check the end wasn't cut off: the last line in the box should be `</script>`.
- Test the element works by pasting just `<h1 style="color:red">Test</h1>`. If the red word shows, tell Claude the page code is too long for your Code element and it will be split into smaller pieces.

## Part 5: Funnel settings (once)

In the funnel's **Settings** tab:
- **Domain:** `www.coachberk.com`, with **Home** as the main page.
- **Favicon:** upload your logo icon.
- **Header tracking code (whole funnel):**
  - Your **Meta (Facebook) Pixel**: Events Manager → your pixel → Set up → Install code manually.
  - Your **Google tag**, for Google Ads and Analytics.
- On the **Appointment** page's **Tracking Code → Header**, add this so Facebook counts leads:
  ```html
  <script>if(window.fbq)fbq('track','Lead');</script>
  ```

## Part 6: Sitemap and Google (once)

1. Go to **Settings → Domains**, open the menu next to `www.coachberk.com`, and choose **XML Sitemap**. Tick Home, Google Ads, SEO, Reactivation, Free Guide and the Checklist, then generate it. Don't tick the Growth Plan page, the Thank You pages or the Appointment page.
2. In **Google Search Console**, add `www.coachberk.com`, then submit `https://www.coachberk.com/sitemap.xml`.

## Part 7: Ads

Point both ad platforms at the same page, with a tag so you can see where each lead came from:
- Facebook: `https://www.coachberk.com/agency-growth-plan?utm_source=facebook&utm_medium=paid`
- Google: `https://www.coachberk.com/agency-growth-plan?utm_source=google&utm_medium=cpc`

## Part 8: Test everything

- [ ] On your phone, open each page. Every button should go to the Growth Plan page.
- [ ] On the Growth Plan page, tap "Get My Free Growth Plan". It should scroll down to the form.
- [ ] Fill in the form. You should land on the Appointment page.
- [ ] The test contact appears in GHL **Contacts**, and you get the email.
- [ ] On each SEO page, press Ctrl+U and search for a sentence from the page. If it's there, Google can read the page.
