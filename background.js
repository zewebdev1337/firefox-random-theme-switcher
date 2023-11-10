function getRandomTheme(themes) {
    // Filter out default themes and currently enabled theme
    const nonDefaultThemes = themes.filter(theme => theme.type === 'theme' && !theme.isDefault && !theme.enabled);
    if (nonDefaultThemes.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * nonDefaultThemes.length);
    return nonDefaultThemes[randomIndex];
  }
  
  function setRandomTheme() {
    browser.management.getAll().then((extensions) => {
      const randomTheme = getRandomTheme(extensions);
      if (randomTheme) {
        browser.management.setEnabled(randomTheme.id, true);
      } else {
        console.log("No non-default themes installed.");
      }
    }).catch(error => {
      console.error("An error occurred: ", error);
    });
  }
  
  // Set a random theme when the browser starts up
  browser.runtime.onStartup.addListener(() => {
    setRandomTheme();
  });
  
  // Set a random theme when the extension's icon is clicked
  browser.browserAction.onClicked.addListener(() => {
    setRandomTheme();
  });
      