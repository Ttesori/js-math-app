const Settings = () => {
  let settings = {

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