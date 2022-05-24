const express = require("express");// require express
const fs = require("fs"); // require filesystem also known as fs (part of node)
const path = require("path");// require path (part of node)

//calls express so that *app* will work with get, post and delete
const app = express();

//will turn the information within the json file into a javascript object through parsing
let notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf-8", (err)=> {
  if(err) throw err;
}));

const PORT = process.env.port || 3001; // Server runs in port 3001


app.use(express.json());// makes it so that express gets data in json
app.use(express.urlencoded({ extended: true }));//The extended option allows to choose between parsing the URL-encoded data with the qs library (when true).
app.use(express.static("public"));//Lets me use the static css file within public folder. This way the user can visualize the notes.html file with stylings



//APP .GET REQUESTS START HERE__________________________________________________________________
//Gets the main index.html file and gives it to the user when they open up the server.
app.get("/", (req, res) => {
    console.log("here")
    res.sendFile(path.join(__dirname + "/public/index.html"))
})

//adds the /notes when the user clicks get started. 
app.get("/notes", (req, res)  => {
    res.sendFile(path.join(__dirname + "/public/notes.html" ))
});

//Shows the notes within the json file
app.get("/api/notes", (req, res) => {
  return res.json(notesList);
});

//APP.GET REQUESTS ENDS HERE_____________________________________________________________________


//APP.POST REQUESTS STARTS HERE__________________________________________________________________
//adds notes into the json file within the server
app.post("/api/notes", (req, res) => {
  let newNote = {title: req.body.title, text: req.body.text} //our newNote will contain an array with 2 parameters
  newNote.id = notesList.length.toString(); //converts it to a string

  notesList.push(newNote); //pushes the newNote into the notesList object

  fs.writeFile("./db/db.json", JSON.stringify(notesList), //writes in the file as a json.stringify
  (err)=>{
    if(err) throw err;
  });
   res.json(notesList)
});

//APP.POST REQUESTS END HERE (ONLY 1)___________________________________________________________


//APP.DELETE REQUEST STARTS HERE________________________________________________________________
app.delete("/api/notes/:id",  (req, res) => {
  let idSelected = JSON.parse(req.params.id);//selects the id that the user clicked on

  notesList = notesList.filter((e) => { //filters out and returns a new array of objects
    return e.id != idSelected;
  });

  notesList.forEach((val, index) => { //gives each notelist an id
    val.id = index.toString();
  });

  fs.writeFile("./db/db.json", JSON.stringify(notesList), (err) => {//writes new array without the deleted one
    if(err) 
    throw err;
  });
  res.end();
})

//APP.DELETE REQUEST ENDS HERE________________________________________________________________


//allows us to see the server with all our individual requests get, post, del.
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
