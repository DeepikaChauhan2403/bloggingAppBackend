const { ERR, TRUE, FALSE, NOT_EXIST} = require("../constants");
const { getBlogDataFromDB } = require("../repository/blog.repository");

const blogBelongsToUser = async (blogId, userId) => {
    const blogData = await getBlogDataFromDB(blogId);
    

    if (blogData.data === null && blogData.err === null) {
        return NOT_EXIST;
      }

    if(blogData.err) {
        return ERR;
    }
    else if (blogData.data.userId == userId) {
        return TRUE;
    }
    else {
        return FALSE;
    }
};

module.exports = { blogBelongsToUser };