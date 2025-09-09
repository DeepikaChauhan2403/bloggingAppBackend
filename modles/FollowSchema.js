const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
    followerUserId: {
        // supose A follows B then this is the A's user Id// if i am floowing (B) than this is my user id i.e A
        // fk to user collection
        type: String,
        ref: "users",
        require: true,
    },
    followingUserId: {
        // This is B's user Id
        type: String,
        ref: "users",
        required: true,
    },
    creationDateTime: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("follow", FollowSchema);