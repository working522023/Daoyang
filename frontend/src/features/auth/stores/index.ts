import { defineStore } from 'pinia';
import axios from 'axios';
import { CreateUser, UpdateUser, User, UserResponse, UserState } from '../types';

// Use the environment variable for API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/users';

export const useUserStore = defineStore('userStore', {
    state: (): UserState => ({
        users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
        currentUser: null,
        loading: false,
        error: null,
    }),

    actions: {
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

        // Fetch all users with pagination and filtering
        // async getAllUsers({
        //     page = 1,
        //     offset = 10,
        //     sort_by = 'createdAt',
        //     order_by = 'asc',
        //     start_date,
        //     end_date,
        //     filter = ''
        // }: {
        //     page?: number;
        //     offset?: number;
        //     sort_by?: string;
        //     order_by?: 'asc' | 'desc';
        //     start_date?: string;
        //     end_date?: string;
        //     filter?: string;
        // } = {}) {
        //     const queryParams = new URLSearchParams({
        //         page: page.toString(),
        //         offset: offset.toString(),
        //         sort_by,
        //         order_by,
        //         ...(start_date && { start_date }),
        //         ...(end_date && { end_date }),
        //         ...(filter && { filter }),
        //     });

        //     const response = await this.handleRequest(
        //         () => axios.get<User[]>(`${API_BASE_URL}?${queryParams}`),
        //         'Failed to load users'
        //     );

        //     if (response) {
        //         this.users = response.data;
        //     }
        // },

        // Fetch all users
        async getAllUsers() {
            try {
                const response = await this.handleRequest(
                    () => axios.get<UserResponse>(`${API_BASE_URL}`),
                    'Failed to load users'
                );

                if (response && response.data) {
                    console.log('API Response Data:', response.data);
                    this.users = response.data.data;
                    localStorage.setItem('users', JSON.stringify(this.users));
                }
            } catch (error) {
                console.error("Failed to load users:", error);
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
            try {
                const response = await this.handleRequest(
                    () => axios.post<User>(API_BASE_URL, userData),
                    'Failed to create user'
                );
                if (response) {
                    this.users.push(response.data);
                    localStorage.setItem('users', JSON.stringify(this.users));
                }
            } catch (error) {
                throw new Error('Failed to create user');
            }
        },

        // Update an existing user
        async updateUser(id: string, userData: Partial<UpdateUser>) {
            const response = await this.handleRequest(
                () => axios.put<User>(`${API_BASE_URL}/${id}`, userData),
                `Failed to update user with ID ${id}`
            );
            if (response) {
                const index = this.users.findIndex(user => user.id === id);
                if (index !== -1) {
                    this.users[index] = response.data;
                    localStorage.setItem('users', JSON.stringify(this.users));
                }
            }
        },

        // Delete a user by ID
        async deleteUser(id: string) {
            const success = await this.handleRequest(
                () => axios.delete(`${API_BASE_URL}/${id}`),
                `Failed to delete user with ID ${id}`
            );
            if (success) {
                this.users = this.users.filter(user => user.id !== id);
                localStorage.setItem('users', JSON.stringify(this.users));
            }
        },
    },
});
