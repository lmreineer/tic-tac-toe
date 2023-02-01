// for animejs functions:
/* eslint-disable no-undef */
const hoverImage = document.querySelector('.hover-image');

hoverImage.addEventListener('mouseover', () => {
  hoverImage.style.transition = '0.1s';
  hoverImage.style.opacity = '0.8';
});

hoverImage.addEventListener('mouseout', () => {
  hoverImage.style.opacity = '1';
});

const userContainer = document.querySelector('.user-container');
const playerUser = document.querySelector('.player-user');
const computerUser = document.querySelector('.computer-user');
const standardImage = document.querySelector('.standard-image');

userContainer.addEventListener('click', () => {
  standardImage.classList.toggle('two-player');
  if (standardImage.classList.contains('two-player')) {
    standardImage.src = './res/images/two-player.png';
    hoverImage.src = './res/images/two-player-hover.png';
    playerUser.innerHTML = 'Player 1 &nbsp(<span class="span-player">X</span>)';
    computerUser.innerHTML = 'Player 2 &nbsp(<span class="span-computer">O</span>)';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '0.5';
  } else {
    standardImage.src = './res/images/single-player.png';
    hoverImage.src = './res/images/single-player-hover.png';
    playerUser.innerHTML = 'Player &nbsp(<span class="span-player">X</span>)';
    computerUser.innerHTML = 'Computer &nbsp(<span class="span-computer">O</span>)';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '1';
    playerUser.style.opacity = '1';
  }
});

const box = document.querySelectorAll('.text');
const X = 'X';
const O = 'O';
const gameBoard = Array(9).fill(null);

// enable turns
let clickDisabled = false;

const winningCombinations = [[0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i += 1) {
    const [a, b, c] = winningCombinations[i];
    if (gameBoard[a]
      && gameBoard[a] === gameBoard[b]
      && gameBoard[b] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
}

const levels = [2, 6, 8];
const randomLevels = levels[Math.floor(Math.random() * levels.length)];
const maxDepth = randomLevels;

function minimax(board, depth, isMaximizing) {
  if (depth === maxDepth) {
    return 0;
  }

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

// do not repeat clicks on marked boxes
let removeClass = false;

// animation functions
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

function boxClickHandler(index) {
  if (gameBoard[index] === 'X' || gameBoard[index] === 'O') {
    removeClass = true;
  } else {
    removeClass = false;
  }

  if (gameBoard[index] === null && clickDisabled === false) {
    const winner = checkWinner();
    if (winner === null) {
      gameBoard[index] = X;
      box[index].innerText = X;
      clickDisabled = true;
      setTimeout(() => {
        let bestMove = -1;
        let bestValue = -Infinity;
        for (let j = 0; j < gameBoard.length; j += 1) {
          if (!gameBoard[j]) {
            gameBoard[j] = O;
            const value = minimax(gameBoard, 0, false);
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

        box.forEach((b) => {
          // if is for stopping generation of O's when boxes are full
          if (b.innerText === '') {
            box[bestMove].classList.add('oActive');
            gameBoard[bestMove] = O;
            box[bestMove].innerText = O;
          }

          if (b.classList.contains('oActive')) {
            const oActive = document.querySelector('.oActive');
            oActive.classList.add('line');
          }

          const line = document.querySelectorAll('.line');
          if (line.length >= 3 && checkWinner() === 'O') {
            line.forEach((l) => {
              l.classList.add('blink');
              const compWins = setTimeout(() => {
                l.classList.remove('blink');
              }, 3000);

              if (l.classList.contains('blink')) {
                b.addEventListener('click', () => {
                  clearTimeout(compWins);
                });
              }
            });
          }
        });

        oAnimation();
        clickDisabled = false;
      }, 500);
    }
  }
}

for (let i = 0; i < box.length; i += 1) {
  box[i].addEventListener('click', () => {
    boxClickHandler(i);

    if (checkWinner()) {
      for (let j = 0; j < box.length; j += 1) {
        box[j].classList.remove('blink');
        box[j].innerText = '';
        gameBoard[j] = null;
      }
    }
  });
}

box.forEach((b) => {
  // animation implementation for player / do not repeat clicks on marked boxes
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
