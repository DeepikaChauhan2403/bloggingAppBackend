
const { TRUE, FALSE, ERR } = require("../constants");
const { getFollowData } = require("../repository/follow.repository");

const checkIfUserFollows = async (followerUserId, followingUserId) => {
    const followData = await getFollowData(followerUserId, followingUserId);

    if (followData.err) {
        return ERR;
    }
    else if (followData.data !== null) {
        return TRUE;
    }
    else {
        return FALSE;
    }
};

module.exports = { checkIfUserFollows };