import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student {
   
@PrimaryGeneratedColumn()
@Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  gender: string;

  @Column()
  @Field()
  address: string;

  @Column()
  @Field()
  mobileNo: number;

  @Column()
  @Field()
  DOB: Date;

  @Column()
  @Field()
  age: number;


}