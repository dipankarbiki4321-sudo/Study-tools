// Show selected tool
function showTool(id) {
  document.querySelectorAll('.tool').forEach(el => el.style.display = "none");
  document.getElementById(id).style.display = "block";
}

// ✅ Word Counter
document.getElementById("wcInput").addEventListener("input", function () {
  let text = this.value.trim();
  let words = text.length > 0 ? text.split(/\s+/).length : 0;
  let chars = text.length;
  document.getElementById("wcResult").innerText = `Words: ${words} | Characters: ${chars}`;
});

// ✅ GPA Calculator
function calcGPA() {
  let input = document.getElementById("grades").value;
  if (!input) return alert("Enter some grades!");
  let grades = input.split(",").map(Number);
  let sum = grades.reduce((a, b) => a + b, 0);
  let gpa = (sum / grades.length).toFixed(2);
  document.getElementById("gpaResult").innerText = `Your GPA: ${gpa}`;
}

// ✅ Study Timer
let timer;
function startTimer() {
  let mins = parseInt(document.getElementById("minutes").value);
  if (isNaN(mins) || mins <= 0) return alert("Enter valid minutes!");
  let seconds = mins * 60;
  timer = setInterval(() => {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    document.getElementById("timeDisplay").innerText = `${m}m ${s}s`;
    if (seconds-- <= 0) {
      clearInterval(timer);
      alert("⏰ Time’s up! Take a break.");
    }
  }, 1000);
}

// ✅ Dictionary (simple offline + fetch online)
async function searchDictionary() {
  let word = document.getElementById("dictWord").value.trim();
  if (!word) return alert("Enter a word!");
  try {
    let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let data = await res.json();
    let meaning = data[0].meanings[0].definitions[0].definition;
    document.getElementById("dictResult").innerText = `👉 ${meaning}`;
  } catch {
    document.getElementById("dictResult").innerText = "⚠️ No meaning found (try online)";
  }
}

// ✅ Flashcards
let flashcards = [];
function addFlashcard() {
  let q = document.getElementById("flashQ").value;
  let a = document.getElementById("flashA").value;
  if (!q || !a) return alert("Enter question and answer!");
  flashcards.push({ q, a });
  displayFlashcards();
}

function displayFlashcards() {
  let list = document.getElementById("flashList");
  list.innerHTML = "";
  flashcards.forEach((f, i) => {
    let card = document.createElement("div");
    card.innerHTML = `<b>Q:</b> ${f.q}<br><b>A:</b> ${f.a}`;
    card.style.marginBottom = "10px";
    card.style.padding = "10px";
    card.style.border = "1px solid #ccc";
    card.style.borderRadius = "5px";
    list.appendChild(card);
  });
}

// ✅ Quiz Generator (basic)
function generateQuiz() {
  let text = document.getElementById("quizText").value.trim();
  if (!text) return alert("Enter some text!");
  let words = text.split(" ");
  let randomWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("quizArea").innerHTML = `What word was in the text? Hint: it starts with <b>${randomWord[0]}</b>`;
}


---