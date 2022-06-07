import express from "express";
import { Comment } from "../entities/comment";
import { Post } from "../entities/post";
import { User } from "../entities/user";

const router = express.Router();

// add comment
router.post("/:userid/:postid", async (req, res) => {
  const { userid, postid } = req.params;
  const user = await User.findOneBy({ id: +userid });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const post = await Post.findOneBy({ id: +postid });

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const { body } = req.body;
  const comment = Comment.create({
    body,
    user,
    post,
  });
  await comment.save();
  return res.json(comment);
});

//update comment
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOne({
    where: { id: +id },
  });
  Comment.merge(comment, req.body);
  const result = await comment.save();
  return res.json(result);
});

// delete comment
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const response = await Comment.delete(+id);
  return res.json(response);
});

export { router as createComment };
