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

function animateO() {
  anime({
    targets: '.oActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

function markX(box) {
  if (!box.innerHTML.includes('X')
  && !box.innerHTML.includes('O')) {
    box.innerHTML = 'X';
    markO();
  }
}

function markO() {
  setTimeout(() => {
    const restAllBoxes = [...allBoxes].filter((box) => !box.innerHTML.includes('X') && !box.innerHTML.includes('O'));
    const randomBox = rando(restAllBoxes).value;
    randomBox.innerHTML = 'O';

    // different function but the same purpose as xActive, this instead replaces 'text' class
    const clickedBox = randomBox;
    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].classList.replace('oActive', 'text');
    }
    clickedBox.classList.replace('text', 'oActive');

    animateO();
  }, 500);
}

// function markX(box) {
//   if (!box.innerHTML.includes('X')) {
//     if (!box.innerHTML.includes('O')) {
//       box.innerHTML = 'X';
//       markO(box);
//     }
//   }
// }

function animateX() {
  anime({
    targets: '.xActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

// to add class to clicked box then remove the previous box's class to add to new box if new is clicked
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

allBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    markX(box);
    checkWhosWinner();
  });
});

const restartButton = document.querySelector('.restart-button');

restartButton.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    box.innerHTML = '';
    box.classList.replace('oActive', 'text');
  });
});