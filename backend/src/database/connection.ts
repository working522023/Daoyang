import { DataSource } from 'typeorm';
import { DatabaseConfig } from '@/config/database';
import dotenv from 'dotenv';

dotenv.config();

const environment = process.env.NODE_ENV || 'development';  // Detect environment

export const AppDataSource = new DataSource(DatabaseConfig[environment]);

AppDataSource.initialize()
    .then(() => {
        console.log(`Database connected successfully in ${environment} mode.`);
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
