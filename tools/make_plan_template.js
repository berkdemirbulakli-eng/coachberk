// Builds deliverables/Personal-Growth-Plan-Template.docx
// Run from the repo root:  node tools/make_plan_template.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, HeadingLevel, LevelFormat, PageBreak,
  Footer, PageNumber,
} = require("docx");

const INK = "0D1B2A", SOFT = "3B4A5C", MUTED = "6B7A8C", BRAND = "0B5FFF", TEAL = "14B8A6", ALT = "F4F7FB", LINE = "E2E8F0";
const FONT = "Calibri";
const W = 9360; // content width in DXA (8.5" page, 1.5" total margins)

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };

const p = (text, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 120 },
  alignment: opts.align,
  keepNext: opts.bold,
  children: [new TextRun({ text, font: FONT, size: opts.size ?? 22, color: opts.color ?? SOFT, bold: opts.bold, italics: opts.italics })],
});
const label = (text) => new Paragraph({
  spacing: { before: 240, after: 60 },
  children: [new TextRun({ text: text.toUpperCase(), font: FONT, size: 16, bold: true, color: BRAND, characterSpacing: 40 })],
});
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 120, after: 120 }, children: [new TextRun({ text, font: FONT, size: 36, bold: true, color: INK })] });
const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 360, after: 120 }, keepNext: true,
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: TEAL, space: 4 } },
  children: [new TextRun({ text, font: FONT, size: 28, bold: true, color: INK })],
});
const bullet = (text) => new Paragraph({ numbering: { reference: "check", level: 0 }, spacing: { after: 80 }, children: [new TextRun({ text, font: FONT, size: 22, color: SOFT })] });
const step = (text) => new Paragraph({ numbering: { reference: "steps", level: 0 }, spacing: { after: 100 }, children: [new TextRun({ text, font: FONT, size: 22, color: SOFT })] });
const blankLine = () => new Paragraph({ spacing: { after: 0 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "B8C2CF", space: 6 } }, children: [new TextRun({ text: " ", font: FONT, size: 26 })] });

function cell(text, width, opts = {}) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA },
    shading: opts.head ? { fill: ALT, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: text || " ", font: FONT, size: opts.head ? 19 : 20, bold: opts.head, color: opts.head ? INK : SOFT })] })],
  });
}
function table(widths, head, rows) {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: head.map((h, i) => cell(h, widths[i], { head: true })) }),
      ...rows.map((r) => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, widths[i])) })),
    ],
  });
}
function box(title, lines) {
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: [W],
    rows: [new TableRow({ children: [new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 4, color: LINE }, bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE }, right: { style: BorderStyle.SINGLE, size: 4, color: LINE }, left: { style: BorderStyle.SINGLE, size: 24, color: TEAL } },
      width: { size: W, type: WidthType.DXA },
      shading: { fill: ALT, type: ShadingType.CLEAR, color: "auto" },
      margins: { top: 140, bottom: 140, left: 200, right: 200 },
      children: [
        new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: title, font: FONT, size: 22, bold: true, color: INK })] }),
        ...lines.map((l) => new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: l, font: FONT, size: 21, color: SOFT })] })),
      ],
    })] })],
  });
}
const gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });

const moveBox = (n) => box(`Move ${n}:`, ["Why it matters for this agency:", " ", "First step (this week):", " ", "What we'll measure:", " "]);

const children = [
  // Cover / header
  new Paragraph({ spacing: { after: 0 }, children: [
    new TextRun({ text: "Coach", font: FONT, size: 30, bold: true, color: INK }),
    new TextRun({ text: "Berk", font: FONT, size: 30, bold: true, color: BRAND }),
  ] }),
  p("www.coachberk.com  ·  berk@coachberk.com", { color: MUTED, size: 18, after: 360 }),
  label("Personal Agency Growth Plan"),
  h1("Prepared for: ____________________"),
  table([2600, 6760], ["Detail", "Notes"], [
    ["Agency name", ""], ["Contact name", ""], ["Offices / towns", ""], ["Main lines written", ""],
    ["Records in AMS (from form)", ""], ["Runs Google Ads today?", ""], ["Call date", ""],
  ]),
  gap(),
  p("This plan looks at three things: how easily local customers find the agency on Google, whether ad money is producing quotes, and how much premium is sitting in the existing database. It ends with the three moves that will make the biggest difference in the next 90 days.", { italics: true }),

  // 1. Google visibility
  h2("1. Your Google visibility today"),
  p("Search each phrase on Google from the office's town (or set the location in Google Maps). Note whether the office shows in the map top 3."),
  table([2100, 2600, 1300, 1460, 1900], ["Office / town", "Search phrase", "Map top 3?", "Reviews / rating", "Profile issues"], [
    ["", "insurance agency near me", "", "", ""],
    ["", "[line] insurance [town]", "", "", ""],
    ["", "[line] insurance [town]", "", "", ""],
    ["", "independent insurance agent [town]", "", "", ""],
    ["", "", "", "", ""],
  ]),
  gap(),
  p("Who shows up instead? (top competitors)", { bold: true, color: INK }),
  blankLine(), blankLine(),
  gap(),
  p("Website check", { bold: true, color: INK }),
  table([5600, 1300, 2460], ["Question", "Yes / No", "Notes"], [
    ["Separate page for each office?", "", ""],
    ["Separate page for each main line?", "", ""],
    ["Phone number clickable on mobile?", "", ""],
    ["Quote form easy to find and short?", "", ""],
    ["Page loads quickly on a phone?", "", ""],
  ]),

  // 2. Ad spend
  h2("2. Where your ad money is leaking"),
  p("Skip this section if the agency doesn't run Google Ads. If they do, ask for view access to the account or a screenshot of last month's numbers."),
  table([5600, 1300, 2460], ["Check", "OK / Problem", "Notes"], [
    ["Search terms include junk (jobs, claims, cheap/free, other companies)", "", ""],
    ["Negative keyword list is in place and maintained", "", ""],
    ["Calls from ads are tracked as conversions", "", ""],
    ["Quote form submissions are tracked as conversions", "", ""],
    ["Ads send people to a page about that line, not the homepage", "", ""],
    ["Personal and commercial lines have separate campaigns or budgets", "", ""],
    ["Each office has its own location targeting", "", ""],
    ["They know their cost per quote (not just cost per click)", "", ""],
  ]),
  gap(),
  table([3120, 3120, 3120], ["Monthly spend", "Quotes / calls from ads", "Cost per quote"], [["$", "", "$"]]),

  // 3. Database
  h2("3. The premium sitting in your database"),
  p("Fill in the agency's own numbers. Set the response and bind rates to your own conservative assumptions and explain them on the call; don't present them as guarantees."),
  table([2800, 1450, 1650, 1450, 2010], ["Segment", "Records", "Assumed response %", "Assumed bind %", "Avg premium ($)"], [
    ["Unbound quotes (last 12 months)", "", "", "", ""],
    ["Lapsed / cancelled policies", "", "", "", ""],
    ["Single-policy households", "", "", "", ""],
    ["Personal clients who own a business", "", "", "", ""],
  ]),
  gap(),
  box("How to estimate", [
    "Records × response % × bind % = policies won back",
    "Policies won back × average premium = estimated premium opportunity",
    "Estimated total premium opportunity: $ ____________",
  ]),

  // 4. Top 3 moves
  h2("4. Your top 3 moves for the next 90 days"),
  moveBox(1), gap(), moveBox(2), gap(), moveBox(3),

  // 5. Next steps
  h2("5. Next steps"),
  table([3120, 3120, 3120], ["What", "Who", "By when"], [["", "", ""], ["", "", ""], ["", "", ""]]),
  gap(),
  p("How CoachBerk can help / investment:", { bold: true, color: INK }),
  blankLine(), blankLine(), blankLine(),

  // Instructions page
  new Paragraph({ children: [new PageBreak()] }),
  label("For Berk only. Delete this page before sending"),
  h1("How to fill this in 15 minutes"),
  step("Open the lead in GHL Contacts. Copy the agency name, number of locations and database size into the table on page 1."),
  step("Find the agency on Google Maps. Note each office, its review count and rating, and anything missing on its profile (wrong category, no photos, no website link)."),
  step("Run the searches in section 1 for each office's town. Use Google Maps with the location set to that town. Write down who shows in the top 3 instead."),
  step("Open their website on your phone. Answer the five website questions."),
  step("If they run Google Ads, skip section 2 until the call. Ask for a screenshot or view access, and fill it in together."),
  step("Section 3: fill in the record counts from the form, or ask on the call. Use your own conservative rates and explain them."),
  step("Pick the 3 moves with the biggest impact and the quickest first step. Usually: fix tracking or Google profiles, one focused ad campaign, and a reactivation test on unbound quotes."),
  step("Save as PDF (File, Save As, PDF) and send it after the call, or share your screen during it."),
  gap(),
  box("Good to know", [
    "Only write what you saw yourself. Mark anything you're estimating as an estimate.",
    "Keep the tone helpful. The plan should be useful even if they don't hire you.",
  ]),
];

const doc = new Document({
  creator: "CoachBerk",
  title: "Personal Agency Growth Plan",
  styles: { default: { document: { run: { font: FONT, size: 22 } } } },
  numbering: { config: [
    { reference: "check", levels: [{ level: 0, format: LevelFormat.BULLET, text: "✓", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 400, hanging: 300 } }, run: { color: TEAL } } }] },
    { reference: "steps", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 340 } }, run: { bold: true, color: BRAND } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
      new TextRun({ text: "CoachBerk Personal Growth Plan  ·  Page ", font: FONT, size: 16, color: MUTED }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: MUTED }),
    ] })] }) },
    children,
  }],
});

const out = path.join(__dirname, "..", "deliverables", "Personal-Growth-Plan-Template.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(out, buf); console.log("wrote", out); });
