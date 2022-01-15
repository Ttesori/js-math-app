const Scoreboard = () => {
  let scores = [];

  const _addScore = (score) => {
    if (score.focusNum === -1) score.focusNum = 'Mixed';
    scores.push(score);
    return _getScores();
  }

  const _getScores = () => {
    _sortScores();
    return scores;
  }

  const _sortScores = () => scores.sort((a, b) => new Date(b.date) - new Date(a.date));

  const _saveScores = () => {
    let stringScores = JSON.stringify(scores);
    localStorage.setItem('mc-game-scores', stringScores);
  }

  const _loadScores = () => {
    let savedScores = localStorage.getItem('mc-game-scores');
    if (savedScores) {
      scores = JSON.parse(savedScores);
      _sortScores();
      return scores;
    } else {
      return []
    }
  }

  const _clearScores = () => {
    scores = [];
    localStorage.removeItem('mc-game-scores');
  }

  return {
    addScore: (score) => _addScore(score),
    getScores: () => _getScores(),
    loadScores: () => _loadScores(),
    saveScores: () => _saveScores(),
    clearScores: () => _clearScores()
  }
}

export default Scoreboard;