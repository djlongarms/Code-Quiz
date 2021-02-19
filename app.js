// Array holding questions for quiz and an identifier for the current question
let questions = [
  'Which line would print the phrase "Hello World!" to the console?',
  'Which of these',
  'What is your favorite color?',
  'What is the capital of Assyria?',
  'What is the airspeed velocity of an unladen swallow?'
]
let current = 0

// A boolean to see if the quiz has been finished
let quizFinished = false

// Array of arrays for holding answers to each question
let answers = [
  ['console.Log("Hello World!")', 'console.log(Hello World!)', 'Hello World!', 'console.log=Hello World!'],
  ['2.1', '2.2', '2.3', '2.4'],
  ['3.1', '3.2', '3.3', '3.4'],
  ['4.1', '4.2', '4.3', '4.4'],
  ['5.1', '5.2', '5.3', '5.4']
]

// Array with the correct answers for each 
let correctAnswers = [
  'console.Log("Hello World!")',
  '',
  '',
  '',
  ''
]

// A counter for timing the quiz
let counter = 0

// Listens for the click of the "Start Quiz!" button
document.getElementById('start').addEventListener('click', () => {
  // Hides introductory text and reveals elements for quiz usage
  document.getElementById('introduction').classList.add('hide')
  document.getElementById('quiz').classList.remove('hide')

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
      // Checks if time is up
      if(counter <= 1) {
        // Ends interval and hides the quiz materials
        clearInterval(timer)
        document.getElementById('quiz').classList.add('hide')
        document.getElementById('answers').classList.add('hide')
      } else {
        // If time isn't up, decrements counter then sets "Timer" with new time left
        counter--;
        document.getElementById('timer').textContent = `Timer: ${counter}`
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
      counter -= 15
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
    }
    else {
      // Hides the quiz display
      document.getElementById('quiz').classList.add('hide')
      document.getElementById('introduction').classList.remove('hide')
      quizFinished = true
    }
  }
})