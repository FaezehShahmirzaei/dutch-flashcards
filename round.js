// Shared round logic - loaded by index.html and test.html.

// Fisher-Yates shuffle, returns a new array.
function shuffle(list) {
  var out = list.slice();
  for (var i = out.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = out[i]; out[i] = out[j]; out[j] = tmp;
  }
  return out;
}

// Pick n random words from the word bank (Fisher-Yates shuffle).
function pickRound(n) {
  var pool = WORDS.slice();
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n);
}

// 4 unique English options: the right answer plus 3 wrong ones
// taken from other words, preferring the same word type. Shuffled.
function buildOptions(word) {
  var answer = String(word.translations.en || "");
  var sameType = [];
  var others = [];

  for (var i = 0; i < WORDS.length; i++) {
    var other = WORDS[i];
    if (other.nl === word.nl) continue;                 // not its own answer
    var en = String(other.translations.en || "");
    if (!en || en === answer) continue;                 // unique options only
    if (other.type === word.type) sameType.push(en);
    else others.push(en);
  }

  var pool = shuffle(sameType).concat(shuffle(others));
  var wrong = [];
  for (var k = 0; k < pool.length && wrong.length < 3; k++) {
    if (wrong.indexOf(pool[k]) === -1) wrong.push(pool[k]);
  }

  return shuffle([answer].concat(wrong));
}

// Did the picked option give the right English answer?
function checkAnswer(word, picked) {
  return String(picked) === String(word.translations.en);
}

// Correct / wrong counters for the current round (shared with test.html)
var counters = { correct: 0, wrong: 0 };

function resetCounters() {
  counters.correct = 0;
  counters.wrong = 0;
}

// One answer counted: correct goes to the correct counter, otherwise wrong
function recordAnswer(correct) {
  if (correct) counters.correct++;
  else counters.wrong++;
}
