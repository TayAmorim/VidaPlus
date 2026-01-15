import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import type { Role } from '@/services/auth';

interface ProtectedRouteProps {
    allowedRoles?: Role[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return <div className="flex h-screen w-full items-center justify-center">Carregando...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on role to avoid getting stuck
        // or to a standardized 'unauthorized' page
        if (user.role === 'admin') return <Navigate to="/dashboard/admin" replace />;
        if (user.role === 'professional') return <Navigate to="/dashboard/professional" replace />;
        if (user.role === 'patient') return <Navigate to="/dashboard/patient" replace />;

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
