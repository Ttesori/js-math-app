const UI = () => {
  // Settings Elements
  const settingsEl = {
    settingTypeEl: document.querySelector('.mc-settings-type'),
    settingFocusEl: document.querySelector('.mc-settings-focus'),
    settingTypeVerbEl: document.querySelector('.mc-settings-type-verb'),
    settingMixedEl: document.querySelector('.mc-settings-mixed'),
    settingOrderEl: document.querySelector('.mc-settings-order'),
    settingLengthEl: document.querySelector('.mc-settings-length'),
    btnStartGameEl: document.querySelector('#mc-settings-btn')

  }

  const gameEl = {
    gameModalEl: document.querySelector('.mc-game-modal'),
    gamebtnStopEl: document.querySelector('.mc-btn-stop'),
    gameProblem1El: document.querySelector('.mc-game-problem-1'),
    gameProblemTypeEl: document.querySelector('.mc-game-problem-type'),
    gameProblem2El: document.querySelector('.mc-game-problem-2'),
    gameAnswerEl: document.querySelector('.mc-game-answer')
  }

  settingsEl.settingTypeEl.addEventListener('change', () => updateFromType());
  settingsEl.settingMixedEl.addEventListener('change', () => {
    const mixedElValue = settingsEl.settingMixedEl.checked;
    if (mixedElValue) {
      settingsEl.settingFocusEl.disabled = "disabled";
    } else {
      settingsEl.settingFocusEl.removeAttribute('disabled');
    }
  });


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
        // TODO: Edit focus nums depending on game type
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

  const setupModal = (callback) => {
    console.log('Seting up modal...');
    // Show modal section
    gameEl.gameModalEl.classList.add('active');

    // Focus on input
    gameEl.gameAnswerEl.focus();

    // Add event listener to stop
    gameEl.gamebtnStopEl.addEventListener('click', () => callback());

  }

  const showProblem = (problem, type) => {
    gameEl.gameProblem1El.textContent = problem[0];
    gameEl.gameProblem2El.textContent = problem[1];
    gameEl.gameProblemTypeEl.textContent = type;
    console.log(problem[2])
  }

  const setupSolveEventListener = (callback) => {
    gameEl.gameAnswerEl.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && gameEl.gameAnswerEl.value !== '') {
        callback();
      }
    });
  }

  return {
    setupStartEventListener: (callback) => {
      settingsEl.btnStartGameEl.addEventListener('click', () => callback());
    },
    parseSettings: () => {
      return {
        focus: !settingsEl.settingMixedEl.checked ? parseInt(settingsEl.settingFocusEl.value) : -1,
        type: settingsEl.settingTypeEl.value,
        mixed: settingsEl.settingMixedEl.checked ? true : false,
        order: parseInt(settingsEl.settingOrderEl.value),
        length: parseInt(settingsEl.settingLengthEl.value)
      }
    },
    setupModal: (callback) => setupModal(callback),
    closeModal: () => {
      gameEl.gameModalEl.classList.remove('active')
    },
    showProblem: (problem, type) => showProblem(problem, type),
    setupSolveEventListener: (callback) => setupSolveEventListener(callback),
    getAnswer: () => parseInt(gameEl.gameAnswerEl.value),
    resetAnswer: () => gameEl.gameAnswerEl.value = ''
  }

}

export default UI;