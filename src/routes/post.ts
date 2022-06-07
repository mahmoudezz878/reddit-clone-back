import express from "express";
import { Post } from "../entities/post";
import { Tag } from "../entities/tag";
import { User } from "../entities/user";

const router = express.Router();

//delete post
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const response = await Post.delete(+id);
  return res.json(response);
});

//update post
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: { id: +id },
  });
  Post.merge(post, req.body);
  const result = await post.save();
  return res.json(result);
});

//get posts
router.get("/", async (req, res) => {
  const posts = await Post.find({
    relations: {
      user: true,
      comments: true,
      tags: true,
    },
  });
  return res.json(posts);
});

//set post by id
router.post("/:userid", async (req, res) => {
  const { userid } = req.params;
  const user = await User.findOne({
    where: { id: +userid },
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const { title, body, tags } = req.body;
  const tagsSave: Tag[] = [];
  for (let i = 0; i < tags.length; i++) {
    const tag = await Tag.findOneBy({ id: tags[i].id });
    if (tag) tagsSave.push(tag);
  }
  const post = Post.create({
    title,
    body,
    user,
    tags: tagsSave,
  });

  await post.save();
  return res.json(post);
});

//get post by id
router.get("/:userid", async (req, res) => {
  const { userid } = req.params;
  const post = await Post.findOne({
    where: { id: +userid },
    relations: {
      user: true,
      comments: true,
      tags: true,
    },
  });
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }
  return res.json(post);
});

export { router as postRouter };
