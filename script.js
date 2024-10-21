// Desired answers (your "ideal" answers)
const desiredAnswers = [5, 4, 2, 5, 3];

// Constants for thresholds
const TRUE_LOVE_THRESHOLD = 80;
const FRIENDS_THRESHOLD = 50;

// Function to validate user input
function validateInput(input, errorId) {
    const value = parseInt(input.value);
    const errorMessage = document.getElementById(errorId);

    if (isNaN(value) || value < 1 || value > 5) {
        errorMessage.textContent = "Please select a number between 1 and 5 for this question.";
        return false;
    }
    
    errorMessage.textContent = ""; // Clear error message if valid
    return true;
}

// Function to calculate compatibility score
function calculateScore() {
    let totalScore = 0;
    const userAnswers = [];
    const questionScores = [];
    let isValid = true;

    // Validate and collect user answers
    for (let i = 1; i <= 5; i++) {
        const input = document.getElementById(`q${i}`);
        const isQuestionValid = validateInput(input, `error-q${i}`);
        isValid = isValid && isQuestionValid; // Ensure all questions are valid
        userAnswers.push(parseInt(input.value));
    }

    if (!isValid) {
        return; // Stop if validation fails
    }

    // Calculate compatibility scores for each question
    for (let i = 0; i < 5; i++) {
        const diff = Math.abs(userAnswers[i] - desiredAnswers[i]);
        const questionScore = 5 - diff; // Higher score for closer answers
        questionScores.push(questionScore); // Store individual question scores
        totalScore += questionScore; // Accumulate total score
    }

    // Convert the total score to a percentage (max score is 25)
    const compatibilityScore = Math.floor((totalScore / 25) * 100);
    displayResults(compatibilityScore, questionScores); // Display results
}

// Function to display the results
function displayResults(compatibilityScore, questionScores) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.classList.remove("hidden");

    // Display overall compatibility score
    const scoreElement = document.getElementById("compatibilityScore");
    scoreElement.innerHTML = `Your overall compatibility score is: <strong>${compatibilityScore}%</strong>`;

    const remarksElement = document.getElementById("remarks");

    // Display closing remarks based on thresholds
    if (compatibilityScore >= TRUE_LOVE_THRESHOLD) {
        remarksElement.textContent = "CONGRATULATIONS! You're compatibile ";
    } else if (compatibilityScore >= FRIENDS_THRESHOLD) {
        remarksElement.textContent = "JUST FRIENDS  You'd be better off as friends.";
    } else {
        remarksElement.textContent = "RUN FOR YOUR LIFE! You're not compatible at all.";
    }

    // Display individual question compatibility scores
    const individualScoresDiv = document.getElementById("individualScores");
    individualScoresDiv.innerHTML = "<h3>Question Compatibility Scores:</h3>";
    questionScores.forEach((score, index) => {
        individualScoresDiv.innerHTML += `<p>Question ${index + 1}: ${score}/5</p>`;
    });
}
