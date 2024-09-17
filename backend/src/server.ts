import app from "./app";
import { config } from "./config";
import { AppDataSource } from './database';

// Initialize DB connection
AppDataSource.initialize()
    .then(() => {
        console.log('Connected to the database');
        app.listen(config.port, () => {
            console.log(`Server running on http://localhost:${config.port}`);
        });
    })
    .catch((error) => {
        console.error("Database initialization failed:", error.name, error.message, error.stack);
        process.exit(1);
    });