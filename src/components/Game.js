const Game = () => {

  let state = {
    timeElapsed: 0,
    correct: 0,
    incorrect: 0,
    currNum1: 0,
    currNum2: 0,
    currAnswer: 0,
  }

  const initialState = { ...state };

  const _runClock = (gameLength, interval, callback) => {
    state.timeElapsed++;
    if (state.timeElapsed >= gameLength) {
      clearInterval(interval);
      callback();
    }
  }

  const _generateProblem = (focusNum, type, max) => {
    // TODO: Allow user to choose max num
    if (type === 'mixed') {
      const types = ['+', '-', '*', '/'];
      type = types[Math.floor(Math.random() * 4)];
    }
    if (type === '+') {
      let num1 = focusNum !== -1 ? focusNum : getRand(9);
      let num2 = getRand(20 - num1);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = state.currNum1 + state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer, type];

    } else if (type === '-') {
      let num1 = focusNum !== -1 ? focusNum : getRand(9);
      let num2 = getRand(20 - num1);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = state.currNum1 - state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer, type];
    } else if (type === '*') {
      let num1 = focusNum !== -1 ? focusNum : getRand(12);
      let num2 = getRand(12);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = state.currNum1 * state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer, type];

    } else {
      let num1 = focusNum !== -1 ? focusNum : getRand(12);
      let num2 = getRand(12);
      state.currNum1 = num1 * num2;
      state.currNum2 = num1;

      state.currAnswer = state.currNum1 / state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer, type];
    }
  }

  const getRand = (max) => Math.floor((Math.random() * max) + 1);

  return {
    getState: () => state,
    setState: (prop, val) => {
      state[prop] = val;
    },
    getNums: (focusNum, maxNum) => [focusNum, maxNum],
    incrementCorrect: () => state.correct++,
    incrementIncorrect: () => state.incorrect++,
    incrementTimer: (gameLength, interval, callback) => _runClock(gameLength, interval, callback),
    getProblem: (focusNum, type, isSequential) => _generateProblem(focusNum, type, isSequential),
    resetState: () => state = { ...initialState }
  }
}

export default Game;