const request = require("supertest");
const { expect } = require("expect");

const { app } = require("./../../main");
const { Note } = require("../models");
const { initNotes } = require("./seed/note.seed");

before(initNotes);
beforeEach((done) => setTimeout(done, 1000));

describe("GET /api/notes", () => {
  it("should show all notes", (done) => {
    request(app)
      .get("/api/notes")
      .expect(200)
      .expect((res) => {
        expect(res.body.result).toHaveLength(2);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});

describe("POST /notes", () => {
  it("should create note", (done) => {
    const body = {
      title: "test_title_3",
      content: "test_content_3",
    };
    request(app)
      .post("/api/notes")
      .send(body)
      .expect(200)
      .expect((res) => {
        expect(res.body.result.title).toBe(body.title);
        expect(res.body.result.content).toBe(body.content);
        expect(res.body.result.createdAt).toBeTruthy();
        expect(res.body.result.updatedAt).toBeTruthy();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Note.findAll({
          where: {
            title: body.title,
          },
        })
          .then((notes) => {
            expect(notes.length).toBe(1);
            expect(notes[0].title).toBe(body.title);
            expect(notes[0].content).toBe(body.content);
            done();
          })
          .catch((e) => {
            done(e);
          });
      });
  });
});

describe("PATCH /notes", () => {
  it("should update note", (done) => {
    const body = {
      id: 3,
      title: "new_title3",
      content: "new_content3",
    };
    request(app)
      .patch(`/api/notes`)
      .send(body)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log(err);
          return done(err);
        }
        Note.findOne({
          where: {
            id: body.id,
          },
        })
          .then((note) => {
            expect(note).toBeTruthy();
            expect(note.title).toBe(body.title);
            expect(note.content).toBe(body.content);
            expect(note.createdAt).toBeTruthy();
            expect(note.updatedAt).toBeTruthy();
            expect(note.createdAt).not.toEqual(note.updatedAt);
            done();
          })
          .catch((e) => {
            done(e);
          });
      });
  });
});

describe("DELETE /notes/:id", () => {
  it("should delete note", (done) => {
    const id = 1;
    request(app)
      .delete(`/api/notes/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.result).toBe(1);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Note.findOne({ where: { id } })
          .then((note) => {
            expect(note).toBeFalsy();
            done();
          })
          .catch((e) => {
            done(e);
          });
      });
  });
});

describe("DELETE /notes", () => {
  it("should delete all notes", (done) => {
    const id = 1;
    request(app)
      .delete(`/api/notes`)
      .expect(200)
      .expect((res) => {
        expect(res.body.result).toBe(1);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Note.findAll({ where: {} })
          .then((note) => {
            expect(note).toHaveLength(0);
            done();
          })
          .catch((e) => {
            done(e);
          });
      });
  });
});
