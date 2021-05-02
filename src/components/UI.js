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
    gamebtnStopEl: document.querySelector('.mc-btn-stop')
  }

  settingsEl.settingTypeEl.addEventListener('change', () => updateVerb());
  settingsEl.settingMixedEl.addEventListener('change', () => {
    const mixedElValue = settingsEl.settingMixedEl.checked;
    if (mixedElValue) {
      settingsEl.settingFocusEl.disabled = "disabled";
    } else {
      settingsEl.settingFocusEl.removeAttribute('disabled');
    }
  });


  const updateVerb = () => {
    const type = settingsEl.settingTypeEl.value;

    switch (type) {
      case '+':
        settingsEl.settingTypeVerbEl.innerHTML = 'adding';
        break;
      case '-':
        settingsEl.settingTypeVerbEl.innerHTML = 'subtracting';
        break;
      case '*':
        settingsEl.settingTypeVerbEl.innerHTML = 'multiplying';
        break;
      case '/':
        settingsEl.settingTypeVerbEl.innerHTML = 'dividing';
        break;
      default:
        break;
    }

  }

  const setupModal = (callback) => {
    console.log('Seting up modal...');
    // Show modal section
    gameEl.gameModalEl.className = 'active';

    // Add event listener to stop
    gameEl.gamebtnStopEl.addEventListener('click', () => callback());

  }

  return {
    setupStartEventListener: (callback) => {
      settingsEl.btnStartGameEl.addEventListener('click', () => callback());
    },
    parseSettings: () => {
      updateVerb();
      return {
        focus: parseInt(settingsEl.settingFocusEl.value),
        type: settingsEl.settingTypeEl.value,
        mixed: settingsEl.settingMixedEl.checked ? true : false,
        order: parseInt(settingsEl.settingOrderEl.value),
        length: parseInt(settingsEl.settingLengthEl.value)
      }
    },
    setupModal: (callback) => setupModal(callback)
  }

}


// // Settings Elements
// const settingsEl = {
//   settingFocusEl: document.querySelector('.mc-settings-focus'),
//   settingTypeVerbEl: document.querySelector('.mc-settings-type-verb'),
//   settingMaxEl: document.querySelector('.mc-settings-max'),
//   settingOrderEl: document.querySelector('.mc-settings-order'),
//   settingLengthEl: document.querySelector('.mc-settings-length'),
//   btnStartGameEl: document.querySelector('#mc-settings-btn')
// }
// // Game Elements
// const gameEls = {
//   gameEquationEl: document.querySelector('.game-equation'),
//   gameFeedbackEl: document.querySelector('.game-feedback'),
//   gameTimerEl: document.querySelector('.game-timer'),
//   gameTimerTextEl: document.querySelector('.timer-left'),
//   gameTimerBarEl: document.querySelector('.timer-bar'),
//   inputEl: document.createElement('input')
// }
// // Scoreboard Elements
// const scoreboardEls = {
//   scoreboardEl: document.querySelector('.mc-scoreboard')
// }

export default UI;