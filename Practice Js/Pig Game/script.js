'use strict';
/* 
when user rolls the dice : 
 1) - generate random number between 1 and 6 and store in a variable we do : let dice = Math.trunc(random() * 6 + 1 )  
 2) - associating every number to an image to display it in the playin dice and add the number to current variable.
 3) the toggle method in the classList Object takes a parameter wich is the class name and this name exit it will remove it, otherwise it will add it to the element
*/
// Creating starting variables
let scores = [0, 0];
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const displayDice = document.querySelector('.dice');
let player = 0;
let playing = true;
let current = 0;
let currentEl = document.querySelector(`#current--${player}`);

//starting conditions
score0.textContent = 0;
score1.textContent = 0;
displayDice.classList.add('hidden');

const switchPlayer = function () {
  current = 0;
  currentEl.textContent = current;
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');
  player = player ? 0 : 1;
  document.querySelector(`.player--${player}`).classList.add('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const rolledNumber = Math.trunc(Math.random() * 6) + 1;
    displayDice.src = `../dice-${rolledNumber}.png`;
    displayDice.classList.remove('hidden');
    console.log(rolledNumber);
    currentEl = document.querySelector(`#current--${player}`);
    if (rolledNumber !== 1) {
      current += rolledNumber;
      currentEl.textContent = current;
    } else {
      current = 0;
      currentEl.textContent = current;
      player = player ? 0 : 1; // switch the player
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[player] += current;
    document.querySelector(`#score--${player}`).textContent = scores[player];
    // switching the player
    if (scores[player] < 100) {
      switchPlayer();
    } else {
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');
      playing = false;
    }
  }
});

// now we want to reset the game when we click New Game
btnNew.addEventListener('click', function () {
  score0.textContent = 0;
  score1.textContent = 0;
  displayDice.classList.add('hidden');
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--winner');
  player = 0;
  playing = true;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  current = 0;
  currentEl.textContent = current;
  scores = [0, 0];
});
