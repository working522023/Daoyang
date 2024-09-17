import { DataSourceOptions } from "typeorm";
import { config } from "./env";

export const DatabaseConfig: { [key: string]: DataSourceOptions } = {
    development: {
        type: 'mysql',
        host: config.dbHost || 'localhost',
        port: Number(config.dbPort) || 3306,
        username: config.dbUser || '',
        password: config.dbPassword || '',
        database: config.dbName || '',
        synchronize: true,
        logging: false,
        entities: ['src/modules/**/entities/*.ts'],
        migrations: ['src/database/migrations/*.ts'],
        subscribers: ['src/subscribers/*.ts'],
    },
    production: {
        type: 'mysql',
        host: config.dbHost || 'localhost',
        port: Number(config.dbPort) || 3306,
        username: config.dbUser || '',
        password: config.dbPassword || '',
        database: config.dbName || '',
        synchronize: false,
        logging: false,
        entities: ['dist/modules/**/entities/*.js'],
        migrations: ['dist/database/migrations/*.js'],
        subscribers: ['dist/subscribers/*.js'],
    },
    test: {
        type: 'mysql',
        host: config.dbHost || 'localhost',
        port: Number(config.dbPort) || 3306,
        username: config.dbUser || '',
        password: config.dbPassword || '',
        database: config.dbName || '',
        synchronize: true,
        logging: false,
        dropSchema: true,   // Optional: Drop schema for testing
        entities: ['src/modules/**/entities/*.ts'],
        migrations: ['src/database/migrations/*.ts'],
        subscribers: ['src/subscribers/*.ts'],
    },
};
