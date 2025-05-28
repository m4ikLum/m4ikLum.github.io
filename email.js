const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route
app.post('/send-email', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  // configure your email service (Gmail shown here)
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'maiko.lum0401@gmail.com',        
      pass: 'maykoloom'      
    }
  });

  const mailOptions = {
    from: email,
    to: 'maiko.lum0401@gmail.com',
    subject: `New Message: ${subject}`,
    text: `From: ${firstName} ${lastName}\nEmail: ${email}\n\n${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email failed to send.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
