import express from "express";
import { Tag } from "../entities/tag";

const router = express.Router();

// add tag
router.post("/", async (req, res) => {
  const { body } = req.body;
  const tag = Tag.create({
    body,
  });
  await tag.save();
  return res.json(tag);
});

//update tag
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findOne({
    where: { id: +id },
  });
  Tag.merge(tag, req.body);
  const result = await tag.save();
  return res.json(result);
});

// delete tag
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const response = await Tag.delete(+id);
  return res.json(response);
});

export { router as tagRouter };
