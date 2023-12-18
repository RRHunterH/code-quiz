document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById('start-button');
    const highScoresButton = document.getElementById('high-scores-button');
    const nextButton = document.getElementById('next-button');
    const saveScoreButton = document.getElementById('save-score-button');
    const initialsInput = document.getElementById('initials');
    const timerElement = document.getElementById('timer');
    const timerGameOverElement = document.getElementById('time-taken');
    const quizScreens = document.querySelectorAll('.quiz-screen');
    let currentQuestionIndex = 0;
    let score = 0;
    let startTime;
    let timerInterval;
    let timeLeft = 60;
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    const questions = [
      {
        question: 'What does HTML stand for?',
        choices: ['Hyper Text Markup Language', 'Hyperlinks and Text Markup Language', 'Home Tool Markup Language'],
        correctAnswer: 'Hyper Text Markup Language'
      },
      {
        question: 'What does CSS stand for?',
        choices: ['Counter Strike: Source', 'Corrective Style Sheet', 'Cascading Style Sheet'],
        correctAnswer: 'Cascading Style Sheet'
      },
      {
        question: 'What is the syntax for a comment in JavaScript?',
        choices: ['<!-- Comment -->', '// Comment', '/* Comment */'],
        correctAnswer: '// Comment'
      },
    ];

    startButton.addEventListener('click', startQuiz);
    highScoresButton.addEventListener('click', showHighScores);
    nextButton.addEventListener('click', showNextQuestion);
    saveScoreButton.addEventListener('click', saveScore);

    function startQuiz() {
      startTime = Date.now();
      timerInterval = setInterval(updateTimer, 1000);
      document.getElementById('start-screen').style.display = 'none';
      document.getElementById('quiz-screen').style.display = 'block';
      showNextQuestion();
    }

    function updateTimer() {
      const currentTime = Math.floor((Date.now() - startTime) / 1000);
      timeLeft = Math.max(0, 60 - currentTime); // Update time left
      timerElement.textContent = `Time: ${timeLeft} seconds`;

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
      }
    }

    function setTime() {
      const timerInterval = setInterval(function () {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          clearInterval(timerInterval);
          endGame();
        }
      }, 1000);
    }

    function showNextQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestion);
      } else {
        endGame();
      }
    }

    function displayQuestion(question) {
      const questionText = document.getElementById('question-text');
      const choicesList = document.getElementById('choices-list');
      const feedback = document.getElementById('feedback');
  
      questionText.textContent = question.question;
      choicesList.innerHTML = '';
  
      question.choices.forEach(function (choice, index) {
        const listItem = document.createElement('li');
        listItem.textContent = choice;
        listItem.addEventListener('click', function () {
          checkAnswer(question, index);
        });
        choicesList.appendChild(listItem);
      });
  
      feedback.textContent = '';
    }

    function checkAnswer(question, userChoiceIndex) {
      if (question.correctAnswer === question.choices[userChoiceIndex]) {
        score++;
      } else {
        timeLeft -= 10;
      }
  
      currentQuestionIndex++;
      showNextQuestion();
    }

    function endGame() {
      document.getElementById('quiz-screen').style.display = 'none';
      document.getElementById('game-over-screen').style.display = 'block';
  
      const scoreDisplay = document.getElementById('score');
      scoreDisplay.textContent = score;
  
      saveScore();
    }

    function checkAnswer(question, userChoiceIndex) {
        const feedback = document.getElementById('feedback');
      
        if (question.correctAnswer === question.choices[userChoiceIndex]) {
          score++;
          feedback.textContent = 'Correct!';
        } else {
          timeLeft -= 10;
          if (timeLeft < 0) {
            timeLeft = 0;
          }
          feedback.textContent = 'Wrong!';
        }

        updateTimerDisplay();
        currentQuestionIndex++;
        showNextQuestion();
      }
      
      function updateTimerDisplay() {
        timerElement.textContent = `Time: ${timeLeft} seconds`;
      }

      function updateTimer() {
        if (timeLeft > 0) {
          timeLeft--;
        } else {
          clearInterval(timerInterval);
          endGame();
          return;
        }
      
        timerElement.textContent = `Time: ${timeLeft} seconds`;
      }

    function saveScore() {
      const playerInitials = initialsInput.value.trim();
      if (playerInitials !== '') {
        const newScore = {
          initials: playerInitials,
          score: score
        };
  
        highScores.push(newScore);
        
        highScores.sort((a, b) => b.score - a.score);
  
        localStorage.setItem('highScores', JSON.stringify(highScores));
  
        alert(`Score saved for ${playerInitials}: ${score}`);
      } else {
        alert('Please enter your initials.');
        
      }
    }
    function endGame() {
        clearInterval(timerInterval);
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        timerElement.textContent = `Time: ${timeTaken} seconds`;
        timerGameOverElement.textContent = `Time: ${timeTaken} seconds`;
    
        document.getElementById('quiz-screen').style.display = 'none';
        document.getElementById('game-over-screen').style.display = 'block';
    
        const scoreDisplay = document.getElementById('score');
        scoreDisplay.textContent = score;
    
        saveScore();
      }
    function showHighScores() {
      let highScoresList = 'High Scores:\n';
      highScores.forEach((entry, index) => {
        highScoresList += `${index + 1}. ${entry.initials}: ${entry.score}\n`;
      });
  
      if (highScores.length === 0) {
        alert('No high scores available.');
      } else {
        alert(highScoresList);
      }
    }
  });
  