import axios from 'axios';

interface LoginCredentials {
    email: string;
    password: string;
}

export const login = async (credentials: LoginCredentials) => {
    try {
        const response = await axios.post('/api/v1/user/login', credentials, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};