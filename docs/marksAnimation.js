const allBoxes = document.querySelectorAll('.text')
const upLeftBox = document.querySelector('.up-left')
const upMidBox = document.querySelector('.up-mid')
const upRightBox = document.querySelector('.up-right')
const midLeftBox = document.querySelector('.mid-left')
const centerBox = document.querySelector('.center')
const midRightBox = document.querySelector('.mid-right')
const botLeftBox = document.querySelector('.bot-left')
const botMidBox = document.querySelector('.bot-mid')
const botRightBox = document.querySelector('.bot-right')

upLeftBox.addEventListener('click', (e) => {
  if(!upLeftBox.innerHTML.includes('X') && !upLeftBox.innerHTML.includes('O')) {
    upLeftBox.innerHTML = 'X';
  }
  else if(!upLeftBox.innerHTML.includes('X') && !upLeftBox.innerHTML.includes('O')) {
    upLeftBox.innerHTML = 'O';
  }
});