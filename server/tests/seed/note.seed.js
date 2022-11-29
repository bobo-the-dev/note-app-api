const { Note } = require("../../models");

const notes = [
  {
    id: 1,
    title: "test_title_1",
    content: "test_content1",
  },
  {
    id: 2,
    title: "test_title_2",
    content: "test_content2",
  },
];

const initNotes = (done) => {
  Note.destroy({
    where: {},
    truncate: true,
  }).then(() => {
    const promises = notes.map(async (note) => {
      const tempNote = Note.build({
        id: note.id,
        title: note.title,
        content: note.content,
      });
      await tempNote.save();
      return new Promise((resolve, reject) => {
        resolve();
      });
    });
    Promise.all(promises).then(() => {
      done();
    });
  });
};

module.exports = {
  initNotes,
};
