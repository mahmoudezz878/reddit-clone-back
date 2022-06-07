import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Post } from "./post";

@Entity("tag")
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Post, (post) => post.tags, {
    onDelete: "CASCADE",
  })
  @JoinTable({
    name: "tags_posts",
    joinColumn: {
      name: "tag",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "post",
      referencedColumnName: "id",
    },
  })
  posts: Post[];
}
