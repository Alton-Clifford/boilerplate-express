let express = require('express');
let app = express();

require('dotenv').config();
let bodyParser = require('body-parser');

app.get('/',function(req,res){
    res.sendFile(__dirname + '/views/index.html');
});

app.use("/public", express.static(__dirname + "/public"));

app.use((req, res, next) => {
 console.log(`${req.method} ${req.path} - ${req.ip}`);
 next()
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/json", (req, res)  => {
  let response;
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "HELLO JSON";
  } else {
    response = "Hello json";
  }
  res.json({ "message": response });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", (req, res) => {
  const firstname = req.query.first
  const lastname = req.query.last
res.json({name:`${firstname} ${lastname}`})
});

app.post("/name", (req, res) => {
  const firstname = req.body.first
  const lastname = req.body.last
res.json({name:`${firstname} ${lastname}`})
});


//app.route('/name').get(handler).post(handler)























 module.exports = app;
