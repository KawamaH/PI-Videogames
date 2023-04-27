const { Router } = require('express');

const {getAllPlatformsHandler} = require('../handlers/platformsHandler')

const platformsRouter = Router();

platformsRouter.get('/',getAllPlatformsHandler)

module.exports= platformsRouter;