const upperTexts = document.querySelectorAll('.para');
const restartButton = document.querySelector('.restart');

const allBoxes = document.querySelectorAll('.text');

let functionIsRunning = false;

allBoxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    clickFunction(e, box);
  })
})

function clickFunction(e, box) {
  if (!functionIsRunning) {
    firstPlayer(e, box);
    functionIsRunning = true;
  } else {
    secondPlayer(e, box);
    functionIsRunning = false;
  }
}

function firstPlayer(e, box) {
  if (!box.innerHTML.includes('X')) {
    if (!box.innerHTML.includes('O')) {
      e.target.innerHTML = 'X';
    }
  }
}

function secondPlayer(e, box) {
  if (!box.innerHTML.includes('O')) {
    if (!box.innerHTML.includes('X')) {
      e.target.innerHTML = 'O';
    }
  }
}