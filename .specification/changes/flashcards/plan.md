# Plan: Dutch Flashcards

**Files to create (in order)**

1. `.specification/changes/flashcards/plan.md` — this plan
2. `index.html` (project root) — HTML, CSS and JavaScript for the app
3. `words.js` (project root) — the word bank only: a simple JS array of ~150 Dutch–English pairs (a JS file, not JSON, so it loads when index.html is opened directly from disk)

**Steps and checks**

| # | Step | Check that proves it works |
|---|------|-----------------------------|
| 1 | Write `plan.md` | You read it and approve it |
| 2 | Add the page skeleton in `index.html`: header with score area, one card, "I knew it" / "I didn't know it" buttons and a "New round" button — with basic CSS styling | Open `index.html` directly in the browser: you see a styled card showing the first Dutch word, plus the buttons |
| 3 | Create `words.js` with ~150 everyday-life words (shopping, food, home, work, transport, health, weather); load it from `index.html` with `<script src="words.js">` | The page shows a word from the bank; add a test word to `words.js`, reload, and it can appear |
| 4 | Round logic: pick 20 random words from the whole word bank, show one card at a time, click-to-flip between Dutch and English | Click the card: it flips to the English meaning; the next card shows a different word; reload → a different selection of 20 |
| 5 | Wire the buttons: "I knew it" increments the score and advances to the next card; "I didn't know it" advances without scoring | Click "I knew it": score goes from 0 to 1 and the next Dutch word appears |
| 6 | End of round: after the 20th card, show the final score (knew / 20) with a "New round" button that starts a fresh random round | Step through all 20 cards, see the final tally; click "New round" → a new random 20 and the score resets |

**Assumptions**
- ~150 words seeded across the seven themes; more can be added at any time by editing `words.js` only
- Score displays as `knew / 20` for the current round
- No retry pile for words you didn't know
