# REST API Documentation
This is the REST API project used for case studies.
(Main responsible person: Daoyang VATOUA)


# Technology Stack:
    - Express.js
    - TypeORM
    - TypeScript
    - MySQL

# Description
This project is a RESTful API built using Express.js, TypeORM, and TypeScript, with MySQL as the database.

# Getting Started
## Prerequisites
Before running the project, ensure you have the following installed:

- Node.js(v14 or later)
    - MySQL database

# Installation
1. Clone the repository and navigate into the project directory.
2. Install all project dependencies by running:
```bash
   npm install
   ```

# Environment Variables Setup
To run the project in different environments, you need to create.env files.Each file will contain the required environment variables like database credentials, API keys, etc.

1. Create an environment file for local development:
    ```bash
   touch .env
   ```

2.(Optional) Create other environment files for different environments:
    - Local Development:
```bash
   touch .env.local
   ```
    - Development:
```bash
   touch .env.development
   ```
    - Staging:
```bash
   touch .env.staging
   ```
    - Production:
```bash
   touch .env.production
   ```
  Make sure to populate each file with the necessary variables for each environment.


# Running the Application
To start the application in development mode, run the following command:
```bash
   npm run dev
   ```
This command will launch the API and connect it to the MySQL database.