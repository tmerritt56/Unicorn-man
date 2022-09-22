const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  Post.findAll({})
    .then((dbPostData) => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/:id', (req, res) => {
//   Post.findOne({
//     where: {
//       id: req.params.id,
//     },
   
//   })
//     .then((dbPostData) => {
//       if (!dbPostData) {
//         res.status(404).json({ message: 'No post found with this id' });
//         return;
//       }
//       res.json(dbPostData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.post('/', withAuth, async (req,res) => {
  try { 
      const postData = await Post.create(req.body);

      req.session.save(() => {
          req.session.user_id = postData.id;
          req.session.loggedIn = true;
          res.status(200).json(postData);
      });
  } catch (err) {
      res.status(400).json(err);
  }
});

router.get('/:id', withAuth,(req, res) => {
  Post.findOne({
    title: req.body.title,
    post_content: req.body.post_content
  },
  {
    where: {
      id: req.params.id
    }
  })
.then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

router.delete('/:id', withAuth, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
