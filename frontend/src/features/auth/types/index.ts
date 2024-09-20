export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserResponse {
    status: number;
    message: string;
    data: User[];
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    address: string;
}

export interface UpdateUser {
    name: string;
    address: string;
}

export interface UserState {
    users: User[];
    currentUser: User | null;
    loading: boolean;
    error: string | null;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: Error | null;
}

export interface Error {
    message: string;
    code?: string;
    details?: any;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    error?: any;
}