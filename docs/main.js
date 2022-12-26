const allBoxes = document.querySelectorAll('.text');
const boxTexts = document.querySelectorAll('.text');
const upLeftBox = document.querySelector('.up-left');
const upMidBox = document.querySelector('.up-mid');
const upRightBox = document.querySelector('.up-right');
const midLeftBox = document.querySelector('.mid-left');
const centerBox = document.querySelector('.center');
const midRightBox = document.querySelector('.mid-right');
const bottomLeftBox = document.querySelector('.bot-left');
const bottomMidBox = document.querySelector('.bot-mid');
const bottomRightBox = document.querySelector('.bot-right');

let functionIsRunning = false;

allBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    getPlayerChoice(box);
    checkWhosWinner();
  })
  
  box.addEventListener('mousedown', () => {
    setActiveClass(box);
  })
})

function getPlayerChoice(box) {
  if (!box.innerHTML.includes('X')) {
    if (!box.innerHTML.includes('O')) {
      box.innerHTML = 'X';
      getComputerChoice(box);
    }
  }
  anime({
    targets: '.active',
    scale: [2,1],
    opacity: [0,1],
    easing: "easeOutCirc",
    duration: 800,
  })
}

// non-functioning bug
// this function knows specific boxes
// if player chose a certain spot, choose certain available boxes for the computer to choose from which will be randomized, can be 2 or more
// i put a 'box' parameter here for a reason
// manually do it?

// after an hour, i'm trying to manually do it
// i'm fixing an issue about a random.innerHTML that doesn't register at times

// still not functioning at times.
// add playerpick and computerpick

// computer actually looks like it's trying to win sometimes.

// issue, not animating unless you double click it, also take note of higher chances of computer picking a box
function getComputerChoice() {
  setTimeout(() => {
    let emptyBox = [...allBoxes].filter(box => box.innerHTML.trim() === '');
    let random = allBoxes[Math.floor(Math.random() * emptyBox.length)];
    console.log(emptyBox)
    if (!random.innerHTML.includes('X') &&
    !random.innerHTML.includes('O')) {
      random.innerHTML = 'O';
    }
    setComputerActiveClass(random);
  }, 500);
}


function setActiveClass(box) {
  for (let i = 0; i < [...allBoxes].length; i++) {
    let clicked = boxTexts[i];
    clicked.addEventListener('click', () => {
      let active = document.querySelector('.text.active');
      if (active) {
        active.classList.remove('active');
      }
      box.classList.add('active');
    })
  }
}

function setComputerActiveClass(random) {
  for (let i = 0; i < [...allBoxes].length; i++) {
    let computerClicked = boxTexts[i];
    computerClicked.addEventListener('click', () => {
      let computerActive = document.querySelector('.text.computerActive');
      if (computerActive) {
        computerActive.classList.remove('computerActive');
      }
      random.classList.add('computerActive');
    })
  }
}

function checkWhosWinner() {
  if (bottomRightBox.innerHTML.includes('X') &&
  bottomMidBox.innerHTML.includes('X') &&
  bottomLeftBox.innerHTML.includes('X')) {
    centerBox.innerHTML = 'X win'
  }
}

// function firstPlayer(e, box) {
//   if (!box.innerHTML.includes('X')) {
//     if (!box.innerHTML.includes('O')) {
//       e.target.innerHTML = 'X';
//     }
//   }
// }

// function secondPlayer(e, box) {
//   if (!box.innerHTML.includes('O')) {
//     if (!box.innerHTML.includes('X')) {
//       e.target.innerHTML = 'O';
//     }
//   }
// }

// function clickFunction(e, box) {
//   if (!functionIsRunning) {
//     firstPlayer(e, box);
//     functionIsRunning = true;
//   } else {
//     functionIsRunning = false;
//     secondPlayer(e, box);
//   }
// }

const restartButton = document.querySelector('.restart-button');

restartButton.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    box.innerHTML = '';
    functionIsRunning = false;
  })
})