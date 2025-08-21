const choices = ["rock", "paper", "scissors"];
let playerScore = 0, computerScore = 0, rounds = 0, gameOver = false;

const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const roundsPlayedEl = document.getElementById('roundsPlayed');
const resultMsgEl = document.getElementById('resultMsg');
const playAgainDiv = document.querySelector('.play-again');
const playAgainBtn = document.getElementById('playAgainBtn');
const choiceBtns = document.querySelectorAll('.choices button');

function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

function getResult(player, computer) {
  if (player === computer) return "tie";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) return "win";
  return "lose";
}

function updateUI() {
  playerScoreEl.textContent = playerScore;
  computerScoreEl.textContent = computerScore;
  roundsPlayedEl.textContent = rounds;
}

function endGame() {
  gameOver = true;
  let msg = "";
  if (playerScore > computerScore) msg = "Congratulations! You won the game!";
  else if (playerScore < computerScore) msg = "Game Over! Computer wins the game!";
  else msg = "It's a tie game! Try again!";
  resultMsgEl.textContent = msg;
  playAgainDiv.style.display = "flex";
  choiceBtns.forEach(btn => btn.disabled = true);
}

function handleChoice(e) {
  if (gameOver) return;
  const playerChoice = e.target.getAttribute('data-choice');
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  let roundMsg = `You chose ${playerChoice}. Computer chose ${computerChoice}. `;
  if (result === "win") {
    playerScore++;
    roundMsg += "You win this round!";
  } else if (result === "lose") {
    computerScore++;
    roundMsg += "Computer wins this round!";
  } else {
    roundMsg += "It's a tie!";
  }
  rounds++;
  updateUI();
  resultMsgEl.textContent = roundMsg;

  if (rounds === 5) endGame();
}

choiceBtns.forEach(btn => btn.addEventListener('click', handleChoice));

playAgainBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  rounds = 0;
  gameOver = false;
  updateUI();
  resultMsgEl.textContent = "Make your choice!";
  playAgainDiv.style.display = "none";
  choiceBtns.forEach(btn => btn.disabled = false);
});

updateUI();