import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities';
import { BadRequestException, JWTService, NotFoundException } from '@/common';
import { AppDataSource } from '@/database';

export class UserService {
    private readonly userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async login(credentials: { email: string; password: string }): Promise<string> {
        const { email, password } = credentials;

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user || !(await user.comparePassword(password))) {
            throw new BadRequestException('Invalid credentials');
        }

        if (!user.id || !user.name || !user.email) {
            throw new BadRequestException('User details are incomplete');
        }

        // Prepare payload for token generation
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        return JWTService.generateToken(payload);
    }

    async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            console.error('Error retrieving users:', error);
            throw new BadRequestException('Error retrieving users');
        }
    }

    async findOne(id: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
            console.error('Error retrieving user:', error);
            throw new BadRequestException('Error retrieving users');
        }
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error creating user:', error);
            throw new BadRequestException('Error creating user');
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }

        Object.assign(user, updateUserDto);
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error updating user:', error);
            throw new BadRequestException('Error updating user');
        }
    }

    async delete(id: string): Promise<boolean> {
        try {
            const result = await this.userRepository.delete(id);

            // Check if 'affected' property is present
            if (result.affected !== undefined && result.affected !== null) {
                return result.affected > 0;
            }

            return false;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new BadRequestException('Error deleting user');
        }
    }
}
