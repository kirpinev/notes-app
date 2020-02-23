const yargs = require("yargs");
const notes = require("./notes");

// Customize yargs version
yargs.version("0.0.2");

// Creat add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    // argv.title
    title: {
      describe: "Note title",
      // title is required
      demandOption: true,
      type: "string"
    },
    // argv.body
    body: {
      describe: "Note body",
      // body is required
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Creat remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// Creat list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  }
});

// Creat read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

yargs.parse();
