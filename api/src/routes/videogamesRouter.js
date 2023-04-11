const { Router } = require("express");

const { getAllVideogamesHandler, getVideogameByIdHandler} = require("../handlers/videogamesHandler")

const videogamesRouter = Router();

videogamesRouter.get("/", getAllVideogamesHandler);
videogamesRouter.get("/:id",getVideogameByIdHandler)

module.exports = videogamesRouter;