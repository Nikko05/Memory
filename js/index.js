const cardColor = ["red", "green", "blue", "purple", "grey", "yellow", "brown", "violet", "pink", "red", "green", "blue", "purple", "grey", "yellow", "brown", "violet", "pink"];

let cards = document.querySelectorAll(".card");
cards = Array.from(cards);

const activeCards = [];
let activeCard = "";
let timer;

const gameLength = cardColor.length / 2;
let gameResult = 0;

let pairToFinish = document.querySelector(".pair__to-finish-div");
let yourPairs = document.querySelector(".pair__left-div");
let reloadButton = document.querySelector(".reload__button");
const stopWatch = document.querySelector(".stopwatch");

const clickCard = function () {
    activeCard = this;

    if (activeCard == activeCards[0]) return;

    activeCard.classList.remove("hidden");
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        activeCard.removeEventListener("click", clickCard);
        return;
    }
    else {
        cards.forEach(card => card.removeEventListener("click", clickCard));
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach(card => card.classList.add("off"));
                gameResult++;
                
                yourPairs.innerHTML = gameResult;
                pairToFinish.innerHTML = gameLength - gameResult + "/" + gameLength

                activeCards.length = 0;
                activeCard = "";
                cards = cards.filter(card => !card.classList.contains("off")); //zwraca divy bez klasy off (zaprzeczenie !)
                if (gameLength == gameResult) {
                    clearInterval(timer);
                    const timeDivV2 = document.createElement("div");
                    timeDivV2.classList.add("time__stop");
                    timeDivV2.textContent = stopWatch.textContent;
                    console.log(timeDivV2);
                    const timeParent = document.querySelector(".time").parentNode;
                    const timeChild = document.querySelector(".time");
                    timeParent.insertBefore(timeDivV2, timeChild);
                }
            }
            else {
                activeCards.forEach(card => card.classList.add("hidden"));
            }
            activeCards.length = 0;
            activeCard = "";
            cards.forEach(card => card.addEventListener("click", clickCard));
        }, 500);
    }
}

const startGame = function () {
    cards.forEach(card => {
        const cardIndex = Math.floor(Math.random() * cardColor.length);
        card.classList.add(cardColor[cardIndex]);
        cardColor.splice(cardIndex, 1);
    });

    yourPairs.innerHTML = 0;
    pairToFinish.innerHTML = gameLength + "/" + gameLength;


    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        });
        
        let ms = 0;
        let m = 0;
        let s = 0;
        console.log(stopWatch.textContent);

        const run = () => {
            stopWatch.textContent = (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s) + ":" + (ms < 10 ? "0" + ms : ms);
            ms++;
            if (ms == 100) {
                ms = 0;
                s++;
            }
            if (s == 60) {
                s = 0;
                m++;
            }
        }

        const startWatch = () => {
            if (!timer) {
                timer = setInterval(run, 10);
            }
        }
        startWatch();
    }, 2000);
}

const resetGame = () => {
    location.reload();
}

reloadButton.addEventListener("click", resetGame);

startGame();