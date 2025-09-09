const User = require("../modles/UserSchema");
const { TRUE, ERR } = require("../constants");

const findUsersWithEmailOrUsername = async (email, username) => {

    let userData = {
        data: null,
        err: null,
    };

    try {
        // DB call made // if get than  userData.data will have vallue else empty array
        userData.data = await User.find({ $or: [{ email }, { username }] });
        return userData;
    }
    catch (err) {
        userData.err = err;
        return userData;
    }
};

const getUserDataFromId = async (userId) => {
    let userData = {
        data: null,
        err: null,
    };

    try {
        // DB call made // if get than  userData.data will have vallue else empty array
        userData.data = await User.findById(userId);
        return userData;
    }
    catch (err) {
        userData.err = err;
        return userData
    }
};

const addUserToDB = async (userObj) => {
    try {
        await userObj.save();// save in DB
        return TRUE;
    }
    catch (err) {
        return ERR;
    }
};


const getUserDataFromUsername = async (username) => {

    let userData = {
        data: null,
        err: null,
    };

    try {
        // DB call made //if get than  userData.data will have vallue else null
        userData.data = await User.findOne({ username });
        return userData;
    }
    catch (err) {
        userData.err = err;
        return userData;
    }
};

const getUserDataFromEmail = async (email) => {

    let userData = {
        data: null,
        err: null,
    };

    try {
        // DB call made 
        userData.data = await User.findOne({ email });
        return userData;
    }
    catch (err) {
        userData.err = err;
        return userData;
    }
};

const getAllUsersFromDB = async (userId) => {
    const allUserData = {
        data: null,
        err: null,
    };

    try{
        allUserData.data = await User.find({ _id: { $ne: userId}});
        return allUserData;
    }
    catch(err){
        allUserData.err = err;
        return allUserData;
    }
};

const getUserDetailsFromDB = async (userId) => {
    const allUserData = {
        data: null,
        err: null,
    };

    try{
        allUserData.data = await User.find({ _id: { $ne: userId}});
        return allUserData;
    }
    catch(err){
        allUserData.err = err;
        return allUserData;
    }
};

module.exports = {
    findUsersWithEmailOrUsername,
    addUserToDB,
    getUserDataFromUsername,
    getUserDataFromEmail,
    getUserDataFromId,
    getAllUsersFromDB,
};