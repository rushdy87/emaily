const keys = require("../../config/keys");
module.exports = (survey) => {
  return `
  <html lang="en">
    <body>
        <div style="text-align: center;">
            <h3>I'd like you input!</h3>
            <h5>Please answer the flowing question:</h5>
            <p>${survey.body}</p>
            <div>
                <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
            </div>
            <div>
                <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
            </div>
        </div>    
    </body>
  </html>
    `;
};
