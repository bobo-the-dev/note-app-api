const { Note } = require("../models");

async function init() {
  try {
    await Note.sync({ alter: true });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

init();
