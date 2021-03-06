/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    phone: String,
    username: String,
    email: String,
    password: String,
    facebook: {
        id:    String,
        token: String
    },
    following: [String],
    algolia_id: String,
    imageUrl: String,
    admin: {type: Boolean, default: false},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = UserSchema;