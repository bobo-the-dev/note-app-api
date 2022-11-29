const Joi = require("joi");

module.exports = () => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const schema = Joi.object({
        id: Joi.number().positive().required(),
      });
      await schema.validateAsync({ id });
      next();
    } catch (err) {
      res.status(400).send({
        code: 400,
        message: err.message,
      });
    }
  };
};
