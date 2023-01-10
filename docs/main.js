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

  allBoxes.forEach((box) => {
    if (box.classList.contains('blink')) {
      allBoxes.forEach((box) => {
        box.classList.remove('blink');
        stopMarks = false;
      });
    }
  });
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
          checkWinner();
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
// needs tie
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
      } else if ((bottomRightBox.innerHTML.includes('O'))
      && (centerBox.innerHTML.includes('O'))
      && (upLeftBox.innerHTML.includes('O'))
      || (bottomRightBox.innerHTML.includes('X'))
      && (centerBox.innerHTML.includes('X'))
      && (upLeftBox.innerHTML.includes('X'))) {
        bottomRightBox.classList.add('blink');
        centerBox.classList.add('blink');
        upLeftBox.classList.add('blink');
      } else if ((bottomRightBox.innerHTML.includes('O'))
      && (midRightBox.innerHTML.includes('O'))
      && (upRightBox.innerHTML.includes('O'))
      || (bottomRightBox.innerHTML.includes('X'))
      && (midRightBox.innerHTML.includes('X'))
      && (upRightBox.innerHTML.includes('X'))) {
        bottomRightBox.classList.add('blink');
        midRightBox.classList.add('blink');
        upRightBox.classList.add('blink');
      } else if ((bottomMidBox.innerHTML.includes('O'))
      && (centerBox.innerHTML.includes('O'))
      && (upMidBox.innerHTML.includes('O'))
      || (bottomMidBox.innerHTML.includes('X'))
      && (centerBox.innerHTML.includes('X'))
      && (upMidBox.innerHTML.includes('X'))) {
        bottomMidBox.classList.add('blink');
        centerBox.classList.add('blink');
        upMidBox.classList.add('blink');
      } else if ((bottomLeftBox.innerHTML.includes('O'))
      && (centerBox.innerHTML.includes('O'))
      && (upRightBox.innerHTML.includes('O'))
      || (bottomLeftBox.innerHTML.includes('X'))
      && (centerBox.innerHTML.includes('X'))
      && (upRightBox.innerHTML.includes('X'))) {
        bottomLeftBox.classList.add('blink');
        centerBox.classList.add('blink');
        upRightBox.classList.add('blink');
      } else if ((bottomLeftBox.innerHTML.includes('O'))
      && (midLeftBox.innerHTML.includes('O'))
      && (upLeftBox.innerHTML.includes('O'))
      || (bottomLeftBox.innerHTML.includes('X'))
      && (midLeftBox.innerHTML.includes('X'))
      && (upLeftBox.innerHTML.includes('X'))) {
        bottomLeftBox.classList.add('blink');
        midLeftBox.classList.add('blink');
        upLeftBox.classList.add('blink');
      } else if ((midLeftBox.innerHTML.includes('O'))
      && (centerBox.innerHTML.includes('O'))
      && (midRightBox.innerHTML.includes('O'))
      || (midLeftBox.innerHTML.includes('X'))
      && (centerBox.innerHTML.includes('X'))
      && (midRightBox.innerHTML.includes('X'))) {
        midLeftBox.classList.add('blink');
        centerBox.classList.add('blink');
        midRightBox.classList.add('blink');
      } else if ((upLeftBox.innerHTML.includes('O'))
      && (upMidBox.innerHTML.includes('O'))
      && (upRightBox.innerHTML.includes('O'))
      || (upLeftBox.innerHTML.includes('X'))
      && (upMidBox.innerHTML.includes('X'))
      && (upRightBox.innerHTML.includes('X'))) {
        upLeftBox.classList.add('blink');
        upMidBox.classList.add('blink');
        upRightBox.classList.add('blink');
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
      blinkBox.forEach((blink) => {
        blink.addEventListener('click', () => {
          if (win === true) {
            blinkBox.forEach((blink) => {
              blink.classList.add('text');
            });
          }
        });
      });
      var resetStyles = setTimeout(() => {
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
      const clearAll = setTimeout(() => {
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
      const blinkBox = document.querySelectorAll('.blink');
      const reduceTextOpac = document.querySelectorAll('.text');
      allBoxes.forEach((box) => {
        box.classList.add('clear');
      });
      // const clickRestart = document.querySelectorAll('.clear');
      // clickRestart.forEach((restart) => {
      //   restart.addEventListener('click', () => {
      //       if (win === true) {
      //         allBoxes.forEach((box) => {
      //           if (box.classList.contains('blink')) {
      //             clickRestart.forEach((restart) => {
      //               restart.innerHTML = '';
      //               restart.classList.remove('blink');
      //               restart.classList.add('text');
      //             });
      //             stopMarks = false;
      //             win = false;
      //           }
      //         });
      //       }
      //   });
      // });
      restartButton.addEventListener('click', () => {
        blinkBox.forEach((blink) => {
          blink.classList.add('text');
        });
        reduceTextOpac.forEach((text) => {
          text.style.transition = 'none';
          text.style.opacity = '1';
        });
        allBoxes.forEach((box) => {
          box.innerHTML = '';
          clearTimeout(clearAll);
          clearTimeout(resetStyles);
        });
        restartClicked = true;
        win = false;
      });

      userContainer.addEventListener('click', () => {
        blinkBox.forEach((blink) => {
          blink.classList.add('text');
        });
        reduceTextOpac.forEach((text) => {
          text.style.transition = 'none';
          text.style.opacity = '1';
        });
        allBoxes.forEach((box) => {
          box.innerHTML = '';
          clearTimeout(clearAll);
          clearTimeout(resetStyles);
        });
        restartClicked = true;
        win = false;
      });
    } else if (win === false) {
      allBoxes.forEach((box) => {
        box.classList.remove('clear');
      });
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

// two player mode
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

function checkTwoPlayerWinner() {
  allBoxes.forEach((box) => {
    if (box.classList.contains('blink')) {
      const blinkBox = document.querySelectorAll('.blink');
      const reduceTextOpac = document.querySelectorAll('.text');
      const resetStyles = setTimeout(() => {
        blinkBox.forEach((blink) => {
          blink.classList.remove('blink');
          blink.classList.add('text');
        });
        reduceTextOpac.forEach((text) => {
          text.style.transition = 'none';
          text.style.opacity = '1';
        });
      }, 3200);

      const clearAll = setTimeout(() => {
        allBoxes.forEach((box) => {
          box.innerHTML = '';
          box.classList.remove('blink');
          win = false;
          userComputer.style.opacity = '0.4';
          userPlayer.style.transition = '0.5s';
          userPlayer.style.opacity = '1';
          firstTurn = false;
        });
      }, 3100);

      restartButton.addEventListener('click', () => {
        blinkBox.forEach((blink) => {
          blink.classList.add('text');
        });
        reduceTextOpac.forEach((text) => {
          text.style.transition = 'none';
          text.style.opacity = '1';
        });
        allBoxes.forEach((box) => {
          box.innerHTML = '';
          clearTimeout(clearAll);
          clearTimeout(resetStyles);
        });
        restartClicked = true;
        win = false;
      });

      userContainer.addEventListener('click', () => {
        blinkBox.forEach((blink) => {
          blink.classList.add('text');
        });
        reduceTextOpac.forEach((text) => {
          text.style.transition = 'none';
          text.style.opacity = '1';
        });
        allBoxes.forEach((box) => {
          box.innerHTML = '';
          clearTimeout(clearAll);
          clearTimeout(resetStyles);
        });
        restartClicked = true;
        win = false;
      });
    }
  });
}

let firstTurn = false;

function turnFunction(e) {
  allBoxes.forEach(() => {
    if (firstTurn === false
      && win === false
      && !e.target.innerHTML.includes('O')
      && !e.target.innerHTML.includes('X')) {
      firstPlayer(e);
      userPlayer.style.opacity = '0.4';
      userComputer.style.transition = '0.5s';
      userComputer.style.opacity = '1';
      firstTurn = true;
    } else if (firstTurn === true
      && win === false
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
        && stopMarks === false
        && win === false) {
        markX(box);
        checkWinner();
        boxDisabled = true;
        setTimeout(() => {
          boxDisabled = false;
        }, 550);
      }
    } else if (twoPlayerMode === true) {
      turnFunction(e);
      checkWinner();
      checkTwoPlayerWinner();
    } else if (restartClicked === true) {
      allBoxes.forEach((box) => {
        box.innerHTML = '';
      });
    }
  });
});

restartButton.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    if (win === false) {
      box.innerHTML = '';
    }
    if (box.classList.contains('blink')) {
      allBoxes.forEach((box) => {
        box.classList.remove('blink');
        stopMarks = false;
      });
    }
  });
});
