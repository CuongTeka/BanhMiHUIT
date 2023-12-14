const nodemailer = require("nodemailer");

const testEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "taikhoanso12711@gmail.com", // Your email address
      pass: "ssgletqpdvmqnyxk", // Your email password (consider using app-specific password)
    },
  });

  const mailOptions = {
    from: "BanhMiHUIT <taikhoanso12711@gmail.com>", // Sender email address
    to: "cuongdola2711@gmail.com", // Recipient email address
    subject: "Node.js Email Example",
    text: "Hello, this is a test email sent from Node.js!",
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = {
  testEmail,
};
