const express = require('express');
const router = express.Router(); 
const siteController = require('../controllers/siteController');


router.get('/', siteController.index);
router.get('/new', siteController.new);

router.get('/authors', siteController.authors);
router.get('/author/:id', siteController.author);


router.get('/teams', siteController.teams);
router.get('/team/:id', siteController.team);

router.get('/error', siteController.error);



module.exports = router;