const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(__dirname + "/Views"));
// Serve static files from the "public" directory
app.use(express.static('public'));
// Middleware to parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home.ejs");
});


app.post("/send-email",(req,res)=>{
  const {name, email, number, description} = req.body;

  // Create a transporter object using SMTP object
  const transporter = nodemailer.createTransport({
    service: 'gmail', // use your email service - Mine is Gmail
    auth:{
      user: 'sitelin.in@gmail.com', // Your email address
      pass:'rder jjwx xcsd truk' // Use the app-specific password here
    },
  });
  // Setup email data
  const mailOptions ={
    from : 'sitelin.in@gmail.com', // sender email address
    to : 'shuvapatra011@gmail.com', // Where mails will be sended
    subject: 'New Contact Form submission from SiteLin', // Form Subject
    text: `You have a new message from ${name} (${email}) (${number}):\n\n${description}`, // Plain text body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      return console.log(error);
    }
    console.log('Message sent : %s', info.messageId);
    res.send('Email sent successfuly')
  })
})

app.listen(port, () => {
  console.log("App started running on port 8080");
});
