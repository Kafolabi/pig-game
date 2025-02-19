"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const diceEl = document.querySelector(".dice");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdDiceBtn = document.querySelector(".btn--hold");
const btnReset = document.querySelector(".btn--new");

let scores, currentScore, activePlayer, playing;

const init = () => {
  // Retrieve scores and active player from localStorage or set defaults
  scores = [
    localStorage.getItem("score0") ? +localStorage.getItem("score0") : 0,
    localStorage.getItem("score1") ? +localStorage.getItem("score1") : 0,
  ];
  activePlayer = localStorage.getItem("activePlayer")
    ? +localStorage.getItem("activePlayer")
    : 0;
  currentScore = 0;
  playing = true;

  // Update UI
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--active");
  player1El.classList.remove("player--active");

  // Set active player UI
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
};

// Function to persist scores and active player in localStorage
const persistGameState = () => {
  localStorage.setItem("score0", scores[0]);
  localStorage.setItem("score1", scores[1]);
  localStorage.setItem("activePlayer", activePlayer);
};

// Function to switch players
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  persistGameState(); // Save new active player state
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Function to roll the dice
const rollDice = () => {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};

// Function to hold score
const holdDice = () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    persistGameState(); // Save scores and active player

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
};

// Function to reset the game
const resetGame = () => {
  localStorage.setItem("score0", 0);
  localStorage.setItem("score1", 0);
  localStorage.setItem("activePlayer", 0);
  init();
};

// Initialize the game
init();

// Event listeners
rollDiceBtn.addEventListener("click", rollDice);
holdDiceBtn.addEventListener("click", holdDice);
btnReset.addEventListener("click", resetGame);
