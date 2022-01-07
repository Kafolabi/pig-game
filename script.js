"use strict";

// Selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0 = document.querySelector("#current--0");
const current1 = document.querySelector("#current--1");

const player1 = document.querySelector(".player--1");
const player0 = document.querySelector(".player--0");

const diceEl = document.querySelector(".dice");
const rollDice = document.querySelector(".btn--roll");
const holdDice = document.querySelector(".btn--hold");
const btnReset = document.querySelector(".btn--new");

let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Reassigning active player. If it was 0 before, it'll switch to one, if it was one before it will switch to 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;

  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// Rolling dice functionality
rollDice.addEventListener("click", function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");

    // 3. If dice is not one, add to current score
    if (dice !== 1) {
      currentScore += dice;
      // Dynamically getting variable to change to activePlayer
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      console.log(currentScore);
    } else {
      // if true switch to next player
      switchPlayer();
    }
  }
});

holdDice.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      // Finish the game
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
});

btnReset.addEventListener("click", init);
