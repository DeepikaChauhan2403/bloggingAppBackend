
const { TRUE, FALSE, ERR } = require("../constants");
const { findUsersWithEmailOrUsername } = require("../repository/users.repository");

const verifyUsernameAndEmailExisits = async (email, username) => {
    const userData = await findUsersWithEmailOrUsername(email, username);

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

module.exports = { verifyUsernameAndEmailExisits };