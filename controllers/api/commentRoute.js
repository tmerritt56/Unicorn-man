const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_content', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: User,
        attributes: ['username'],
      },
    ],
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post('/', withAuth, (req, res) => {
//   // check the session
//   if (req.session) {
//     Comment.create({
//       comment_content: req.body.comment_content,
//       post_id: req.body.post_id,
//       // use the id from the session
//       user_id: req.session.user_id,
//     })
//       .then((dbCommentData) => res.json(dbCommentData))
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   }
// });

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(commentData);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.get('/:id', withAuth, (req, res) => {
//   Comment.findOne({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbCommentData) => {
//       if (!dbCommentData) {
//         res.status(404).json({ message: 'comment not found' });
//         return;
//       }
//       res.json(dbCommentData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No comment found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
