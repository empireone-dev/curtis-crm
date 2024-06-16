function doGet(e) {
    var search = e.parameter.ticket_id || ''; // Default to empty string if search parameter is not provided
    var threads = GmailApp.search('subject:' + search); // Search emails by subject
    var emails = []; // Array to hold the final list of emails
  
    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i];
      var messages = thread.getMessages();
      var emailThread = [];
      for (var j = 0; j < messages.length; j++) {
        var message = messages[j];
        var email = {
          subject: message.getSubject(),
          from: message.getFrom(),
          date: message.getDate(),
          isReply: (j > 0) // Assuming all messages after the first in the thread are replies
        };
        emails.push(email);
      }
    }
    emails.sort(function (a, b) {
      return b.date - a.date;
    });
    // Return the emails as a JSON response
    return ContentService.createTextOutput(JSON.stringify(emails)).setMimeType(ContentService.MimeType.JSON);
  }
  