const cards = document.querySelectorAll('.memory-card');
const restartBtn = document.querySelector('.restart');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerOn = false;
let counterMatches = 0
let gameOver = false;

function flipCard() {
    timerOn ? '' : timer();
    if (lockBoard) { return };
    if (this === firstCard) { return };
    this.classList.add('flip');

    if (!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    //second click
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();

}



function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disabledCards() : unflipCards()
}

function disabledCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    counterMatches += 1;

    counterMatches == (cards.length)/2 ? gameOver = true : gameOver = false;
    console.log(gameOver);
    resetBoard()
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');


        resetBoard()
    }, 1500)


}



function resetBoard() {
    hasFlippedCard = lockBoard = false;
    firstCard = secondCard = null;
}


cards.forEach(card => {
    const randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
})



function timer() {
    timerOn = true;
    let seconds = 0;
    displayTimer(seconds)

    counter = setInterval(() => {
        seconds = seconds + 1;
        if (gameOver == true) {
            clearInterval(counter);
            return
        } else {
            displayTimer(seconds);

        }
    }, 1000);
};

function displayTimer(seconds) {
    const minutes = 0;
    const remainderSeconds = seconds % 60;
    const clock = document.querySelector('.clock');
    clock.innerText = `${seconds > 59 ? minutes + 1 : '00'}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}


restartBtn.addEventListener('click', function () {
    document.location.reload();
})

cards.forEach(card => card.addEventListener('click', flipCard));
