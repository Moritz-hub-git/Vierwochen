# Opsrid showcases

Four independent, interactive example applications replace the invoice prototype and previous process comparisons:

- Project management: 38 completed actions, a project Gantt and two prepared human decisions. Decisions can be marked in the demo; a steering report can be inspected.
- Customer platform: order status, an illustrative certificate download and a local address-change example. A separate service queue exposes a prepared reply and customer context. Sending only updates the demo.
- Document studio: five inputs, four document types and a progressive document preview. German/English and Standard/Premium change the output. A final approval and a downloadable, explicitly illustrative HTML document complete the example.
- Economic model: electricity price, operating hours and CAPEX update cash flow, IRR, NPV, payback and sensitivity. Scenarios can be saved for the current page session and downloaded as a decision brief.

Every application shares the “Von Opsrid erledigt” and remaining-human-decisions element. All data and interfaces are explicitly illustrative. Percentage reductions are labelled illustrative targets, not measured customer results or guarantees. No real messages, CRM access, integrations or customer references are claimed.

## Structure

`LandingProduct.tsx` controls four accessible tabs and a 20-second rotation, paused by hover/focus, manual selection or reduced-motion preference. All panels remain mounted so example state survives tab changes. `ShowcaseOperations.tsx`, `ShowcaseDocuments.tsx` and `ShowcaseEconomics.tsx` own the distinct interactions. `ShowcaseShared.tsx` provides the application frame, completion bar and escaped local HTML export. `ShowcaseIcon.tsx` provides one consistent SVG icon family.

Responsive compositions stack on narrow screens; category pills scroll horizontally. Reduced motion disables progressive animation. The contextual CTA opens the existing ChatDock with the selected example; the showcase itself does not collect contact details.

## Economic model

`lib/showcase-economics.ts` is a deterministic illustrative hydrogen-project model: 1,000 MW, 50 kWh/kg, €4.90/kg revenue, €142.8 million annual fixed operating cost, 20 operating years and a 10% discount rate. The UI exposes these assumptions and exclusions. IRR uses the same annual cash flow as NPV and payback; unachievable payback and non-positive cash flow are handled explicitly. The requested sample figures are not hardcoded as calculated outcomes.

Tests reconcile the formulas, verify sensitivity direction and cover invalid inputs and adverse scenarios. Downloads contain examples only and do not send data to third parties.
