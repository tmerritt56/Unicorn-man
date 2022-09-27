// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Credit extends Model {}

// Credit.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'user',
//         key: 'id',
//       },
//     },
//     post_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'post',
//         key: 'id',
//       },
//     },
//   },
//   {
//     sequelize,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'credit',
//   }
// );

// module.exports = Credit;
