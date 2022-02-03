const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);

const checkLogin = require('../middlewares/checkLogin');

// get all TODOs
router.get('/', checkLogin, async (req, res) => {
    console.log(req.username);
    console.log(req.userId);
    await Todo.find({})
        .select({
            _id: 0,
            __v: 0
        })
        .limit(3)
        .exec((err, doc) => {
            if (err) {
                res.status(500).json({
                    error: err
                })
            } else {
                res.status(200).json({
                    todos: doc
                })
            }
        })
})

// GET A TODO by ID
router.get("/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        const result = await Todo.find({ _id: req.params.id });
        res.status(200).json({ message: result })
    } catch (error) {
        res.status(500).json({
            error: `There was a server side error! ${error}`,
        })
    }
    // await Todo.find({ _id: req.params.id }, (err, data) => {
    //     console.log(data);
    //     if (err) {
    //         res.status(500).json({
    //             error: "There was a server side error!",
    //         });
    //     } else {
    //         res.status(200).json({
    //             result: data,
    //             message: "Success",
    //         });
    //     }
    // });
});

// Post A TODO
router.post('/', checkLogin, async (req, res) => {
    try {
        const newTodo = new Todo({
            ...req.body,
            user: req.userId
        });
        await newTodo.save();
        res.status(200).json({
            message: "Todo was inserted successfully!"
        })
    } catch (error) {
        res.status(500).json({
            error: "This is a server side error"
        })
    }

})

// POST multiple TODOs
router.post('/all', async (req, res) => {
    await Todo.insertMany(req.body, (err, doc) => {
        if (err) {
            res.status(500).json({
                error: "This is a server side error"
            })
        } else {
            res.status(200).json({
                message: doc
            })
        }
    })
})

// PUT a TODO by ID
router.put('/:id', async (req, res) => {
    await Todo.updateOne(
        { __id: req.params.id },
        {
            $set: {
                status: "active",
            },
        },
        (err, doc) => {
            if (err) {
                res.status(500).json({
                    error: "Server side error"
                })
            } else {
                res.status(200).json({
                    message: doc
                })
            }
        }
    )
})

// DELETE a TODO by 
router.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({
            result
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

module.exports = router;