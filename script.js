"use strict";

let playerChoice = "";
let computerChoice = "";
let roundResult = "";

let playerScore = 0;
let computerScore = 0;
let result = ``;

let playing = false;

// DOM variables
const uiMenuEl = document.getElementById("ui--menu");
const uiGameEl = document.getElementById("ui--game");

const choiceBtn = document.querySelectorAll(".choice");
const startBtn = document.querySelector(".button--start");

const playerChoiceDisplay = document.getElementById("choice--player");
const computerChoiceDisplay = document.getElementById("choice--cpu");
const playerScoreDisplay = document.getElementById("score--player");
const computerScoreDisplay = document.getElementById("score--cpu");
const choiceDisplay = document.getElementById("section--choice-display");

const sectionGame = document.getElementById("section--game");
const messageResultEl = document.getElementById("message-result");

const getComputerChoice = function () {
  const choices = ["rock", "paper", "scissors"];
  const choice = choices[Math.trunc(Math.random() * 3)];
  return choice;
};

const playRound = function (playerSelection, computerSelection) {
  let winning = false;

  playerSelection = playerSelection.toLowerCase();

  if (playerSelection === computerSelection) return "draw";
  else {
    switch (playerSelection) {
      case "rock":
        if (computerSelection === "paper") winning = false;
        else if (computerSelection === "scissors") winning = true;
        break;

      case "paper":
        if (computerSelection === "scissors") winning = false;
        else if (computerSelection === "rock") winning = true;
        break;

      case "scissors":
        if (computerSelection === "rock") winning = false;
        else if (computerSelection === "paper") winning = true;
        break;

      default:
        return 'Please select among "Rock, Paper, Scissors".';
    }
  }
  return winning ? "win" : "lose";
};

startBtn.addEventListener("click", function () {
  uiMenuEl.classList.add("hidden");
  uiGameEl.classList.toggle("hidden");
  playing = true;
});

for (let i = 0; i < choiceBtn.length; i++) {
  choiceBtn[i].addEventListener("click", function () {
    if (playing) {
      playerChoice = choiceBtn[i].getAttribute("data-choice");
      playerChoiceDisplay.innerText = playerChoice.replace(
        playerChoice[0],
        playerChoice[0].toUpperCase()
      );

      computerChoice = getComputerChoice();
      computerChoiceDisplay.innerText = computerChoice.replace(
        computerChoice[0],
        computerChoice[0].toUpperCase()
      );

      roundResult = playRound(playerChoice, computerChoice);
      console.log(playerChoice, computerChoice);
      console.log(roundResult);

      // Work on changing color background of something based on result
      for (let i = 0; i < choiceBtn.length; i++) {
        choiceBtn[i].style.color = "black";
      }

      switch (roundResult) {
        case "win":
          choiceBtn[i].style.color = "#60b347";
          ++playerScore;
          break;
        case "lose":
          choiceBtn[i].style.color = "#FA0415";
          ++computerScore;
          break;
      }
      playerScoreDisplay.innerText = String(playerScore);
      computerScoreDisplay.innerText = String(computerScore);

      if (playerScore === 5) {
        messageResultEl.innerText = "You Win!";
        messageResultEl.style.color = "#60b347";
        messageResultEl.style.fontWeight = "bold";
        playing = false;
      } else if (computerScore === 5) {
        messageResultEl.innerText = "You Lose!";
        messageResultEl.style.color = "#FA0415";
        messageResultEl.style.fontWeight = "bold";
        playing = false;
      }
    }
  });
}
