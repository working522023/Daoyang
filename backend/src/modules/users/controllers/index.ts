import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
    createUserValidationRules,
    updateUserValidationRules,
    deleteUserValidationRules,
    loginUserValidationRules,
    signupUserValidationRules,
    userIdValidationRules
} from '../validators';
import { LoginUserDto } from '../dto/login-user.dto';
import { SignupUserDto } from '../dto/signup-user.dto';
import { BadRequestException, ConflictException, InternalServerException, JWTService, NotFoundException, UnauthorizedException } from '@/common';
import bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { logger } from '@/config';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Run validation rules
        await Promise.all(loginUserValidationRules.map(rule => rule.run(req)));

        // Map request body to DTO and validate
        const loginUserDto = new LoginUserDto();
        Object.assign(loginUserDto, req.body);

        const errors = await validate(loginUserDto);
        if (errors.length > 0) {
            res.status(400).json({
                status: 400,
                errors: errors.map(error => ({
                    field: error.property,
                    message: Object.values(error.constraints || {}),
                })),
            });
        }

        try {
            const { email, password } = loginUserDto;

            // Ensure email and password are provided
            if (!email || !password) {
                return next(new BadRequestException('Email and password are required.'));
            }

            // Check if the user exists
            const existingUser = await this.userService.findByEmail(email);
            if (!existingUser) {
                return next(new BadRequestException('Invalid email or password.'));
            }

            // Validate the provided password
            const isPasswordValid = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordValid) {
                return next(new BadRequestException('Invalid email or password.'));
            }

            if (['deleted', 'locked'].includes(existingUser.status)) {
                return next(new BadRequestException(`Your account is ${existingUser.status}.`));
            }

            // Call the login method from userService
            const authToken = await this.userService.login({ email, password });

            // Set authentication token in cookies
            JWTService.setTokenCookie(res, authToken);

            // Send success response
            res.status(200).json({ status: 200, message: 'Login successful', token: authToken });
        } catch (error) {
            logger.error('Login error:', { error, body: req.body });

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('Failed to login. Please try again later.'));
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            JWTService.clearTokenCookie(res);

            // Send a successful response
            res.status(200).json({ status: 200, message: 'Logout successful' });
        } catch (error) {
            logger.error('Error during logout:', error);

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('Failed to logout. Please try again later.'));
        }
    }

    async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Run all validation rules
        await Promise.all(signupUserValidationRules.map(rule => rule.run(req)));

        try {
            // Extract user data from the request body
            const signupDto: SignupUserDto = req.body;

            // Ensure required properties are present
            if (!signupDto.email) {
                return next(new BadRequestException('Email is required.'));
            }

            // Check if a user with the same email already exists
            const existingUser = await this.userService.findByEmail(signupDto.email);
            if (existingUser) {
                return next(new ConflictException('A user with this email already exists.'));
            }

            // Create a new user
            const createdUser = await this.userService.create(signupDto);

            // Respond with success status and user data
            res.status(201).json({
                status: 201,
                message: 'Signup successful',
                data: createdUser,
            });
        } catch (error) {
            logger.error('Signup error:', error);

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('An error occurred during signup. Please try again.'));
        }
    }


    async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.findAll();

            // Mask sensitive data
            const maskedData = users.map(patient => ({
                ...users,
                // Exclude sensitive fields
                password: undefined,
                createdBy: undefined,
            }));

            res.status(200).json({
                status: 200,
                message: 'Users retrieved successfully',
                data: users
            });
        } catch (error) {
            logger.error('Error during user creation:', error);

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('Failed to retrieve user data. Please ensure you are authenticated and have sufficient permissions.'));
        }
    }

    async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Run validation rules
        await Promise.all(userIdValidationRules.map(rule => rule.run(req)));

        try {
            // Extract user ID from request parameters
            const userId = req.params.id;
            if (!userId) {
                return next(new BadRequestException('User ID is required.'));
            }

            // Fetch user details from the service
            const user = await this.userService.findOne(userId);

            if (!user) {
                return next(new NotFoundException('User not found.'));
            }

            // Mask sensitive data
            const maskedData = {
                ...user,
                // Exclude sensitive fields
                password: undefined,
                createdBy: undefined,
            };

            // Respond with the user details
            res.status(200).json({
                status: 200,
                message: 'User retrieved successfully',
                data: maskedData,
            });
        } catch (error) {
            logger.error('Error during user creation:', error);

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('Failed to retrieve user data. Please ensure you are authenticated and have sufficient permissions.'));
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Run all validation rules
        await Promise.all(createUserValidationRules.map(rule => rule.run(req)));

        // Map request body to DTO and validate it
        const createUserDto = new CreateUserDto();
        Object.assign(createUserDto, req.body);

        // const errors = await validate(createUserDto);
        // if (errors.length > 0) {
        //     res.status(400).json({
        //         status: 400,
        //         errors: errors.map(error => ({
        //             field: error.property,
        //             message: Object.values(error.constraints || {}),
        //         })),
        //     });
        // }

        try {
            const { email } = createUserDto;

            // Ensure required fields are present
            if (!email) {
                return next(new BadRequestException('Email is required.'));
            }

            // Check if the user with the same email exists
            const [existingEmail] = await Promise.all([
                this.userService.findByEmail(email),
            ]);

            if (existingEmail) {
                return next(new ConflictException('This email is already in use.'));
            }

            // Create a new user
            const createdUser = await this.userService.create(createUserDto);

            // Respond with success status and user data
            res.status(201).json({
                status: 201,
                message: 'Signup successful',
                data: createdUser,
            });
        } catch (error) {
            logger.error('Signup error:', error);

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('An error occurred during signup. Please try again.'));
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Run all validation rules
        await Promise.all(updateUserValidationRules.map(rule => rule.run(req)));

        try {
            // Extract user data and user ID from request
            const userId = req.params.id;
            if (!userId) {
                return next(new BadRequestException('User ID is required.'));
            }

            const updateUserDto: UpdateUserDto = req.body;

            // Update user data
            const updatedUser = await this.userService.update(userId, updateUserDto);

            if (!updatedUser) {
                return next(new NotFoundException('User not found.'));
            }

            // Respond with success status and updated user data
            res.status(200).json({
                status: 200,
                message: 'User updated successfully',
                data: updatedUser,
            });
        } catch (error) {
            logger.error('Error updating user:', error);

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('An error occurred while updating the user. Please try again.'));
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        // Run all validation rules
        await Promise.all(deleteUserValidationRules.map(rule => rule.run(req)));

        try {
            // Extract user ID from request
            const userId = req.params.id;
            if (!userId) {
                return next(new BadRequestException('User ID is required.'));
            }

            // Attempt to delete the user
            const isDeleted = await this.userService.delete(userId);

            if (!isDeleted) {
                return next(new NotFoundException('User not found.'));
            }

            res.status(200).json({ status: 200, message: "User deleted successfully." });
        } catch (error) {
            logger.error('Error deleting user:', error);

            // Handle custom errors gracefully
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }

            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }

            next(new InternalServerException('An error occurred while deleting the user. Please try again.'));
        }
    }
}