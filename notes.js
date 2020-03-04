const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(
    note => note.title.toLowerCase() === title.toLowerCase()
  );

  if (!duplicateNote) {
    notes.push({
      title,
      body
    });
    saveNotes(notes);
    console.log(chalk.green.bold("New note added!"));
  } else {
    console.log(chalk.red.bold("Note title taken!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const notesToKeep = notes.filter(
    note => note.title.toLowerCase() !== title.toLowerCase()
  );

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.bold("Note removed!"));
  } else {
    console.log(chalk.red.bold("Note not found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue("Your Notes!"));
  notes.forEach(note => console.log(note.title));
};

const readNote = title => {
  const notes = loadNotes();
  const noteToRead = notes.find(
    notes => notes.title.toLowerCase() === title.toLowerCase()
  );

  if (noteToRead) {
    console.log(chalk.green.bold(noteToRead.title));
    console.log(chalk.green(noteToRead.body));
  } else {
    console.log(chalk.red.bold("No note to read!"));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
