const Follow = require("../modles/FollowSchema");
const { TRUE, FALSE, ERR } = require("../constants");
const UserSchema = require("../modles/UserSchema");

const getFollowData = async (followerUserId, followingUserId) => {
    const followData = {
        data: null,
        err: null,
    };

    try {
        followData.data = await Follow.findOne({ followerUserId, followingUserId });
        return followData;
    }
    catch (err) {
        followData.err = err;
        return followData;
    }
};

const addFollowToDB = async (followobj) => {
    try {
        await followobj.save();
        return TRUE;
    }
    catch (err) {
        return ERR;
    }
};

const deleteFollowFromDB = async (followerUserId, followingUserId) => {

    try {
        await Follow.findOneAndDelete({ followerUserId, followingUserId });
        return TRUE;
    }
    catch (err) {
        return ERR;
    }
};

const getFollowingListFromDB = async (followerUserId) => {
    let followingList = {
        data: null,
        err: null
    }

    try {
        followingList.data = await Follow.find({ followerUserId });
        return followingList;
    }
    catch (err) {
        followingList.err = err;
        return followingList;
    }
};


const getFollowingDetailsFromDB = async (followingUserId) => {
    let followingDetails = {
        data: null,
        err: null
    }

    try {
        followingDetails.data = await UserSchema.find({ _id: { $in: followingUserId } });
        return followingDetails;
    }
    catch (err) {
        followingDetails.err = err;
        return followingDetails;
    }
};

const getFollowerListFromDB = async (followingUserId) => {
    let followerList = {
        data: null,
        err: null
    }

    try {
        followerList.data = await Follow.find({ followingUserId });
        return followerList;
    }
    catch (err) {
        followerList.err = err;
        return followerList;
    }
};

const getFollowerDetailsFromDB = async (followerUserId) => {
    let followerDetails = {
        data: null,
        err: null
    }

    try {
        followerDetails.data = await UserSchema.find({ _id: { $in: followerUserId } });
        return followerDetails;
    }
    catch (err) {
        followerDetails.err = err;
        return followerDetails;
    }
};

module.exports = {
    getFollowData,
    addFollowToDB,
    deleteFollowFromDB,
    getFollowingListFromDB,
    getFollowingDetailsFromDB,
    getFollowerListFromDB,
    getFollowerDetailsFromDB,
};