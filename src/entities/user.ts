import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./comment";
import { Post } from "./post";

@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Post, (post) => post.user, {
    onDelete: "CASCADE",
  })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    onDelete: "CASCADE",
  })
  comments: Comment[];
}
