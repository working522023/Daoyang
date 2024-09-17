import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
    MinLength,
    MaxLength,
    IsOptional,
    Matches,
    Validate,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { NameValidator } from '../validators';

export class SignupUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Validate(NameValidator)
    @Transform(({ value }) => value.trim())
    name?: string;

    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.trim().toLowerCase())
    email?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/)
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
    }, { message: 'Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character' })
    password?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    address?: string;
}
