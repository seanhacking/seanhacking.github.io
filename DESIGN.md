# Design: "Sheet 1 of 8"

## Concept

The site is an engineering drawing that comes alive. Every page is a sheet on a drafting table: a faint grid, a border with zone marks, a title block in the corner. Illustrations start as a wobbly pencil sketch, the crisp CAD lines draw in over them, and then the mechanism runs. That is Sean's story in one move: rough sketch, tested prototype, production.

The visual identity is **Shop Floor** (see `STYLE-GUIDE.md`): graphite on brushed aluminium in light mode, aluminium on graphite in dark mode, anodised blue as the accent, and safety yellow only as a rare signal on graphite. The page background is a tooling-plate dot grid.

The home page is told as seven chapters on one running belt: a toothed belt runs down the page and turns a small pulley at each chapter as you scroll.

## Palette and type

See `STYLE-GUIDE.md`. Big Shoulders Display for headlines, Atkinson Hyperlegible Next for body text, Martian Mono for labels and drawing notes.

## Motion principles

1. **Sketch, then line, then run.** Intros draw the pencil sketch, then the CAD lines, then start the mechanism. One-shot, under five seconds.
2. **Mechanically honest.** Pulleys turn at speeds that match the belt (rotation period = 2πr / belt speed). Belts run in the direction the pulleys turn.
3. **Only while seen.** Illustrations start when they scroll into view and loops pause off-screen.
4. **Never in the way of reading.** Text never animates in; only drawings move.
5. **Respect the visitor.** `prefers-reduced-motion: reduce`, the header's Motion switch, no JavaScript, and print all show the finished drawing, still. Every drawing is complete and beautiful at rest.

## Chapters (home page)

| # | Stage | Chapter | Drawing |
| --- | --- | --- | --- |
| 01 | Build | Cambrian Genomics: liquid-handling robots for synthetic DNA | Pipette gantry stepping across a well plate, wells filling |
| 02 | Invent | Veer: Split Belt Pro and V-Link, Eurobike Startup Award | An open belt closes at the splice, then runs |
| 03 | Test | The log-splitter test rig, 20,000-mile belt | Ram cycling on a specimen, the load trace drawing |
| 04 | Patent | SHIFT: shifts under load without a clutch | Ratio steps while the load line stays continuous |
| 05 | Automate | LinkBot: belt install from 10 minutes to under 30 s | Press stamping rivets into a splice, timer |
| 06 | Prototype | Form Robotics and LavaLock | End mill tracing a toolpath on held stock |
| 07 | Fly | Zipline Dropbox: 9 flight-tested prototypes | Drone lowers a package into the kiosk |

Then: the results band (dimension callouts), selected projects, writing, and "Working together".

## Project pages

Each project gets its own animated drawing in the hero, a title block (role, period, tags), the write-up, and a "How it works" diagram built only from what the write-up says. Drawings of Zipline and SHIFT are marked as illustrations, not the real design.

## Photo slots

Real photos go in `public/media/projects/<slug>/` and appear automatically (see README). Until then, preview and dev builds show a sketched placeholder frame; the live site shows nothing in its place.
