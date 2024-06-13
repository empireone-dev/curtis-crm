function doGet(e) {
    var page = parseInt(e.parameter.page) || 1; // Default to page 1 if page parameter is not provided
    var pageSize = 20; // Default to 20 emails per page if pageSize parameter is not provided
    var start = (page - 1) * pageSize; // Calculate the start index for pagination
    var totalFetched = 0; // Total number of emails fetched
    var emails = []; // Array to hold the final list of emails
  
    while (emails.length < pageSize) {
      // Retrieve the threads based on the search query and pagination
      var threads = GmailApp.search('-from:support2@curtiscs.com', start + totalFetched, pageSize);
      
      // Exit the loop if no threads are found or if the totalFetched exceeds the pageSize
      if (threads.length === 0 || totalFetched >= pageSize) {
        break;
      }
      for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];
        var messages = thread.getMessages();
  
        // Only process the thread if the first message is not from support2@curtiscs.com
        if (messages.length > 0 && !messages[0].getFrom().includes('support2@curtiscs.com') && !messages[0].getFrom().includes('donotreply@contactcostco.com')) {
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
  
          emails.push({
            threadId: thread.getId(),
            emails: emailThread,
            count: messages.length
          });
  
          // Break if we have collected enough emails for the page
          if (emails.length >= pageSize) {
            break;
          }
        }
      }
  
      // Update totalFetched
      totalFetched += threads.length;
    }
  
    // Return the emails as a JSON response
    return ContentService.createTextOutput(JSON.stringify(emails)).setMimeType(ContentService.MimeType.JSON);
  }
  