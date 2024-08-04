function getClientReplyEmails() {
  // Define the search criteria to find reply emails from clients
  var searchQuery = 'is:inbox -from:me'; // Exclude emails sent by you

  // Get the threads matching the search criteria
  var threads = GmailApp.search(searchQuery, 0, 50); // Get the latest 50 threads to ensure we have enough emails to process
  var emails = GmailApp.getMessagesForThreads(threads);

  var replyEmails = [];
  
  // Loop through each thread
  for (var i = 0; i < emails.length; i++) {
    var emailThread = emails[i];
    
    // Loop through each email in the thread, starting from the second email (replies)
    for (var j = 1; j < emailThread.length; j++) {
      var email = emailThread[j];
      var subject = email.getSubject();
      var from = email.getFrom();
      var body = email.getPlainBody();
      
      // Check if the email is a reply from a client (not from your domain)
      if (isReplyEmail(email) && isClientEmail(from)) {
        var foundWord = find14CharWord(subject);
        if (foundWord) {
          replyEmails.push(foundWord);
        }

        // Break if we have collected 20 reply emails
        if (replyEmails.length >= 30) {
          break;
        }
      }
    }
    if (replyEmails.length >= 30) {
      break;
    }
  }

  return ContentService.createTextOutput(JSON.stringify(replyEmails)).setMimeType(ContentService.MimeType.JSON);
}

function find14CharWord(string) {
  var regex = /\b(\S{14})\b/;
  var matches = regex.exec(string);
  return matches ? matches[1] : null;
}

function isReplyEmail(email) {
  // Check if the email subject starts with "Re:" or "Fwd:"
  var subject = email.getSubject();
  return subject.startsWith('Re:') || subject.startsWith('Fwd:');
}

function isClientEmail(emailAddress) {
  // Check if the email is from a client (not from your domain)
  var domain = emailAddress.split('@')[1];
  return domain !== 'yourdomain.com'; // Replace 'yourdomain.com' with your actual domain
}

// Optional: Set up doGet to use this as a web app
function doGet() {
  return getClientReplyEmails();
}
