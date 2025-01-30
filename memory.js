
const memorySymbols = ['fa-star', 'fa-heart', 'fa-cloud', 'fa-bolt', 
    'fa-anchor', 'fa-bicycle', 'fa-bomb', 'fa-leaf'];

let memoryGame = {
hasFlippedCard: false,
lockBoard: false,
firstCard: null,
secondCard: null,
moves: 0,
time: 0,
timerId: null
};


const memoryElements = {
grid: document.getElementById('memoryGrid'),
timer: document.getElementById('timer'),
moves: document.getElementById('moves'),
victoryMessage: document.getElementById('victoryMessage'),
finalTime: document.getElementById('finalTime'),
finalMoves: document.getElementById('finalMoves')
};


function initMemoryGame() {
const gameCards = [...memorySymbols, ...memorySymbols]
.sort(() => Math.random() - 0.5)
.map((symbol, index) => ({
id: index,
symbol
}));

memoryElements.grid.innerHTML = '';

gameCards.forEach(card => {
const cardElement = document.createElement('div');
cardElement.className = 'memory-card';
cardElement.dataset.cardId = card.id;
cardElement.innerHTML = `
<div class="card-face card-front">
<i class="fas ${card.symbol}"></i>
</div>
<div class="card-face card-back"></div>
`;
cardElement.addEventListener('click', flipCard);
memoryElements.grid.appendChild(cardElement);
});

resetMemoryGame();
}

function resetMemoryGame() {
memoryGame = {
hasFlippedCard: false,
lockBoard: false,
firstCard: null,
secondCard: null,
moves: 0,
time: 0,
timerId: null
};
memoryElements.moves.textContent = '0';
memoryElements.timer.textContent = '0';
memoryElements.victoryMessage.classList.remove('show');


document.querySelectorAll('.memory-card').forEach(card => {
card.classList.remove('flipped');
card.addEventListener('click', flipCard);
});
}


function flipCard() {
if (memoryGame.lockBoard || this === memoryGame.firstCard) return;

this.classList.add('flipped');

if (!memoryGame.hasFlippedCard) {

memoryGame.hasFlippedCard = true;
memoryGame.firstCard = this;
startMemoryTimer();
} else {

memoryGame.moves++;
memoryElements.moves.textContent = memoryGame.moves;
memoryGame.secondCard = this;
checkMemoryMatch();
}
}

function checkMemoryMatch() {
const firstIcon = memoryGame.firstCard.querySelector('i').className;
const secondIcon = memoryGame.secondCard.querySelector('i').className;

firstIcon === secondIcon ? disableMatchedCards() : unflipMismatchedCards();
}

function disableMatchedCards() {
memoryGame.firstCard.removeEventListener('click', flipCard);
memoryGame.secondCard.removeEventListener('click', flipCard);
resetMemoryBoard();
checkMemoryVictory();
}

function unflipMismatchedCards() {
memoryGame.lockBoard = true;
setTimeout(() => {
memoryGame.firstCard.classList.remove('flipped');
memoryGame.secondCard.classList.remove('flipped');
resetMemoryBoard();
}, 1000);
}

function resetMemoryBoard() {
[memoryGame.hasFlippedCard, memoryGame.lockBoard] = [false, false];
[memoryGame.firstCard, memoryGame.secondCard] = [null, null];
}


function startMemoryTimer() {
if (!memoryGame.timerId) {
memoryGame.timerId = setInterval(() => {
memoryGame.time++;
memoryElements.timer.textContent = memoryGame.time;
}, 1000);
}
}

function stopMemoryTimer() {
clearInterval(memoryGame.timerId);
memoryGame.timerId = null;
}


function checkMemoryVictory() {
const flippedCards = document.querySelectorAll('.memory-card.flipped').length;
if (flippedCards === memorySymbols.length * 2) {
stopMemoryTimer();
memoryElements.finalTime.textContent = memoryGame.time;
memoryElements.finalMoves.textContent = memoryGame.moves;
memoryElements.victoryMessage.classList.add('show');
}
}


function restartMemoryGame() {
stopMemoryTimer();
initMemoryGame();
}


document.addEventListener('DOMContentLoaded', () => {
initMemoryGame();
document.querySelector('.restart-btn').addEventListener('click', restartMemoryGame);
});

window.restartGame = restartMemoryGame;


function initMemoryGame() {
    const gameCards = [...memorySymbols, ...memorySymbols]
        .sort(() => Math.random() - 0.5)
        .map((symbol, index) => ({
            id: index,
            symbol
        }));

    memoryElements.grid.innerHTML = '';
    

    gameCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card flipped'; // Começa virado
        cardElement.dataset.cardId = card.id;
        cardElement.innerHTML = `
            <div class="card-face card-front">
                <i class="fas ${card.symbol}"></i>
            </div>
            <div class="card-face card-back"></div>
        `;
        memoryElements.grid.appendChild(cardElement);
    });


    setTimeout(() => {
        document.querySelectorAll('.memory-card').forEach(card => {
            card.classList.remove('flipped');
            card.addEventListener('click', flipCard);
        });
        resetMemoryGame();
        startMemoryTimer();
    }, 3000);
}


function resetMemoryGame() {
    memoryGame = {
        hasFlippedCard: false,
        lockBoard: false,
        firstCard: null,
        secondCard: null,
        moves: 0,
        time: 0,
        timerId: null
    };
    memoryElements.moves.textContent = '0';
    memoryElements.timer.textContent = '0';
    memoryElements.victoryMessage.classList.remove('show');
    

    document.querySelectorAll('.memory-card').forEach(card => {
        card.classList.remove('flipped');
    });
}

