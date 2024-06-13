function doGet(e) {
    var numEmails = e.parameter.numEmails || 10; // Default to 10 emails if numEmails parameter is not provided
    var search = e.parameter.search || ''; // Default to empty string if search parameter is not provided
    var threads = GmailApp.search('subject:' + search, 0, numEmails); // Search emails by subject
    var emails = [];
  
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
          body: message.getPlainBody(),
          isReply: (j > 0) // Assuming all messages after the first in the thread are replies
        };
  
        emailThread.push(email);
      }
  
      // Sort emailThread by date in descending order
      emailThread.sort(function(a, b) {
        return b.date - a.date;
      });
  
      emails.push({
        threadId: thread.getId(),
        emails: emailThread
      });
    }
  
    // Return the emails as a JSON response
    return ContentService.createTextOutput(JSON.stringify(emails)).setMimeType(ContentService.MimeType.JSON);
  }
  