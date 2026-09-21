const foods = [
    {
        name: "McDonald's",
        emoji: "🍔",

        // Hidden satisfaction distribution
        rewards: [3, 3, 4, 4, 5]
    },

    {
        name: "Burger King",
        emoji: "👑",

        // Hidden satisfaction distribution
        rewards: [2, 3, 3, 4, 5]
    },

    {
        name: "Leon Grill",
        emoji: "🥙",

        // Hidden satisfaction distribution
        rewards: [3, 4, 4, 5, 5]
    },

    {
        name: "Taco Bell",
        emoji: "🌮",

        // Hidden satisfaction distribution
        rewards: [2, 2, 3, 4, 4]
    }
];

let round = 1;
let totalScore = 0;
let currentFood = null;

let statistics = [
    { visits: 0, total: 0 },
    { visits: 0, total: 0 },
    { visits: 0, total: 0 },
    { visits: 0, total: 0 }
];

let history = [];


/*
    Choose a food spot
*/
function chooseFood(index) {

    if (round > 30) {
        return;
    }

    currentFood = index;

    const food = foods[index];

    // Randomly select a satisfaction rating
    const rewards = food.rewards;

    const reward =
        rewards[Math.floor(Math.random() * rewards.length)];

    // Update statistics
    statistics[index].visits++;
    statistics[index].total += reward;

    totalScore += reward;

    // Add to history
    history.unshift({
        name: food.name,
        emoji: food.emoji,
        reward: reward
    });

    if (history.length > 5) {
        history.pop();
    }

    // Show result
    showResult(food, reward);

    // Update statistics
    updateStats();

    // Update score
    document.getElementById("score").textContent =
        "⭐ " + totalScore;

    document.getElementById("round").textContent =
        round + " / 30";

    updateHistory();
}


/*
    Display the satisfaction result
*/
function showResult(food, reward) {

    const result = document.getElementById("result");
    const title = document.getElementById("result-title");
    const stars = document.getElementById("stars");
    const message = document.getElementById("result-message");

    title.textContent =
        "You visited " + food.name + "!";

    stars.textContent =
        "⭐".repeat(reward);

    if (reward === 5) {
        message.textContent =
            "Amazing! You really enjoyed this food spot!";
    }
    else if (reward === 4) {
        message.textContent =
            "Great choice! You had a very good experience.";
    }
    else if (reward === 3) {
        message.textContent =
            "It was okay. Maybe another spot will be better.";
    }
    else if (reward === 2) {
        message.textContent =
            "Not your favorite this time.";
    }
    else {
        message.textContent =
            "That wasn't a great experience.";
    }

    result.classList.remove("hidden");

    // Hide food choices temporarily
    document.querySelector(".food-grid").style.display = "none";
}


/*
    Continue to the next visit
*/
function continueGame() {

    round++;

    document.getElementById("result").classList.add("hidden");

    if (round > 30) {
        endGame();
        return;
    }

    document.querySelector(".food-grid").style.display = "grid";

    document.getElementById("round").textContent =
        round + " / 30";
}


/*
    Update the information under each food spot
*/
function updateStats() {

    for (let i = 0; i < foods.length; i++) {

        const statsElement =
            document.getElementById("stats-" + i);

        const stats = statistics[i];

        if (stats.visits === 0) {

            statsElement.textContent =
                "Unknown — Try it!";

        } else {

            const average =
                (stats.total / stats.visits).toFixed(1);

            statsElement.textContent =
                stats.visits +
                " visit" +
                (stats.visits > 1 ? "s" : "") +
                " • Avg: ⭐ " +
                average;
        }
    }
}


/*
    Update recent visits
*/
function updateHistory() {

    const historyList =
        document.getElementById("history-list");

    historyList.innerHTML = "";

    history.forEach(function(item) {

        const div = document.createElement("div");

        div.className = "history-item";

        div.textContent =
            item.emoji +
            " " +
            item.name +
            " — " +
            "⭐".repeat(item.reward);

        historyList.appendChild(div);
    });
}


/*
    End of the game
*/
function endGame() {

    document.querySelector(".food-grid").style.display = "none";
    document.querySelector(".instructions").style.display = "none";

    const result = document.getElementById("result");

    result.classList.remove("hidden");

    document.getElementById("result-title").textContent =
        "🎉 Food Adventure Complete!";

    document.getElementById("stars").textContent =
        "⭐ " + totalScore;

    document.getElementById("result-message").innerHTML =
        "You visited 30 times and earned <b>" +
        totalScore +
        " satisfaction points</b>.<br><br>" +
        "You explored different food spots and learned " +
        "which ones gave you better experiences.";

    document.querySelector(".continue-button").textContent =
        "Play Again 🔄";

    document.querySelector(".continue-button").onclick =
        restartGame;
}


/*
    Restart the game
*/
function restartGame() {

    round = 1;
    totalScore = 0;
    currentFood = null;

    statistics = [
        { visits: 0, total: 0 },
        { visits: 0, total: 0 },
        { visits: 0, total: 0 },
        { visits: 0, total: 0 }
    ];

    history = [];

    document.getElementById("score").textContent =
        "⭐ 0";

    document.getElementById("round").textContent =
        "1 / 30";

    document.querySelector(".instructions").style.display =
        "block";

    document.querySelector(".food-grid").style.display =
        "grid";

    document.querySelector(".continue-button").textContent =
        "Continue →";

    document.querySelector(".continue-button").onclick =
        continueGame;

    updateStats();
    updateHistory();

    document.getElementById("result").classList.add("hidden");
}
