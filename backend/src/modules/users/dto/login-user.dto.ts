import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MinLength,
    MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.trim().toLowerCase())
    email?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
    }, { message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character' })
    password?: string;
}
