const choices = ["rock", "paper", "scissors"];
let playerScore = 0, computerScore = 0, rounds = 0, gameOver = false;

const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const roundsPlayedEl = document.getElementById('roundsPlayed');
const resultMsgEl = document.getElementById('resultMsg');
const playAgainDiv = document.querySelector('.play-again');
const playAgainBtn = document.getElementById('playAgainBtn');
const choiceBtns = document.querySelectorAll('.choices button');

// Optional: Add sound effects (put mp3 files in assets/ and uncomment below)
// const winSound = new Audio('assets/win.mp3');
// const loseSound = new Audio('assets/lose.mp3');
// const tieSound = new Audio('assets/tie.mp3');

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

function animateResult(type) {
  resultMsgEl.classList.remove('win', 'lose', 'tie');
  void resultMsgEl.offsetWidth; // trigger reflow for animation
  resultMsgEl.classList.add(type);
}

function endGame() {
  gameOver = true;
  let msg = "";
  let type = "";
  if (playerScore > computerScore) {
    msg = "🎉 Congratulations! You won the game!";
    type = "win";
    // winSound.play();
  } else if (playerScore < computerScore) {
    msg = "😢 Game Over! Computer wins the game!";
    type = "lose";
    // loseSound.play();
  } else {
    msg = "🤝 It's a tie game! Try again!";
    type = "tie";
    // tieSound.play();
  }
  resultMsgEl.textContent = msg;
  animateResult(type);
  playAgainDiv.style.display = "flex";
  choiceBtns.forEach(btn => btn.disabled = true);
}

function handleChoice(e) {
  if (gameOver) return;
  const playerChoice = e.target.getAttribute('data-choice');
  const computerChoice = getComputerChoice();
  const result = getResult(playerChoice, computerChoice);

  let roundMsg = `You chose ${playerChoice} ${getEmoji(playerChoice)}. Computer chose ${computerChoice} ${getEmoji(computerChoice)}. `;
  let type = "";
  if (result === "win") {
    playerScore++;
    roundMsg += "You win this round!";
    type = "win";
    // winSound.play();
  } else if (result === "lose") {
    computerScore++;
    roundMsg += "Computer wins this round!";
    type = "lose";
    // loseSound.play();
  } else {
    roundMsg += "It's a tie!";
    type = "tie";
    // tieSound.play();
  }
  rounds++;
  updateUI();
  resultMsgEl.textContent = roundMsg;
  animateResult(type);

  if (rounds === 5) endGame();
}

function getEmoji(choice) {
  if (choice === "rock") return "✊";
  if (choice === "paper") return "✋";
  if (choice === "scissors") return "✌️";
  return "";
}

choiceBtns.forEach(btn => btn.addEventListener('click', handleChoice));

playAgainBtn.addEventListener('click', () => {
  playerScore = 0;
  computerScore = 0;
  rounds = 0;
  gameOver = false;
  updateUI();
  resultMsgEl.textContent = "Make your choice!";
  resultMsgEl.classList.remove('win', 'lose', 'tie');
  playAgainDiv.style.display = "none";
  choiceBtns.forEach(btn => btn.disabled = false);
});

updateUI();