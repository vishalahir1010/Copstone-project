# React DevTools & Lighthouse Lab

A ready-to-run React + Vite project for completing responsive design, cross-browser, and Lighthouse practice tasks.

## Run the project

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite in Chrome.

## Assignment checklist

### 1. Mobile screenshot
1. Open Chrome DevTools (`F12`).
2. Toggle Device Toolbar (`Ctrl + Shift + M`).
3. Select an iPhone-style device.
4. Open the homepage.
5. Capture a screenshot of the mobile layout.

### 2. Tablet vs desktop
Compare the page in tablet and desktop widths. Example observations:
- Desktop shows the full navigation links; mobile/tablet narrow widths can switch to the menu icon.
- Desktop uses a two-column hero; smaller screens stack the hero content and performance card.
- The feature cards use three columns on desktop, two on medium screens, and one on small screens.

### 3. Chrome vs Firefox
Open the same homepage in Chrome and Firefox and check:
- Navigation and buttons
- Responsive layout
- Font rendering
- Smooth scrolling
- DevTools console for errors

Record only issues you actually observe.

### 4. Lighthouse
1. Open Chrome DevTools.
2. Go to Lighthouse.
3. Select Mobile or Desktop.
4. Run the audit.
5. Record the Performance score.
6. Review Opportunities.
7. Fix at least one real issue.
8. Run the audit again and record the new score.

Do not invent scores: Lighthouse results vary by device, network, browser version, and background activity.

### 5. ChatGPT improvement
Paste your Lighthouse summary into ChatGPT using:

"Suggest improvements for my React app based on this Lighthouse performance report: [paste report]"

Choose one practical suggestion, implement it, and describe the change in your assignment report.

## Suggested report format

- Mobile screenshot: attached separately
- Tablet vs Desktop differences: 2 points
- Chrome vs Firefox issue: actual observed issue (or "No issue observed")
- Lighthouse before: actual score
- Lighthouse fix: what you changed
- Lighthouse after: actual score
- ChatGPT suggestion: selected improvement
- Implementation: what you changed
