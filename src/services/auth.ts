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
        avatar: 'https://github.com/shadcn.png'
    },
    {
        id: '2',
        name: 'Dr. João Silva',
        email: 'doc@vidaplus.com',
        role: 'professional',
        avatar: 'https://github.com/shadcn.png'
    },
    {
        id: '3',
        name: 'Maria Oliveira',
        email: 'patient@vidaplus.com',
        role: 'patient',
        avatar: 'https://github.com/shadcn.png'
    }
];

export async function login(email: string, password: string): Promise<User> {


    const user = MOCK_USERS.find(u => u.email === email);

    const envPassword = import.meta.env.VITE_APP_PASSWORD;

    if (user && password === envPassword) {
        return user;
    }

    throw new Error('Credenciais inválidas. Tente admin@vidaplus.com / 123');
}

export async function getUserProfile(): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return null;
}
