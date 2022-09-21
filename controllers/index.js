const router = require('express').Router();
//
const apiRoute = require('./api');
const homeRoute = require('./homeRoutes');
const dashboardRoute = require('./dashboardRoute');

router.use('/', homeRoute);
router.use('/api', apiRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;
