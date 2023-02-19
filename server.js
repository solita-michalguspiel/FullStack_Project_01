const express = require("express");
const fs = require("fs");
const path = require('path');
const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/homepage.html'));
});

app.get("/guestbook", (req, res) => {
  res.sendFile(path.join(__dirname+'/public/guestbook.html'));
});

app.get("/newmessage", (req, res) => {
    res.sendFile(path.join(__dirname+'/public/newmessage.html'));
});

app.get("/ajaxmessage", (req, res) => {
  res.send("You are in ajax message");
});

app.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});
