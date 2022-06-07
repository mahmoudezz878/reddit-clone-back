import express from "express";
import { User } from "../entities/user";

const router = express.Router();

// add user
router.post("/", async (req, res) => {
  const { firstName, lastName } = req.body;
  const user = User.create({
    firstName: firstName,
    lastName: lastName,
  });
  await user.save();
  return res.json(user);
});

//update user
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id: +id },
  });
  User.merge(user, req.body);
  const result = await user.save();
  return res.json(result);
});

// delete user
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const response = await User.delete(+id);
  return res.json(response);
});

export { router as user };
