const corn = require("node-cron");
const Blog = require("../modles/BlogsSchema");

const cleanUpBin = () => {
    corn.schedule("0 0 1 * * *", async() => {
        console.log("cron is running");

        const deletedBlogs = await Blog.find({ isDeleted: true });

        if(deletedBlogs.length > 0){
            deletedBlogs.forEach(async (blog) => {
                const diff = 
                (Date.now() - blog.deletionDateTime.getTime()) / (1000 * 60 * 60 * 24);

                if(diff >= 30){
                    try{
                        await Blog.findOneAndDelete({ _id: blog._id });
                    }
                    catch(err){
                        console.log(err);
                    }
                }
            });
        }
    }, 
    {
        scheduled: true,
        timezone: "Asia/Kolkata",
    }
    );
};

module.exports = { cleanUpBin };