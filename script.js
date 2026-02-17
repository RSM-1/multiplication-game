// Get elements
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const answerInput = document.getElementById("answer-input");

const resultArea = document.getElementById("result-area");
const questionArea = document.getElementById("input-container");

const feedbackText = document.getElementById("feedback-text");
const feedbackSubtext = document.getElementById("feedback-subtext");

const scoreCorrectEl = document.getElementById("score-correct");
const scoreIncorrectEl = document.getElementById("score-incorrect");

let num1, num2, correctAnswer;
let correctScore = 0;
let incorrectScore = 0;

// Generate random question
function generateQuestion() {
    num1 = Math.floor(Math.random() * 12) + 1;
    num2 = Math.floor(Math.random() * 12) + 1;
    correctAnswer = num1 * num2;

    num1El.textContent = num1;
    num2El.textContent = num2;

    answerInput.value = "";
}

// Submit answer
submitBtn.addEventListener("click", () => {
    const userAnswer = parseInt(answerInput.value);

    if (userAnswer === correctAnswer) {
        correctScore++;
        scoreCorrectEl.textContent = correctScore;

        feedbackText.textContent = "CORRECT!";
        feedbackSubtext.textContent = `${num1} × ${num2} = ${correctAnswer}`;
    } else {
        incorrectScore++;
        scoreIncorrectEl.textContent = incorrectScore;

        feedbackText.textContent = "INCORRECT!";
        feedbackSubtext.textContent = `${num1} × ${num2} = ${correctAnswer}`;
    }

    resultArea.classList.remove("hidden");
});

// Next question
nextBtn.addEventListener("click", () => {
    resultArea.classList.add("hidden");
    generateQuestion();
});

// Start game
generateQuestion();
