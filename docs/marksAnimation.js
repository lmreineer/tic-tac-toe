const marks = document.querySelectorAll('.text');

marks.forEach(x => {
  x.addEventListener('click', (e) => {
    e.target.innerHTML = 'X'
    anime({ 
      targets: marks,
        scale: [2,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 300,
    })
  })
})
