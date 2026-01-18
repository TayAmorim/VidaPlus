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
        id: '1',
        name: 'Administrador Sistema',
        email: 'admin@vidaplus.com',
        role: 'admin',
        avatar: adminAvatar
    },
    {
        id: '2',
        name: 'Dra Roberta Maia',
        email: 'doc@vidaplus.com',
        role: 'professional',
        avatar: doctorAvatar
    },
    {
        id: '3',
        name: 'Maria Oliveira',
        email: 'patient@vidaplus.com',
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
