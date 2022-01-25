let cards = document.querySelectorAll(".memoryCard");
let finish = document.querySelector(".completed")
let tryAgain = document.querySelector("button")
let fontGroup = document.querySelector(".group")

let isFlipped = false;
let firstCard, secondCard;
let lock = false;
let score = 0
let arr = ["虎虎生風", "虎膽虎威", "虎氣沖天", "恭喜發財"]


let index = Math.floor(Math.random() * arr.length)
fontGroup.innerHTML = ` 
    <img src="/img/fu.png" class="auspicious-word">
    <img src="/img/fu.png" class="auspicious-word1">
    <img src="/img/fu.png" class="auspicious-word2">
    <img src="/img/fu.png" class="auspicious-word3">
    <img src="/img/fu.png" class="auspicious-word4">
    <img src="/img/fu.png" class="auspicious-word5">
    <img src="/img/fu.png" class="auspicious-word6">
    <img src="/img/fu.png" class="auspicious-word7">
    <img src="/img/fu.png" class="auspicious-word8">
    <img src="/img/fu.png" class="auspicious-word9">
  `

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
