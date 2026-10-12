# Ads lead page (Facebook + Google Ads): GHL setup

Page path: `/agency-growth-plan`

The page is **three pieces stacked in this order**:

| Order | What | Paste |
| --- | --- | --- |
| 1 (top) | Custom JS/HTML (Code) element | `ghl/fb-1-TOP-code-element.html` |
| 2 (middle) | GHL **Form** element | your GHL form (built in Sites → Forms) |
| 3 (bottom) | Custom JS/HTML (Code) element | `ghl/fb-2-BOTTOM-code-element.html` |

Block 1 holds the styling for the whole page, so it must be on the page for Block 3 to look right.

## 1. Build the form (once)
Go to **Sites → Forms → Builder → Add Form**. Add these fields:
- Full Name
- Email
- Phone
- a single-line text field "Agency name"
- a dropdown "Number of locations" with the options 1 / 2 to 4 / 5 to 10 / 11 or more

Under the form's **Options**:
- **On submit:** *Redirect to URL*, set to your Appointment page, e.g. `https://www.coachberk.com/appointment`
- **Button text:** `Send Me My Plan`, button color `#0b5fff`

Save the form.

## 2. Create the funnel step
In the **CoachBerk.com** funnel, click **+ Add new step**. Name it `Agency Growth Plan` and set the path to `agency-growth-plan`.

## 3. Build the page
1. Click **Edit** and delete everything on the page.
2. Add a **Full Width** section and set its top and bottom padding to 0. Drag in a **Custom JS/HTML** element.
   - Open the code editor and paste **all** of `fb-1-TOP-code-element.html`, then save.
   - Check: the first line starts with `<!-- CoachBerk ads lead page: BLOCK 1`, and the last line is `</div>`.
3. Under it, add another section and set its background to light grey `#f4f7fb`. Drag in a **Form** element, pick the form from step 1, and set it to about 560px wide, centered.
4. Under that, add another **Full Width** section with 0 padding and a **Custom JS/HTML** element.
   - Paste **all** of `fb-2-BOTTOM-code-element.html`, then save.
5. On the form's section, set the **Element ID / CSS selector** to `get-plan`, so both "Get My Free Growth Plan" buttons scroll to the form. (Block 1 also includes a `get-plan` anchor just above the form.)
6. Click **Save**, then **Preview**. You should see a dark blue top section with the headline.

**If Preview is blank:** make sure you pasted the `fb-…-code-element.html` files, not a header-code file, and that the code wasn't cut off (check the last line).

## 4. Page settings
- **SEO Meta Data:** Title `Free Agency Growth Plan for Insurance Agencies | CoachBerk`. Description `Get a free 90-day growth plan for your insurance agency: more quotes from Google Ads, more visibility on Google Maps, and new premium from your existing book.`
- Ad landing pages don't need to rank on Google. To keep this one out of search results, add this to **Tracking Code → Header**:
  ```html
  <meta name="robots" content="noindex">
  ```

## 5. Tracking
- **Facebook Pixel:** in the funnel's **Settings → Tracking Code → Header**, paste your Meta Pixel base code (Events Manager → your pixel → Set up → Install code manually).
  - On the **Appointment** page, add this to its Header to count a Lead:
    ```html
    <script>if(window.fbq)fbq('track','Lead');</script>
    ```
- **Google Ads:** paste your Google tag in the same funnel Header, and set a conversion on the Appointment page or the booking Thank You page.

## 6. Send leads to you
Go to **Automation → Workflows → Create**:
- **Trigger:** *Form Submitted*, set to your new form.
- **Action 1:** *Send Internal Notification* (email) to berk@coachberk.com.
- **Action 2 (optional):** *Create/Update Opportunity* in your pipeline.

## 7. Ad links
Use the same page for both ad platforms, with a tag on the end so GHL shows where each lead came from:
- Facebook: `https://www.coachberk.com/agency-growth-plan?utm_source=facebook&utm_medium=paid`
- Google: `https://www.coachberk.com/agency-growth-plan?utm_source=google&utm_medium=cpc`

## 8. Test
1. Open the page on your phone.
2. Tap "Get My Free Growth Plan". It should scroll to the form.
3. Fill the form in with your own details. You should land on the Appointment page, the contact should appear in GHL, and you should get an email.
