import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, Validate } from 'class-validator';
import { NameValidator } from '../validators';

export class UpdateUserDto {
    @IsUUID('4', { message: 'Invalid UUID format' })
    id!: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @Validate(NameValidator)
    @Transform(({ value }) => value.trim())
    name?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value.trim())
    address?: string;
}
