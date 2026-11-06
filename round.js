// Shared round logic - loaded by index.html and test.html.
// Pick n random words from the word bank (Fisher-Yates shuffle).
function pickRound(n) {
  var pool = WORDS.slice();
  for (var i = pool.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
  }
  return pool.slice(0, n);
}
