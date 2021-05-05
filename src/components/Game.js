const Game = () => {

  let state = {
    timeElapsed: 0,
    correct: 0,
    incorrect: 0,
    currNum1: 0,
    currNum2: 0,
    currAnswer: 0,
    state: 0
  }

  const initialState = { ...state };

  const runClock = (gameLength, interval, callback) => {
    state.timeElapsed++;
    if (state.timeElapsed >= gameLength) {
      clearInterval(interval);
      callback();
    }
  }

  const generateProblem = (focusNum, type) => {
    const addSub = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sub = [...addSub, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const multDiv = [...addSub, 11, 12];

    if (type === '+') {
      state.currNum1 = focusNum !== -1 ? focusNum : getRand(addSub.length);
      state.currNum2 = getRand(addSub.length);

      state.currAnswer = state.currNum1 + state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer];

    } else if (type === '-') {
      let num1 = focusNum !== -1 ? focusNum : getRand(sub.length);
      let num2 = getRand(sub.length);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = state.currNum1 - state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer];
    } else if (type === '*') {
      let num1 = focusNum !== -1 ? focusNum : getRand(multDiv.length);
      let num2 = getRand(multDiv.length);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = state.currNum1 * state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer];

    } else {
      let num1 = focusNum !== -1 ? focusNum : getRand(multDiv.length);
      let num2 = getRand(multDiv.length);
      state.currNum1 = num1 * num2;
      state.currNum2 = num2;

      state.currAnswer = state.currNum1 / state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer];
    }
  }

  const getRand = (max) => Math.floor((Math.random() * max) + 1);

  return {
    getState: () => state,
    setState: (prop, val) => {
      state[prop] = val;
      console.log(`${prop} set to ${val}`, state[prop])
    },
    getNums: (focusNum, maxNum) => [focusNum, maxNum],
    incrementCorrect: () => state.correct++,
    incrementIncorrect: () => state.incorrect++,
    incrementTimer: (gameLength, interval, callback) => runClock(gameLength, interval, callback),
    getProblem: (focusNum, type, isSequential) => generateProblem(focusNum, type, isSequential),
    resetState: () => state = { ...initialState }
  }
}

export default Game;