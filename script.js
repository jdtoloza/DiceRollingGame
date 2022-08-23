'use strict';
// Flow Chart => everything that can happen in an application
// Diagrams.net => flowchart

// variableEL = DOM element

// Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0')
const score1EL = document.getElementById('score--1')
const current0EL = document.getElementById('current--0')
const current1EL = document.getElementById('current--1')
const diceEL = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelectorAll('.btn--new')

let currentScore = 0;
let activePlayer = 0;
// Player 1 will have score[0] and Player 2 will have score[1]
let scores = [0,0];
let playing = true;

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const switchPlayer= function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active')
    player1EL.classList.toggle('player--active')
}


// Rolling dice functionality
btnRoll.addEventListener('click', function(){
    if(playing){
        // 1. Generating a random dice roll. Math.trunc returns the integer part of a number by removing any fractional digits. 
        const dice = Math.trunc(Math.random() * 6) + 1
        // 2. Display dice
        diceEL.classList.remove('hidden')
        // adding all the dice rolls to the image 
        diceEL.src = `dice-${dice}.png`;
        // 3. Check for rolled 1: if true, switch to next player. 
        if(dice !== 1){
            // add dice to current score 
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            // `current${activePlayer}EL`.textContent = currentScore; // Change Later
        } else {
            // switch to the next player
            switchPlayer()
        }
}
});

btnHold.addEventListener('click', function(){
    if (playing){

        // 1. Add current score to active player's score. 
        scores[activePlayer] += currentScore;
        // scores[1] = score[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 50) {
        diceEL.classList.add('hidden');
        // Finish the game
        
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector('.winning-announcement-window-background').classList.add('active-winner');
        document.querySelector('.winning-announcement-window').classList.add('active-winner')
        document.querySelector('.winning-player-anouncement').innerText = `Team ${activePlayer + 1} wins!`
    } else {
        // Switch to the next player.
    switchPlayer()
    }
}
})


// Reset Game Functionality

btnNewGame.forEach(x => x.addEventListener('click', newGame))

function newGame() {
        score0EL.textContent = 0;
        score1EL.textContent = 0;
        current0EL.textContent = 0;
        current1EL.textContent = 0;
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
        activePlayer = 0;
        playing = true;
        scores = [0, 0]
        currentScore = 0;
        player0EL.classList.add('player--active')
        player1EL.classList.remove('player--active')
        document.querySelector('.winning-announcement-window-background').classList.remove('active-winner');
        document.querySelector('.winning-announcement-window').classList.remove('active-winner')
        
    }


    // =============================================================

    // Toggle Winning Player

