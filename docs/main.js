const allBoxes = document.querySelectorAll('.text');
const boxArray = Array.from(allBoxes);

let functionIsRunning = false;

allBoxes.forEach((box) => {
  box.addEventListener('click', () => {
    getPlayerChoice(box);
  })
})

// after click, function getComputerChoice

function getPlayerChoice(box) {
  box.innerHTML = 'X';
}

// function randomBox(random) {
  // random = boxArray[Math.floor(Math.random() * boxArray.length)];
  
// }

function getComputerChoice(box) {
  let emptyBox = [...allBoxes].filter(box => box.innerHTML.includes('X') === false);
  if (emptyBox.length > 0) {
    random = allBoxes[Math.floor(Math.random() * emptyBox.length)];
    if (!box.innerHTML.includes('X')) {
      if (!box.innerHTML.includes('O')) {
        random.innerHTML = 'O';
      }
    }
  }
}

// function clickFunction(box) {
//   if (!functionIsRunning) {
//     getPlayerChoice(box);
//     functionIsRunning = true;
//   } else {
//     functionIsRunning = false;
//     getComputerChoice(box);
//   }
// }

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

const restartButton = document.querySelector('.restart-button');

restartButton.addEventListener('click', () => {
  allBoxes.forEach((box) => {
    box.innerHTML = '';
    functionIsRunning = false;
  })
})