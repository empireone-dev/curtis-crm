function deleteAllTriggers() {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < triggers.length; i++) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  
  function startRealtimeFetching() {
    deleteAllTriggers(); // Delete existing triggers before creating a new one
    ScriptApp.newTrigger("saveData")
      .timeBased()
      .everyMinutes(10)
      .create();
  }
  
  function saveData() {
    console.log('hello')
    var url = "https://curtis-staging.cloud/api/save_direct_emails";
    var response = UrlFetchApp.fetch(url);
    Logger.log('hello', response.getContentText()); // Log the response
  }
  
  // Call startRealtimeFetching to set up the trigger
  startRealtimeFetching();
  