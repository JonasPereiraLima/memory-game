const emojis = [
  [
    "😺",
    "😺",
    "😸",
    "😸",
    "😹",
    "😹",
    "😻",
    "😻",
    "😼",
    "😼",
    "😽",
    "😽",
    "🙀",
    "🙀",
    "😿",
    "😿",
  ],
  [
    "🐶",
    "🐶",
    "🙈",
    "🙈",
    "🐺",
    "🐺",
    "🦁",
    "🦁",
    "🐯",
    "🐯",
    "🦒",
    "🦒",
    "🦊",
    "🦊",
    "🦝",
    "🦝",
  ],
  [
    "😀",
    "😀",
    "😁",
    "😁",
    "😂",
    "😂",
    "😅",
    "😅",
    "😉",
    "😉",
    "😋",
    "😋",
    "😎",
    "😎",
    "😍",
    "😍",
  ],
];
let openCards = [];
let matchedCards = [];
let shuffleEmojis = [];
const game = document.querySelector("div.game");

const selectDifficulty = document.querySelector("select#difficulty");

selectDifficulty.addEventListener("change", () => {
  game.innerHTML = "";
  difficulty(selectDifficulty.value);
});

function newCard() {
  shuffleEmojis.forEach((emoji, i) => {
    const box = document.createElement("div");
    box.className = "card";
    box.id = i;
    box.textContent = emoji;
    box.onclick = handleClick;

    game.appendChild(box);
  });
}

function handleClick() {
  if (
    openCards.length < 2 &&
    openCards[0] !== this &&
    matchedCards.indexOf(this) === -1
  ) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }
  if (openCards.length === 2) {
    setTimeout(checkMatch, 400);
  }
}

function checkMatch() {
  if (
    openCards.length === 2 &&
    openCards[0].innerHTML === openCards[1].innerHTML &&
    openCards[0].id !== openCards[1].id
  ) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
    matchedCards.push(openCards[0]);
    matchedCards.push(openCards[1]);
  } else if (openCards.length == 2) {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }
  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === shuffleEmojis.length) {
    alert("Jogo finalizado!");
  }
}

function difficulty(selectDifficulty) {
  game.className = "game";
  switch (selectDifficulty) {
    case "1":
      shuffleEmojis = emojis[0].sort(() => (Math.random() > 0.5 ? 2 : -1));
      game.classList.add("fourCols");
      break;
    case "2":
      shuffleEmojis = emojis[0]
        .concat(emojis[1])
        .sort(() => (Math.random() > 0.5 ? 2 : -1));
      game.classList.add("eightCols");
      break;
    case "3":
      shuffleEmojis = emojis[0]
        .concat(emojis[1])
        .concat(emojis[2])
        .sort(() => (Math.random() > 0.5 ? 2 : -1));
      game.classList.add("eightCols");
  }
  newCard();
}
