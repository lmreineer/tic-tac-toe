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
  hoverImage.style.transition = '0.15s';
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

let stopMarks = false;

function markO() {
  setTimeout(() => {
    const restAllBoxes = [...allBoxes].filter((box) => !box.innerHTML.includes('X') && !box.innerHTML.includes('O'));
    const randomBox = rando(restAllBoxes).value;
    if (restartClicked === false
      && stopMarks === false) {
      allBoxes.forEach((box) => {
        if (box.innerHTML.includes('X')) {
          randomBox.innerHTML = 'O';
        }
      });
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

const upLeftBox = document.querySelector('.up-left');
const upMidBox = document.querySelector('.up-mid');
const upRightBox = document.querySelector('.up-right');
const midLeftBox = document.querySelector('.mid-left');
const centerBox = document.querySelector('.center');
const midRightBox = document.querySelector('.mid-right');
const bottomLeftBox = document.querySelector('.bot-left');
const bottomMidBox = document.querySelector('.bot-mid');
const bottomRightBox = document.querySelector('.bot-right');

let win = false;

function checkWinner() {
  allBoxes.forEach((box) => {
    if (!box.classList.contains('blink')) {
      if ((bottomRightBox.innerHTML.includes('O'))
      && (bottomMidBox.innerHTML.includes('O'))
      && (bottomLeftBox.innerHTML.includes('O'))
      || (bottomRightBox.innerHTML.includes('X'))
      && (bottomMidBox.innerHTML.includes('X'))
      && (bottomLeftBox.innerHTML.includes('X'))) {
        bottomRightBox.classList.add('blink');
        bottomMidBox.classList.add('blink');
        bottomLeftBox.classList.add('blink');
      }
    } else if (box.classList.contains('blink')) {
      stopMarks = true;
      const blinkBox = document.querySelectorAll('.blink');
      blinkBox.forEach((blink) => {
        blink.classList.remove('text');
        if (blink.classList.contains('blink')) {
          win = true;
        } else if (!blink.classList.contains('blink')) {
          win = false;
        }
      });
      const reduceTextOpac = document.querySelectorAll('.text');
      reduceTextOpac.forEach((text) => {
        text.style.transition = '0.15s';
        text.style.opacity = '0.1';
      });
      restartButton.addEventListener('click', () => {
        blinkBox.forEach((blink) => {
          blink.classList.add('text');
        });
        reduceTextOpac.forEach((text) => {
          text.style.transition = 'none';
          text.style.opacity = '1';
        });
        restartClicked = true;
      });
      blinkBox.forEach((blink) => {
        blink.addEventListener('click', () => {
          blinkBox.forEach((blink) => {
            blink.classList.add('text');
          });
        });
      });
      // because of this function, a bug comes in
      // take note of clearTimeout method
      // doesn't work well
      // allBoxes.forEach((box) => {
      //   box.addEventListener('click', () => {
      //     if (win === true) {
      //       allBoxes.forEach((box) => {
      //         box.innerHTML = '';
      //         box.style.transition = 'none';
      //         box.style.oapcity = '1';
      //       });
      //       blinkBox.forEach((blink) => {
      //         blink.classList.add('text');
      //       });
      //       win = false;
      //     }
      //   });
      // });
      setTimeout(() => {
        if (restartClicked === false) {
          blinkBox.forEach((blink) => {
            blink.classList.add('text');
          });
          reduceTextOpac.forEach((text) => {
            text.style.transition = 'none';
            text.style.opacity = '1';
          });
        }
      }, 3200);
    }

    if (stopMarks === true
      && restartClicked === false
      && win === true) {
      setTimeout(() => {
        allBoxes.forEach((box) => {
          if (box.classList.contains('blink')) {
            allBoxes.forEach((box) => {
              box.innerHTML = '';
              box.classList.remove('blink');
              stopMarks = false;
              win = false;
            });
          }
        });
      }, 3100);
    }
  });
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
// same purpose as 'oComputer' class
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

let firstTurn = false;

function turnFunction(e) {
  allBoxes.forEach(() => {
    if (firstTurn === false
      && !e.target.innerHTML.includes('O')
      && !e.target.innerHTML.includes('X')) {
      firstPlayer(e);
      userPlayer.style.opacity = '0.4';
      userComputer.style.transition = '0.5s';
      userComputer.style.opacity = '1';
      firstTurn = true;
    } else if (firstTurn === true
      && !e.target.innerHTML.includes('X')
      && !e.target.innerHTML.includes('O')) {
      secondPlayer(e);
      userComputer.style.opacity = '0.4';
      userPlayer.style.transition = '0.5s';
      userPlayer.style.opacity = '1';
      firstTurn = false;
    }

    restartButton.addEventListener('click', () => {
      userComputer.style.opacity = '0.4';
      userPlayer.style.transition = '0.5s';
      userPlayer.style.opacity = '1';
      firstTurn = false;
    });

    userComputer.addEventListener('click', () => {
      userComputer.style.opacity = '0.4';
      userPlayer.style.transition = '0.5s';
      userPlayer.style.opacity = '1';
      firstTurn = false;
    });
  });
}

let boxDisabled = false;

allBoxes.forEach((box) => {
  box.addEventListener('click', (e) => {
    if (twoPlayerMode === false) {
      restartClicked = false;
      if (boxDisabled === false
        && stopMarks === false) {
        markX(box);
        checkWinner();
        boxDisabled = true;
        setTimeout(() => {
          boxDisabled = false;
        }, 550);
      }
    } else if (twoPlayerMode === true) {
      turnFunction(e);
    } else if (restartClicked === true) {
      allBoxes.forEach((box) => {
        box.innerHTML = '';
      });
    }
    const blinkBox = document.querySelectorAll('.blink');
    blinkBox.forEach((blink) => {
      if (!blink.classList.contains('text')) {
        console.log(blink)
      }
    });
  });
});

restartButton.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    box.innerHTML = '';
    win = false;
    if (box.classList.contains('blink')) {
      allBoxes.forEach((box) => {
        box.classList.remove('blink');
        stopMarks = false;
      });
    }
  });
});
