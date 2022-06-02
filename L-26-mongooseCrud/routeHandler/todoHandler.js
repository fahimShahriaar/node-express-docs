const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const userSchema = require("../schemas/userSchema");
const Todo = new mongoose.model("Todo", todoSchema);
const User = new mongoose.model("User", userSchema);

const checkLogin = require("../middlewares/checkLogin");

// GET TODO's by Language [ mongoose instance method ]
router.get("/getByLang/:lang", async (req, res) => {
  try {
    const todo = new Todo();
    const result = await todo.findByLanguage(req.params.lang);
    console.log(result);
    if (result) {
      res.json({ success: true, result });
    } else {
      res.json({ success: false, result });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
});

// GET TODO's by Language [ mongoose static method ]
router.get("/getByLangStatic/:lang", async function (req, res) {
  try {
    const result = await Todo.findByLang(req.params.lang);
    console.log(result);
    if (result.length > 0) {
      res.json({ success: true, result });
    } else {
      res.json({ success: false, error });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
});

// GET TODO's by Language [ mongoose query method ]
router.get("/getByLangQuery/:lang", async (req, res) => {
  try {
    const result = await Todo.find().byTitle(req.params.lang);
    res.json({ success: true, result });
  } catch (error) {
    res.json({ success: false, error });
  }
});

// get all TODOs
router.get("/", checkLogin, async (req, res) => {
  console.log(req.username);
  console.log(req.userId);
  await Todo.find()
    .populate("user", "name username -_id")
    .select({
      _id: 0,
      __v: 0,
    })
    .limit(3)
    .exec((err, doc) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
      } else {
        res.status(200).json({
          todos: doc,
        });
      }
    });
});

// GET A TODO by ID
router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await Todo.find({ _id: req.params.id });
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({
      error: `There was a server side error! ${error}`,
    });
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
router.post("/", checkLogin, async (req, res) => {
  try {
    const newTodo = new Todo({
      ...req.body,
      user: req.userId,
    });
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      error: "This is a server side error",
    });
  }
});

// POST multiple TODOs
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err, doc) => {
    if (err) {
      res.status(500).json({
        error: "This is a server side error",
      });
    } else {
      res.status(200).json({
        message: doc,
      });
    }
  });
});

// PUT a TODO by ID
router.put("/:id", async (req, res) => {
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
          error: "Server side error",
        });
      } else {
        res.status(200).json({
          message: doc,
        });
      }
    }
  );
});

// DELETE a TODO by
router.delete("/:id", async (req, res) => {
  try {
    const result = await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

module.exports = router;
