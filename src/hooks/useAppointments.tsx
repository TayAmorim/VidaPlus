import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';

export interface Appointment {
    id: string;
    time: string;
    date: string;
    duration: string;
    patientName: string;
    doctorName: string;
    description: string;
    status: 'agendado' | 'pendente' | 'realizado' | 'cancelado' | 'nao_compareceu';
    modality: 'presential' | 'telemedicine';
}

const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        time: "09:00",
        date: "2024-11-23",
        duration: "30min",
        patientName: "Ana Paula Silva",
        doctorName: "Dr. Maria Silva - Cardiologia",
        description: "Consulta de rotina",
        status: "agendado",
        modality: "presential"
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440001",
        time: "10:30",
        date: "2024-11-23",
        duration: "45min",
        patientName: "Carlos Eduardo Santos",
        doctorName: "Dra. Maria Santos - Pediatria",
        description: "Acompanhamento pediátrico",
        status: "agendado",
        modality: "presential"
    },
    {
        id: "550e8400-e29b-41d4-a716-446655440002",
        time: "14:00",
        date: "2024-11-23",
        duration: "30min",
        patientName: "Beatriz Oliveira",
        doctorName: "Dr. João Costa - Ortopedia",
        description: "Dor no joelho",
        status: "pendente",
        modality: "presential"
    }
];

const STORAGE_KEY = 'vidaplus_appointments';

interface AppointmentsContextType {
    appointments: Appointment[];
    addAppointment: (newAppointment: Omit<Appointment, 'id' | 'status'>) => void;
    updateAppointment: (updatedAppointment: Appointment) => void;
    cancelAppointment: (id: string) => void;
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined);

export function AppointmentsProvider({ children }: { children: ReactNode }): ReactNode {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const loadAppointments = () => {
            const stored = localStorage.getItem(STORAGE_KEY);
            let loadedAppointments: Appointment[] = [];

            if (stored) {
                try {
                    loadedAppointments = JSON.parse(stored);
                } catch (e) {
                    console.error("Falha ao analisar agendamentos do localStorage", e);
                }
            } else {
                loadedAppointments = [...MOCK_APPOINTMENTS];
            }

            const now = new Date();
            const validAppointments = loadedAppointments.filter(app => {
                if (!app.date) return true;
                const appDate = new Date(app.date);
                const diffTime = Math.abs(now.getTime() - appDate.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 30;
            });


            let hasUpdates = false;
            const checkStatusAppointments = validAppointments.map(app => {
                if (app.status === 'realizado' || app.status === 'cancelado' || app.status === 'nao_compareceu' || !app.date || !app.time) {
                    return app;
                }

                const appDateTime = new Date(`${app.date}T${app.time}`);
                const diffMs = appDateTime.getTime() - now.getTime();
                const diffHours = diffMs / (1000 * 60 * 60);
                const minsPassed = (now.getTime() - appDateTime.getTime()) / 60000;


                if ((app.status === 'agendado' || app.status === 'pendente') && minsPassed > 60) {
                    hasUpdates = true;
                    return { ...app, status: 'nao_compareceu' as const };
                }


                if (app.status === 'agendado' && diffHours <= 12 && diffHours > 0) {
                    hasUpdates = true;
                    return { ...app, status: 'pendente' as const };
                }

                return app;
            });

            setAppointments(checkStatusAppointments);

            if (hasUpdates) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(checkStatusAppointments));
            }
        };

        loadAppointments();


        const interval = setInterval(loadAppointments, 60000);
        return () => clearInterval(interval);
    }, []);

    const addAppointment = (newAppointment: Omit<Appointment, 'id' | 'status'>) => {
        const appointment: Appointment = {
            ...newAppointment,
            id: crypto.randomUUID(),
            status: 'agendado'
        };

        const updatedAppointments = [...appointments, appointment];
        setAppointments(updatedAppointments);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
    };

    const updateAppointment = (updatedAppointment: Appointment) => {
        const updatedAppointments = appointments.map(app =>
            app.id === updatedAppointment.id ? updatedAppointment : app
        );
        setAppointments(updatedAppointments);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
    };

    const cancelAppointment = (id: string) => {
        const updatedAppointments = appointments.map(app =>
            app.id === id ? { ...app, status: 'cancelado' as const } : app
        );
        setAppointments(updatedAppointments);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
    };

    return (
        <AppointmentsContext.Provider value={{ appointments, addAppointment, updateAppointment, cancelAppointment }
        }>
            {children}
        </AppointmentsContext.Provider>
    );
}

export function useAppointments() {
    const context = useContext(AppointmentsContext);
    if (context === undefined) {
        throw new Error('useAppointments deve ser usado dentro de um AppointmentsProvider');
    }
    return context;
}
