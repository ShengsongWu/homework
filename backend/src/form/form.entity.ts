import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from 'src/question/question.entity';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @OneToMany(() => Question, (q) => q.form, {
    cascade: true,
  })
  questions: Question[];

  @Column({ nullable: true })
  createdAt?: Date;

  @Column({ nullable: true })
  updatedAt?: Date;
}
