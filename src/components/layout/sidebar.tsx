import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    Calendar,
    Settings,
    LogOut,
    Hospital
} from 'lucide-react';

export function Sidebar() {
    const { user, signOut } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const links = [
        {
            href: `/dashboard/${user.role}`,
            label: 'Dashboard',
            icon: LayoutDashboard,
            roles: ['admin', 'professional', 'patient']
        },
        {
            href: '/pacientes',
            label: 'Pacientes',
            icon: Users,
            roles: ['admin', 'professional']
        },
        {
            href: '/profissionais',
            label: 'Profissionais',
            icon: Stethoscope,
            roles: ['admin']
        },
        {
            href: '/agendamentos',
            label: 'Agendamentos',
            icon: Calendar,
            roles: ['admin', 'professional', 'patient']
        },
        {
            href: '/admin',
            label: 'Administração',
            icon: Settings,
            roles: ['admin']
        }
    ];

    const filteredLinks = links.filter(link => link.roles.includes(user.role));

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-white">
            <div className="flex h-16 items-center border-b px-6">
                <div className="bg-blue-600 p-1.5 rounded-lg mr-3">
                    <Hospital className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-bold text-slate-800 leading-none">VidaPlus</h1>
                    <span className="text-xs text-slate-500 font-medium">SGHSS</span>
                </div>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {filteredLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = location.pathname === link.href || location.pathname.startsWith(link.href + '/');

                    return (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-blue-50 text-blue-700 shadow-sm"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive ? "text-blue-600" : "text-slate-400")} />
                            {link.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t p-4">
                <div className="flex items-center gap-3 mb-4 px-2">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                            {getInitials(user.name)}
                        </div>
                    )}
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-slate-900">{user.name}</p>
                        <p className="truncate text-xs text-slate-500 capitalize">
                            {user.role === 'professional' ? 'Profissional de Saúde' :
                                user.role === 'patient' ? 'Paciente' : 'Administrador'}
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={signOut}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                </Button>
            </div>
        </div>
    );
}
