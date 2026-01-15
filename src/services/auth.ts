export type Role = 'admin' | 'professional' | 'patient';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar?: string;
}

// Mock users database
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
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock validation (accept any password '123' for demo purposes, or specific one)
    const user = MOCK_USERS.find(u => u.email === email);

    // Basic validation check - strict functionality for 'doc123', 'admin123', 'patient123' 
    // or just generic check for simplicity as requested in "mock"
    if (user && password.length >= 3) {
        return user;
    }

    throw new Error('Credenciais inválidas. Tente admin@vidaplus.com / 123');
}

export async function getUserProfile(): Promise<User | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // In a real app, this would use a token. 
    // Here we just mock-return the persisted user if handled by context.
    return null;
}
