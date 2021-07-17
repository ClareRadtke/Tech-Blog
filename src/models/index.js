const { User } = require("./User");
const { Post } = require("./Post");
const { Comment } = require("./Comment");

// A User has many Posts
User.hasMany(Post, { foreignKey: "user_id" });

// A Post belongs to one User
Post.belongsTo(User, { foreignKey: "user_id" });

// A Post has many Comments
Post.hasMany(Comment, { foreignKey: "post_id" });

// A Comment belongs to one Post
Comment.belongsTo(Post, { foreignKey: "post_id" });

// A User has many Comments
User.hasMany(Comment, { foreignKey: "user_id" });

// A Comment belongs to one User
Comment.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  User,
  Comment,
  Post,
};
