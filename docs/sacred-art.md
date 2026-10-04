# Sacred Art development addition

Route: `/sacred-art`. Linked from the main navigation, footer, and a compact feature between the library hero and search section. All gallery assets are local; no API or sign-in is required.

45 photographic panels, not 45 distinct saints. The central photograph includes the Holy Trinity and surrounding sanctuary paintings. Some saints appear in more than one original photograph. The labels name the principal subject in each panel.

## Lettering and sources

Names were reviewed against the inscriptions in the supplied photographs. The previous placeholders were resolved as Prophet Haggai (ነቢዩ ሐጌ), Prophet Ezra (ነቢዩ ዕዝራ), and Archangel Uriel (ቅዱስ ዑራኤል). The two James labels distinguish the sons of Alphaeus and Zebedee in both languages.

Uriel's association with Ezra was additionally cross-checked against the Ethiopian Orthodox Tewahedo Church Sunday School Department, Mahibere Kidusan: https://eotcmk.org/e/archangel-saint-uriel/ . Identification is based on the supplied art and inscriptions, not an independent ecclesiastical certification.

The images are crops of original photographs. The decorative outer border is reused from the user's preferred first generated design. No generated lettering is used for the added name labels. Original painted inscriptions within photographs remain part of the photographs.

`client/src/data/sacred-art.json` holds the website labels. The print master and source register are in the parent workspace's `saints-final` folder. Rebuilding its `build.cjs` regenerates the gallery data, web images, collage, and print PDF together.

Noto Serif Ethiopic is self-hosted under the SIL Open Font License; `OFL.txt` is beside the font. PDF labels are typeset rather than painted into a generated image.

## Print specification and checks

- One landscape page, 24 × 18 inches (1728 × 1296 PDF points).
- Print at actual size, 100%; no bleed or crop marks are included.
- Companion PNG: 7200 × 5400 pixels, equivalent to 300 pixels/inch at the intended size.
- All 45 Amharic and English labels were recovered from PDF text extraction.
- All PDF fonts/glyph definitions embedded; no panel or label overflow.
- Final PDF rasterization visually inspected.
- Website build and changed-file lint passed.
- Browser checks: English search, Amharic search, empty-result recovery, enlarged painting modal, library link, and 390-pixel mobile width without horizontal overflow.

## Illustrated website edition

The featured collection uses `glowing-collection.png`, an AI-redrawn illustration based on the photographic layout and the user's gold-and-burgundy reference. Its 45 added captions are HTML text sourced from the gallery data, with Amharic above English; generated lettering inside the illustration is not an authoritative transcription. Individual gallery panels remain original photographs.

The download remains the original-photo print edition described above. The illustrated website edition is not a verified print master. Changes on main deploy through the production GitHub Actions workflow.
