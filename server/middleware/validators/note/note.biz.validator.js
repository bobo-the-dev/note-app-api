const { Note } = require("../../../models");
module.exports = () => {
  return async (req, res, next) => {
    try {
      const { id, title } = req.body;
      const titleDuplicationErrorMessage = `Title '${title}' is duplicated!`;
      if (req.method === "PATCH") {
        const notes = await Note.findAll({ where: { title } });
        if (notes.length > 1) {
          throw new Error(titleDuplicationErrorMessage);
        } else if (notes.length === 1) {
          if (notes[0].id !== id) {
            throw new Error(titleDuplicationErrorMessage);
          }
        }
      } else {
        const recordCount = await Note.count({ where: { title } });
        if (recordCount !== 0) {
          throw new Error(titleDuplicationErrorMessage);
        }
      }

      next();
    } catch (err) {
      res.status(400).send({
        code: 400,
        message: err.message,
      });
    }
  };
};
