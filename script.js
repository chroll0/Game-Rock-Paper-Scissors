const playerAction = document.querySelector(".playerAction ");
const choiceBtn = document.querySelectorAll(".choiceBtn");
const computerAction = document.querySelector(".computerAction ");
const computerChoice = document.querySelectorAll(".computerChoice");

const computerScore = document.querySelector(".computerScore");
const playerScore = document.querySelector(".playerScore");
const gameMessage = document.querySelector(".gameMessage");

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const continueMatch = document.querySelector(".continueMatch");
const rematch = document.querySelector(".rematch");

const wrapper = document.querySelector(".wrapper");
const backgroundImages = document.querySelector(".backgroundImages");

let array = [];
let playerArray = [];
let round = 1;
let playerPoints = 0;
let computerPoints = 0;
let continuePlaying = false;

choiceBtn.forEach((playerChoice) => {
  playerChoice.disabled = true;
});
computerChoice.forEach((computerChoice) => {
  array.push(computerChoice.textContent);
});

start();
function start() {
  changeBackground();
  gameMessage.addEventListener("click", function () {
    gameMessage.disabled = true;
    gameMessage.classList.remove("gameMessageActive");
    gameMessage.classList.add("animation");
    choiceBtn.forEach((playerChoice) => {
      playerChoice.disabled = false;
      playerChoice.addEventListener("click", function () {
        playerArray.push(playerChoice.textContent);
      });
    });
    for (let i = 0; i < 4; i++) {
      setTimeout(function foo() {
        gameMessage.textContent = array[i];
        if (i == 3) {
          choiceBtn.forEach((playerChoice) => {
            playerChoice.disabled = true;
          });
          randomAction();
          checkWinner();
          setTimeout(function foo() {
            restartGame();
            gameMessage.classList.remove("animation");
            gameMessage.disabled = false;
          }, 3000);
        }
      }, i * 1000);
    }
  });
}
function randomAction() {
  computerAction.textContent = array[Math.floor(Math.random() * 3)];
  playerAction.textContent = playerArray[playerArray.length - 1];
}
function checkWinner() {
  let pl = playerAction.textContent;
  let comp = computerAction.textContent;
  if (pl == comp) {
    gameMessage.textContent = "draw";
  } else if (comp == array[0] && pl == array[1]) {
    gameMessage.textContent = "player won";
    playerPoints++;
  } else if (comp == array[0] && pl == array[2]) {
    gameMessage.textContent = "computer won";
    computerPoints++;
  } else if (comp == array[1] && pl == array[0]) {
    gameMessage.textContent = "computer won";
    computerPoints++;
  } else if (comp == array[1] && pl == array[2]) {
    gameMessage.textContent = "player won";
    playerPoints++;
  } else if (comp == array[2] && pl == array[0]) {
    gameMessage.textContent = "player won";
    playerPoints++;
  } else if (comp == array[2] && pl == array[1]) {
    gameMessage.textContent = "computer won";
    computerPoints++;
  } else if (pl == "") {
    gameMessage.textContent = "computer won";
    computerPoints++;
  }
  playerScore.textContent = `Score ${playerPoints}`;
  computerScore.textContent = `Score ${computerPoints}`;
}
function modalEvent() {
  if (playerPoints == 3) {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    document.querySelector(
      ".modalMessage"
    ).textContent = `player collected ${playerPoints} point`;
    continueMatch.addEventListener("click", function () {
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
      continuePlaying = true;
    });
    rematch.addEventListener("click", function () {
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
      round = 1;
      gameMessage.textContent = `round ${round}`;
      playerPoints = 0;
      computerPoints = 0;
      playerScore.textContent = `Score ${playerPoints}`;
      computerScore.textContent = `Score ${computerPoints}`;
    });
  } else if (computerPoints == 3) {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    document.querySelector(
      ".modalMessage"
    ).textContent = `computer collected ${computerPoints} points`;
    continueMatch.addEventListener("click", function () {
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
      continuePlaying = true;
    });
    rematch.addEventListener("click", function () {
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
      round = 1;
      gameMessage.textContent = `round ${round}`;
      playerPoints = 0;
      computerPoints = 0;
      playerScore.textContent = `Score ${playerPoints}`;
      computerScore.textContent = `Score ${computerPoints}`;
    });
  }
}
function restartGame() {
  playerAction.textContent = "";
  computerAction.textContent = "";
  round++;
  gameMessage.classList.add("gameMessageActive");
  gameMessage.textContent = `round ${round}`;
  if (playerArray.length >= 1) {
    playerArray = [];
  }
  if (continuePlaying == false) {
    modalEvent();
  }
}
function changeBackground() {
  let imgIndex = 0;
  backgroundImages.addEventListener("click", function () {
    let backgroundImagesArray = [
      "url(background-first.jpg)",
      "url(background-second.jpg)",
      "url(background-third.jpg)",
    ];
    if (imgIndex != 2) {
      wrapper.style.backgroundImage = backgroundImagesArray[imgIndex + 1];
      imgIndex++;
    } else if (imgIndex == 2) {
      imgIndex = 0;
      wrapper.style.backgroundImage = backgroundImagesArray[imgIndex];
    }
  });
}
