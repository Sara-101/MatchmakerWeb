// Desired answers (your "ideal" answers)
const desiredAnswers = [5, 4, 2, 5, 3];

// Constants for thresholds
const TRUE_LOVE_THRESHOLD = 80;
const FRIENDS_THRESHOLD = 50;

// Function to validate user input
function validateInput(input) {
    const value = parseInt(input.value);
    if (isNaN(value) || value < 1 || value > 5) {
        alert("Please select a number between 1 and 5 for each question.");
        return false;
    }
    return true;
}

// Function to calculate compatibility score
function calculateScore() {
    let totalScore = 0;
    const userAnswers = [];

    // Validate and collect user answers
    for (let i = 1; i <= 5; i++) {
        const input = document.getElementById(`q${i}`);
        if (!validateInput(input)) {
            return;
        }
        userAnswers.push(parseInt(input.value));
    }

    // Calculate compatibility score
    let questionScores = [];
    for (let i = 0; i < 5; i++) {
        const diff = Math.abs(userAnswers[i] - desiredAnswers[i]);
        const questionScore = 5 - diff; // Higher score for closer answers
        questionScores.push(questionScore);
        totalScore += questionScore;
    }

    const compatibilityScore = Math.floor((totalScore / 25) * 100);
    displayResults(compatibilityScore, questionScores);
}

// Function to display the results
function displayResults(compatibilityScore, questionScores) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.classList.remove("hidden");

    const scoreElement = document.getElementById("compatibilityScore");
    scoreElement.innerHTML = `Your compatibility score is: <strong>${compatibilityScore}%</strong>`;

    const remarksElement = document.getElementById("remarks");

    // Display closing remarks based on thresholds
    if (compatibilityScore >= TRUE_LOVE_THRESHOLD) {
        remarksElement.textContent = "Congratulations! You're a perfect match! ";
    } else if (compatibilityScore >= FRIENDS_THRESHOLD) {
        remarksElement.textContent = "You might be better off as friends.";
    } else {
        remarksElement.textContent = "Run away! You're not compatible at all.";
    }
}
