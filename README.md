# 🃏 Dutch Flashcards — built with an AI coding agent, spec-first

A small browser app for practising **Dutch A2 vocabulary** about everyday life, built step by step with a free AI coding agent ([OpenCode](https://opencode.ai)) using **Spec-Driven Development (SDD)**.

The app itself is simple. The point of the project is the **method**: every decision (intent → spec → plan → tasks) is written down *before* a single line of code exists, and only then does the agent write the code.

> Based on the [GroningenPHP Spec-Driven Development workshop](https://groningenphp.nl/workshops/spec-driven/), adapted to a smaller, no-install project.

---

## ✨ What the app does

- Shows one Dutch word per card; click the card to flip it and see the English meaning
- Two buttons: **"I knew it"** and **"I didn't know it"**
- Score for each round (`knew / 20`)
- Each round picks **20 random words** from the whole word bank
- **"New round"** starts a new round with a fresh random selection
- **Unlimited word bank**: add new words at any time by editing `words.js` only
- Runs directly in the browser: no server, no frameworks, no build tools

---

## 📁 Project structure

```
sdd-workshop/
├── agents.md                          # Project rules the agent reads every session
├── index.html                         # The app (HTML + CSS + JavaScript)
├── words.js                           # The word bank (~150 words to start, no limit)
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

1. Clone or download this repository.
2. Double-click `index.html` to open it in your browser.
3. Click the card, answer honestly, and watch your score.

To check the word bank and app logic, open `test.html`. Every rule should show **PASS** in green.

### Adding your own words

Open `words.js` in any text editor and add a new line inside the list, following the format of the existing entries, for example:

```js
{ nl: "de fiets", en: "the bicycle" },
```

Save the file and refresh the browser (`F5`). No other file needs to change.

---

## 🛠️ How to build it yourself, step by step

### Part A — Setup (≈15 min, free, no paid subscription)

You need two things: a **coding agent** (runs in your terminal) and a **model** (the brain it talks to).

#### 1. Install OpenCode

**Windows (PowerShell)** — one of:

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

*Optional:* the file-tree plugin (it may fail to load on Windows; the project works fine without it):

```bash
opencode plugin --global opencode-file-tree
```

> ⚠️ Commands like the one above are typed in **PowerShell / your terminal**, not in the OpenCode chat box. The chat box is for talking to the AI.

#### 2. Connect a free model

Start OpenCode, type `/models`, and choose a free model, for example **MiMo V2.6 Flash Free**. No API key is needed.

Alternatives: GitHub Copilot (`/connect`) or a local model via [Ollama](https://ollama.com).

#### 3. Readiness check

```bash
mkdir sdd-workshop
cd sdd-workshop
opencode
```

Then send:

```
Say hello and tell me which model you are.
```

✅ You're ready when the agent replies.

#### Two modes you will use

| Mode | What it does | Switch with |
|------|--------------|-------------|
| **Plan** | The agent thinks and plans, but cannot write code | `Shift + Tab` (or `Tab` in some versions) |
| **Build** | The agent can create and edit files | `Shift + Tab` |

The current mode is shown in purple under the input box.

---

### Part B — Before code: you decide (steps 1–4)

#### Step 1 · Intent and project rules → `agents.md`

Can you describe the app in one sentence?
*"A flashcard app to practise Dutch A2 vocabulary in the browser."*

Paste into OpenCode (Build mode):

```
Create an agents.md file at the root of this folder with these project rules:
- A single-page web app: one index.html file with plain HTML, CSS and JavaScript
- No frameworks, no build tools, no installs - it must open directly in the browser
- Keep the code simple and readable, with short comments
- Specification files live in /.specification/changes/flashcards/
- Always read spec.md, plan.md and tasks.md before starting work
- Do not write any code until the user approves the plan
```

✅ **Checkpoint:** `agents.md` exists. (`spec.md`, `plan.md` and `tasks.md` don't exist yet; each one is created in its own step.)

#### Step 2 · Spec: what and why → `spec.md`

```
Create the file .specification/changes/flashcards/spec.md with this content,
then help me sharpen it by asking me up to 3 questions. Do NOT write any code.

# spec.md - Dutch Flashcards

## Problem
I am learning Dutch at A2 level and want a quick way to practise vocabulary.

## Why
Paper cards get lost and apps need accounts; I want something that opens in the browser instantly.

## Boundaries
- About 20 Dutch A2 words with their English meaning, provided up front
- Show one card at a time with the Dutch word
- Click the card to flip it and see the meaning
- Two buttons: "I knew it" and "I didn't know it"
- A score shows how many words I knew

## Done means
I open index.html, flip a card, click "I knew it", and the score goes up by one.
```

✅ **Checkpoint:** `spec.md` contains only *what* and *why*, no implementation details.

#### Step 3 · Plan: how → `plan.md`

Switch to **Plan** mode and paste:

```
We're building the app described in .specification/changes/flashcards/spec.md.
Follow the rules in agents.md. Stay in plan mode and do NOT write code yet.

Write a plan for .specification/changes/flashcards/plan.md:
- which files to create, in what order
- for each step, a simple check that proves it works
  (for example: "open index.html in the browser and see the first card")
Keep it small: one index.html with HTML, CSS and JavaScript is enough.
Show me the plan here first.
```

**Review the plan**, the most important moment of the method. Ask yourself:

- Does it cover everything in the spec?
- Is it still simple (one or two files, nothing to install)?
- Does every step have a check?

Changing your mind here costs one sentence; after the code is written it costs a rewrite.

Once you approve it, switch back to **Build** mode and save it:

```
I approve this plan. Save it exactly as written to
.specification/changes/flashcards/plan.md
Only create this file. Do NOT write any code yet.
```

#### Step 4 · Tasks: units of work → `tasks.md`

```
Read plan.md and break it into small, ordered tasks.
Save them as a checklist in .specification/changes/flashcards/tasks.md
Each task must be small and checkable on its own, for example:
- [ ] word list with 20 Dutch A2 words exists
- [ ] index.html shows the first card in the browser
- [ ] clicking the card flips it to show the meaning
- [ ] "I knew it" button increases the score by one
Only create this file. Do NOT write any code yet.
```

✅ **Checkpoint:** `spec.md`, `plan.md` and `tasks.md` exist, and **no code has been written yet**.

#### 🔁 Changing requirements before code: the cheap moment

During the project I wanted an unlimited word bank with random rounds instead of 20 fixed words. Because no code existed yet, the change only touched the spec files:

```
I want to change the requirements. Update the specification files, do NOT write any code.

1. In spec.md, replace the word list requirement with:
   - A word bank of Dutch A2 words about everyday life
     (shopping, food, home, work, transport, health, weather), each with its English meaning
   - The word bank has no size limit: I must be able to add new words at any time
     by editing one simple file, without touching the rest of the code
   - Start the word bank with about 150 words
   - Each practice round picks 20 random words from the whole word bank
   - A "New round" button starts a new round with a new random selection

2. Update plan.md to match the new spec.
   Keep the words in a separate file called words.js
   (not JSON, so the app still works when index.html is opened directly from disk).

3. Update tasks.md to match the new plan
   (or create it if it does not exist yet).

Show me what changed in each file.
```

> 💡 Why `words.js` and not `words.json`? Browsers block reading local JSON files when a page is opened directly from disk (`file://`). A `.js` file loaded with a `<script>` tag works everywhere.

---

### Part C — After code: agent writes, a check gates it, a human reads it (steps 5–7)

#### Step 5 · Implement, one task at a time

```
Go ahead and implement tasks.md, ONE task at a time.
After each task:
- tick its checkbox in tasks.md
- tell me how to check it in the browser
- then STOP and wait for my "next" before starting the next task.
```

After each task, open `index.html` in the browser (or refresh with `F5`), check the result, and type `next`.

✅ **Checkpoint (MVP):** open the app, flip a card, click "I knew it", and the score goes up by one.

#### Step 6 · Verify with a real check, not a polite sentence

A rule written as prose in the spec ("please don't leave meanings empty") is weak. A **test that turns red** when the rule is broken is real.

```
Add a test page called test.html that I can open directly in the browser.
It must check these rules and show each one as PASS (green) or FAIL (red):
1. Every entry in words.js has a non-empty Dutch word and a non-empty English meaning.
2. There are no duplicate Dutch words in words.js.
3. A new round always has exactly 20 words, with no duplicates.
Keep the round logic in one function so the test can call it.
Do not change how the app looks or works.
```

✅ **Checkpoint:** all checks are green. Then temporarily delete one meaning in `words.js`, refresh `test.html`, and confirm it turns **red**. Restore it afterwards.

#### Step 7 · Human review

Read the result and compare it with your artifacts:

- Rules in `agents.md` followed?
- Intent of `spec.md` preserved?
- All boxes in `tasks.md` ticked?
- `test.html` green?

If the plan turns out to be wrong somewhere, fix it in `plan.md` first, then let the agent redo that step. Finally, record what's done and what isn't:

```markdown
## Done
- Flip cards, score, 20 random words per round, "New round", unlimited word bank, tests

## Not done, and why
- Adding words from inside the app: kept out of scope to stay simple
```

---

## 💡 Ideas for next steps

Add each one as a new spec requirement and plan step first, to keep practising the loop:

- Repeat the words you didn't know at the end of the round
- Choose a category (shopping, food, work…) before a round
- Reverse mode: English → Dutch
- Remember progress between sessions (`localStorage`)
- Add new words from inside the app

---

## 🧠 What I learned

> Simple tasks need a prompt. Complex ones need a spec.

Writing down intent, spec, plan and tasks before coding made every review short, and a change of requirements (fixed list → unlimited random word bank) cost a few lines of Markdown instead of a rewrite.

---

## 🙏 Credits

- Method and workshop: [GroningenPHP — Spec-Driven Development](https://groningenphp.nl/workshops/spec-driven/)
- Coding agent: [OpenCode](https://opencode.ai)
- Model: MiMo V2.6 Flash Free (via OpenCode)
