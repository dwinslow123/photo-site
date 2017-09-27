const Post = require('../models/postModels');

const STATUS_USER_ERROR = 422;

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
      res.status(STATUS_USER_ERROR);
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

const getPostById = (req, res) => {
  const { id } = req.params;
  Post.findById(id)
  .populate('author comments.author', 'username')
  .exec((err, post) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: 'Cannot locate all posts' });
      return;
    }
    res.json(post);
  });
};

const addCommentsToPost = (req, res) => {
  const { id } = req.params;
  const { text, author } = req.body;
  const newComment = { text, author };
  Post.findById(id, (err, post) => {
    post.comments.push(newComment);
    post.save((secondError, newSavePost) => {
      if (secondError) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Cannot insert into comments' });
        return;
      }
      Post.findById(newSavePost._id)
      .populate('comments.author', 'username')
      .exec((lastError, lastPost) => {
        if (lastError) {
          res.status(STATUS_USER_ERROR);
          res.json({ error: 'cannot locate post' });
        }
        res.json(lastPost);
      });
    });
  });
};

module.exports = {
  createNewPost,
  getAllBlogPosts,
  getPostById,
  addCommentsToPost,
};