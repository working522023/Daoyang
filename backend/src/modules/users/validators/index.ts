import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { body, param } from 'express-validator';

export const signupUserValidationRules = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export const loginUserValidationRules = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export const createUserValidationRules = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

export const updateUserValidationRules = [
    body('name').optional().isString(),
    body('address').optional().isString(),
];

export const deleteUserValidationRules = [
    param('id').isUUID().withMessage('Invalid user ID format'),
];

export const userIdValidationRules = [
    param('id').isUUID().withMessage('Invalid user ID format'),
];


@ValidatorConstraint({ name: 'nameValidator', async: false })
export class NameValidator implements ValidatorConstraintInterface {
    validate(name: string, args: ValidationArguments) {
        return /^[A-Za-z]+$/.test(name);
    }

    defaultMessage(args: ValidationArguments) {
        return `${args.property} must contain only alphabetic characters`;
    }
}