const allBoxes = document.querySelectorAll('.text');
const upLeftBox = document.querySelector('.up-left');
const upMidBox = document.querySelector('.up-mid');
const upRightBox = document.querySelector('.up-right');
const midLeftBox = document.querySelector('.mid-left');
const centerBox = document.querySelector('.center');
const midRightBox = document.querySelector('.mid-right');
const botLeftBox = document.querySelector('.bot-left');
const botMidBox = document.querySelector('.bot-mid');
const botRightBox = document.querySelector('.bot-right');

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