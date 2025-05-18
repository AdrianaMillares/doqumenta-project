const express = require('express');
const router = express.Router();
const HeroController = require('../controllers/HeroController');

router.get('/', HeroController.getHero);
router.put('/', HeroController.updateHero);
router.delete('/', HeroController.deleteHero); // opcional

module.exports = router;
