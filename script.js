'use strict';

let currentPlayer, currentScore, scores, playing;
let dicePic = document.querySelector('.dice');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');
let score0 = document.querySelector('#score--0');
let current0 = document.querySelector('#current--0');
let score1 = document.querySelector('#score--1');
let current1 = document.querySelector('#current--1');

// Reset all
const reset = () => {
  currentScore = 0;
  scores = [0, 0];
  score0.textContent = scores[0];
  score1.textContent = scores[1];
  current0.textContent = 0;
  current1.textContent = 0;
  currentPlayer = 0;
  playing = true;

  // Remove winner and active class
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');

  // Hide dice pic
  dicePic.classList.add('hidden');
};
reset();

// Update current score
const updateCurrent = currentScore => {
  document.getElementById(`current--${currentPlayer}`).textContent =
    currentScore;
};

// Update total score
const updateTotal = () => {
  scores[currentPlayer] += currentScore;
  document.getElementById(`score--${currentPlayer}`).textContent =
    scores[currentPlayer];
};

// Switch player
const switchPlayer = () => {
  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
};

// Display winner
const displayWinner = () => {
  playing = false;
  dicePic.classList.add('hidden');
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--winner');
};

// Roll dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    dicePic.classList.remove('hidden');
    let randomNum = Math.ceil(Math.random() * 6);
    dicePic.setAttribute('src', `dice-${randomNum}.png`);

    if (randomNum !== 1) {
      currentScore += randomNum;
      updateCurrent(currentScore);
    } else {
      currentScore = 0;
      updateCurrent(currentScore);
      switchPlayer();
    }
  }
});

// Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    updateTotal();
    currentScore = 0;
    updateCurrent(currentScore);

    // If someone wins
    if (scores[currentPlayer] >= 100) {
      displayWinner();
    } else {
      switchPlayer();
    }
  }
});

// New game
btnNew.addEventListener('click', reset);
