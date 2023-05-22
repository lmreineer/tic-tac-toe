/* eslint-disable no-undef */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */

const hoverImage = document.querySelector('.hover-image');

hoverImage.addEventListener('mouseover', () => {
  hoverImage.style.transition = '0.1s';
  hoverImage.style.opacity = '0.8';
});

hoverImage.addEventListener('mouseout', () => {
  hoverImage.style.opacity = '1';
});

// marking animations
function xAnimation() {
  anime({
    targets: '.xActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

function oAnimation() {
  anime({
    targets: '.oActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

// audio variables
const victorySound = new Audio('../assets/sound-clips/victory-sound-clip.wav');
victorySound.preload = 'auto';
victorySound.volume = '0.5';
const drawSound = new Audio('../assets/sound-clips/draw-sound-clip.wav');
drawSound.preload = 'auto';

const winningCombinations = [[0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const box = document.querySelectorAll('.text');
const gameBoard = Array(9).fill(null);

function checkWinner() {
  // eslint-disable-next-line no-restricted-syntax
  for (const [a, b, c] of winningCombinations) {
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if ([...box].every((el) => el.innerText.length > 0)) {
    // animate automatically
    box.forEach((b) => {
      b.classList.add('blink');
    });
    drawSound.play();
    return 'draw';
  }

  return null;
}

let twoPlayerMode = false;
let resetTime;
let generateO;
// enable waiting for turns
let clickDisabled = false;

const border = document.querySelectorAll('.border');
const O = 'O';
let X = 'X';

const playerUser = document.querySelector('.player-user');
const computerUser = document.querySelector('.computer-user');

const standardImage = document.querySelector('.standard-image');

function changeVisualMode() {
  standardImage.classList.toggle('two-player');
  if (standardImage.classList.contains('two-player')) {
    standardImage.src = '../assets/images/two-player.png';
    hoverImage.src = '../assets/images/two-player-hover.png';
    playerUser.innerHTML = 'Player 1 &nbsp(<span class="span-player">X</span>)';
    computerUser.innerHTML = 'Player 2 &nbsp(<span class="span-computer">O</span>)';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '0.5';
  } else {
    standardImage.src = '../assets/images/single-player.png';
    hoverImage.src = '../assets/images/single-player-hover.png';
    playerUser.innerHTML = 'Player &nbsp(<span class="span-player">X</span>)';
    computerUser.innerHTML = 'Computer &nbsp(<span class="span-computer">O</span>)';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '1';
    playerUser.style.opacity = '1';
  }
}

function changeVisualPlayer() {
  if (X !== 'X') {
    playerUser.style.transition = '0.1s';
    playerUser.style.opacity = '0.5';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '1';
  } else {
    playerUser.style.transition = '0.1s';
    playerUser.style.opacity = '1';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '0.5';
  }

  if (checkWinner() === 'draw') {
    playerUser.style.transition = '0.1s';
    playerUser.style.opacity = '0.5';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '0.5';
  }
}

function resetGame() {
  for (let j = 0; j < box.length; j += 1) {
    box[j].classList.remove('blink');
    box[j].innerText = '';
    gameBoard[j] = null;
    border.forEach((text) => {
      text.querySelectorAll(':not(.blink)').forEach((out) => {
        const nonBlink = out;
        nonBlink.classList.remove('non-blink');
      });
    });
  }
  clearTimeout(resetTime);
  clearTimeout(generateO);
  // start being x again
  X = 'X';
  clickDisabled = false;

  if (twoPlayerMode === true) {
    changeVisualPlayer();
  }
}

function changeMode() {
  resetGame();
  // toggle modes
  twoPlayerMode = !twoPlayerMode;
}

const userContainer = document.querySelector('.user-container');

userContainer.addEventListener('click', () => {
  changeMode();
  changeVisualMode();
});

function minimax(board, depth, isMaximizing) {
  const winner = checkWinner();
  if (winner) {
    return winner === X ? -10 + depth : 10 - depth;
  }

  if (!board.includes(null)) {
    return 0;
  }

  let bestValue = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < board.length; i += 1) {
    if (!board[i]) {
      // eslint-disable-next-line no-param-reassign
      board[i] = isMaximizing ? O : X;
      const value = minimax(board, depth + 1, !isMaximizing);
      // eslint-disable-next-line no-param-reassign
      board[i] = null;
      if (isMaximizing) {
        bestValue = Math.max(bestValue, value);
      } else {
        bestValue = Math.min(bestValue, value);
      }
    }
  }
  return bestValue;
}

let counter = 0;

function animateWinner() {
  // eslint-disable-next-line no-restricted-syntax
  for (const combination of winningCombinations) {
    const elements = combination.map((index) => box[index]);

    if (elements[0].innerText === elements[1].innerText
      && elements[1].innerText === elements[2].innerText
      && elements[0].innerText !== '') {
      elements.forEach((element) => element.classList.add('blink'));
      border.forEach((text) => {
        text.querySelectorAll(':not(.blink)').forEach((out) => {
          const nonBlink = out;
          nonBlink.classList.add('non-blink');
        });
      });
      victorySound.play();
      if (counter === 0) {
        resetTime = setTimeout(() => {
          resetGame();
        }, 3100);
      }
      return true;
    }
  }
  return false;
}

// random depth levels
const randomLevels = [2, 6, 8][Math.floor(Math.random() * 3)];
const maxDepth = randomLevels;

function computerMode(index) {
  if (gameBoard[index] === null && clickDisabled === false) {
    //  x selection
    gameBoard[index] = X;
    box[index].innerText = X;
    clickDisabled = true;
    if (checkWinner() === null) {
      generateO = setTimeout(() => {
        let bestMove = -1;
        let bestValue = -Infinity;
        for (let j = 0; j < gameBoard.length; j += 1) {
          if (!gameBoard[j]) {
            gameBoard[j] = O;
            const value = minimax(gameBoard, maxDepth, false);
            gameBoard[j] = null;
            if (value > bestValue) {
              bestValue = value;
              bestMove = j;
            }
          }
        }
        // animation implementation for AI
        for (let i = 0; i < box.length; i += 1) {
          if (box[i].classList.contains('oActive')) {
            box[i].classList.remove('oActive');
          }
        }
        box[bestMove].classList.add('oActive');
        gameBoard[bestMove] = O;
        box[bestMove].innerText = O;

        oAnimation();
        animateWinner();
        clickDisabled = false;
      }, 500);
    }
  }
}

function playerMode(index) {
  if (gameBoard[index] !== 'X' && gameBoard[index] !== 'O') {
    gameBoard[index] = X;
    box[index].innerText = X;
    // switch turns
    X = X === 'X' ? 'O' : 'X';
  }
  changeVisualPlayer();
}

let removeClass = false;

function disableRepeat(i) {
  if (gameBoard[i] === 'X' || gameBoard[i] === 'O') {
    removeClass = true;
  } else {
    removeClass = false;
  }
}

function checkPlayerMode(i) {
  if (twoPlayerMode === true) {
    return playerMode(i);
  }
  return computerMode(i);
}

function clickCounter() {
  counter += 1;
  if (counter === 2) {
    resetGame();
    counter = 0;
  } else if (counter === 1) {
    animateWinner();
    resetTime = setTimeout(() => {
      resetGame();
    }, 3100);
  }
}

function clickReset() {
  if (checkWinner() !== null) {
    // if x or draw
    if (checkWinner() !== 'O') {
      clickCounter();
    } else if (checkWinner() === 'O') {
      if (twoPlayerMode === false) {
        resetGame();
      } else {
        clickCounter();
      }
    }
  }
}

for (let i = 0; i < box.length; i += 1) {
  // eslint-disable-next-line no-loop-func
  box[i].addEventListener('click', () => {
    // disables repeating animation on already marked boxes when clicked
    disableRepeat(i);

    if (checkWinner() === null) {
      checkPlayerMode(i);
    }

    // functions for x, draw, and two-player o
    clickReset();
  });
}

box.forEach((b) => {
  // animation implementation for player / disable repeat clicks on already marked boxes
  b.addEventListener('click', () => {
    for (let i = 0; i < box.length; i += 1) {
      if (box[i].classList.contains('xActive')) {
        box[i].classList.remove('xActive');
      }
    }
    b.classList.add('xActive');

    if (removeClass === true) {
      b.classList.remove('xActive');
    }

    if (b.classList.contains('xActive')) {
      xAnimation();
    }
  });
});

const restartButton = document.querySelector('.restart-button');

restartButton.addEventListener('click', () => {
  resetGame();
});
