const router = require("express").Router();
const Validators = require("../middleware/validators");
const { Note } = require("../models");

router.get("/", async function (req, res) {
  try {
    const notes = await Note.findAll();
    res.json({
      result: notes,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: error.message,
    });
  }
});

router.post(
  "/",
  [
    Validators.NoteValidators.NoteSchemaValidator(),
    Validators.NoteValidators.NoteBizValidator(),
  ],
  async function (req, res, next) {
    try {
      const { title, content } = req.body;
      const note = Note.build({
        title,
        content,
      });
      await note.save();
      res.status(200).send({
        result: note,
      });
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: error.message,
      });
    }
  }
);

router.patch(
  "/",
  [
    Validators.NoteValidators.NoteSchemaValidator(),
    Validators.NoteValidators.NoteBizValidator(),
  ],
  async function (req, res, next) {
    try {
      const { id, title, content } = req.body;
      const note = await Note.findOne({ where: { id } });
      if (!note) {
        throw new Error(`Note id:${id} not found!`);
      }
      note.title = title;
      note.content = content;
      await note.save();
      res.status(200).send({
        result: note,
      });
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: error.message,
      });
    }
  }
);

router.get(
  "/:id",
  [Validators.CommonValidators.IdValidator()],
  async function (req, res) {
    try {
      const { id } = req.params;
      const note = await Note.findOne({ where: { id } });
      if (!note) {
        return res.status(400).send({
          code: 400,
          message: `Note id:${id} not found!`,
        });
      }
      res.status(200).send({
        result: note,
      });
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: error.message,
      });
    }
  }
);

router.delete(
  "/:id",
  [Validators.CommonValidators.IdValidator()],
  async function (req, res) {
    try {
      const { id } = req.params;
      const note = await Note.findOne({ where: { id } });
      if (!note) {
        return res.status(400).send({
          code: 400,
          message: `Note id:${id} not found!`,
        });
      }
      note.destroy();
      res.status(200).send({
        result: 1,
      });
    } catch (error) {
      res.status(500).send({
        code: 500,
        message: error.message,
      });
    }
  }
);

router.delete("/", async function (req, res) {
  try {
    await Note.destroy({
      where: {},
      truncate: true,
    });
    res.status(200).send({
      result: 1,
    });
  } catch (error) {
    res.status(500).send({
      code: 500,
      message: error.message,
    });
  }
});

module.exports = router;
