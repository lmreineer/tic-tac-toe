// note:
// if player chose a certain spot, choose certain available boxes for the computer to choose from which will be randomized, can be 2 or more

const userContainer = document.querySelector('.user-container');
const userPlayer = document.querySelector('.user-player');
const userComputer = document.querySelector('.user-computer');
const spanComputer = document.querySelector('.span-computer');
const normalImage = document.querySelector('.normal-image');
const hoverImage = document.querySelector('.hover-image');
const allBoxes = document.querySelectorAll('.text');

hoverImage.addEventListener('mouseover', () => {
  hoverImage.style.transition = '0.3s';
  hoverImage.style.opacity = '0.8';
});

hoverImage.addEventListener('mouseout', () => {
  hoverImage.style.opacity = '1';
});

let twoPlayerMode = false;

userContainer.addEventListener('click', () => {
  if (twoPlayerMode === false) {
    normalImage.src = './res/two-player.png';
    hoverImage.src = './res/two-player-hover.png';
    userContainer.childNodes[1].innerHTML = 'Player 1 &nbsp(<span class="span-player">X</span>)';
    userContainer.childNodes[3].innerHTML = 'Player 2 &nbsp(<span class="span-computer">O</span>)';
    userComputer.style.transition = '0.2s';
    userComputer.style.opacity = '0.5';
    twoPlayerMode = true;
  } else if (twoPlayerMode === true) {
    normalImage.src = './res/single-player.png';
    hoverImage.src = './res/single-player-hover.png';
    userContainer.childNodes[1].innerHTML = 'Player &nbsp(<span class="span-player">X</span>)';
    userContainer.childNodes[3].innerHTML = 'Computer &nbsp(<span class="span-computer">O</span>)';
    userComputer.style.transition = '0.2s';
    userComputer.style.opacity = '1';
    userPlayer.style.opacity = '1';
    twoPlayerMode = false;
  }
});

let restartClicked = false;

userContainer.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    box.innerHTML = '';
  });

  if (restartClicked === false) {
    restartClicked = true;
  } else if (restartClicked === true) {
    restartClicked = false;
  }
});

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

const restartButton = document.querySelector('.restart-button');

restartButton.addEventListener('click', () => {
  if (restartClicked === false) {
    restartClicked = true;
  } else if (restartClicked === true) {
    restartClicked = false;
  }
});

// avoids continuous click from X
let boxDisabled = false;

function markO() {
  setTimeout(() => {
    const restAllBoxes = [...allBoxes].filter((box) => !box.innerHTML.includes('X') && !box.innerHTML.includes('O'));
    const randomBox = rando(restAllBoxes).value;
    if (restartClicked === false
      && boxDisabled === false) {
      randomBox.innerHTML = 'O';
    } else if (restartClicked === true) {
      allBoxes.forEach((box) => {
        box.innerHTML = '';
      });
    }

    // toggle 'oComputer' class
    const clickedBox = randomBox;
    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].classList.replace('oActive', 'comp');
    }
    clickedBox.classList.replace('comp', 'oActive');
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
    targets: '.active',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

// toggle 'active' class, used for both game mode
// same purpose as 'oComputer' class, only functions are different
allBoxes.forEach((btnClickEvent, _, buttons) => {
  btnClickEvent.addEventListener('click', () => {
    buttons.forEach((bt) => {
      bt.classList.toggle('active', bt === btnClickEvent);
    });
  });

  btnClickEvent.addEventListener('click', () => {
    if (!btnClickEvent.innerHTML.includes('X')
    && !btnClickEvent.innerHTML.includes('O')) {
      animateX();
    }
  });
});

// single mode
function firstPlayer(e) {
  allBoxes.forEach(() => {
    if (!e.target.innerHTML.includes('X')
    || !e.target.innerHTML.includes('O')) {
      e.target.innerHTML = 'X';
    }
  });
}

function secondPlayer(e) {
  allBoxes.forEach(() => {
    if (!e.target.innerHTML.includes('X')
    || !e.target.innerHTML.includes('O')) {
      e.target.innerHTML = 'O';
    }
  });
}


function checkWhosWinner() {
  if (upLeftBox.innerHTML.includes('X')
  && centerBox.innerHTML.includes('X')
  && bottomRightBox.innerHTML.includes('X')) {
    upLeftBox.classList.add('blink');
    centerBox.classList.add('blink');
    bottomRightBox.classList.add('blink');
    setTimeout(() => {
      upLeftBox.classList.remove('blink');
      centerBox.classList.remove('blink');
      bottomRightBox.classList.remove('blink');
    }, 3100);
  } else if (upLeftBox.innerHTML.includes('X')
  && upMidBox.innerHTML.includes('X')
  && upRightBox.innerHTML.includes('X')) {
    upLeftBox.classList.add('blink');
    upMidBox.classList.add('blink');
    upRightBox.classList.add('blink');
    boxDisabled = true;
    setTimeout(() => {
      upLeftBox.classList.remove('blink');
      upMidBox.classList.remove('blink');
      upRightBox.classList.remove('blink');
    }, 3100);
  }
}

// conditions the markX and restart button
function markXandRestart(box) {
  if (twoPlayerMode === false) {
    restartClicked = false;
    if (boxDisabled === false) {
      markX(box);
      setTimeout(() => {
        if (restartClicked === false) {
          markX(box);
        } else if (restartClicked === true) {
          allBoxes.forEach((box) => {
            box.innerHTML = '';
          });
        }
      }, 600);
    }
  }
}

allBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    markXandRestart(box);
    checkWhosWinner();
  });
});

restartButton.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    box.innerHTML = '';
  });
});
