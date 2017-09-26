module.exports = (app) => {
  const userControllers = require('../controllers/userControllers');
  const postControllers = require('../controllers/postControllers');

  app.route('/new-user').post(userControllers.createUser);
  app.route('/login').post(userControllers.login);
  app.route('/newpost').post(postControllers.createNewPost);
  app.route('/posts').post(postControllers.getAllBlogPosts);
  app.route('/posts/:id').get(postControllers.getPostById).put(postControllers.addCommentsToPost);
};