const Settings = () => {
  let settings = {
    focus: 0,
    type: '',
    mixed: false,
    length: 0
  }

  const _parseSettings = (settingsIn) => {
    settings = { ...settingsIn };
  }

  const _getPrettyType = () => {
    switch (settings.type) {
      case '+':
        return 'Addition';
      case '-':
        return 'Subtraction';
      case '/':
        return 'Division';
      case '*':
        return 'Multiplication';
      case 'mixed':
        return 'Random';
      default:
        break;
    }
  }

  return {
    getSettings: () => settings,
    setSettings: (settings) => _parseSettings(settings),
    getPrettyType: () => _getPrettyType()
  }
}

export default Settings;