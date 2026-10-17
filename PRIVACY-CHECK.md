# Privacy check

Every personal detail that appears on the built site (published pages only; draft posts are not built). This list feeds the launch card in the Business Agent Harness. Update it in the same change whenever `src/data/profile.json`, a project or a published post adds or removes a personal detail.

Rules (PLAN decision 43): never phone numbers, street addresses, salary, references, private notes or job-search targeting details; email only if Sean picks one at launch; location at city or region level at most.

Last checked: 2026-10-17, against `dist/` built from `main`.

## Details on the site

Format: `- **Detail**: value. Where.`

- **Name**: Sean Hacking. Every page (header, footer, page titles, OpenGraph tags).
- **Location**: San Francisco Bay Area (region only). Footer of every page, CV, Contact.
- **Email**: none shown. `email` is not set in `src/data/profile.json`; CV and Contact add it automatically once it is.
- **Phone, street address, photo**: none.
- **LinkedIn**: https://www.linkedin.com/in/sean-hacking-b5006618/. Footer, CV, Contact.
- **GitHub**: https://github.com/seanhacking. Footer, CV, Contact.
- **Headline and summary**: mechanical engineer, sketch to tested prototype to production. Home, About, CV, page descriptions.
- **Employment history with dates**: Zipline, Senior Mechanical Engineer, New Products Team (Oct 2025 – Sep 2026); Form Robotics, Founder & Lead Engineer (2024 – 2025); Veer, Founder & CTO (2016 – 2024); Cambrian Genomics, R&D Scientist/Engineer (2014 – 2015). CV, About, Projects. The Zipline end date shows the role ended in September 2026.
- **Education**: B.S. Bioengineering, minor in Bioinformatics, University of California, Santa Cruz, 2014. CV, About (without the year).
- **Company figures (Veer)**: $1.4M revenue, raised $2M, team of 8 (3 mechanical engineers), 4 manufacturing vendors, 10,000+ units to 16 OEMs, 3 international distributors and 43 dealers. CV, About, Veer project page.
- **Zipline work details**: second-generation Dropbox kiosk, Droid/Pod, 9 flight-tested prototypes across 3 generations, >10x package-pickup reliability, ~3x cost reduction, named inventor on a patent application. CV, Zipline project page. Also: Zipline as a Form Robotics customer (motor housings and bulkheads), on the CV and LavaLock page.
- **Patents**: 6+ granted or pending, including international; SHIFT granted in the US and internationally. CV, About, SHIFT page.
- **Awards**: Eurobike Startup Award. CV, Veer project page.
- **Availability**: "I take on mechanical engineering projects…" (About, "Working together"), and the Contact page invites project enquiries. No rates, no target companies, no engagement preferences beyond that.

## Left out on purpose

- Email address (`sean.c.hacking@gmail.com` is in the CV source; not shown).
- Why the Zipline role ended, and anything from the "why he's looking" draft.
- Job-search targeting: target roles, industries, companies to include or exclude (including the Zipline and defence exclusions), remote/part-time/relocation preferences in detail.
- Gross margins (Veer 30–50% OEM and 60–80% direct; Form Robotics 70–80%).
- Salary, references, phone number, street address (none of these are in the sources).

## For Sean to confirm before launch

1. Zipline details (kiosk name, Droid/Pod, reliability and cost figures, patent application) are from your resume. Confirm they are fine to publish publicly.
2. Veer revenue and fundraising figures are fine to publish.
3. The "Working together" paragraph signals you are open to project work. Keep, reword or remove.
4. Which email to show, if any.
