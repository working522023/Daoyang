export interface User {
    name: string;
    email: string;
    password: string;
    address: string;
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