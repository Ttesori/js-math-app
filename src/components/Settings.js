const Settings = () => {
  let settings = {
    focus: 0,
    type: '',
    mixed: false,
    length: 0
  }

  const _parseSettings = (settingsIn) => {
    settings = { ...settingsIn };
    console.log('Settings updated...', settings);
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