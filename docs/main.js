const allBoxes = document.querySelectorAll('.text');
const boxArray = Array.from(allBoxes);

let functionIsRunning = false;

allBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    getPlayerChoice(box, getComputerChoice())
  })
})

function getPlayerChoice(box) {
  if (!box.innerHTML.includes('X')) {
    if (!box.innerHTML.includes('O')) {
      box.innerHTML = 'X';
    }
  }
}

// non-functioning bug
// this function knows specific boxes
// if player chose a certain spot, choose certain available boxes for the computer to choose from which will be randomized, can be 2 or more
function getComputerChoice() {
  setTimeout(() => {
    let emptyBox = [...allBoxes].filter(box => !box.innerHTML.includes('X'));
    if (emptyBox.length > 0) {
      random = allBoxes[Math.floor(Math.random() * emptyBox.length)];
      if (!random.innerHTML.includes('O')) {
        if (!random.innerHTML.includes('X')) {
          console.log(random)
        }
      }
    }
  }, 500)
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