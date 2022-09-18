const router = require('express').Router();
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const commentRoute = require('./commentRoute');

router.use('/users', userRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);

module.exports = router;
