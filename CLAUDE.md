# Zayvori Web — Claude Code Context

## Project overview

Static marketing and legal website for the Zayvori recipe app. No build step — plain HTML, CSS, and vanilla JS deployed directly.

## File map

| File | Role |
|------|------|
| `index.html` | Main marketing page — hero, features, how-it-works, testimonials, download CTA |
| `privacy.html` | Privacy Policy (UK GDPR + CCPA) |
| `terms.html` | Terms of Service |
| `delete-account.html` | Account deletion instructions (required by app stores) |
| `styles.css` | All styles — BEM-ish classes, CSS custom properties for brand tokens |
| `script.js` | Mobile nav toggle and scroll fade-in animations |
| `CNAME` | Custom domain: `zayvori.com` |
| `robots.txt` | Allows all crawlers; points to sitemap |
| `sitemap.xml` | Lists all public pages for search engine discovery — update `lastmod` and add new `<url>` entries whenever pages are added or removed |
| `assets/` | Images: `zayvori_logo.png`, `zayvori_icon.png`, `screenshot.png` |

## Brand tokens (styles.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--coral` | `#E2725B` | CTAs, accents, eyebrows |
| `--cream` | `#FAF2E9` | Section backgrounds, hero |
| `--tan` | `#E7C2A6` | Decorative elements |
| `--dark` | `#4A033B` | Text, footer background |

Fonts: `Playfair Display` (headings) and `Inter` (body), loaded from Google Fonts.

## Brand voice & philosophy

Zayvori is a **calm, private alternative to social media** for people who love food. There are no accounts and nothing is shared between users — your recipes exist only on your own device, like a personal recipe box.

**Core tone:** Calm, warm, private, simple. Focus on enjoyment, not performance.

**Prefer language like:**
- "save what you like", "your own collection", "private to you"
- "enjoy cooking", "for yourself and your loved ones"
- "calm", "quiet", "your device, your data"

**Avoid language like:**
- "followers", "engagement", "build your audience", "go viral", "top creators"
- "discover the community", "shared", "browse what others made" — there is no cross-user content at all
- any comparison, ranking, or performance language
- "results", "metrics", "grow"

**What Zayvori intentionally does NOT have:**
- Accounts, sign-up, or sign-in
- Any sharing or visibility between users — nothing you save is ever seen by anyone else
- Follows, followers, or public profiles
- Comment sections
- Visible like counts or popularity metrics
- An algorithm ranking content
- Any server-side storage of recipes, photos, or notes

If a proposed feature or wording contradicts this philosophy — especially anything implying cross-user sharing, discovery, or cloud sync — flag it for review rather than implementing it directly.

## App capabilities (keep website copy aligned with these)

The companion app (`recipe-app`) is an Expo/React Native recipe app, fully local-only — no backend, no accounts. Accurate feature set:

- **Import recipes** from any URL (food blogs, social media) — paste a link or share directly from another app
- **Paste recipe text** — clipboard import mode for copying recipe captions (e.g. TikTok, recipe cards) that can't be shared directly
- **Smart social parsing** — extracts recipes from Instagram and TikTok captions, handles short URLs and embedded JSON-LD / OpenGraph data. Imports never carry a photo from the source — only the user's own photos are ever stored.
- **Create recipes manually** — title, description, serving size, ingredient sections, steps, photo
- **Ingredient sections** — ingredients can be split into named sections (e.g. For the pastry / For the filling); a single section with no title is the default
- **Serving size** — optional per-recipe serving count (1–10); hidden when set to 0
- **My Recipes** — the app's home screen, listing every recipe stored on the device
- **Collections** — named groups of recipes (e.g. "Weeknight Dinners", "Baking"), on a separate screen from My Recipes
- **Personal notes** — private per-recipe notes, stored only on-device, never synced anywhere
- **Export / Import** — bundle your whole library (recipes, collections, notes, photos) into a single backup file via Settings > Data & Backup, shared via whatever method you choose (AirDrop, email, a cloud drive). Zayvori never receives or stores this file — it's the only way data ever leaves the device.
- **Local storage** — everything (recipes, collections, notes, photos) is stored entirely on-device via `expo-sqlite` and on-device file storage; nothing is uploaded anywhere

Features that do NOT exist (do not add to marketing copy):
- Accounts, sign-up, sign-in, or any user profile
- Search / discovery of other users' recipes, or any cross-user visibility
- Liking/saving other users' content — there are no other users' recipes to see
- Cook Mode / step-by-step reading mode
- Shared / collaborative collections
- Star ratings
- Meal planning
- Profile photos
- Cloud sync of any kind

## Legal pages — placeholders

`privacy.html` and `terms.html` still contain `[Your Legal Entity Name]`, `[Registered Address]`, and `[Your State]` placeholders. Do not remove these — they need to be filled in by the owner before publishing changes.

## Launch state

The app is in **closed alpha** on Android — not yet publicly available. `index.html` reflects this:
- Hero eyebrow: "Early Access — Android"; primary CTA "Become a Tester" links to the Google Play testing opt-in page
- Nav button: "Join the Beta" → links to `#download`
- Download section: "Help shape Zayvori" heading; Google Play badge links to the testing opt-in page

Testing opt-in URL: `https://play.google.com/apps/testing/com.zayvori.app`

When the app moves to open / public release, update:
- Hero eyebrow → "Now on Android"
- Hero CTA → "Get it on Google Play" linking to `https://play.google.com/store/apps/details?id=com.zayvori.app`
- Nav button → "Get the App"
- Download h2 → "Now available on Android"
- Download p → "A calm, personal space for every recipe you love. Free to download, free to use — your collection, your way."
- Both badge links → the Play Store URL above
- iOS is not yet available (no Apple Developer account); add the App Store badge once live

## Deployment

Hosted on GitHub Pages. Push to `main` deploys automatically via the `CNAME` record.
