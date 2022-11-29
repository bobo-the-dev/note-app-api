const Joi = require("joi");

module.exports = () => {
  return async (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string().min(1).max(100).required(),
      content: Joi.string().min(1).max(1000).required(),
    });
    try {
      const { title, content } = req.body;
      await schema.validateAsync({ title, content });
      next();
    } catch (err) {
      res.status(400).send({
        code: 400,
        message: err.message,
      });
    }
  };
};
