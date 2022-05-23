const express = require("express");
const fs = require("fs");
const app = express();
// const api = require("./public/assets/js/index.js");

const PORT = process.env.port || 3001;

//Lets me use the static css file within public folder. This way the user can visualize the notes.html file with stylings
app.use(express.static("public"));

//Gets the main index.html file and gives it to the user when they open up the server.
app.get("/", (req, res) => {
    console.log("here")
    res.sendFile(__dirname + "/public/index.html")
})

//adds the /notes when the user clicks get started. 
app.get("/notes", (req, res)  => {
    res.sendFile(__dirname + "/public/notes.html" )
});

app.get("/api/notes", (req, res) => {
    res.sendFile(__dirname + "/db/db.json")
})

app.post("/api/notes", (req, res) => {
    res.sendFile(__dirname + "/db/db.json")
})

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
