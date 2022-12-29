const userContainer = document.querySelector('.user-container');
const userComputer = document.querySelector('.user-computer');
const spanComputer = document.querySelector('.span-computer');
const normalImage = document.querySelector('.normal-image');
const hoverImage = document.querySelector('.hover-image');

let twoPlayerMode = false;

userContainer.addEventListener('click', () => {
  if (twoPlayerMode === false) {
    normalImage.src = './res/two-player.png';
    hoverImage.src = './res/two-player-hover.png';
    userContainer.childNodes[1].innerHTML = 'Player 1 &nbsp(<span class="span-player">X</span>)'
    userContainer.childNodes[3].innerHTML = 'Player 2 &nbsp(<span class="span-computer">O</span>)'
    twoPlayerMode = true;
  } else if (twoPlayerMode === true) {
    normalImage.src = './res/single-player.png';
    hoverImage.src = './res/single-player-hover.png';
    userContainer.childNodes[1].innerHTML = 'Player &nbsp(<span class="span-player">X</span>)'
    userContainer.childNodes[3].innerHTML = 'Computer &nbsp(<span class="span-computer">O</span>)'
    twoPlayerMode = false;
  }
});

const allBoxes = document.querySelectorAll('.text');
const upLeftBox = document.querySelector('.up-left');
const upMidBox = document.querySelector('.up-mid');
const upRightBox = document.querySelector('.up-right');
const midLeftBox = document.querySelector('.mid-left');
const centerBox = document.querySelector('.center');
const midRightBox = document.querySelector('.mid-right');
const bottomLeftBox = document.querySelector('.bot-left');
const bottomMidBox = document.querySelector('.bot-mid');
const bottomRightBox = document.querySelector('.bot-right');

function animateO() {
  anime({
    targets: '.oActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

// if player chose a certain spot, choose certain available boxes for the computer to choose from which will be randomized, can be 2 or more

const restartButton = document.querySelector('.restart-button');

let restartClicked = false;

restartButton.addEventListener('click', () => {
  if (restartClicked === false) {
      restartClicked = true;
  } else if (restartClicked === true) {
    restartClicked = false;
  }
});

function markO() {
  setTimeout(() => {
    const restAllBoxes = [...allBoxes].filter((box) => !box.innerHTML.includes('X') && !box.innerHTML.includes('O'));
    const randomBox = rando(restAllBoxes).value;
    if (restartClicked === false) {
      randomBox.innerHTML = 'O';
    } else if (restartClicked === true) {
      allBoxes.forEach((box) => {
        box.innerHTML = '';
      })
    }

    // toggle 'oComputer' class
    const clickedBox = randomBox;
    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].classList.replace('oActive', 'text');
    }
    clickedBox.classList.replace('text', 'oActive');

    animateO();
  }, 500);
}

function markX(box) {
  if (!box.innerHTML.includes('X')
  && !box.innerHTML.includes('O')) {
    box.innerHTML = 'X';
    markO();
  }
}

function animateX() {
  anime({
    targets: '.xActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

// toggle 'xActive' class, same purpose as 'oComputer' class, only functions are different
allBoxes.forEach((btnClickEvent, _, buttons) => {
  btnClickEvent.addEventListener('click', () => {
    buttons.forEach((bt) => {
      bt.classList.toggle('xActive', bt === btnClickEvent);
    });
  });

  btnClickEvent.addEventListener('click', () => {
    if (!btnClickEvent.innerHTML.includes('X')
    && !btnClickEvent.innerHTML.includes('O')) {
      animateX();
    }
  });
});

function checkWhosWinner() {
  if (bottomRightBox.innerHTML.includes('X')
  && bottomMidBox.innerHTML.includes('X')
  && bottomLeftBox.innerHTML.includes('X')) {
    centerBox.innerHTML = 'X win';
  }
}

// single mode
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

let functionIsRunning = false;

function clickFunction(e, box) {
  if (!functionIsRunning) {
    firstPlayer(e, box);
    functionIsRunning = true;
  } else {
    functionIsRunning = false;
    secondPlayer(e, box);
  }
}

// avoid continuous click from X

let boxDisabled = false;

allBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    restartClicked = false;
    if (boxDisabled === false) {
      boxDisabled = true;
      markX(box);
      setTimeout(() => {
        boxDisabled = false;
        if (restartClicked === false) {
          markX(box);
        } else if (restartClicked === true) {
          allBoxes.forEach((box) => {
            box.innerHTML = '';
          })
        }
      }, 600);
    }
  });

  box.addEventListener('click', () => {
    checkWhosWinner();
  });
});

restartButton.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    box.innerHTML = '';
  });
});