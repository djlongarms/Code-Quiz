// Array holding questions for quiz
let questions = []

// A counter for timing the quiz
let counter = 0

// Listens for the click of the "Start Quiz!" button
document.getElementById('start').addEventListener('click', () => {
  // Hides introductory text and reveals elements for quiz usage
  document.getElementById('introduction').classList.add('hide')
  document.getElementById('quiz').classList.remove('hide')

  // Sets counter to starting time and sets "Timer" text to include counter
  counter = 5
  document.getElementById('timer').textContent = `Timer: ${counter}`

  // Creates interval for "Timer"
  let timer = setInterval(() => {
    // Checks if time is up
    if(counter === 0) {
      // If time isn't up, ends interval, hides the quiz materials, then brings up "Game Over" screen
      clearInterval(timer)
      document.getElementById('quiz').classList.add('hide')
      document.getElementById('gameOver').classList.remove('hide')
    } else {
      // If time is up, decrements counter then sets "Timer" with new time left
      counter--;
      document.getElementById('timer').textContent = `Timer: ${counter}`
    }
  }, 1000)
})

// Listens for a click of any "answer" button during the quiz
document.addEventListener('click', event => {
  if(event.target.classList.contains('answer')) {
    
  }
})