import adminAvatar from '@/assets/admin-user.jpg';
import doctorAvatar from '@/assets/doctor-user.jpg';
import patientAvatar from '@/assets/patient-user.jpg';

export type Role = 'admin' | 'professional' | 'patient';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}


const MOCK_USERS: User[] = [
    {
        id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        name: 'Administrador Sistema',
        email: 'admin@vidaplus.com',
        role: 'admin',
        avatar: adminAvatar
    },
    {
        id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        name: 'Dra Roberta Maia',
        email: 'doc@vidaplus.com',
        role: 'professional',
        avatar: doctorAvatar
    },
    {
        id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
        name: 'Maria Oliveira',
        email: 'maria@vidaplus.com',
        role: 'patient',
        avatar: patientAvatar
    }
];

export async function login(email: string, password: string): Promise<User> {

    const user = MOCK_USERS.find(u => u.email === email);

    const envPassword = import.meta.env.VITE_APP_PASSWORD;

    if (user && password === envPassword) {
        return user;
    }

    throw new Error('Credenciais inválidas.');
}

export async function getUserProfile(): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return null;
}
