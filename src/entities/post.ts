import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { Comment } from "./comment";
import { Tag } from "./tag";
import { User } from "./user";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "comment_id",
  })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts, {
    onDelete: "CASCADE",
  })
  tags: Tag[];
}
