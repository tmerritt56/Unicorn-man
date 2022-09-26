const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// const Credit = require('./credit');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

//credit routes

// Credit.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// Credit.belongsTo(Post, {
//   foreignKey: 'post_id',
// });

// User.hasMany(Credit, {
//   foreignKey: 'user_credit',
// });

// Post.hasMany(Credit, {
//   foreignKey: 'post_credit',
// });

module.exports = { User, Post, Comment };
