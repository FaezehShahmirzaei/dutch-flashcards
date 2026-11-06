# spec.md - Dutch Flashcards

## Problem
I am learning Dutch at A2 level and want a quick, fun way to practise everyday-life vocabulary in the browser.

## Why
Paper cards get lost and apps need accounts; I want something that opens in the browser instantly and makes practising feel like a game.

## Word bank
- Dutch A2 words about everyday life (shopping, food, home, work, transport, health, weather). Start with about 150 words.
- No size limit: I can add new words at any time by editing words.js only, without touching the rest of the code.
- Every word has: the Dutch word, its word type, and translations.
- Word types: noun, verb, adjective, adverb, preposition, pronoun, conjunction, other.

## Rounds
- Each round picks 20 random words from the whole word bank, no duplicates.
- A "New round" button starts a new round with a new random selection.

## The card
- Shows the Dutch word, its word type, and a pronunciation button (🔊).

## Multiple choice
- Below the card: 4 answer options, ALWAYS in English.
- 1 correct translation and 3 wrong ones taken from other words in the bank (preferably of the same word type). Options are shuffled, no duplicates.
- After the user picks an option:
  - the correct option turns green; a wrong pick turns red
  - the options cannot be clicked again for this word
  - the card flips to show the translations
  - a "Next" button appears

## Back of the card
- ALWAYS shows the English translation.
- Below it, ONE second language chosen by the user.

## Language setting
- At the top of the page: a dropdown to choose the second language.
- It lists every language found in words.js except English, plus "None" (English only).
- Languages are NOT hard-coded: a new language added to words.js appears automatically.
- Default: Persian (فارسی). The choice is remembered between visits.
- Right-to-left languages (like Persian) display right-to-left.
- If a word has no translation for the chosen language, show "—".

## Score
- At the top of the page: a counter for correct answers and a counter for wrong answers.
- At the end of the round: show the correct / wrong totals and the "New round" button.

## Pronunciation
- The 🔊 button reads the Dutch word aloud with a Dutch voice.
- It works before and after the card is flipped.
- If no Dutch voice is available, show a short message instead of failing.

## Done means
I open index.html, hear the Dutch word with 🔊, pick the correct English option, it turns green, the correct counter goes up by one, and the back of the card shows English and Persian.
