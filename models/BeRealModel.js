const mongoose = require('mongoose');

const beReal = new mongoose.Schema({
    profilePicture: { type: String },
    name: { type: String },
    time: {
        type: Date,
        default: Date.now,
    },
    caption: { type: String },
    image1: { type: String },
    image2: { type: String }
});
const beRealComment = new mongoose.Schema({
    name: { type: String },
    comment: { type: String },
    postid: { type: String }
})

const userComment = mongoose.model('UserComment', beRealComment);
const user = mongoose.model('User', beReal);

module.exports = { user, userComment };