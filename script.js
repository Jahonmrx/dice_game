'use strict';

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');

const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');

const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

score0El.textContent = 0;
score1El.textContent = 0;
dice.style.display = 'none';

let currentScore = 0;
let activePlayer = 0;
let score = [0, 0];
let playing = true;

function switchPlayer() {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
}

btnRollDice.addEventListener('click', () => {
  if (playing) {
    let random = Math.trunc(Math.random() * 6) + 1;
    dice.src = `./img/dice-${random}.png`;
    dice.style.display = 'inline-block';

    if (random !== 1) {
      currentScore += random;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 50) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', () => {
  score0El.textContent = 0;
  score1El.textContent = 0;
  dice.style.display = 'none';

  document.getElementById(`current--${activePlayer}`).textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');

  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
});
