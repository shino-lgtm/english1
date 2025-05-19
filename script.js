const quizData = [
  {
    question: "搭乗口はどこですか？",
    correct: "Where is the gate?",
    choices: ["Where is the gate?", "Where is the train?", "When do we land?", "How much is it?"]
  },
  {
    question: "搭乗券を見せてください。",
    correct: "Show me your boarding pass, please.",
    choices: ["Do you need help?", "Take a seat.", "This is your passport.", "Show me your boarding pass, please."]
  },
  {
    question: "荷物は何個ありますか？",
    correct: "How many bags do you have?",
    choices: ["Where is your luggage?", "Can I open this?", "Do you have a pen?", "How many bags do you have?"]
  },
  {
    question: "パスポートを見せてください。",
    correct: "May I see your passport?",
    choices: ["Where are you going?", "Is this your bag?", "Please take off your shoes.", "May I see your passport?"]
  },
  {
    question: "乗り継ぎはありますか？",
    correct: "Do you have a connecting flight?",
    choices: ["Where is your gate?", "Do you have a visa?", "Is this your seat?", "Do you have a connecting flight?"]
  },
  {
    question: "搭乗開始は何時ですか？",
    correct: "What time does boarding start?",
    choices: ["Where do I check in?", "Is this my flight?", "Can I get a drink?", "What time does boarding start?"]
  },
  {
    question: "機内持ち込み手荷物です。",
    correct: "This is my carry-on luggage.",
    choices: ["I have no bags.", "This is my passport.", "I need a receipt.", "This is my carry-on luggage."]
  },
  {
    question: "税関申告はありますか？",
    correct: "Do you have anything to declare?",
    choices: ["Do you need help?", "What is your seat number?", "May I see your ticket?", "Do you have anything to declare?"]
  },
  {
    question: "この荷物を預けます。",
    correct: "I'd like to check this bag.",
    choices: ["I’m looking for gate 4.", "This is my carry-on.", "Do you have any drinks?", "I'd like to check this bag."]
  },
  {
    question: "座席は窓側ですか？",
    correct: "Is my seat by the window?",
    choices: ["Do you need assistance?", "How long is the flight?", "May I see your ID?", "Is my seat by the window?"]
  }
];

let current = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const timerEl = document.getElementById("timer");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  nextBtn.disabled = true;
  clearInterval(timer);
  timeLeft = 15;
  updateTimer();
  timer = setInterval(countdown, 1000);

  const q = quizData[current];
  questionEl.textContent = q.question;
  choicesEl.innerHTML = "";

  const shuffled = [...q.choices].sort(() => 0.5 - Math.random());

  shuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(btn, q.correct);
    choicesEl.appendChild(btn);
  });
}

function updateTimer() {
  timerEl.textContent = `残り時間: ${timeLeft}秒`;
}

function countdown() {
  timeLeft--;
  updateTimer();
  if (timeLeft <= 0) {
    clearInterval(timer);
    markIncorrect();
    nextBtn.disabled = false;
  }
}

function selectAnswer(button, correctAnswer) {
  clearInterval(timer);
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
    }
  });

  if (button.textContent === correctAnswer) {
    score++;
  }

  speak(correctAnswer);
  nextBtn.disabled = false;
}

function markIncorrect() {
  const buttons = choicesEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === quizData[current].correct) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("incorrect");
    }
  });
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  speechSynthesis.speak(utterance);
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    scoreEl.textContent = `あなたのスコアは ${score} / ${quizData.length} です`;
  }
});

loadQuestion();
