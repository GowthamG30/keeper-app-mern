const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");

router.get("/all", postController.getAllPosts);
router.post("/add", postController.addPost);
router.put("/update/:id", postController.updatePost);
router.delete("/del/:id", postController.deletePost);

module.exports = router;
