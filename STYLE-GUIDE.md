# Style guide: Shop Floor

The owner picked this direction on 2026-10-17, from three style tiles (Shop Floor, Component Catalogue, Flight Deck). It's a machine shop in daylight: graphite, brushed aluminium and anodised blue, with safety yellow as a rare signal. It's rooted in CNC control panels, anodised aluminium parts, the hazard tape around a machine enclosure and engraved equipment tags, which is the world of Veer's CNC production, the Form Robotics shop and the test rigs.

The concept (an engineering drawing that comes alive), the drawings and the motion rules are in `DESIGN.md`. This file covers colour, type and the rules that keep the look honest.

## Palette

Tokens live in `src/styles/global.css`. Some names are left over from the first design: `--red` is the accent (anodised blue), `--cad` is the dimension grey and `--paper` is the page.

| Token | Role | Light | Dark |
| --- | --- | --- | --- |
| `--paper` | Page: brushed aluminium / graphite | `#e9ecee` | `#14171a` |
| `--paper-2` | Panel: machined plate | `#d8dde1` | `#1e2226` |
| `--sheet` | Drawing sheet, cards | `#f8f9fa` | `#1a1e21` |
| `--tint` | Pale anodised-blue panel (results band, highlights) | `#dde5f3` | `#1b2230` |
| `--ink` | Graphite text and lines | `#15181b` | `#e8ebee` |
| `--ink-2` | Secondary text | `#4a535c` | `#a9b2ba` |
| `--red` / `--red-text` | Anodised blue: links, highlights, drawing accents | `#1b4fd8` | `#7ea6ff` |
| `--cad` | Dimension lines | `#5b6670` | `#8d98a3` |
| `--pencil` | Sketch strokes | `#7d8791` | `#6f7a85` |
| `--line` | Rules and borders | `#b4bcc3` | `#353c43` |
| `--signal` | Revision marks, the lead result number in dark mode | `#1b4fd8` (blue) | `#ffd200` (yellow) |
| `--field` | Safety yellow, for hazard stripes only | `#ffd200` | `#ffd200` |
| `--focus` | Focus ring | `#1b4fd8` | `#ffd200` |

Text pairs pass WCAG AA in both themes: ink on page 15:1, secondary text on page 6.6:1 (light) and 8.4:1 (dark), blue on page 5.6:1 (light) and 7.5:1 (dark).

The CV is a document: it stays black on white in both themes, and in print.

## Type

All three typefaces are SIL Open Font License and self-hosted from `@fontsource`.

- **Big Shoulders Display** (variable): headlines, uppercase, weight 780–860.
- **Atkinson Hyperlegible Next** (variable): body text. It was drawn for legibility, and its zero is slashed.
- **Martian Mono** (variable width): labels, tags, buttons, dates and drawing notes. Inside drawings it runs at 87.5% width. It also replaces the old handwritten notes.

## Rules

1. **Lean on graphite, aluminium and anodised blue.** Blue marks links, the active nav item, the second line of the name, chapter numbers and drawing highlights.
2. **Keep yellow to a few small accents per page.** It is a signal, not a theme.
3. **Yellow only ever sits on graphite or black.** That means hazard stripes, a focus ring in dark mode, a revision mark in dark mode, and the lead result number in dark mode.
4. **Never put dark text on a yellow field.** No yellow buttons, badges, bands or backgrounds.
5. **Never use yellow text on light surfaces.** It fails contrast; use blue or graphite there.
6. **One narrow hazard-stripe edge per page at most.** Today that is the top of the results band.
7. **The results band is a pale anodised-blue panel with big graphite numbers.** The lead number is blue in light mode and yellow in dark mode; the other numbers are blue in dark mode. It is never white text on a dark band.
8. **Labels look like engraved tags.** Martian Mono, uppercase, in a 1 px graphite border.
9. **Buttons are square graphite rectangles or outlines** with mono uppercase labels. Hover adds a blue bar along the bottom edge.
10. **No rounded corners, no drop shadows, no gradients, no glow.**
11. **The background is a tooling-plate dot grid**, never cream or paper texture.
