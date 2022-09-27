const router = require('express').Router();
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const commentRoute = require('./commentRoute');
// const creditRoute = require('./creditRoute');

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);
// router.use('/credits', creditRoute);

module.exports = router;
