import { Form } from "../form/form.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  index: number;

  @Column()
  type: string;

  @ManyToOne(() => Form, (f) => f.questions)
  form?: Form;

  @Column("json", { nullable: true })
  visibility?: string;

  @Column("json", { nullable: true })
  options: string[];

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;
}
