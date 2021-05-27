const UI = () => {
  // Settings Elements
  const settingsEl = {
    settingTypeEl: document.querySelector('.mc-settings-type'),
    settingFocusEl: document.querySelector('.mc-settings-focus'),
    settingTypeVerbEl: document.querySelector('.mc-settings-type-verb'),
    settingMixedEl: document.querySelector('.mc-settings-mixed'),
    settingLengthEl: document.querySelector('.mc-settings-length'),
    btnStartGameEl: document.querySelector('#mc-settings-btn')

  }

  const gameEl = {
    gameModalEl: document.querySelector('.mc-game-modal'),
    gameBtnStopEl: document.querySelector('.mc-btn-stop'),
    gameProblem1El: document.querySelector('.mc-game-problem-1'),
    gameProblemTypeEl: document.querySelector('.mc-game-problem-type'),
    gameProblem2El: document.querySelector('.mc-game-problem-2'),
    gameAnswerEl: document.querySelector('.mc-game-answer'),
    gameFeedbackEl: document.querySelector('.mc-game-feedback'),
    gameProblemEqualEl: document.querySelector('.mc-game-problem-equals'),
    gameTimerEl: document.querySelector('.mc-game-timer'),
    gameTimerBarEl: document.querySelector('.mc-game-timer-bar'),
    gameTimerBarTextEl: document.querySelector('.mc-game-timer-text'),
    gameBtnCloseEl: document.querySelector('.mc-btn-close')
  }

  const scoresEl = {
    scoreEl: document.querySelector('.mc-scoreboard'),
    scorebtnClearEl: document.querySelector('.mc-scoreboard-btn-clear')
  }

  const init = () => {
    // Initial event listeners
    settingsEl.settingTypeEl.addEventListener('change', () => updateFromType());
    settingsEl.settingMixedEl.addEventListener('change', () => {
      const mixedElValue = settingsEl.settingMixedEl.checked;
      if (mixedElValue) {
        settingsEl.settingFocusEl.disabled = "disabled";

      } else {
        settingsEl.settingFocusEl.removeAttribute('disabled');
      }
    });
  }

  const updateFromType = () => {
    const type = settingsEl.settingTypeEl.value;
    settingsEl.settingFocusEl.removeAttribute('disabled');

    let addSubNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let multDivNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    let addHTML = addSubNums.map(num => {
      return `<option value="${num}">${num}</option>`;
    });

    let multHTML = multDivNums.map(num => {
      return `<option value="${num}">${num}</option>`;
    });

    // Removed mixed checked if checkced
    if (settingsEl.settingMixedEl.checked) settingsEl.settingMixedEl.checked = false;

    switch (type) {
      case '+':
        settingsEl.settingTypeVerbEl.innerHTML = 'adding';
        // focus num list goes to 10
        // use map to map array to html elements
        settingsEl.settingFocusEl.innerHTML = addHTML;
        break;

      case '-':
        // focus num list goes to 10
        settingsEl.settingTypeVerbEl.innerHTML = 'subtracting';
        settingsEl.settingFocusEl.innerHTML = addHTML;
        break;
      case '*':
        // focus num list goes to 12
        settingsEl.settingTypeVerbEl.innerHTML = 'multiplying';
        settingsEl.settingFocusEl.innerHTML = multHTML;
        break;
      case '/':
        // focus num list goes to 12
        settingsEl.settingTypeVerbEl.innerHTML = 'dividing';
        settingsEl.settingFocusEl.innerHTML = multHTML;
        break;
      default:
        break;
    }

  }

  const _setupModal = (callback) => {
    // Show modal section
    gameEl.gameModalEl.classList.add('active');
    gameEl.gameProblem1El.classList.remove('hide');
    gameEl.gameProblem2El.classList.remove('hide');
    gameEl.gameProblemTypeEl.classList.remove('hide');
    gameEl.gameAnswerEl.classList.remove('hide');
    gameEl.gameTimerEl.classList.remove('hide');
    gameEl.gameProblemEqualEl.classList.remove('hide');
    _displayFeedback('');
    gameEl.gameBtnStopEl.textContent = 'Quit Game';

    // Focus on input
    gameEl.gameAnswerEl.focus();

    // Add event listener to stop
    gameEl.gameBtnStopEl.addEventListener('click', () => callback());
    gameEl.gameBtnCloseEl.addEventListener('click', () => callback());

    // Reset timer bar and text
    gameEl.gameTimerBarTextEl.textContent = "Ready...set...GO!";

  }

  const _showProblem = (problem, type) => {
    gameEl.gameProblem1El.textContent = problem[0];
    gameEl.gameProblem2El.textContent = problem[1];
    let prettyType = type;
    if (prettyType === '*') prettyType = 'x';
    if (prettyType === '/') prettyType = '&divide;'
    gameEl.gameProblemTypeEl.innerHTML = prettyType;
  }

  const _setupSolveEventListener = (callback) => {
    gameEl.gameAnswerEl.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && gameEl.gameAnswerEl.value !== '') {
        callback();
      }
    });
  }

  const _displayFeedback = (isCorrect, msg) => {
    gameEl.gameFeedbackEl.textContent = msg;
  }

  const _displayTimer = (seconds = '', timeMax) => {
    gameEl.gameTimerBarTextEl.innerHTML = `${seconds} seconds left!`;
    let width = Math.round(((timeMax - seconds) / timeMax) * 100);
    gameEl.gameTimerBarEl.setAttribute(
      'style',
      `width:${100 - width}%;`
    );
  }

  const _hideGameEls = () => {
    gameEl.gameProblem1El.classList.add('hide');
    gameEl.gameProblem2El.classList.add('hide');
    gameEl.gameProblemTypeEl.classList.add('hide');
    gameEl.gameAnswerEl.classList.add('hide');
    gameEl.gameTimerEl.classList.add('hide');
    gameEl.gameProblemEqualEl.classList.add('hide');
    gameEl.gameBtnStopEl.textContent = 'Close Window';
  }

  const _updateScoreboard = (scores, callback) => {
    if (scores.length === 0) {
      // hide clear scores button
      scoresEl.scorebtnClearEl.classList.add('hide');
      scoresEl.scoreEl.classList.add('mc-no-scores');
      scoresEl.scoreEl.innerHTML = 'Play some games to add scores here!';
      return false;
    }

    const scoresEls = scores.map((score) => `
    <tr>
    <td>${score.date}</td>
    <td>${score.type}</td>
    <td class="col-length">${score.length} seconds</td>
    <td class="col-focusNum">${score.focusNum}</td>
    <td class="col-correct">${score.correct}</td>
    <td> ${score.percentage}%</td>
    <td class="col-secAns">${score.secAns}</td>
    </tr>`);

    scoresEl.scoreEl.innerHTML = `
    <table class="table text-light">
    <tr>
    <th>Date</th>
    <th>Game Type</th>
    <th class="col-length">Length</th>
    <th class="col-focusNum">Focus Num.</th>
    <th class="col-correct"># Correct</th>
    <th>% Correct</th>
    <th class="col-secAns">Sec/Answer</th>
    </tr>
    ${scoresEls.join('')}
    </table>
    `;
    if (callback) {
      scoresEl.scorebtnClearEl.classList.remove('hide');
      scoresEl.scoreEl.classList.remove('mc-no-scores');
      scoresEl.scorebtnClearEl.addEventListener('click', () => callback());
    }
  }

  const _closeModal = () => {
    gameEl.gameModalEl.classList.remove('active');
    gameEl.gameAnswerEl.value = '';
  }

  init()

  return {
    setupStartEventListener: (callback) => settingsEl.btnStartGameEl.addEventListener('click', () => callback()),
    parseSettings: () => {
      return {
        focus: !settingsEl.settingMixedEl.checked ? parseInt(settingsEl.settingFocusEl.value) : -1,
        type: settingsEl.settingTypeEl.value,
        mixed: settingsEl.settingMixedEl.checked ? true : false,
        length: parseInt(settingsEl.settingLengthEl.value)
      }
    },
    setupModal: (callback) => _setupModal(callback),
    closeModal: () => _closeModal(),
    showProblem: (problem, type) => _showProblem(problem, type),
    setupSolveEventListener: (callback) => _setupSolveEventListener(callback),
    getAnswer: () => parseInt(gameEl.gameAnswerEl.value),
    resetAnswer: () => gameEl.gameAnswerEl.value = '',
    displayFeedback: (isCorrect, msg) => _displayFeedback(isCorrect, msg),
    displayTimer: (seconds, length) => _displayTimer(seconds, length),
    hideGameEls: () => _hideGameEls(),
    updateScoreboard: (scores, callback) => _updateScoreboard(scores, callback),
    resetTimerBar: () => gameEl.gameTimerBarEl.setAttribute('style', `width:100%;`)
  }

}

export default UI;