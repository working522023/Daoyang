import { BaseEntity } from '@/common';
import { Entity, Column, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import bcrypt from 'bcrypt';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
} from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
  @Column('varchar', { length: 50 })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @Column('varchar', { length: 200, unique: true })
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @Column()
  @IsString()
  @Length(8, 128)
  @IsNotEmpty()
  password!: string;

  @Column('text', { nullable: true })
  @IsString()
  @IsOptional()
  address?: string;

  @Column('varchar', { length: 20, default: 'admin' })
  @IsString()
  @IsNotEmpty()
  role!: string;

  // Hash the password before saving it to the database
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // Method to compare the provided password with the stored hash
  async comparePassword(providedPassword: string): Promise<boolean> {
    return await bcrypt.compare(providedPassword, this.password);
  }
}
