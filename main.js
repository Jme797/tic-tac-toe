const cells = document.querySelectorAll(".col");

const winningHands = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

let xNumWins = 0;
let oNumWins = 0;

const updateScoreBoard = (winner) => {
  if (winner === "x") {
    xNumWins += 1;
  } else if (winner === "o") {
    oNumWins += 1;
  }
  document.getElementById("x").innerHTML = xNumWins;
  document.getElementById("o").innerHTML = oNumWins;
};

const gameActive = true;

const cross = '<div class="x">X</div>';
const naught = '<div class="circle"><div></div></div>';

let circles = [];
let xs = [];

let isCirclesTurn = false;

const dialog = document.querySelector("dialog");
const button = document.querySelector("button");

const checkHands = (selectedCells) => {
  let winner = false;
  winningHands.forEach((winningHand) => {
    winner =
      winningHand.every((cellNumber) => selectedCells.includes(cellNumber)) ||
      winner;
  });
  return winner;
};

const checkForWinner = () => {
  if (checkHands(circles)) {
    return "o";
  } else if (checkHands(xs)) {
    return "x";
  }
  return false;
};

const checkCellAvailable = (cell) => {
  return !(circles.includes(cell) || xs.includes(cell));
};

const updateTurn = () => {
    const activePLayer = document.querySelector('.active')
    activePLayer.classList.remove('active')

    isCirclesTurn = !isCirclesTurn;
    
    if (isCirclesTurn) {
        document.querySelector('.player-0').classList.add('active')
    } else {
        document.querySelector('.player-x').classList.add('active')
    }
}

const handleSelectCell = (e) => {
  if (!gameActive) {
    return;
  }

  const target = e.target;
  const dataset = target.dataset;

  const cell = parseInt(dataset.cellNumber, 10);

  if (!checkCellAvailable(cell)) {
    return;
  }

  target.innerHTML = isCirclesTurn ? naught : cross;

  if (isCirclesTurn) {
    circles.push(cell);
  } else {
    xs.push(cell);
  }

  const winner = checkForWinner();

  if (winner) {
    updateScoreBoard(winner)
    document.querySelector("#winner").innerHTML = winner;
    dialog.open = true;
  } else if (circles.length + xs.length === 9) {
    document.querySelector("#winner").innerHTML = 'Nobody';
    dialog.open = true;
  }

  updateTurn()
};

cells.forEach((cell, i) => {
  cell.dataset.cellNumber = i;
  cell.addEventListener("click", handleSelectCell);
});

// P1 or P2
const playAgain = () => {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  circles = [];
  xs = [];

  dialog.open = false;
};

button.addEventListener("click", playAgain);
