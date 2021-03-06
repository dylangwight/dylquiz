/**
 * Created by DylanWight on 6/4/17.
 */
const mongoose = require("mongoose");

const QuizSchema = mongoose.Schema({
    name: String,
    imageUrl: String,
    description: String,
    _user: String,
    published: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = QuizSchema;