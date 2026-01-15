import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type User, login as authLogin } from '@/services/auth';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('vidaplus_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user', error);
                localStorage.removeItem('vidaplus_user');
            }
        }
        setIsLoading(false);
    }, []);

    const signIn = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const loggedUser = await authLogin(email, password);
            setUser(loggedUser);
            localStorage.setItem('vidaplus_user', JSON.stringify(loggedUser));
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('vidaplus_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isLoading,
            signIn,
            signOut,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
