const { Router } = require("express");

const {getAllVideogamesHandler, getVideogameByIdHandler, createVideogameHandler} = require("../handlers/videogamesHandler")

const videogamesRouter = Router();

videogamesRouter.get("/", getAllVideogamesHandler);
videogamesRouter.get("/:id",getVideogameByIdHandler);
videogamesRouter.post("/",createVideogameHandler);


module.exports = videogamesRouter;