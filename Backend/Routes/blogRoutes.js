const express = require('express');
const router = express.Router();
const {getAllBlogs, getASingleBlog, postABlog, patchABlog, deleteABlog} = require('../Controllers/blogController');

router.get('/', getAllBlogs)

router.get('/:id', getASingleBlog)

router.post('/', postABlog)

router.patch('/:id', patchABlog)

router.delete('/:id', deleteABlog)

module.exports = router