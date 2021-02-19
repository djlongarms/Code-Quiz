//Gets high scores from local storage
let scores = JSON.parse(localStorage.getItem('scores')) || []

// Array holding questions for quiz and an identifier for the current question
let questions = [
  'Which of these lines would print the phrase "Hello World!" to the console?',
  'Which of these is the correct identifier for a class?',
  'Which of these should go at the beginning of every click listener for a button in a form?',
  'Which of these gives the user a place to fill in a response to a question?',
  'Which of these tags should be replaced with semantic HTML elements?'
]
let current = 0

// A boolean to see if the quiz has been finished
let quizFinished = false

// Array of arrays for holding answers to each question
let answers = [
  ['console.Log("Hello World!")', 'console.log(Hello World!)', 'Hello World!', 'console.log=Hello World!'],
  ['?', '#', '.', ','],
  ['event.preventDefault', 'preventDefault()', 'preventRefresh()', 'event.preventDefault()'],
  ['alert()', 'prompt = ""', 'prompt()', 'prompt'],
  ['img', 'div', 'main', 'script']
]

// Array with the correct answers for each 
let correctAnswers = [
  'console.Log("Hello World!")',
  '.',
  'event.preventDefault()',
  'prompt()',
  'div'
]

// A counter for timing the quiz
let counter = 0

// Listens for the click of the "Start Quiz!" button
document.getElementById('start').addEventListener('click', () => {
  // Hides introductory text and reveals elements for quiz usage
  document.getElementById('introduction').classList.add('hide')
  document.getElementById('quiz').classList.remove('hide')
  document.getElementById('viewScores').classList.add('hide')

  // Sets counter to starting time and sets "Timer" text to include counter
  counter = 75
  document.getElementById('timer').textContent = `Timer: ${counter}`

  // Resets current to 0 in case the user is retrying the quiz
  current = 0

  // Sets question number and the questions itself into the page
  document.getElementById('questionNumber').textContent = `Question ${current + 1}!`
  document.getElementById('question').textContent = questions[current]

  // Sets text for answer buttons
  for (let i = 0; i < answers[current].length; i++) {
    document.getElementById(`answer${i + 1}`).textContent = answers[current][i]
  }

  // Creates interval for "Timer"
  let timer = setInterval(() => {
    // Checks if user finished the quiz
    if (quizFinished) {
      quizFinished = false
      clearInterval(timer)
    } else {
      // Decrements counter then sets "Timer" with new time left
      counter = Math.max(counter - 1, 0);
      document.getElementById('timer').textContent = `Timer: ${counter}`

      // Checks if time is up
      if(counter <= 0) {
        // Ends interval and hides the quiz materials
        clearInterval(timer)
        document.getElementById('quiz').classList.add('hide')
        document.getElementById('scoreSave').remove('hide')
      }
    }
  }, 1000)
})

// Listens for a click of any "answer" button during the quiz
document.addEventListener('click', event => {
  // Checks to see if clicked element is an "answer" button
  if(event.target.classList.contains('answer')) {
    // Checks if the answer chosen was correct
    if (event.target.textContent !== correctAnswers[current]) {
      counter = Math.max(counter - 15, 0)
      document.getElementById('timer').textContent = `Timer: ${counter}`
    }

    // Increments "current" to move to the next question
    current++

    // Checks if we are at the end of the quiz
    if(current !== questions.length) {
      // Sets question number and the questions itself into the page
      document.getElementById('questionNumber').textContent = `Question ${current + 1}!`
      document.getElementById('question').textContent = questions[current]

      // Sets text for answer buttons
      for (let i = 0; i < answers[current].length; i++) {
        document.getElementById(`answer${i + 1}`).textContent = answers[current][i]
      }
    } else {
      // Hides the quiz display
      document.getElementById('quiz').classList.add('hide')
      document.getElementById('scoreSave').classList.remove('hide')
      quizFinished = true
    }
  }
})

// Listens for a user trying to save their score
document.getElementById('save').addEventListener('click', event => {
  // Prevents default when saving score
  event.preventDefault()

  // Adds score to list of high scores, then replaces local storage scores with new scores
  scores.push(`${document.getElementById('name').value}: ${counter}`)
  localStorage.setItem('scores', JSON.stringify(scores))
  
  // Clears input value
  document.getElementById('name').value = ''
})

// Listens for click of the return button
document.getElementById('return').addEventListener('click', event => {
  //Hides the scores element, the shows the introduction element
  document.getElementById('scoreSave').classList.add('hide')
  document.getElementById('introduction').classList.remove('hide')
  document.getElementById('viewScores').classList.remove('hide')
})

// Listens for a click on the "View Highscores" element
document.getElementById('viewScores').addEventListener('click', () => {
  document.getElementById('highscores').classList.remove('hide')
  document.getElementById('introduction').classList.add('hide')
  document.getElementById('viewScores').classList.add('hide')

  document.getElementById('scoresList').innerHTML = ''

  scores.forEach(element => {
    let newScore = document.createElement('li')
    newScore.classList.add('list-group-item')
    newScore.textContent = element

    document.getElementById('scoresList').append(newScore)
  })
})

// Listens for a click to return from viewing high scores
document.getElementById('returnFromScores').addEventListener('click', event => {
  // Hides the highscores element, the shows the introduction element
  document.getElementById('highscores').classList.add('hide')
  document.getElementById('introduction').classList.remove('hide')
  document.getElementById('viewScores').classList.remove('hide')
})

// Listens for a click to delete high scores
document.getElementById('deleteScores').addEventListener('click', event => {
  // Deletes the scores currently in local storage
  localStorage.setItem('scores', JSON.stringify([]))

  // Removes list from the currently loaded page
  document.getElementById('scoresList').innerHTML = ''

  // Sets "scores" to an empty array
  scores = []
})

