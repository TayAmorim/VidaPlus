import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Login from './Login';
import { useAuth } from '@/context/auth-context';


vi.mock('@/context/auth-context', () => ({
    useAuth: vi.fn(),
}));


const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
    useNavigate: () => mockNavigate,
}));

describe('Login Page', () => {
    const mockSignIn = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            signIn: mockSignIn,
            isLoading: false,
            user: null,
        });
    });

    it('should render login form correctly', () => {
        render(<Login />);

        expect(screen.getByText('Sistema de Gestão Hospitalar')).toBeInTheDocument();
        expect(screen.getByText('VidaPlus - SGHSS')).toBeInTheDocument();
        expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    });

    it('should handle user input', () => {
        render(<Login />);

        const emailInput = screen.getByLabelText(/e-mail/i);
        const passwordInput = screen.getByLabelText(/senha/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');
    });

    it('should submit form with correct credentials', async () => {
        render(<Login />);

        fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'password123');
        });
    });

    it('should display error message on login failure', async () => {
        mockSignIn.mockRejectedValueOnce(new Error('Credenciais inválidas'));

        render(<Login />);

        fireEvent.change(screen.getByLabelText(/e-mail/i), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByLabelText(/senha/i), { target: { value: 'wrongpass' } });

        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        await waitFor(() => {
            expect(screen.getByText('Credenciais inválidas')).toBeInTheDocument();
        });
    });

    it('should show loading state during submission', () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            signIn: mockSignIn,
            isLoading: true,
            user: null,
        });

        render(<Login />);

        const button = screen.getByRole('button', { name: /entrando.../i });
        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();
    });

    it('should navigate to admin dashboard when admin logs in', () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            signIn: mockSignIn,
            isLoading: false,
            user: { role: 'admin' },
        });

        render(<Login />);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/admin');
    });

    it('should navigate to professional dashboard when professional logs in', () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            signIn: mockSignIn,
            isLoading: false,
            user: { role: 'professional' },
        });

        render(<Login />);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/professional');
    });

    it('should navigate to patient dashboard when patient logs in', () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            signIn: mockSignIn,
            isLoading: false,
            user: { role: 'patient' },
        });

        render(<Login />);
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/patient');
    });
});
