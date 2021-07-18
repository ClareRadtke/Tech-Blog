const { User, Post, Comment } = require("../../src/models");
const { sequelize } = require("../../src/config/connection");
const bcrypt = require("bcrypt");

sequelize.sync({ force: true }).then(async () => {
  await User.create({
    username: "Kenzie",
    password: "Cat123",
  });
  await Post.create({
    user_id: 1,
    title: "First Post",
    content:
      "In blandit in erat finibus tristique. Sed nec sapien quis elit malesuada auctor. Aliquam magna tellus, eleifend non molestie at, imperdiet a velit. Pellentesque elementum lorem et augue aliquet, quis volutpat tellus rhoncus. Duis viverra, ex rutrum laoreet rutrum, justo risus feugiat tortor, quis dignissim neque nulla ac tortor. In tempor ac mauris in ullamcorper. Duis ac turpis venenatis felis feugiat sagittis. Etiam ut nisi neque. Vestibulum velit augue, egestas id quam ac, faucibus molestie metus. In fringilla arcu a rhoncus ullamcorper. Quisque eros risus, ultricies eu semper at, porttitor quis turpis. Morbi vitae sagittis eros. Lorem ipsum dolor sit amet",
  });
  await Comment.create({
    post_id: 1,
    user_id: 1,
    content: "New Comment!",
  });
  console.log("Created Tables and Completed Seeding");
  sequelize.close();
});
