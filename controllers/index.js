const router = require('express').Router();

const apiRoute = require('./api');
const homeRoute = require('./homeRoutes');

router.use('/', homeRoute);
router.use('/', apiRoute);

module.exports = router;
