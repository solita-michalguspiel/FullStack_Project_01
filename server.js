const express = require("express");
const fs = require("fs");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/homepage.html"));
});

app.get("/guestbook", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/guestbook.html"));
});

app.get("/newmessage", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/newmessage.html"));
});

app.get("/ajaxmessage", (req, res) => {
  res.send("You are in ajax message");
});

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/addpost", (req, res) => {
  let entriesPath = "public/data/entries.json"  
  var data = fs.readFileSync(entriesPath);
  var dataObject = JSON.parse(data);
  let newId = dataObject.length + 1 
  res.send("POST request to the homepage");
  console.log(req.body); // your JSON
  let newData = {
    id: newId,
    username: req.body.username,
    country: req.body.country,
    date: Date(),
    message: req.body.message,
  };
  dataObject.push(newData);

  var newJson = JSON.stringify(dataObject);
  fs.writeFile(entriesPath, newJson, err => {
    // error checking
    if(err) throw err;
    console.log("New data added");
}); 
});
