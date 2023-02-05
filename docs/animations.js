/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import {
  X,
  checkWinner,
} from './main.js';

const hoverImage = document.querySelector('.hover-image');

hoverImage.addEventListener('mouseover', () => {
  hoverImage.style.transition = '0.1s';
  hoverImage.style.opacity = '0.8';
});

hoverImage.addEventListener('mouseout', () => {
  hoverImage.style.opacity = '1';
});

const playerUser = document.querySelector('.player-user');
const computerUser = document.querySelector('.computer-user');

function changeVisualPlayer() {
  if (X !== 'X') {
    playerUser.style.transition = '0.1s';
    playerUser.style.opacity = '0.5';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '1';
  } else {
    playerUser.style.transition = '0.1s';
    playerUser.style.opacity = '1';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '0.5';
  }

  if (checkWinner() === 'draw') {
    playerUser.style.transition = '0.1s';
    playerUser.style.opacity = '0.5';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '0.5';
  }
}

const standardImage = document.querySelector('.standard-image');

function changeVisualMode() {
  standardImage.classList.toggle('two-player');
  if (standardImage.classList.contains('two-player')) {
    standardImage.src = './res/images/two-player.png';
    hoverImage.src = './res/images/two-player-hover.png';
    playerUser.innerHTML = 'Player 1 &nbsp(<span class="span-player">X</span>)';
    computerUser.innerHTML = 'Player 2 &nbsp(<span class="span-computer">O</span>)';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '0.5';
  } else {
    standardImage.src = './res/images/single-player.png';
    hoverImage.src = './res/images/single-player-hover.png';
    playerUser.innerHTML = 'Player &nbsp(<span class="span-player">X</span>)';
    computerUser.innerHTML = 'Computer &nbsp(<span class="span-computer">O</span>)';
    computerUser.style.transition = '0.1s';
    computerUser.style.opacity = '1';
    playerUser.style.opacity = '1';
  }
}

// marking animations
function xAnimation() {
  anime({
    targets: '.xActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

function oAnimation() {
  anime({
    targets: '.oActive',
    scale: [1.2, 1],
    easing: 'easeOutCirc',
    duration: 200,
  });
}

export {
  changeVisualPlayer,
  changeVisualMode,
  xAnimation,
  oAnimation,
};
