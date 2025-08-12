export const subscribeEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thanks for Subscribing!</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f4f4f4;
       }
       
      .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 40px 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          margin-top: 20px;
          margin-bottom: 20px;
      }
      
      .header {
          text-align: center;
          margin-bottom: 30px;
      }
      
      h1 {
          color: #333333;
          font-size: 28px;
          margin: 0 0 10px 0;
          font-weight: 600;
      }
      
      .main-content {
          text-align: center;
          margin-bottom: 30px;
      }
      
      .message {
          color: #333333;
          font-size: 18px;
          margin-bottom: 20px;
          line-height: 1.5;
      }
      
      .updates-text {
          color: #555555;
          font-size: 16px;
          margin-bottom: 30px;
      }
      
      .footer {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid #eeeeee;
          color: #888888;
          font-size: 14px;
      }
      
      @media only screen and (max-width: 600px) {
          .email-container {
              padding: 30px 20px;
              margin: 10px;
          }
          
          h1 {
              font-size: 24px;
          }
          
          .message {
              font-size: 16px;
          }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
          <div class="logo-container" style="margin-bottom: 20px;">
              <img style="aspect-ratio: 1/1;" src="https://kettlebellpro.fit/images/kettlebell-white.png" alt="Kettlebell Pro" width="75" height="75"/>
              <h2 style="font-size: 24px; color: #333333; font-weight: 600;">Kettlebell Pro</h2>
          </div>
          <h1>Thanks for Subscribing!</h1>
      </div>
      
      <div class="main-content">
          <p class="updates-text">Lots of updates and content coming soon.</p>
      </div>
      
      <div class="footer">
          <p>You're receiving this email because you subscribed to Kettlebell Pro updates.<br>
          If you have any questions, feel free to reach out.</p>
      </div>
    </div>
  </body>
</html>
`
