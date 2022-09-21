const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbCommentData) => res.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_content', 'creation_date'],
      },
      {
        model: Comment,
        attributes: ['id', 'comment_content', 'creation_date'],
        include: {
          model: Post,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//needs to be adjusted as we fill out more content
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    github: req.body.github,
  }).then((dbCommentData) => {
    req.session.save(() => {
      req.session.user_id = dbCommentData.id;
      req.session.username = dbCommentData.username;
      req.session.loggedIn = true;

      res.json(dbCommentData);
    });
  });
});

router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbCommentData) => {
    if (!dbCommentData) {
      res.status(400).json({ message: 'Incorrect "Email" or Password!' });
      return;
    }

    const vaildPassword = dbCommentData.checkPassword(req.body.password);

    if (!vaildPassword) {
      res.status(400).json({ message: 'Incorrect Email or "Password"!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbCommentData.id;
      req.session.username = dbCommentData.username;
      req.session.loggedIn = true;

      res.json({ user: dbCommentData, message: 'Login Successful!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/:id', withAuth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).json({ message: 'No user found with this id' });
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
