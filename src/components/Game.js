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
    console.log(state.timeElapsed);
    if (state.timeElapsed >= gameLength) {
      clearInterval(interval);
      callback();
    }
  }

  const generateProblem = (focusNum, type, isSequential) => {
    console.log(isSequential);
    const addSub = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sub = [...addSub, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const multDiv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (type === '+') {
      let num1 = focusNum !== -1 ? focusNum : getRand(addSub.length);
      let num2 = isSequential ? addSub[addSub.indexOf(state.currNum2) + 1] : getRand(addSub.length);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = state.currNum1 + state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer];

    } else if (type === '-') {
      let num1 = focusNum !== -1 ? focusNum : getRand(sub.length);
      let num2 = isSequential ? sub[sub.indexOf(state.currNum2) + 1] : getRand(sub.length);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = state.currNum1 - state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer];
    } else {
      let num1 = focusNum !== -1 ? focusNum : getRand(multDiv.length);
      let num2 = isSequential ? multDiv[addSub.indexOf(state.currNum2) + 1] : getRand(multDiv.length);
      state.currNum1 = Math.max(num1, num2);
      state.currNum2 = Math.min(num1, num2);

      state.currAnswer = type === '*' ? state.currNum1 * state.currNum2 : state.currNum1 / state.currNum2;
      return [state.currNum1, state.currNum2, state.currAnswer];
    }
  }

  const getRand = (max) => Math.floor(Math.random() * max);

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