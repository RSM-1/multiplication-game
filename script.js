// Get elements
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const answerInput = document.getElementById("answer-input");

const resultArea = document.getElementById("result-area");
const feedbackText = document.getElementById("feedback-text");
const feedbackSubtext = document.getElementById("feedback-subtext");

const scoreCorrectEl = document.getElementById("score-correct");
const scoreIncorrectEl = document.getElementById("score-incorrect");

const historyList = document.getElementById("history-list");

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

// Add to history
function addToHistory(userAnswer, isCorrect) {
    // Remove "No history yet" message
    if (historyList.children.length === 1 && historyList.textContent.includes("No history yet")) {
        historyList.innerHTML = "";
    }

    const historyItem = document.createElement("div");

    historyItem.className = `p-3 rounded-xl font-bold border-2 ${
        isCorrect ? "bg-green-100 border-green-400 text-green-700" :
                    "bg-red-100 border-red-400 text-red-700"
    }`;

    historyItem.textContent = `${num1} × ${num2} = ${userAnswer} ${
        isCorrect ? "✓" : `✗ (Correct: ${correctAnswer})`
    }`;

    historyList.prepend(historyItem);
}

// Submit answer
submitBtn.addEventListener("click", () => {
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) return;

    if (userAnswer === correctAnswer) {
        correctScore++;
        scoreCorrectEl.textContent = correctScore;

        feedbackText.textContent = "CORRECT!";
        feedbackSubtext.textContent = `${num1} × ${num2} = ${correctAnswer}`;

        addToHistory(userAnswer, true);

    } else {
        incorrectScore++;
        scoreIncorrectEl.textContent = incorrectScore;

        feedbackText.textContent = "INCORRECT!";
        feedbackSubtext.textContent = `${num1} × ${num2} = ${correctAnswer}`;

        addToHistory(userAnswer, false);
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
