const Settings = () => {
  let settings = {
    focus: 0,
    type: '',
    mixed: false,
    length: 0
  }

  const parseSettings = (settingsIn) => {
    settings = { ...settingsIn };
    console.log('Settings updated...', settings);
  }

  return {
    getSettings: () => settings,
    setSettings: (settings) => parseSettings(settings)
  }
}

export default Settings;