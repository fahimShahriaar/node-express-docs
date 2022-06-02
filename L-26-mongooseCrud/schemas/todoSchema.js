const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
// Mongoose Instance Methods
todoSchema.methods = {
  findByLanguage: function (lang) {
    return mongoose.model("Todo").find({ title: new RegExp(lang, "i") });
  },
};

// Mongoose Static Methods
todoSchema.statics = {
  findByLang: function (lang) {
    return this.find({ title: new RegExp(lang, "i") });
  },
};

// Mongoose Query Helpers
todoSchema.query = {
  byTitle: function (title) {
    return this.find({ title: new RegExp(title, "i") });
  },
};

module.exports = todoSchema;
