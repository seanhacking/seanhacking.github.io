# Style guide: three directions

Owner feedback (2026-10-17): the first redesign still looked like the default Claude palette (cream paper, terracotta, navy). The concept, drawings and animations stay; the visual identity changes. Below are three directions. Each one has a style tile you can open in a browser:

| Direction | Tile | Screenshot |
| --- | --- | --- |
| A. Shop Floor | `style-tiles/a-shop-floor.html` | `.screenshots/style-a.png` |
| B. Component Catalogue | `style-tiles/b-component-catalogue.html` | `.screenshots/style-b.png` |
| C. Flight Deck | `style-tiles/c-flight-deck.html` | `.screenshots/style-c.png` |

Each tile shows the palette in light and dark with measured contrast, the type specimen, the real hero with the real belt-drive drawing recoloured, buttons, links, tags, a project card, and the results band in light and dark. The tiles load fonts from `node_modules`, so run `npm ci` first and open them from the repo folder. They are not part of the Astro build.

Rules for all three: no cream or beige backgrounds, no terracotta or clay accents, no navy-on-cream, no default system or Inter look, no rounded cards with drop shadows, no gradients or glow, no emoji. Square corners everywhere. Every text pair passes WCAG AA (4.5:1) in both themes; the tiles print the measured ratios. The results band keeps big, confident numbers, but in light mode it is never white text on a dark band.

---

## A. Shop Floor

**Mood:** A machine shop in daylight: graphite, brushed aluminium, anodised blue and safety-yellow floor markings.

**Rooted in:** CNC control panels, anodised aluminium parts, the yellow-and-black hazard tape around a machine enclosure, engraved equipment tags. That's Sean's world: Veer's CNC production, the Form Robotics shop, and test rigs.

**Palette**

| Role | Light | Dark |
| --- | --- | --- |
| Page (brushed aluminium) | `#e9ecee` | `#14171a` |
| Panel (machined plate) | `#d8dde1` | `#1e2226` |
| Drawing sheet | `#f8f9fa` | `#1a1e21` |
| Ink (graphite) | `#15181b` | `#e8ebee` |
| Secondary text | `#4a535c` | `#a9b2ba` |
| Rules | `#b4bcc3` | `#353c43` |
| Anodised blue (links, drawing highlights) | `#1b4fd8` | `#7ea6ff` |
| Dimension lines | `#5b6670` | `#8d98a3` |
| Safety yellow (fields only, graphite text) | `#ffd200` | `#ffd200` |

**Type:** Big Shoulders Display (condensed industrial grotesk, uppercase headlines), Atkinson Hyperlegible Next (body), Martian Mono (labels and readouts). All OFL, self-hosted.

**Rules**
- Safety yellow is a field colour, never a text colour. Text on it is always graphite.
- Hazard stripes mark at most one thing per page: the results band edge or the call to action.
- Headlines are Big Shoulders, uppercase and tight. Body text is never condensed.
- Labels look like engraved tags: Martian Mono, uppercase, in a thin bordered plate.
- No rounded corners, no shadows. Hover is a yellow bar under the element.

**Results band:** In light mode, graphite numbers sit on a safety-yellow field with a hazard-stripe edge. In dark mode, the numbers are safety yellow on a graphite plate under a yellow edge bar.

---

## B. Component Catalogue

**Mood:** A 1990s bike-component catalogue: part numbers, exploded views, racing green and hi-vis lime on cool white stock.

**Rooted in:** Shimano and Campagnolo dealer catalogues, component boxes with part numbers and spec tables, team-issue racing green, the hi-vis lime of a commuter jacket. That's Veer's world.

**Palette**

| Role | Light | Dark |
| --- | --- | --- |
| Page (cool catalogue stock) | `#f1f4f2` | `#0e1311` |
| Panel (spec-table tint) | `#e2ece6` | `#16201b` |
| Drawing sheet | `#ffffff` | `#131a17` |
| Ink | `#101412` | `#e9efeb` |
| Secondary text | `#45504a` | `#a3b1a9` |
| Rules | `#c6d0ca` | `#2c3933` |
| Racing green (links, highlights, numbers) | `#00704a` | `#45d39e` |
| Dimension lines | `#5f6a65` | `#7f8d86` |
| Hi-vis lime (highlight bars only, ink text) | `#c8f031` | `#c8f031` |

**Type:** Saira, one family with a width axis: black italic condensed for headlines, normal width for body. Chivo Mono for part numbers and spec tables. All OFL, self-hosted.

**Rules**
- Headlines are Saira black italic, condensed to 62–75% width.
- Every project and chapter gets a part number (for example `VR-02 · 2016`) in Chivo Mono.
- Lime is only ever a highlight bar or a slanted tab. It is never a background for paragraphs and never a text colour.
- Section numbers sit in slanted green tabs.
- 2 px rules, square corners. Tables are ruled, not boxed.

**Results band:** A ruled spec table on a pale green panel, with a part-number column in mono and big black-italic numbers in racing green. In dark mode it is the same table on a deep green plate, with mint numbers.

---

## C. Flight Deck

**Mood:** A glass cockpit and a drone-ops console: crisp white or near-black, with the magenta route line, cyan readouts and green for "go".

**Rooted in:** Airbus and Garmin glass cockpits (the magenta active-route line, cyan selected values, green engaged modes), drone-ops dashboards and flight-test data sheets. That's the Zipline world.

**Palette**

| Role | Light | Dark |
| --- | --- | --- |
| Page (display white) | `#f4f6f8` | `#0a0e13` |
| Panel (readout tint) | `#e4f1f4` | `#0f1a22` |
| Drawing sheet | `#ffffff` | `#0e141b` |
| Ink | `#0d1117` | `#e6edf3` |
| Secondary text | `#47525e` | `#9aa7b4` |
| Hairlines and ticks | `#c5ced8` | `#26313d` |
| Route magenta (the one key thing) | `#b0006d` | `#ff5cc0` |
| Cyan (values, dimension lines) | `#00708a` | `#4dd8ff` |

**Type:** B612 and B612 Mono, the typefaces Airbus commissioned for cockpit displays (OFL, self-hosted). One family throughout; headlines in bold with tight tracking.

**Rules**
- Magenta marks the single most important thing in a view, never more than one element per area.
- Cyan is for values and dimensions. Green is only for "done" or "granted".
- Labels are bracketed mono readouts: `[ SHT 03 ]`, `[ 2016–2024 ]`.
- Dividers are tick scales, like an altitude tape, with hairline 1 px rules.
- Square corners. Hover and focus use an offset outline, not shadows.

**Results band:** Instrument readouts. Each result sits in its own framed box on a pale cyan panel, with the number in B612 Mono, the lead number in magenta and a cyan tick scale underneath. In dark mode it is the same readouts on near-black, which is the native cockpit look.

---

## Recommendation: A, Shop Floor

- **It's the most his.** Every chapter of the story passes through a machine shop: the CNC production at Veer, the Form Robotics shop, the test rigs and LinkBot. B speaks mainly to the Veer years and C mainly to Zipline. A covers the whole arc, and graphite and aluminium sit naturally under line drawings.
- **It has the strongest results band.** Graphite numbers on a safety-yellow field are loud, confident and unmistakably not white-on-dark, and the hazard-stripe edge gives the band a reason to exist.
- **It reads well.** Atkinson Hyperlegible Next keeps the long chapter text easy, while Big Shoulders gives the headlines character. B's all-Saira setting is more stylised to read at length, and B612 is excellent but a little clinical across a whole site.
- **What to watch:** yellow must stay a field colour (it fails as text), and the hazard stripes must stay rare, or the page turns into a construction site.

**Runner-up:** B, if the owner wants more warmth and a direct link to cycling.

## After the pick (step 2)

- Swap the tokens in `src/styles/global.css` and `src/styles/art.css` for the chosen palette.
- Replace the font imports in `src/layouts/Base.astro`, and drop Caveat (handwritten notes move to the mono face).
- Restyle the results band, cards, tags and buttons following the tile.
- Remove the unused `@fontsource` devDependencies.
- Delete or keep `style-tiles/` as a reference.
