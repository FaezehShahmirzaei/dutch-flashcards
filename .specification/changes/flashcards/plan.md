# Plan: Dutch Flashcards

## Approach
- Keep it simple: `index.html` (HTML, CSS and JavaScript in one file) + `words.js` + `test.html`. No frameworks, no build tools, no installs — the page must open directly from disk (`file://`).
- The reusable game logic sits in `round.js`, which both `index.html` and `test.html` load, so the tests call exactly the code the app uses.

## Files (in order)
1. `plan.md` — this plan
2. `index.html` — page skeleton, CSS and the UI glue
3. `words.js` — the word bank, a plain JS file and **not** JSON so it works from `file://`. It contains:
   - a `languages` object: code → `{ name, dir }`, e.g.
     `en: { name: "English", dir: "ltr" }, fa: { name: "فارسی", dir: "rtl" }, fr: { name: "Français", dir: "ltr" }`
     — the second-language dropdown is generated from it (every code except `en`, plus a "None" entry), never hard-coded
   - every word entry: `{ nl, type, translations: { en, fa, fr } }`
4. `round.js` — the pure functions: `pickRound`, `buildOptions`, `checkAnswer`
5. `test.html` — the six rules below, each shown as PASS (green) or FAIL (red)

## Steps and checks

| # | Step | Check that proves it works |
|---|------|-----------------------------|
| 1 | Write `plan.md` | You read it and approve it |
| 2 | Page skeleton in `index.html`: correct / wrong counters at the top, language dropdown, one card, answer-option area, "New round" button — with basic CSS | Open `index.html` directly in the browser: you see a styled card with the first Dutch word, the counters, the dropdown and the buttons |
| 3 | Create `words.js`: the `languages` object plus ~150 everyday-life words (shopping, food, home, work, transport, health, weather) as `{ nl, type, translations: { en, fa, fr } }`, Persian and French filled in; load it with `<script src="words.js">` | The page shows a word from the bank; add a test word, reload, and it can appear |
| 4 | `round.js`: `pickRound(n)` picks `n` random words from the whole bank, no duplicates | Call `pickRound(20)` → 20 items with unique `nl` values; test.html rule 4 passes |
| 5 | Card front: Dutch word, its word type and the 🔊 button; clicking the card does nothing (the card flips only after an option is picked, step 7) | Click the card before answering → nothing happens, no answer is revealed; after picking an option the back shows the translations |
| 6 | `buildOptions(word)` in `round.js`: 4 unique English options — the correct translation plus 3 distractors from other words (prefer the same word type) — shuffled | Call it for 10 words → each call returns 4 unique strings, exactly one of them the word's own English translation |
| 7 | Answer handling via `checkAnswer(...)`: correct pick turns green, wrong pick turns red, the options stop responding for this word, the card flips to the translations, a "Next" button appears | Click the right option → green, card flips, Next appears, further clicks do nothing; on another word click a wrong option → only that one turns red |
| 8 | Correct / wrong counters at the top: +1 correct on a correct pick, +1 wrong on a wrong pick | Correct pick → correct counter 0 → 1; wrong pick → wrong counter 0 → 1 |
| 9 | Pronunciation with the browser's built-in `speechSynthesis`, `lang: "nl-NL"`, preferring a Dutch voice, no libraries; works before and after the flip | Click 🔊 → the Dutch word is spoken; it also works on the flipped card |
| 10 | Fallback for pronunciation: if no Dutch voice is available, show a short message instead of failing | Hide/disable Dutch voices → click 🔊 → a short message appears, no console error |
| 11 | Second-language dropdown at the top: every code in `languages` except `en`, plus "None"; default `fa`; the choice saved in `localStorage` inside `try/catch` | Dropdown lists "None", فارسی, Français; pick Français → reload → still Français; add `de` to `languages` → "Deutsch" appears without touching the UI code; storage blocked → the page still works |
| 12 | Card back: always the English translation, below it the chosen second language (nothing extra for "None"); each line takes its `dir` from `languages`; a missing translation shows "—" | Flip with Persian → English then Persian, the Persian line right-to-left; pick "None" → English only; blank one `fa` → that line shows "—" and the page still works |
| 13 | End of round: after the 20th answer show the correct / wrong totals with the "New round" button | Answer all 20 → totals shown; click "New round" → a new random 20 and both counters back to 0 |
| 14 | `test.html`: implement the six rules below | Open `test.html` → all six PASS; blank a `type`, or add a `de` translation without declaring `de` in `languages` → the matching rule turns red |

## test.html rules
1. every entry has a non-empty Dutch word, a valid type and an English translation
2. no duplicate Dutch words
3. every translation key exists in "languages"
4. a round has exactly 20 unique words
5. options are always 4 unique English translations with exactly one correct
6. a correct pick raises the correct counter by one; a wrong pick raises the wrong counter

## Assumptions
- ~150 words seeded across the seven themes; more can be added at any time by editing `words.js` only. A word needs at least `nl`, `type` and `translations.en`; a missing second-language translation renders as "—"
- Distractors are English translations of other words, preferring the same word type, falling back to any other word when the bank has too few of that type
- Option order is random on every card
- Default second language is Persian (فارسی); the choice is remembered between visits, and "None" shows English only
- Round size is 20; the counters show correct / wrong for the current round
- No retry pile for words answered wrongly
