import { DataSource } from "typeorm";
import { Post } from "./entities/post";
import { Comment } from "./entities/comment";
import { User } from "./entities/user";
import dotenv from "dotenv";
import "reflect-metadata";
import { Tag } from "./entities/tag";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Post, Comment, User, Tag],
});
