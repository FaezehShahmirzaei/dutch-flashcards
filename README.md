# 🃏 Dutch Flashcards — built with an AI coding agent, spec-first

A small browser app for practising **Dutch A2 vocabulary** about everyday life, built step by step with a free AI coding agent ([OpenCode](https://opencode.ai)) using **Spec-Driven Development (SDD)**.

🔗 **Live demo:** https://faezehshahmirzaei.github.io/dutch-flashcards/

The app itself is simple. The point of the project is the **method**: every decision (intent → spec → plan → tasks) is written down *before* a single line of code exists, and only then does the agent write the code.

> Based on the [GroningenPHP Spec-Driven Development workshop](https://groningenphp.nl/workshops/spec-driven/), adapted to a smaller, no-install project.

---

## ✨ Features

- **Multiple-choice quiz:** each card shows a Dutch word; pick the right English meaning from 4 options
- **Word type** on every card: noun, verb, adjective, adverb, preposition, pronoun, conjunction, other
- **Pronunciation** 🔊: hear the Dutch word with a Dutch voice (built-in browser speech, no libraries)
- **Instant feedback:** the correct option turns green, a wrong pick turns red, then the card flips
- **Back of the card:** the English translation plus **one second language** of your choice (Persian, French, …), with right-to-left support
- **Score counters** at the top: ✅ correct and ❌ wrong
- **Rounds of 20 random words** from the whole word bank; "New round" starts a fresh selection
- **Unlimited, extendable word bank:** add words, or even whole new languages, by editing `words.js` only
- **Remembers** your language choice between visits
- Runs directly in the browser: no server, no frameworks, no build tools

---

## 📁 Project structure

```
dutch-flashcards/
├── agents.md                          # Project rules the agent reads every session
├── index.html                         # The app: layout, styles and UI
├── round.js                           # Shared logic: pick a round, build options, check answers
├── words.js                           # Languages + word bank (~150 words to start, no limit)
├── test.html                          # Browser-based checks (PASS / FAIL)
└── .specification/
    └── changes/
        └── flashcards/
            ├── spec.md                # WHAT and WHY
            ├── plan.md                # HOW: files, order, and a check per step
            └── tasks.md               # Small, ordered, checkable units of work
```

---

## 🚀 Quick start (just use the app)

1. Open the [live demo](https://faezehshahmirzaei.github.io/dutch-flashcards/), **or** clone this repository and double-click `index.html`.
2. Choose your second language in the dropdown at the top.
3. Press 🔊 to hear the word, pick an answer, and press **Next**.

To check the word bank and app logic, open `test.html`. Every rule should show **PASS** in green.

> 🔊 No sound? The pronunciation uses your browser's built-in voices. Chrome and Edge usually include a Dutch voice. On Windows you can add one under
> **Settings → Time & language → Speech → Add voices → Nederlands**.

---

## ➕ Adding words and languages

All content lives in `words.js`.

### The format

```js
const languages = {
  en: { name: "English",  dir: "ltr" },
  fa: { name: "فارسی",    dir: "rtl" },
  fr: { name: "Français", dir: "ltr" }
};

// one entry per word
{ nl: "de fiets", type: "noun",
  translations: { en: "the bicycle", fa: "دوچرخه", fr: "le vélo" } },
```

### Add a word

Add a new entry to the word list (an English translation is required), save, and refresh the browser (`F5`).

### Add a language

1. Add it to `languages`, for example: `de: { name: "Deutsch", dir: "ltr" },`
2. Add the translations with the same code: `de: "das Fahrrad"`

The new language appears in the dropdown automatically. Words without a translation in that language show "—".
If you use a code that isn't in `languages` (for example a typo), rule 3 in `test.html` turns red.

---

## 🛠️ How to build it yourself, step by step

### Part A — Setup (≈15 min, free, no paid subscription)

You need two things: a **coding agent** (runs in your terminal) and a **model** (the brain it talks to).

#### 1. Install OpenCode

**Windows (PowerShell)**, one of:

```powershell
scoop install opencode
```

```powershell
npm install -g opencode-ai   # needs Node.js 18+
```

**Linux / macOS:**

```bash
curl -fsSL https://opencode.ai/install | bash
```

Restart your terminal, then confirm the installation:

```bash
opencode --version
```

> ⚠️ Commands like these are typed in **PowerShell / your terminal**, not in the OpenCode chat box. The chat box is for talking to the AI.

#### 2. Connect a free model

Start OpenCode, type `/models`, and choose a free model, for example **MiMo V2.6 Flash Free**. No API key is needed.
Alternatives: GitHub Copilot (`/connect`) or a local model via [Ollama](https://ollama.com).

#### 3. Readiness check

```bash
mkdir dutch-flashcards
cd dutch-flashcards
opencode
```

Then send: `Say hello and tell me which model you are.`
✅ You're ready when the agent replies.

#### Two modes you will use

| Mode | What it does | Switch with |
|------|--------------|-------------|
| **Plan** | The agent thinks and plans, but cannot write code | `Shift + Tab` (or `Tab` in some versions) |
| **Build** | The agent can create and edit files | `Shift + Tab` |

Press `Esc` (sometimes twice) to stop the agent mid-task.

---

### Part B — Before code: you decide (steps 1–4)

#### Step 1 · Intent and project rules → `agents.md`

One sentence: *"A multiple-choice flashcard app to practise Dutch A2 vocabulary in the browser."*

```
Create an agents.md file at the root of this folder with these project rules:
- A single-page web app: plain HTML, CSS and JavaScript
- No frameworks, no build tools, no installs - it must open directly in the browser
- Keep the code simple and readable, with short comments
- Specification files live in /.specification/changes/flashcards/
- Always read spec.md, plan.md and tasks.md before starting work
- Do not write any code until the user approves the plan
```

✅ **Checkpoint:** `agents.md` exists. `spec.md`, `plan.md` and `tasks.md` are created in the next steps.

#### Steps 2–4 · Spec, plan and tasks

In **Plan** mode, paste the full specification. This is the final version, after several rounds of changing my mind (see *How the requirements evolved* below):

```
Write spec.md, plan.md and tasks.md in .specification/changes/flashcards/
describing the design below. Do NOT write any code.

=== spec.md (WHAT and WHY) ===

Problem: I am learning Dutch at A2 level and want a quick, fun way to practise
everyday-life vocabulary in the browser.

Word bank
- Dutch A2 words about everyday life (shopping, food, home, work, transport,
  health, weather). Start with about 150 words.
- No size limit: I can add new words at any time by editing words.js only.
- Every word has: the Dutch word, its word type, and translations.
- Word types: noun, verb, adjective, adverb, preposition, pronoun, conjunction, other.

Rounds
- Each round picks 20 random words from the whole word bank, no duplicates.
- A "New round" button starts a new round with a new random selection.

The card
- Shows the Dutch word, its word type, and a pronunciation button (🔊).
- Clicking the card does nothing: it flips only after an option is picked.

Multiple choice
- Below the card: 4 answer options, ALWAYS in English.
- 1 correct translation and 3 wrong ones taken from other words in the bank
  (preferably of the same word type). Options are shuffled, no duplicates.
- After the user picks an option:
  - the correct option turns green; a wrong pick turns red
  - the options cannot be clicked again for this word
  - the card flips to show the translations
  - a "Next" button appears

Back of the card
- ALWAYS shows the English translation.
- Below it, ONE second language chosen by the user.

Language setting
- At the top of the page: a dropdown to choose the second language.
- It lists every language found in words.js except English, plus "None" (English only).
- Languages are NOT hard-coded: a new language added to words.js appears automatically.
- Default: Persian (فارسی). The choice is remembered between visits.
- Right-to-left languages (like Persian) display right-to-left.
- If a word has no translation for the chosen language, show "—".

Score
- At the top of the page: a counter for correct answers and a counter for wrong answers.
- At the end of the round: show the correct / wrong totals and the "New round" button.

Pronunciation
- The 🔊 button reads the Dutch word aloud with a Dutch voice.
- It works before and after the card is flipped.
- If no Dutch voice is available, show a short message instead of failing.

Done means
- I open index.html, hear the Dutch word with 🔊, pick the correct English option,
  it turns green, the correct counter goes up by one, and the back of the card
  shows English and Persian.

=== plan.md (HOW) ===
- Keep it simple: index.html + round.js + words.js + test.html.
  No frameworks, no build tools, must open directly from disk.
- words.js stays a JS file (not JSON) so it works from file://. It contains:
  a) a "languages" object: code -> { name, dir }
  b) every word entry: { nl, type, translations: { en, fa, fr } }
- round.js holds the shared functions: picking a round, building the 4 options,
  checking an answer (so test.html can call them).
- Pronunciation with the browser's built-in speechSynthesis, lang "nl-NL",
  preferring a Dutch voice, no libraries.
- Save the language choice in localStorage, wrapped in try/catch.
- For each step, name a simple check that proves it works.
- test.html shows each rule as PASS (green) or FAIL (red):
  1. every entry has a non-empty Dutch word, a valid type and an English translation
  2. no duplicate Dutch words
  3. every translation key exists in "languages"
  4. a round has exactly 20 unique words
  5. options are always 4 unique English translations with exactly one correct
  6. a correct pick raises the correct counter by one; a wrong pick raises the wrong counter

=== tasks.md ===
- Small, ordered, unticked checkboxes, each checkable on its own.

When done, show me the full spec.md, plan.md and tasks.md.
```

**Review gate:** read all three files before any code exists. In my case, the review caught a real bug: one task said *"click the card to flip it"*, which would reveal the answer before choosing. Fixing it cost one sentence instead of a rewrite.

Then switch to **Build** mode and save:

```
I approve. Save these three files exactly as shown. Do NOT write any code yet.
```

✅ **Checkpoint:** `spec.md`, `plan.md` and `tasks.md` exist, and **no code has been written yet**.

> 💡 Why `words.js` and not `words.json`? Browsers block reading local JSON files when a page is opened directly from disk (`file://`). A `.js` file loaded with a `<script>` tag works everywhere.

---

### Part C — After code: agent writes, a check gates it, a human reads it (steps 5–7)

#### Step 5 · Implement, one task at a time

```
Implement tasks.md ONE task at a time.
After each task, tick it, tell me how to check it in the browser, and wait for my "next".
```

After each task, refresh `index.html` (`F5`), check the result, and type `next`.
If the agent stops halfway through a long task (like generating 150 translated words), type `continue`.

#### Step 6 · Verify with real checks, not polite sentences

A rule written as prose ("please don't leave translations empty") is weak. A **test that turns red** when the rule is broken is real. Open `test.html`: all six rules should be green.
Then break one on purpose (for example, delete an English translation in `words.js`), refresh, and confirm it turns **red**. Restore it afterwards.

#### Step 7 · Human review

Compare the result with your artifacts:

- Rules in `agents.md` followed?
- Intent of `spec.md` preserved?
- All boxes in `tasks.md` ticked?
- `test.html` green?
- Translations correct? (AI-generated Persian and French translations and word types need a human check.)

---

## 🔁 How the requirements evolved, cheaply

Every change below was made **in the spec files before code was touched**, so each one cost a few lines of Markdown:

1. **v1:** 20 fixed words, "I knew it" / "I didn't know it" buttons, flip on click
2. **v2:** unlimited word bank in `words.js`, 20 random words per round
3. **v3:** multiple languages on the back of the card
4. **v4:** multiple choice instead of self-assessment, correct/wrong counters, Dutch pronunciation, word types
5. **v5 (final):** options always in English; English + one chosen second language on the back of the card

> *"Waterfall's flaw was never having a plan. It was waiting months to find out the plan was wrong."* (from the workshop)

---

## 🌐 Publishing on GitHub

```powershell
git init
git add .
git commit -m "Dutch flashcards app built with spec-driven development"
git branch -M main
git remote add origin https://github.com/<your-username>/dutch-flashcards.git
git push -u origin main
```

On the first push, Git for Windows opens the browser to sign in to GitHub, so no manual token is needed.
To publish the app online: **Settings → Pages → Branch: `main`, Folder: `/ (root)`**.

For later changes:

```powershell
git add .
git commit -m "Describe your change"
git push
```

---

## 💡 Ideas for next steps

Add each one as a new spec requirement and plan step first:

- Repeat the words you got wrong at the end of the round
- Choose a category (shopping, food, work…) before a round
- Reverse mode: English → Dutch
- Show the article (de / het) as a separate quiz
- Add new words from inside the app

---

## 🙏 Credits

- Method and workshop: [GroningenPHP — Spec-Driven Development](https://groningenphp.nl/workshops/spec-driven/)
- Coding agent: [OpenCode](https://opencode.ai)
- Model: MiMo V2.6 Flash Free (via OpenCode)
