const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

// Get all blogs
router.get('/', (req, res) => {
  Blog.find()
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(err => {
      res.status(404)
    });
});

// Get all featured blogs
router.get('/featured', (req, res) => {
  Blog.where('featured')
    .equals(true)
    .then(blogs => {
      res.status(200).json(blogs);
    });
});

// Get single blog
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(blog => {
      console.log('blog:', blog);
      if (blog === null) {
        return res.status(404).send('error: blog not found');
      } else {
        return res.status(200).json(blog);
      }
    })
    .catch(err => {
      return res.status(404).json({ error: err })
    });
});

// Create a blog
router.post("/", (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    article: req.body.article,
    published: req.body.published,
    featured: req.body.featured,
    author: req.body.author
  });
    blog.save(function (err, blog) {
      if (blog) {
        res.status(201).send(blog);
      } else console.log(err);
    });
});

// Update a blog
router.put("/:id", (req, res) => {
  const id = req.params.id;
    Blog.findByIdAndUpdate(id, {
      title: req.body.title,
      article: req.body.article,
      published: req.body.published,
      featured: req.body.featured,
      author: req.body.author
    })
      .then(blogs => {
      res.status(204).json(blogs);
    });
});

// Delete a blog
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndRemove(id)
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(err => {
      res.status(400);
    });
})

module.exports = router;

