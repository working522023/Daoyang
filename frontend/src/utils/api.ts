const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const api = {
    get: async <T>(url: string, params?: Record<string, any>): Promise<T> => {
        const query = params ? `?${new URLSearchParams(params).toString()}` : '';
        const response = await fetch(`${baseURL}${url}${query}`);
        return response.json();
    },

    post: async <T>(url: string, data: any): Promise<T> => {
        const response = await fetch(`${baseURL}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    put: async <T>(url: string, data: any): Promise<T> => {
        const response = await fetch(`${baseURL}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    delete: async <T>(url: string): Promise<T> => {
        const response = await fetch(`${baseURL}${url}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};
