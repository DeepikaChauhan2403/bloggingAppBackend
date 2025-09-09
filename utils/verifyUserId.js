
const {  TRUE, FALSE, ERR } = require("../constants");
const { getUserDataFromId } = require("../repository/users.repository");

const verifyUserId = async (userId) => {
    const userData = await getUserDataFromId(userId);

    if(userData.err){
        return ERR;
    }
    else if(userData.data.length !== 0){
        return TRUE;
    }
    else{
        return FALSE;
    }
};

module.exports = {verifyUserId}