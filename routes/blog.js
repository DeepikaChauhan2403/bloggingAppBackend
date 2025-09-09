const express = require("express");
const { createBlog, getUserBlog, deleteBlog, editBlog, getHomepageBlogs, getUserDeletedBlog, deleteBlogPermanent, restoreDeletedBlog } = require("../controllers/blog.controller");
const { isAuth } = require("../middlewares/AuthMiddleware");
const app = express();

app.post("/create-blog", isAuth, createBlog);
app.get("/get-user-blogs", isAuth, getUserBlog);
app.get("/get-user-deleted-blogs", isAuth, getUserDeletedBlog);
app.delete("/delete-blog/:blogid", isAuth, deleteBlog);
app.delete("/delete-blog-permanent/:blogid", isAuth, deleteBlogPermanent);
app.get("/restoreDeleted-blog/:blogid", isAuth, restoreDeletedBlog);
app.put("/edit-blog", isAuth, editBlog);
app.get("/homepage-blogs", isAuth, getHomepageBlogs);

module.exports = app;