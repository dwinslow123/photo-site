const Post = require('../models/postModels');

const createNewPost = (req,res) => {
  const { author, title, content } = req.body;
  const newPost = new Post({ author, title, content });
  newPost.save(newPost, (err, post) => {
    if (err) {
      res.status(422);
      res.json(err)
      return
    }
    res.json(post);
  });
};

const getAllBlogPosts = (req, res) => {
  Post.find({}, (err, posts) => {
    if (err) {
      res.status(422);
      res.json(err);
      return;
    }
    const newPosts = [];
    posts.forEach((post) => {
      const postObj = {};
      postObj.title = post.title;
      postObj._id = post._id;
      newPosts.push(postObj);
    });
    res.json(newPosts);
  });
};