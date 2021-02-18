let questions = []

document.getElementById('start').addEventListener('click', () => {
  document.getElementById('introduction').classList.add('hide')
  document.getElementById('quiz').classList.remove('hide')
})

document.addEventListener('click', event => {
  if(event.target.classList.contains('answer')) {
    console.log(event.target)
  }
})