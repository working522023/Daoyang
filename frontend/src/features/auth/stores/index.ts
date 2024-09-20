import { defineStore } from 'pinia';
import axios from 'axios';
import { CreateUser, UpdateUser, User, UserResponse, UserState } from '../types';

// Use the environment variable for API base URL
const API_BASE_URL = '/users';

export const useUserStore = defineStore('userStore', {
    state: (): UserState => ({
        users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
        currentUser: null,
        loading: false,
        error: null,
    }),

    actions: {
        setLocalStorage(users: User[]) {
            this.users = users;
            localStorage.setItem('users', JSON.stringify(users));
        },

        // Centralized method to handle API requests
        async handleRequest<T>(requestFn: () => Promise<T>, errorMessage: string): Promise<T | undefined> {
            this.loading = true;
            this.error = null;
            try {
                return await requestFn();
            } catch (error) {
                this.error = errorMessage;
                console.error(error);
                return undefined;
            } finally {
                this.loading = false;
            }
        },

        // Fetch all users
        async getAllUsers() {
            const response = await this.handleRequest(
                () => axios.get<UserResponse>(`${API_BASE_URL}`),
                'Failed to load users'
            );
            if (response?.data) {
                console.log('API Response Data:', response.data);
                this.setLocalStorage(response.data.data);
            }
        },

        // Fetch user by ID
        async getByUserId(id: string) {
            const response = await this.handleRequest(
                () => axios.get<User>(`${API_BASE_URL}/${id}`),
                `Failed to load user with ID ${id}`
            );
            if (response) {
                this.currentUser = response.data;
            }
        },

        // Create a new user
        async createUser(userData: Omit<CreateUser, 'id'>) {
            const response = await this.handleRequest(
                () => axios.post<User>(API_BASE_URL, userData),
                'Failed to create user'
            );
            if (response) {
                this.setLocalStorage([...this.users, response.data]);
            }
        },

        // Update an existing user
        async updateUser(id: string, userData: Partial<UpdateUser>) {
            const response = await this.handleRequest(
                () => axios.put<User>(`${API_BASE_URL}/${id}`, userData),
                `Failed to update user with ID ${id}`
            );
            if (response) {
                const updatedUsers = this.users.map(user => user.id === id ? response.data : user);
                this.setLocalStorage(updatedUsers);
            }
        },

        // Delete a user by ID
        async deleteUser(id: string) {
            const success = await this.handleRequest(
                () => axios.delete(`${API_BASE_URL}/${id}`),
                `Failed to delete user with ID ${id}`
            );
            if (success) {
                const updatedUsers = this.users.filter(user => user.id !== id);
                this.setLocalStorage(updatedUsers);
            }
        },
    },
});
