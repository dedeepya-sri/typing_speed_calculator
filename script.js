const sentences = {
    easy: [
        "The sun is bright today.",
        "I love coding in JavaScript.",
        "Practice makes perfect.",
        "Learning is fun when it is interactive.",
        "Coding improves logical thinking.",
        "She sells seashells by the seashore.",
        "A rolling stone gathers no moss.",
        "Early birds catch the worm.",
        "The quick fox jumps over the lazy dog.",
        "Dream big and work hard.",
        "Reading books expands knowledge.",
        "Music can heal the soul.",
        "Be kind and stay humble.",
        "Every day is a new opportunity.",
        "Time waits for no one."
    ],
    medium: [
        "Typing speed is measured in words per minute.",
        "A quick brown fox jumps over a lazy dog.",
        "Consistency is the key to mastering skills.",
        "The road to success is always under construction.",
        "The only way to do great work is to love what you do.",
        "Believe in yourself and all that you are.",
        "Failure is not the opposite of success, it's part of success.",
        "Hard work beats talent when talent doesn't work hard.",
        "A little progress each day adds up to big results.",
        "Success is not in what you have, but who you are.",
        "Difficulties in life are intended to make us better, not bitter.",
        "Courage doesn't always roar; sometimes it’s a quiet voice.",
        "Do what you can, with what you have, where you are.",
        "Opportunities don’t happen, you create them.",
        "Don’t watch the clock; do what it does. Keep going."
    ],
    hard: [
        "Artificial intelligence is transforming technology.",
        "Quantum computing will revolutionize encryption.",
        "Neural networks power deep learning models efficiently.",
        "A blockchain is a distributed database that maintains records.",
        "Cybersecurity is critical in protecting digital assets.",
        "The universe is constantly expanding and evolving.",
        "Astrophysics deals with the physical properties of celestial bodies.",
        "Complex algorithms determine the efficiency of computation.",
        "Data science involves extracting knowledge from data.",
        "Genetic engineering can modify the DNA of organisms.",
        "Nanotechnology is revolutionizing the medical field.",
        "Augmented reality enhances real-world experiences.",
        "Theoretical physics explores the nature of the universe.",
        "Human cognition is deeply connected to neural pathways.",
        "Evolutionary biology explains how species adapt over time."
    ]
};

let startTime;
let currentSentence = "";

// Function to load a new sentence based on difficulty
function loadSentence() {
    const difficulty = document.getElementById("difficulty").value;
    currentSentence = sentences[difficulty][Math.floor(Math.random() * sentences[difficulty].length)];
    
    document.getElementById("sentence").innerText = currentSentence;
    document.getElementById("user-input").value = "";
    document.getElementById("result").innerText = "";
    document.getElementById("accuracy").innerText = "Accuracy: 100%";
    document.getElementById("user-input").classList.remove("correct", "wrong");
    startTime = null;
}

// Function to start timing and track typing accuracy
function startTyping() {
    const inputField = document.getElementById("user-input");
    let userInput = inputField.value.trim(); 
    let correctSentence = currentSentence.trim();

    if (!startTime && userInput.length > 0) {
        startTime = new Date().getTime();
    }

    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === correctSentence[i]) {
            correctChars++;
        }
    }

    // Calculate accuracy
    let accuracy = Math.round((correctChars / correctSentence.length) * 100);
    document.getElementById("accuracy").innerText = `Accuracy: ${accuracy}%`;

    if (userInput === correctSentence.substring(0, userInput.length)) {
        inputField.classList.remove("wrong");
        inputField.classList.add("correct");
    } else {
        inputField.classList.remove("correct");
        inputField.classList.add("wrong");
    }

    // Check if user completed the sentence
    if (userInput === correctSentence) {
        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000; 
        const wordsPerMinute = Math.round((correctSentence.split(" ").length / timeTaken) * 60);

        document.getElementById("result").innerText = `You typed at ${wordsPerMinute} WPM! 🎉`;

        saveToLeaderboard(wordsPerMinute);
        updateLeaderboard();
    }
}

// Function to save WPM score in leaderboard
function saveToLeaderboard(wpm) {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push(wpm);
    leaderboard.sort((a, b) => b - a); // Sort in descending order
    leaderboard = leaderboard.slice(0, 5); // Keep only top 5 scores
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

// Function to update leaderboard display
function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = "";
    leaderboard.forEach((score, index) => {
        const li = document.createElement("li");
        li.innerText = `#${index + 1}: ${score} WPM`;
        leaderboardElement.appendChild(li);
    });
}

// Function to reset the test
function resetTest() {
    loadSentence();
    updateLeaderboard();
}

// Load a sentence and update leaderboard when the page loads
loadSentence();
updateLeaderboard();
