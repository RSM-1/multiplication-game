// Get elements
const num1El = document.getElementById("num1");
const num2El = document.getElementById("num2");
const operatorEl = document.getElementById("operator");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const answerInput = document.getElementById("answer-input");

const resultArea = document.getElementById("result-area");
const feedbackText = document.getElementById("feedback-text");
const feedbackSubtext = document.getElementById("feedback-subtext");

const scoreCorrectEl = document.getElementById("score-correct");
const scoreIncorrectEl = document.getElementById("score-incorrect");

const historyList = document.getElementById("history-list");

// Operation buttons
const operationBtns = document.querySelectorAll(".operation-btn");

let num1, num2, correctAnswer;
let correctScore = 0;
let incorrectScore = 0;
let currentOperation = "multiply"; // Default operation

// Operation definitions
const operations = {
    add: {
        symbol: "+",
        calculate: (a, b) => a + b,
        generateNumbers: () => {
            const n1 = Math.floor(Math.random() * 20) + 1;
            const n2 = Math.floor(Math.random() * 20) + 1;
            return [n1, n2];
        }
    },
    subtract: {
        symbol: "−",
        calculate: (a, b) => a - b,
        generateNumbers: () => {
            const n1 = Math.floor(Math.random() * 20) + 1;
            const n2 = Math.floor(Math.random() * 20) + 1;
            return n1 > n2 ? [n1, n2] : [n2, n1]; // Ensure positive results
        }
    },
    multiply: {
        symbol: "×",
        calculate: (a, b) => a * b,
        generateNumbers: () => {
            const n1 = Math.floor(Math.random() * 12) + 1;
            const n2 = Math.floor(Math.random() * 12) + 1;
            return [n1, n2];
        }
    },
    divide: {
        symbol: "÷",
        calculate: (a, b) => a / b,
        generateNumbers: () => {
            const divisor = Math.floor(Math.random() * 12) + 1;
            const quotient = Math.floor(Math.random() * 12) + 1;
            return [divisor * quotient, divisor]; // Ensure whole number result
        }
    }
};

// Generate random question
function generateQuestion() {
    const operation = operations[currentOperation];
    [num1, num2] = operation.generateNumbers();
    correctAnswer = operation.calculate(num1, num2);

    num1El.textContent = num1;
    num2El.textContent = num2;
    operatorEl.textContent = operation.symbol;

    answerInput.value = "";
    answerInput.focus();
}

// Add to history
function addToHistory(userAnswer, isCorrect) {
    // Remove "No history yet" message
    if (historyList.children.length === 1 && historyList.textContent.includes("No history yet")) {
        historyList.innerHTML = "";
    }

    const historyItem = document.createElement("div");
    const operation = operations[currentOperation];

    historyItem.className = `p-3 rounded-xl font-bold border-2 ${
        isCorrect ? "bg-green-100 border-green-400 text-green-700" :
                    "bg-red-100 border-red-400 text-red-700"
    }`;

    historyItem.textContent = `${num1} ${operation.symbol} ${num2} = ${userAnswer} ${
        isCorrect ? "✓" : `✗ (Correct: ${correctAnswer})`
    }`;

    historyList.prepend(historyItem);
}

// Handle operation change
operationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // Update selected state
        operationBtns.forEach(b => {
            b.classList.remove("selected", "bg-indigo-100", "border-indigo-600");
            b.classList.add("bg-white", "border-slate-300");
        });

        btn.classList.add("selected", "bg-indigo-100", "border-indigo-600");
        btn.classList.remove("bg-white", "border-slate-300");

        // Change operation and generate new question
        currentOperation = btn.dataset.operation;
        resultArea.classList.add("hidden");
        generateQuestion();
    });
});

// Submit answer
submitBtn.addEventListener("click", () => {
    const userAnswer = parseFloat(answerInput.value);

    if (isNaN(userAnswer)) return;

    // For division, round to 2 decimal places for comparison
    const isCorrect = currentOperation === "divide" 
        ? Math.abs(userAnswer - correctAnswer) < 0.01
        : userAnswer === correctAnswer;

    if (isCorrect) {
        correctScore++;
        scoreCorrectEl.textContent = correctScore;

        feedbackText.textContent = "CORRECT!";
        const operation = operations[currentOperation];
        feedbackSubtext.textContent = `${num1} ${operation.symbol} ${num2} = ${correctAnswer}`;

        addToHistory(userAnswer, true);

    } else {
        incorrectScore++;
        scoreIncorrectEl.textContent = incorrectScore;

        feedbackText.textContent = "INCORRECT!";
        const operation = operations[currentOperation];
        feedbackSubtext.textContent = `${num1} ${operation.symbol} ${num2} = ${correctAnswer}`;

        addToHistory(userAnswer, false);
    }

    resultArea.classList.remove("hidden");
});

// Next question
nextBtn.addEventListener("click", () => {
    resultArea.classList.add("hidden");
    generateQuestion();
});

// Allow Enter key to submit
answerInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        submitBtn.click();
    }
});

// Start game
generateQuestion();
