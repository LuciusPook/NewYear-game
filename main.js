let cards = document.querySelectorAll(".memoryCard");
let finish = document.querySelector(".completed")
let tryAgain = document.querySelector("button")
let fontGroup = document.querySelector(".group")

let isFlipped = false;
let firstCard, secondCard;
let lock = false;
let score = 0
let arr = ["https://i.ibb.co/kD3BhHB/001.png",
  "https://i.ibb.co/4sFnRLc/002.png",
  "https://i.ibb.co/7t0dcn1/003.png",
  "https://i.ibb.co/1qsCyrS/004.png",
  "https://i.ibb.co/wwHmGF0/005.png",
  "https://i.ibb.co/8bQLLmn/006.png",
  "https://i.ibb.co/BzXnV6v/007.png",
  "https://i.ibb.co/Y80Hprm/008.png",
  "https://i.ibb.co/nwC8ffL/009.png",
  "https://i.ibb.co/7KtpVdD/0010.png",
  "https://i.ibb.co/NY9PnM8/0011.png",
  "https://i.ibb.co/QDNDQTW/0012.png"]


let index = Math.floor(Math.random() * arr.length);
let arrIndex = arr[index];
fontGroup.innerHTML = ` 
    <img src="${arrIndex}" class="auspicious-word">
  `;

cards.forEach(card => card.addEventListener("click", flip));

function flip() {

  if (lock) return;
  if (this === firstCard) return;

  this.classList.add("flip");
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  check();

}

function check() {
  let isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? succes() : fail();

  if (isMatch) {
    score += 2;
  }

  if (score === 16) {
    showGameFinished()
  }
}

function succes() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  reset();
}

function fail() {
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1000);
}

function reset() {
  [isFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function showGameFinished() {
  finish.classList.remove("d-none")
}


(function suffle() {
  cards.forEach(card => {
    let position = Math.floor(Math.random() * 16);
    card.style.order = position;
  });
})();


tryAgain.addEventListener('click', () => {
  window.location.reload()
})
