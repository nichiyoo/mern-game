const express = require('express');
const router = express.Router();

const ClientController = require('../controller/client.controller');
const GameController = require('../controller/game.controller');

router.route('/client').get(ClientController.find);
router.route('/query').post(GameController.query);

module.exports = router;
