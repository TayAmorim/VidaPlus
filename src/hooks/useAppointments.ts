import { useState, useEffect } from 'react';

export interface Appointment {
    id: string;
    time: string;
    date: string;
    duration: string;
    patientName: string;
    doctorName: string;
    description: string;
    status: 'agendado' | 'pendente' | 'realizado' | 'cancelado';
    modality: 'presential' | 'telemedicine';
}

const MOCK_APPOINTMENTS: Appointment[] = [
    {
        id: "550e8400-e29b-41d4-a716-446655440000",
        time: "09:00",
        date: "2024-11-23",
        duration: "30min",
        patientName: "Ana Paula Silva",
        doctorName: "Dr. Carlos Silva - Cardiologia",
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

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const loadAppointments = () => {
            const stored = localStorage.getItem(STORAGE_KEY);
            let loadedAppointments: Appointment[] = [];

            if (stored) {
                try {
                    loadedAppointments = JSON.parse(stored);
                } catch (e) {
                    console.error("Failed to parse appointments from localStorage", e);
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

            setAppointments(validAppointments);
        };

        loadAppointments();
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

    return {
        appointments,
        addAppointment,
        updateAppointment,
        cancelAppointment
    };
}
