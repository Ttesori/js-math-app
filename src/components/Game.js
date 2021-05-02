const Game = () => {

  const state = {
    timeElapsed: 0,
    correct: 0,
    incorrect: 0,
    currNum1: 0,
    currNum2: 0,
    state: 0
  }

  const runClock = (gameLength, interval, callback) => {
    state.timeElapsed++;
    console.log(state.timeElapsed);
    if (state.timeElapsed >= gameLength) {
      clearInterval(interval);
      callback();
    }
  }

  const generateProblem = (focusNum, type) => {
    const addSub = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const multDiv = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    if (type === '+' || type === '-') {
      let randNum = getRand(addSub.length);
      let randNum2 = getRand(addSub.length);

      if (focusNum !== -1) {
        let problem = [focusNum, randNum, focusNum + randNum];
        return type === '+' ? sortNumsAsc(problem) : sortNumsDes(problem);
      } else {
        let problem = [randNum, randNum2, randNum + randNum];
        return type === '-' ? sortNumsAsc(problem) : sortNumsDes(problem);
      }
    }

    if (type === '*' || type === '/') {
      let randNum = getRand(multDiv.length);
      let randNum2 = getRand(multDiv.length);

      if (focusNum !== -1) {
        let problem = [focusNum, randNum, focusNum * randNum];
        return type === '*' ? sortNumsAsc(problem) : sortNumsDes(problem);
      } else {
        let problem = [randNum, randNum2, randNum * randNum];
        return type === '*' ? sortNumsAsc(problem) : sortNumsDes(problem);
      }
    }


  }

  const getRand = (max) => Math.floor(Math.random() * max);
  const sortNumsDes = (arr) => arr.sort((a, b) => b - a);
  const sortNumsAsc = (arr) => arr.sort((a, b) => a - b);

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
    getProblem: (focusNum, type) => generateProblem(focusNum, type)
  }
}

export default Game;