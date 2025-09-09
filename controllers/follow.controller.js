const { TRUE, FALSE, ERR } = require("../constants");
const Follow = require("../modles/FollowSchema");
const { checkIfUserFollows } = require("../utils/checkIfUserFollows");

const { addFollowToDB, deleteFollowFromDB, getFollowingListFromDB, getFollowingDetailsFromDB, getFollowerListFromDB, getFollowerDetailsFromDB } = require("../repository/follow.repository");
const Joi = require("joi");
const { verifyUserId } = require("../utils/verifyUserId.JS");
// const { deleteFollowFromDB } = require("../repository/follow.repository")


// To follow other users
const followUser = async (req, res) => {
    const followerUserId = req.locals.userId; // i.e A
    const { followingUserId } = req.body; // i.e B

    // Validate the body
    const isValid = Joi.object({
        followingUserId: Joi.string().required(),
    }).validate(req.body);

    if (isValid.error) {
        return res.status(400).send({
            status: 400,
            message: "Invalid User Id",
            data: isValid.error,
        });
    }

    // Validate followingUserId i.e B
    const isUser = await verifyUserId(followingUserId);

    if (isUser === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getUserDataFromId failed",
        });
    }
    else if (isUser === FALSE) {
        return res.status(400).send({
            status: 400,
            message: "Following User dosen't exist",
        });
    }

    // Validate followerUserId i.e A
    const isUser1 = await verifyUserId(followerUserId);

    if (isUser1 === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getUserDataFromId failed",
        });
    }
    else if (isUser1 === FALSE) {
        return res.status(400).send({
            status: 400,
            message: "Follower User dosen't exist",
        });
    }

    // Check if the followerUserId already follows the followingUserId
    const alreadyFollows = await checkIfUserFollows(followerUserId, followingUserId);

    if (alreadyFollows === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Erro: getFollowData failedr",
        });
    }
    else if (alreadyFollows === TRUE) {
        return res.status(400).send({
            status: 400,
            message: "you already follow this user",
        });
    }

    const followObj = new Follow({
        followerUserId,
        followingUserId,
        creationDateTime: Date.now(),
    });

    const response = await addFollowToDB(followObj);
    if (response === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: addFollowToDB failed",
        });
    }

    return res.status(200).send({
        status: 200,
        message: "Followed successfully",
    });
};

// To unfollow other users
const unfollowUser = async (req, res) => {
    const followerUserId = req.locals.userId;
    const { followingUserId } = req.body;

    // Validate the body
    const isValid = Joi.object({
        followingUserId: Joi.string().required(),
    }).validate(req.body);

    if (isValid.error) {
        return res.status(400).send({
            status: 400,
            message: "Invalid User Id",
            data: isValid.error,
        });
    }

    // Validate followingUserId
    const isUser = await verifyUserId(followingUserId);

    if (isUser === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getUserDataFromId failed",
        });
    }
    else if (isUser === FALSE) {
        return res.status(400).send({
            status: 400,
            message: "Following User dosen't exist",
        });
    }

    // Validate followerUserId
    const isUser1 = await verifyUserId(followerUserId);

    if (isUser1 === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getUserDataFromId failed",
        });
    }
    else if (isUser1 === FALSE) {
        return res.status(400).send({
            status: 400,
            message: "Follower User dosen't exist",
        });
    }

    // Check if the followerUserId follows the followingUserId or not
    const alreadyFollows = await checkIfUserFollows(followerUserId, followingUserId);

    if (alreadyFollows === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Erro: getFollowData failedr",
        });
    }
    else if (alreadyFollows === FALSE) {
        return res.status(400).send({
            status: 400,
            message: "you don't follow this user",
        });
    }

    const response = await deleteFollowFromDB(followerUserId, followingUserId);
    if (response === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: deleteFollowFromDB failed",
        });
    }

    return res.status(200).send({
        status: 200,
        message: "unfollowed successfully",
    });
};

// To get list of people whom I follow
const getFollowingList = async (req, res) => {
    const userId = req.locals.userId;

    // Validate followingUserId
    const isUser = await verifyUserId(userId);

    if (isUser === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getUserDataFromId failed",
        });
    }
    else if (isUser === FALSE) {
        return res.status(400).send({
            status: 400,
            message: "Follower User dosen't exist",
        });
    }

    // Will get the following list
    const followingList = await getFollowingListFromDB(userId);

    if (followingList.err) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getFollowingListFromDB failed ",
        });
    }

    // Will take usersId of users that we follow, from the followingList and store in arry followingUserId
    let followingUserId = [];
    followingList.data.forEach((followObj) => {
        followingUserId.push(followObj.followingUserId);
    });

    // Will fectch data/details from user DB , using arry followingUserId (having id of following users)
    const followingDetails = await getFollowingDetailsFromDB(followingUserId);

    if (followingDetails.err) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getFollowingDetailsFromDB failed ",
        });
    }

    // saving details of following users in arry useraData( not the password)
    let usersData = [];
    followingDetails.data.map((user) => {
        let userData = {
            name: user.name,
            username: user.username,
            email: user.email,
            _id: user._id,
        };

        usersData.push(userData);
    })

    return res.status(200).send({
        status: 200,
        message: " Fetched following list",
        data: usersData,
    });
};

// To get list of people who follows me
const getFollowerList = async (req, res) => {
    const userId = req.locals.userId;

    // Validate followingUserId
    const isUser = await verifyUserId(userId);

    if (isUser === ERR) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getUserDataFromId failed",
        });
    }
    else if (isUser === FALSE) {
        return res.status(400).send({
            status: 400,
            message: "Following User dosen't exist",
        });
    }

    // Will get the following list
    const followerList = await getFollowerListFromDB(userId);

    if (followerList.err) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getFollowerListFromDB failed ",
        });
    }

    // Will take usersId of users, from the followingList ans store in arry followingUserId
    let followerUserId = [];
    followerList.data.forEach((followObj) => {
        followerUserId.push(followObj.followerUserId);
    });

    // Will fectch data/details from user DB , using arry followingUserId (having id of following users)
    const followerDetails = await getFollowerDetailsFromDB(followerUserId);

    if (followerDetails.err) {
        return res.status(400).send({
            status: 400,
            message: "DB Error: getFollowerDetailsFromDB failed ",
        });
    }

    // saving details of following users in arry useraData( not the password)
    let usersData = [];
    followerDetails.data.map((user) => {
        let userData = {
            name: user.name,
            username: user.username,
            email: user.email,
            _id: user._id,
        };

        usersData.push(userData);
    })

    return res.status(200).send({
        status: 200,
        message: " Fetched follower list",
        data: usersData,
    });
}


module.exports = {
    followUser,
    unfollowUser,
    getFollowingList,
    getFollowerList
};