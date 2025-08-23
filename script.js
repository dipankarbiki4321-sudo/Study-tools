// Navigation
function showTool(id) {
  document.querySelectorAll(".tool").forEach(tool => tool.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// Word Counter
function countWords() {
  let text = document.getElementById("wcInput").value.trim();
  let words = text.split(/\s+/).filter(w => w.length > 0).length;
  let chars = text.length;
  document.getElementById("wcResult").innerText = `Words: ${words} | Characters: ${chars}`;
}

// GPA Calculator
function calcGPA() {
  let grade = parseFloat(document.getElementById("gpaGrades").value);
  let credits = parseFloat(document.getElementById("gpaCredits").value);
  if (!grade || !credits) {
    document.getElementById("gpaResult").innerText = "⚠️ Enter values!";
    return;
  }
  let gpa = (grade / credits).toFixed(2);
  document.getElementById("gpaResult").innerText = `Your GPA: ${gpa}`;
}

// Study Timer
let timer;
function startTimer() {
  let minutes = parseInt(document.getElementById("timeMinutes").value);
  let display = document.getElementById("timerDisplay");
  if (!minutes || minutes <= 0) {
    display.innerText = "⚠️ Enter valid minutes!";
    return;
  }
  let seconds = minutes * 60;
  clearInterval(timer);
  timer = setInterval(() => {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    display.innerText = `${m}:${s < 10 ? "0" : ""}${s}`;
    if (seconds-- <= 0) {
      clearInterval(timer);
      display.innerText = "✅ Time's up!";
    }
  }, 1000);
}

// Dictionary (Online + Offline)
let dictionary = {
  "study": "The devotion of time and attention to learning.",
  "exam": "A formal test of a person's knowledge or proficiency.",
  "focus": "The center of interest or activity."
};

async function searchDictionary() {
  let word = document.getElementById("dictWord").value.toLowerCase().trim();
  let resultBox = document.getElementById("dictResult");

  if (!word) {
    resultBox.innerText = "⚠️ Please enter a word.";
    return;
  }

  // Try online API
  try {
    let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (response.ok) {
      let data = await response.json();
      let meaning = data[0].meanings[0].definitions[0].definition;
      resultBox.innerText = "🌍 Online: " + meaning;
      return;
    }
  } catch (error) {
    console.log("No internet or API error, using offline dictionary.");
  }

  // Offline fallback
  let meaning = dictionary[word] || "❌ Word not found in offline dictionary.";
  resultBox.innerText = "📦 Offline: " + meaning;
}

// Flashcards
let flashcards = [];
function addFlashcard() {
  let q = document.getElementById("flashQ").value.trim();
  let a = document.getElementById("flashA").value.trim();
  if (!q || !a) return;
  flashcards.push({q, a});
  let li = document.createElement("li");
  li.innerText = `Q: ${q} | A: ${a}`;
  document.getElementById("flashList").appendChild(li);
  document.getElementById("flashQ").value = "";
  document.getElementById("flashA").value = "";
}

// Quiz Generator
let quiz = [];
function addQuiz() {
  let q = document.getElementById("quizQ").value.trim();
  let a = document.getElementById("quizA").value.trim();
  if (!q || !a) return;
  quiz.push({q, a});
  document.getElementById("quizQ").value = "";
  document.getElementById("quizA").value = "";
}

function takeQuiz() {
  let area = document.getElementById("quizArea");
  area.innerHTML = "";
  quiz.forEach((item, i) => {
    let div = document.createElement("div");
    div.innerHTML = `<p>${i+1}. ${item.q}</p>
                     <input type="text" id="ans${i}" placeholder="Your answer"> 
                     <button onclick="checkAnswer(${i})">Check</button>
                     <p id="res${i}"></p>`;
    area.appendChild(div);
  });
}

function checkAnswer(i) {
  let userAns = document.getElementById("ans"+i).value.trim().toLowerCase();
  let correct = quiz[i].a.toLowerCase();
  document.getElementById("res"+i).innerText = userAns === correct ? "✅ Correct!" : "❌ Wrong! Correct: " + quiz[i].a;
}


---