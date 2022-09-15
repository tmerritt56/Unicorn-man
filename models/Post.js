const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {},
    name: {},
    content: {},
    creation_date: {},
    user_id: {},
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
