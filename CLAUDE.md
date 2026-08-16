# Damson Kitchen Web — Claude Code Context

## Project overview

Static marketing and legal website for the Damson Kitchen recipe app. No build step — plain HTML, CSS, and vanilla JS deployed directly.

**Renamed from Zayvori (2026-08-16).** That name went to the investment platform, which now holds `zayvori.com`; the two products were deliberately separated rather than run under one umbrella brand. See the app repo's `CLAUDE.md` for the app-side rename.

## File map

| File | Role |
|------|------|
| `index.html` | Main marketing page — hero, features, philosophy, how-it-works, download CTA |
| `privacy.html` | Privacy Policy (UK GDPR + CCPA) |
| `terms.html` | Terms of Service |
| `delete-account.html` | Data deletion instructions (required by app stores) |
| `styles.css` | All styles — BEM-ish classes, CSS custom properties for brand tokens |
| `script.js` | Mobile nav toggle, scroll fade-in animations, cookie-consent banner |
| `CNAME` | Custom domain: `damsonkitchen.com` |
| `robots.txt` | Allows all crawlers; points to sitemap |
| `sitemap.xml` | Lists all public pages — update `lastmod` and add `<url>` entries whenever pages change |
| `assets/favicon.svg` | The plum mark. Inline SVG, no PNG fallback |
| `assets/screenshot.png` | **Stale** — still shows the pre-rename app in the old coral palette |

## Brand tokens (styles.css)

| Token | Value | Usage |
|-------|-------|-------|
| `--damson` | `#833060` | CTAs, accents, eyebrows. **Exactly the app's `lightColors.primary`** |
| `--damson-dk` | `#6B2750` | Hover / pressed |
| `--stone` | `#F6F1ED` | Warm off-white section bands |
| `--brass` | `#C9A868` | Accent on dark grounds. The app's `darkColors.accent` |
| `--ink` | `#2A2421` | Body text. The app's `lightColors.text` |
| `--plum-deep` | `#3A1B2F` | Dark section bands and the footer |

The primary and accent are the app's *exact* values so site and app read as one product — if `src/theme.ts` changes, change these too.

**Ration the hue**, as the app does: filled buttons and eyebrows carry damson, body copy sits in `--ink-60`. Damson on every heading is the over-saturation that made the previous coral-on-cream look dated.

Fonts: `Playfair Display` (headings) and `Inter` (body), from Google Fonts.

## The wordmark is text, not an image

There is **no logo image file.** The old `zayvori_logo.png` / `zayvori_icon.png` were deleted at the rename. The name itself is the mark — set in the heading face, with an inline SVG plum glyph beside it (`.brandmark`), and the second word in `--damson` via `.nav__logo-text em`.

This is deliberate: it scales cleanly, costs no request, and can't go stale the way a baked-in PNG did. Don't reintroduce a raster logo without a reason.

## Brand voice & philosophy

Damson Kitchen is a **calm, private alternative to social media** for people who love food. There are no accounts and nothing is shared between users — your recipes exist only on your own device, like a personal recipe box.

**Core tone:** Calm, warm, private, simple. Focus on enjoyment, not performance. UK English.

**Prefer language like:**
- "save what you like", "your own collection", "private to you"
- "enjoy cooking", "for yourself and your loved ones"
- "calm", "quiet", "your device, your data"

**Avoid language like:**
- "followers", "engagement", "build your audience", "go viral", "top creators"
- "discover the community", "browse what others made" — there is no cross-user content at all
- any comparison, ranking, or performance language
- "results", "metrics", "grow"

**What the app intentionally does NOT have:**
- Accounts, sign-up, or sign-in
- Any visibility between users — nothing you save is ever seen by anyone else
- Follows, followers, or public profiles
- Comment sections, visible like counts, or an algorithm ranking content
- Any server-side storage of recipes, photos, or notes

If a proposed feature or wording contradicts this philosophy — especially anything implying cross-user discovery or cloud sync — flag it for review rather than implementing it directly.

**One nuance since the rename:** the app *can* now send a single recipe out through the OS share sheet. This is not cross-user sharing and must not be described as social. A recipe the user wrote goes as plain text; an imported one sends only the original link, so attribution stays with whoever wrote it. Nothing is uploaded and no account is involved.

## App capabilities (keep website copy aligned with these)

The companion app (`recipe-app`) is an Expo/React Native app, fully local-only — no backend, no accounts. Accurate feature set:

- **Import recipes** from any URL (food blogs, social media) — paste a link or share directly from another app
- **Paste recipe text** — clipboard import for captions that can't be shared directly (e.g. TikTok)
- **Smart social parsing** — Instagram/TikTok captions, short URLs, JSON-LD and OpenGraph. Imports never carry a photo from the source — only the user's own photos are ever stored
- **Ingredient sections** — recognised on import ("For the pastry") and editable
- **Serving-size scaling** — change the servings and amounts rescale, rendered as kitchen fractions
- **Cook Mode** — full-screen step-by-step, large text, screen stays awake, ingredients in a bottom sheet
- **Meal planner** — one week at a time, Monday to Sunday, with slots and free-text occasions, and a per-meal head count
- **Shopping list** — derived from upcoming planned meals, merged by ingredient and grouped by supermarket aisle. From today forward, never the start of the week
- **Collections** — named groups of recipes
- **Favourites** — heart a recipe; gets its own filter and collection once you have at least one
- **Meal types** — breakfast, lunch, dinner, dessert, snack, drink, baking, side; used for filtering and tile icons
- **Personal notes** — private per-recipe notes, on-device only
- **Share a recipe** — see the nuance above
- **Light / dark / system theme**
- **Export / Import** — bundle the whole library into one backup file via Settings → Data & Backup. We never receive or store it
- **Local storage** — everything on-device via `expo-sqlite` and file storage

Features that do NOT exist (do not add to marketing copy):
- Accounts, sign-up, sign-in, or any user profile
- Search / discovery of other users' recipes, or any cross-user visibility
- Shared or collaborative collections
- Star ratings
- Cloud sync of any kind
- A recipe description field — deliberately retired from the product

## Legal pages — placeholders

`privacy.html` and `terms.html` still contain `[Your Legal Entity Name]`, `[Registered Address]`, and `[Your State]` placeholders. **These must be filled in before the Play Store listing can be published** — Google requires a working privacy policy URL, and a policy naming a placeholder entity is not one.

## Launch state

The app is in **closed alpha** on Android — not yet publicly available. `index.html` reflects this:
- Hero eyebrow: "Early Access — Android"; primary CTA "Become a Tester"
- Nav button: "Join the Beta" → links to `#download`
- Download section: "Help shape Damson Kitchen"

Testing opt-in URL: `https://play.google.com/apps/testing/com.damsonkitchen.app` — **this 404s until the closed testing track is actually live in Play Console.** Both occurrences are marked with an HTML comment.

When the app moves to open / public release, update:
- Hero eyebrow → "Now on Android"
- Hero CTA → "Get it on Google Play" linking to `https://play.google.com/store/apps/details?id=com.damsonkitchen.app`
- Nav button → "Get the App"
- Download h2 → "Now available on Android"
- Both badge links → the Play Store URL above
- iOS is not yet available (no Apple Developer account); add the App Store badge once live

## Known stale items

- **`assets/screenshot.png`** shows the old app in the old palette. It's the `og:image` and the hero phone mock, so it's the first thing a link preview shows.
- **There is no analytics tag at all.** The legacy `G-7WECL7NJNR` (a Zayvori property) was removed 2026-08-16 pending a new one. The cookie-consent block in `script.js` is gated on `typeof gtag === 'function'`, so with no tag present no banner is shown and no cookie is set — paste a gtag snippet back into the page `<head>`s and the banner returns by itself. **Keep that guard**: without it the file throws a `ReferenceError` when no tag is present, which halts the rest of the script and takes the mobile nav and scroll animations down with it.
- **`privacy.html` still describes Google Analytics** (sections on lawful basis and cookies). That's currently over-disclosure rather than a false statement — the policy says cookies are only set after banner consent, and with no tag there is no banner and no cookie. Re-check it when the new property goes in, or trim those passages if analytics is staying off.
- **`abf9c62de6f546c3b885254be5a901a2.txt`** is a site-verification file for the old domain and is almost certainly dead weight now.

## Deployment

Hosted on GitHub Pages — free, handles the custom domain and TLS. Push to `main` deploys automatically via the `CNAME` record.

**Do not move this to the investment VM.** It was considered and rejected: Pages already does the job at no cost, and self-hosting would mean replicating `investment-web`'s deploy script and webhook service for no benefit.
