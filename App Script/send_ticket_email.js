function doPost(e) {
    var recipient = e.parameter.recipient;
    var subject = e.parameter.subject;
    var body = e.parameter.body;
    GmailApp.sendEmail(recipient, subject, "", { htmlBody: body });
    return ContentService.createTextOutput(JSON.stringify({ 'result': 'Email sent successfully' }))
        .setMimeType(ContentService.MimeType.JSON);
}
