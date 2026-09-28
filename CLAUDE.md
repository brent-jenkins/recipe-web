# Damson Kitchen Web — Claude Code Context

## Project overview

Static marketing and legal website for the Damson Kitchen recipe app. No build step — plain HTML, CSS, and vanilla JS deployed directly.

**Renamed from Zayvori (2026-08-16).** That name went to the investment platform, which now holds `zayvori.com`; the two products were deliberately separated rather than run under one umbrella brand. See the app repo's `CLAUDE.md` for the app-side rename.

## File map

| File | Role |
|------|------|
| `index.html` | Main marketing page — hero, features, philosophy, how-it-works, download CTA |
| `help.html` | **Guides & Help** — the app's own Settings → Guides & Help opens this. One page, anchored sections, indexed by `.guide-index` at the top |
| `privacy.html` | Privacy Policy (UK GDPR + CCPA) |
| `terms.html` | Terms of Service |
| `delete-account.html` | A redirect to `privacy.html#your-data`, kept only so old links work. There are no accounts, so Play asks for no deletion URL |
| `styles.css` | All styles — BEM-ish classes, CSS custom properties for brand tokens |
| `script.js` | Mobile nav toggle and scroll fade-in animations |
| `CNAME` | Custom domain: `damsonkitchen.com` |
| `robots.txt` | Allows all crawlers; points to sitemap |
| `sitemap.xml` | Lists all public pages — update `lastmod` and add `<url>` entries whenever pages change |
| `assets/favicon.svg` | The plum mark. Inline SVG, no PNG fallback |
| `assets/og-image.png` | Link-preview image (`og:image`, `twitter:image`, and the JSON-LD `screenshot`). The Play feature graphic, so it is already 1024×500 landscape |
| `es/*.html` | The Spanish site: a twin of every page above, in the Spanish of Spain. See "The Spanish site" |
| `assets/shots/*.png` | Real phone screenshots of the current app — used by the hero `.shot-stack`, the gallery strip, and `help.html`'s `.guide-figure` |

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

Fonts: `Playfair Display` (headings) and `Inter` (body), **self-hosted** in `assets/fonts/` as variable Latin-subset woff2 files declared at the top of `styles.css` (SIL Open Font License). Don't go back to `fonts.googleapis.com`: it sends every visitor's IP address to Google, which the privacy policy says doesn't happen.

## The wordmark is text, not an image

There is **no logo image file.** The old `zayvori_logo.png` / `zayvori_icon.png` were deleted at the rename. The name itself is the mark — set in the heading face, with an inline SVG plum glyph beside it (`.brandmark`), and the second word in `--damson` via `.nav__logo-text em`.

This is deliberate: it scales cleanly, costs no request, and can't go stale the way a baked-in PNG did. Don't reintroduce a raster logo without a reason.

**The plum glyph is shared verbatim with the app** (`recipe-app/assets/icon-source.svg`, from which its launcher icons are rendered). Site and app are the same mark, not two drawings that resemble each other — change one and change both, then re-render the app's PNGs.

It appears in three colourways, and the differences are deliberate rather than drift:

| Where | Fruit | Leaf | Why |
|---|---|---|---|
| `favicon.svg` | `--damson` on a stone tile | `#86682F` | Matches the app icon exactly |
| Nav `.brandmark` | `--damson` on white | `#86682F` | Dark brass; the light one washes out on a light ground |
| Footer `.brandmark` | `--stone` on `--plum-deep` | `#C9A868` | A knockout for the dark band — the only place the light brass belongs |

A damson is a dark purple plum, so **the fruit carries the hue and the ground stays light** everywhere except the footer knockout. An earlier draft had it inverted and read as a negative.

## Brand voice & philosophy

Damson Kitchen is **a recipe book you own, not a service you rent.** Everything lives on the user's own phone: no account, no subscription, no server holding the collection — which is why it works with no signal, and why nobody can take it away or start charging for it later.

**This positioning replaced an earlier one (2026-08-16), and the reason matters.** The site used to lead with "a calm, private alternative to social media". That framing was a reaction to the *previous* version of the app, which had a cross-user feed to be an alternative *to*. With that gone, the copy was arguing against something that no longer exists, and asking readers to feel overwhelmed before the pitch could land. The ownership story is concrete, checkable, and differentiates against the actual competition — which is overwhelmingly cloud-based and subscription-funded.

**"No feed, no algorithm" survives as one supporting point, not the headline.** It's still true and still worth saying; it just isn't the reason someone chooses this app.

**"No subscription" is a durable claim, so use it freely.** The planned monetisation is a one-off unlock, not a recurring charge — the claim stays true after it ships.

**Core tone:** Warm, plain, practical. Focus on cooking and on ownership, not on performance or on what the app refuses to be. US English (see the app repo's CLAUDE.md for why).

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
- **Ingredient sections** — recognized on import ("For the pastry") and editable
- **Serving-size scaling** — change the servings and amounts rescale, rendered as kitchen fractions
- **Cook Mode** — full-screen step-by-step, large text, screen stays awake, ingredients in a bottom sheet
- **Meal planner** — one week at a time, Monday to Sunday, with slots and free-text occasions, and a per-meal head count
- **Shopping list** — derived from upcoming planned meals, merged by ingredient and grouped by supermarket aisle. From today forward, never the start of the week
- **Collections** — named groups of recipes
- **Favorites** — heart a recipe; gets its own filter and collection once you have at least one
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

## Legal pages

The `[Your Legal Entity Name]` / `[Registered Address]` / `[Your State]` placeholders are **filled in** — the pages now name an independent UK individual developer trading as Damson Kitchen, with no company behind it, contactable at `hello@damsonkitchen.com`. Google requires a working privacy policy URL and would not accept one naming a placeholder entity, so this had to be settled before the listing.

**A registered address becomes unavoidable at monetisation, not before.** Trader status under the EU DSA is what forces a published name and address, and it is triggered by charging — so the current free, purchase-free app can be declared non-trader. The moment the one-off unlock ships, that changes and the address goes on the listing. Worth arranging a registered-office or virtual address before building the billing flow rather than at the point of shipping it.

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

## No analytics, no cookies, no third parties

**Google Analytics was removed on 2026-09-28**, along with the cookie banner and Google Fonts. The site now makes no third-party requests at all, which is what lets the privacy policy say so in one line — and what keeps the whole legal footprint small: no consent mechanism, no transfer of visitor data to the US, and processing occasional enough (support email only) that an EU GDPR representative is unlikely to be needed.

**Adding any tracker, embed, or externally hosted asset changes the privacy policy**, and probably brings back a consent banner. Weigh that before adding one; Play Console's own install and listing-visit figures cover the numbers that matter.

## Legal pages are deliberately minimal

The privacy policy and terms were cut to about a page each on 2026-09-28, because the app collects nothing. The privacy policy is required by Google Play for every app; the terms are not required by law, and keep only what does real work: *we can't recover your recipes, so back up*, *imported recipes belong to their authors*, *backup files are for your own use*, and *your consumer rights are unaffected*. Keep them short — every added clause is something to translate and have reviewed.

## Known stale items

- **`abf9c62de6f546c3b885254be5a901a2.txt`** is a site-verification file for the old domain and is almost certainly dead weight now.
- **`help.html` describes the app as it stands.** It is the one page that goes stale with a *feature* change rather than a copy change — the app links straight to it from Settings, so a guide describing something that moved is worse than no guide. Check it whenever a screen changes shape.

The two duplicated `assets/screenshot.png` entries that used to sit here are gone: that file was deleted when the real screenshots landed in `assets/shots/`, and `og:image` now points at `assets/og-image.png`.

## The Spanish site

`es/` holds a Spanish twin of every page — `index`, `help`, `privacy`, `terms`, and the `delete-account` redirect. It went up with the app release that translated the app's own screens; before that the site only said the app *read* Spanish recipes.

- **Spanish-speaking visitors are redirected on arrival**, by a small inline script in the head of the English pages: only when the browser's *first* language is Spanish, only when arriving from outside the site (so clicking "English" is always respected), and never with `?lang=en`. It reads the referrer rather than storing a choice, so the privacy policy's no-cookies/no-storage line stays true. Googlebot crawls in English and is never redirected; the hreflang tags do the search-side work.
- **Every page names its twin**: `hreflang` alternates (`en`, `es`, and `x-default` → English) in the head, a globe + `ES`/`EN` pill (`.nav__lang-toggle`) in the header, and a link in the footer's bottom line. The pill sits **outside** `.nav__links` so it stays visible on phones, where the menu collapses; it names the other language, so two languages is one tap — switch to a dropdown at three. `sitemap.xml` lists both with `xhtml:link` alternates. Add a page, add its twin to all of these.
- **`es/` pages reference shared files with `../`** (`../styles.css`, `../assets/…`, `../script.js`); links between Spanish pages stay relative, links to the home sections are absolute (`/es/#features`).
- **`help.html`'s anchors are the same in both** (`#adding`, `#cooking`, …) and must never be translated: the app deep-links to them, and opens `/es/help.html` when it is shown in Spanish.
- **The legal pages are short translations, and say so**: each notes that the English version prevails, *without affecting consumer-law rights*. Both languages name the ICO and the AEPD. `es/delete-account.html` is a redirect, like its English twin, and neither is in the sitemap. **Not reviewed by a lawyer.**
- **Spanish pages use `assets/shots-es/`** — the Spanish app with the Spanish demo library, same filenames and 720×1280 palette PNGs as `assets/shots/`. They are scaled from the app repo's `store/Phone-es/`, which is how to regenerate them.
- Tone is Spain's Spanish with the informal "tú", matching the app. Guillemets («») rather than curly quotes, as Spanish typography prefers.

## Deployment

Hosted on GitHub Pages — free, handles the custom domain and TLS. Push to `main` deploys automatically via the `CNAME` record.

**Do not move this to the investment VM.** It was considered and rejected: Pages already does the job at no cost, and self-hosting would mean replicating `investment-web`'s deploy script and webhook service for no benefit.
