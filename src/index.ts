import express from "express";
import { user } from "./routes/user";
import { postRouter } from "./routes/post";
import { createComment } from "./routes/comment";
import { AppDataSource } from "./database";
import dotenv from "dotenv";
import { tagRouter } from "./routes/tag";
import cors from "cors";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("you are good");
});

app.use("/user", user);
app.use("/post", postRouter);
app.use("/comment", createComment);
app.use("/tag", tagRouter)

app.listen(process.env.port, async () => {
  console.log("now runing on port 7575");

  await AppDataSource.initialize();
  console.log("Connected to Postgres");
});
