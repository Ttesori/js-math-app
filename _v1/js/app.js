// Element Selectors
const gameSettingsEl = document.querySelector('.game-settings');
const settingFocusEl = document.querySelector('.game-settings-focus');
const settingMultiplierEl = document.querySelector('.game-settings-multiplier');
const settingLevelEl = document.querySelector('.game-settings-level');
const settingLengthEl = document.querySelector('.game-settings-length');
const btnStart = document.querySelector('#btn-start');
const gameEquationEl = document.querySelector('.game-equation');
const gameFeedback = document.querySelector('.game-feedback');
const gameTimer = document.querySelector('.game-timer');
const gameTimerTextEl = document.querySelector('.timer-left');
const gameTimerBarEl = document.querySelector('.timer-bar');
const inputEl = document.createElement('input');
const gameScoresEl = document.querySelector('.game-scores');
inputEl.type = 'number';
inputEl.className = 'game-answer';
let timer;
let scores;

// State
let gameState = {};

// Init / Add Event Listeners

const init = () => {
  btnStart.addEventListener('click', startGame);
  //gameEquationEl.classList.add('hidden');
  gameFeedback.classList.add('hidden');

  settingFocusEl.addEventListener('change', () => {
    if (settingFocusEl.value == -1) {
      settingLevelEl.value = 2;
      settingLevelEl.setAttribute('disabled', 'disabled');
    }
  });
  showScores(getAllScores());
  loadSettings();
};

// Start Game
const startGame = () => {
  gameEquationEl.classList.remove('hidden');
  gameFeedback.classList.add('hidden');
  gameFeedback.innerHTML = '';
  // Get settings
  gameState.maxMultiplier = parseInt(settingMultiplierEl.value);
  if (parseInt(settingFocusEl.value) !== -1) {
    gameState.focusNumber = parseInt(settingFocusEl.value);
  } else {
    gameState.focusNumber = Math.floor(Math.random() * gameState.maxMultiplier);
    gameState.random = 1;
  }
  gameState.level = parseInt(settingLevelEl.value);
  gameState.timeMax = parseInt(settingLengthEl.value);
  gameState.timeElapsed = 0;
  gameState.correct = 0;
  gameState.incorrect = 0;
  gameState.currMultiplier = 0;

  if (gameState.level === 2) {
    gameState.currMultiplier = Math.floor(
      Math.random() * gameState.maxMultiplier
    );
  }

  gameScoresEl.classList.add('hidden');
  saveSettings();

  displayNewProblem();
  gameSettingsEl.classList.add('hidden');
  timer = window.setInterval(incrementTimer, 1000);

  document.querySelector('body').addEventListener('keydown', handleKeydown);
};

const handleKeydown = (e) => {
  if (e.keyCode === 13 && inputEl.value !== '') {
    processAnswer(parseInt(inputEl.value), inputEl);
  }
};

// Display new problem
const displayNewProblem = () => {
  if (gameState.correct % 2 === 0) {
    gameEquationEl.innerHTML = `
    ${gameState.focusNumber} x
    ${gameState.currMultiplier} 
    =
    `;
  } else {
    gameEquationEl.innerHTML = `
    ${gameState.currMultiplier} x 
    ${gameState.focusNumber} 
    =
    `;
  }
  inputEl.value = '';
  gameEquationEl.appendChild(inputEl);
  inputEl.focus();
};

// Generate Multiplier
const incrementMultiplier = () => {
  if (gameState.random === 1) {
    gameState.focusNumber = Math.floor(Math.random() * gameState.maxMultiplier);
    gameState.currMultiplier = Math.floor(
      Math.random() * gameState.maxMultiplier
    );
  } else if (gameState.level === 1) {
    gameState.currMultiplier += 1;
    if (gameState.currMultiplier > gameState.maxMuliplier) {
      gameState.currMultiplier = 0;
    }
  } else {
    gameState.currMultiplier = Math.floor(
      Math.random() * gameState.maxMultiplier
    );
  }
};

// Process Answer
const processAnswer = (answer, inputEl) => {
  const correctAnswer = gameState.focusNumber * gameState.currMultiplier;
  if (answer === correctAnswer) {
    // console.log(
    //   'correct',
    //   'your answer',
    //   answer,
    //   'correct answer',
    //   correctAnswer
    // );
    incrementMultiplier();
    gameState.correct += 1;
    showFeedback(1);
    displayNewProblem();
    inputEl.value = '';
  } else {
    // console.log(
    //   'incorrect',
    //   'your answer',
    //   answer,
    //   'correct answer',
    //   correctAnswer
    // );
    showFeedback(0);
    gameState.incorrect += 1;
    inputEl.value = '';
    inputEl.focus();
  }
};

// Game Over
const gameOver = () => {
  const percentage = Math.round(
    100 *
      ((gameState.correct - gameState.incorrect) /
        (gameState.correct + gameState.incorrect))
  );
  gameFeedback.innerHTML = `
  You correctly answered <br>
  <strong>${gameState.correct} problems</strong> in ${gameState.timeElapsed} seconds!
  <br> Percentage correct: ${percentage}% <i class="fa  fa-thumbs-up"></i>`;
  gameFeedback.classList.remove('hidden');
  gameFeedback.classList.remove('incorrect');
  gameFeedback.classList.remove('correct');
  gameEquationEl.classList.add('hidden');
  gameScoresEl.classList.remove('hidden');

  gameEquationEl.innerHTML = ``;
  window.clearInterval(timer);
  gameSettingsEl.classList.remove('hidden');
  gameTimer.innerHTML = '';
  document.querySelector('body').removeEventListener('keydown', handleKeydown);

  if (parseInt(settingFocusEl.value) === -1) {
    addScore({
      focusNumber: -1,
      time: gameState.timeMax,
      correct: gameState.correct,
      percentage: percentage,
      date: Date.now()
    });
  } else {
    addScore({
      focusNumber: gameState.focusNumber,
      time: gameState.timeMax,
      correct: gameState.correct,
      percentage: percentage,
      date: Date.now()
    });
  }
  showScores(getAllScores());
};

// Show Feedback
const showFeedback = (correct) => {
  gameFeedback.classList.remove('hidden');
  gameFeedback.classList.remove('incorrect');
  gameFeedback.classList.remove('correct');
  if (correct) {
    const positiveFeedback = [
      'You got it right!',
      'Good job!',
      "That's it!",
      'Woo-hoo!'
    ];
    gameFeedback.innerHTML =
      positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];
    gameFeedback.classList.add('correct');
  } else {
    gameFeedback.innerHTML = `Try again!`;
    gameFeedback.classList.add('incorrect');
  }
};

// Set up Timer
const incrementTimer = () => {
  gameTimer.classList.remove('hidden');
  gameState.timeElapsed += 1;

  gameTimerTextEl.innerHTML = `${gameState.timeMax -
    gameState.timeElapsed} seconds left!`;
  gameTimerBarEl.setAttribute(
    'style',
    `width:${Math.round(
      ((gameState.timeMax - gameState.timeElapsed) / gameState.timeMax) * 100
    )}%;`
  );
  if (gameState.timeElapsed === gameState.timeMax) {
    gameOver();
  }
};

// Save settings
const saveSettings = () => {
  localStorage.setItem('game-settings', JSON.stringify(gameState));
};

const loadSettings = () => {
  if (localStorage.getItem('game-settings')) {
    gameState = JSON.parse(localStorage.getItem('game-settings'));
  } else {
    gameState = {
      focusNumber: 0,
      maxMuliplier: 12,
      currMultiplier: 0,
      level: 1,
      timeElapsed: 0,
      timeMax: 30,
      correct: 0,
      incorrect: 0,
      random: 0
    };
  }
  settingFocusEl.value = gameState.focusNumber;
  settingMultiplierEl.value = gameState.maxMuliplier;
  settingLevelEl.value = gameState.level;
  settingLengthEl.value = gameState.timeMax;
};

// Score tracking
// Get scores
const getAllScores = () => {
  if (localStorage.getItem('game-scores')) {
    return JSON.parse(localStorage.getItem('game-scores'));
  } else {
    localStorage.setItem('game-scores', JSON.stringify([]));
    return [];
  }
};
// Add new score
const addScore = (details) => {
  scores = JSON.parse(localStorage.getItem('game-scores'));
  scores.push(details);
  localStorage.setItem('game-scores', JSON.stringify(scores));
};

// Clear Scores
const removeScores = () => {
  localStorage.setItem('game-scores', '[]');
  showScores();
};

// Output scores
const showScores = (scores) => {
  gameScoresEl.innerHTML = `
  <h3>Your Previous Scores</h3>
  `;

  if (!scores || scores.length === 0) {
    gameScoresEl.innerHTML += `
    <p><em>Play some games to see your previous scores!</em></p>
    `;
    return false;
  }

  let gameScoresHTML = '';

  scores.forEach((score) => {
    const date = new Date(score.date);
    gameScoresHTML += `
      <tr>
      <td>${date.getUTCMonth() +
        1}-${date.getUTCDate()}-${date.getUTCFullYear()}</td>
      <td>${score.focusNumber === -1 ? 'Mixed' : score.focusNumber}</td>
      <td>${score.time} sec</td>
      <td>${score.correct}</td>
      <td>${score.percentage}%</td>
      </tr>
      `;
  });
  gameScoresEl.innerHTML += `
  <table class="table_game-scores">
  <tr>
  <th class="th_date">Date</th>
  <th>Focus Number</th>
  <th class="th_time">Time</th>
  <th>Correct Answers</th>
  <th>% Correct</th>
  </tr>
  ${gameScoresHTML}
  </table>
  <button class="btn_remove-scores"><i class="fa fa-trash-o"></i> Clear Scores</button>
  `;
  document.querySelector('.btn_remove-scores').addEventListener('click', () => {
    removeScores();
  });
};

init();
