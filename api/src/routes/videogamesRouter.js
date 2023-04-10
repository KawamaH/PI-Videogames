const { Router } = require("express");

const { getAllVideogamesHandler} = require("../handlers/videogamesHandler")

const videogamesRouter = Router();

videogamesRouter.get("/", getAllVideogamesHandler);

module.exports = videogamesRouter;