const questions = [
  {
    japanese: "搭乗券を見せてください。",
    english: "Please show me your boarding pass."
  },
  {
    japanese: "パスポートを拝見できますか？",
    english: "May I see your passport?"
  },
  {
    japanese: "チェックインカウンターはどこですか？",
    english: "Where is the checkin counter?"
  },
  {
    japanese: "預け荷物はありますか？",
    english: "Do you have any checked baggage?"
  },
  {
    japanese: "手荷物検査を受けてください。",
    english: "Please go through the security check."
  },
  {
    japanese: "出発ゲートは何番ですか？",
    english: "What is the departure gate number?"
  },
  {
    japanese: "この便は遅れていますか？",
    english: "Is this flight delayed?"
  },
  {
    japanese: "機内持ち込みできますか？",
    english: "Can I carry this on the plane?"
  },
  {
    japanese: "税関申告はありますか？",
    english: "Do you have anything to declare?"
  },
  {
    japanese: "お名前とご搭乗便をお願いします。",
    english: "Your name and flight number please."
  }
];

let currentQuestion = 0;
let score = 0;

const japaneseElement = document.getElementById("japanese");
const answerInput = document.getElementById("answer");
const checkButton = document.getElementById("check");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
}

function showQuestion() {
  const question = questions[currentQuestion];
  japaneseElement.textContent = question.japanese;
  answerInput.value = "";
  feedbackElement.textContent = "";
  speak(question.english); // 自動で英文を読み上げ
}

function checkAnswer() {
  const userAnswer = answerInput.value.trim().toLowerCase();
  const correctAnswer = questions[currentQuestion].english.toLowerCase();

  if (userAnswer === correctAnswer) {
    feedbackElement.textContent = "⭕ 正解！";
    score++;
  } else {
    feedbackElement.textContent = `❌ 不正解。正解: ${questions[currentQuestion].english}`;
  }

  scoreElement.textContent = `スコア: ${score} / ${questions.length}`;
  currentQuestion++;

  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 2000);
  } else {
    setTimeout(() => {
      japaneseElement.textContent = "🎉 ドリル終了！";
      answerInput.style.display = "none";
      checkButton.style.display = "none";
    }, 2000);
  }
}

checkButton.addEventListener("click", checkAnswer);

showQuestion();
