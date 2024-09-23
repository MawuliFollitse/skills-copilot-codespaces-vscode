// Create web server
// Create a route for /comment
// Create a route for /comment/add
// Create a route for /comment/update
// Create a route for /comment/delete
// Create a route for /comment/get
// Create a route for /comment/getall
// Create a route for /comment/getallbyid
// Create a route for /comment/getallbyuserid

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// Create a route for /comment
router.get('/', (req, res) => {
    res.send('Comment route');
});

// Create a route for /comment/add
router.post('/add', async (req, res) => {
    const comment = new Comment({
        comment: req.body.comment,
        userId: req.body.userId,
        postId: req.body.postId
    });

    try {
        const savedComment = await comment.save();
        res.json(savedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a route for /comment/update
router.patch('/update', async (req, res) => {
    try {
        const updatedComment = await Comment.updateOne(
            { _id: req.body.commentId },
            { $set: { comment: req.body.comment } }
        );
        res.json(updatedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a route for /comment/delete
router.delete('/delete', async (req, res) => {
    try {
        const removedComment = await Comment.remove({ _id: req.body.commentId });
        res.json(removedComment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a route for /comment/get
router.get('/get', async (req, res) => {
    try {
        const comment = await Comment.findById(req.body.commentId);
        res.json(comment);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a route for /comment/getall
router.get('/getall', async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});

// Create a route for /comment/getallbyid
router.get('/getallbyid', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.body.postId });
        res.json(comments);
    } catch (err) {
        res.json({ message: err });
    }
});