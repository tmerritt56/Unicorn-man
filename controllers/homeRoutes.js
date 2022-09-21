const router = require('express').Router();
const { User, Post,Comment } = require('../models');

router.get('/', (req,res) => {
  console.log(req.session);

  Post.findAll({
    attributes: ['id','title','creation_date','post_content'
    ],
    include: [
      {
        model:Comment,
        attributes: ['id','comment_content','post_id', 'user_id','created_at'],
        include: {
          model:User,
          attributes: ['username']
          }
        },
        {
          model:User,
          attributes: ['username']
        }
      ]
    })
    .then (dbPostData => {
      const posts = dbPostData.map(post => post.get({plain:true}));
      res.render('homepage', {
        posts,
        logged_in: req.session.logged_in
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

  router.get('/login', (req,res) => {
    if(req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

router.get('/signup', (req,res) => {
  if(req.session.logged_in){
    res.redirect('/');
    return;
  }
  res.render('signup');
});

router.get('/post/:id', (req,res) => {
  Post.findOne({
    where: {
      id:req.params.id
    },
    attributes: ['id','title','creation_date', 'post_content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id','comment_content','post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({message: 'No Post found!'});
      return;
    }
    const post = dbPostData.get({plain:true});

    res.render('single_post', {
      post,
      logged_in: req.session.logged_in
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router
