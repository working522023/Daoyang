import axios, { AxiosError } from 'axios';
import { ApiResponse, User } from '../types';

// Define a base URL and Axios instance configuration
const apiClient = axios.create({
    baseURL: '/users',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Define custom error types
export class ApiError extends Error {
    constructor(public message: string, public statusCode?: number) {
        super(message);
        this.name = 'ApiError';
    }
}

export const login = async (email: string, password: string): Promise<User | null> => {
    try {
        const { data }: ApiResponse<User> = await apiClient.post('/login', { email, password });
        return data;
    } catch (error) {
        handleApiError(error);
        return null;
    }
};

export const signup = async (user: User): Promise<User | null> => {
    try {
        const { data }: ApiResponse<User> = await apiClient.post('/signup', user);
        return data;
    } catch (error) {
        handleApiError(error);
        return null;
    }
};

// Centralized error handler
const handleApiError = (error: unknown): void => {
    if (axios.isAxiosError(error)) {
        // Extract and handle Axios errors
        const axiosError = error as AxiosError;
        throw new ApiError(axiosError.message, axiosError.response?.status);
    } else {
        // Handle other types of errors
        throw new ApiError('An unexpected error occurred');
    }
};
