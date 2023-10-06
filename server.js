const express = require("express");
const path = require("path");
const db = require('./db/db.json')
const PORT = process.env.PORT || 3001;
const fs = require('fs')

const { v4: uuidv4 } = require('uuid');


const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
    res.json(db)
});

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4()
    };
    const saveNote = db
    saveNote.push(newNote)
    console.log(saveNote)
    fs.writeFileSync('./db/db.json', JSON.stringify(saveNote))
    res.status(200).json(saveNote)
});

app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id
    const saveNotes = db
    for (i=0; i < saveNotes.length; i++){
        if(noteId === saveNotes[i].id){
            saveNotes.splice(i, 1)
        }
    }
    console.log(saveNotes)
    fs.writeFileSync('./db/db.json', JSON.stringify(saveNotes))
    res.status(200).json(saveNotes)
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
