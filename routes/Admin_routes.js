const express = require('express');

const router = express.Router();
const Blog = require("../models/blog_post_schema");

// home
router.get('/admin/dashboard', (req, res) => {
    res.render('Admin_panel')
})

// Create a new blog
// done
router.post('/admin/blogs', async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).send({message : "blog added successfully"});
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all blogs
// router.get('/blogs', async (req, res) => {
//     try {
//         const blogs = await Blog.find();
//         res.send(blogs);
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// Get blog by ID
router.get('/blogs/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
    try {
        const blog = await Blog.findOne({ blogId });
        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }
        res.render("Blog_index",{blog});
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update blog by ID
router.patch('/blogs/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
    const updates = req.body;

    try {
        const blog = await Blog.findOne({ blogId });
        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }

        // Update only the fields that are present in the request body
        Object.keys(updates).forEach((update) => (blog[update] = updates[update]));

        await blog.save();
        res.send(blog);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete blog by ID
router.delete('/blogs/:blogId', async (req, res) => {
    const blogId = req.params.blogId;
    try {
        const blog = await Blog.findOneAndDelete({ blogId });
        if (!blog) {
            return res.status(404).send({ error: 'Blog not found' });
        }
        res.send(blog);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;