"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Calendar as CalendarIcon,
    CheckCircle2,
    AlertCircle,
    Plus,
    User,
    Stethoscope,
    Video,
    X,
    Pencil,
    Ban,
    UserX
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppointments, type Appointment } from "@/hooks/useAppointments"

const DOCTORS_DATA = [
    {
        id: 'dr-carlos',
        name: 'Dr. Carlos Silva',
        specialty: 'cardiologia',
        schedule: ['08:00', '08:30', '09:00', '09:30', '10:00', '14:00', '14:30', '15:00']
    },
    {
        id: 'dra-maria',
        name: 'Dra. Maria Santos',
        specialty: 'pediatria',
        schedule: ['09:00', '09:30', '10:00', '10:30', '11:00', '15:00', '15:30', '16:00']
    },
    {
        id: 'dr-joao',
        name: 'Dr. João Costa',
        specialty: 'ortopedia',
        schedule: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
    },
    {
        id: 'dra-ana',
        name: 'Dra. Ana Oliveira',
        specialty: 'clinico',
        schedule: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30']
    },
    {
        id: 'dr-pedro',
        name: 'Dr. Pedro Souza',
        specialty: 'cardiologia',
        schedule: ['10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00']
    }
];


export default function AppointmentsPage() {
    const { appointments, addAppointment, updateAppointment, cancelAppointment } = useAppointments();
    const [statusFilter, setStatusFilter] = useState("todos");
    const [isCreating, setIsCreating] = useState(false);

    const [editId, setEditId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [modality, setModality] = useState<"presential" | "telemedicine">("presential");
    const [specialty, setSpecialty] = useState("");
    const [doctor, setDoctor] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [duration, setDuration] = useState("30");
    const [reason, setReason] = useState("");

    const filteredAppointments = appointments.filter(appointment =>
        statusFilter === "todos" || appointment.status === statusFilter
    );

    const filteredDoctors = doctor ? DOCTORS_DATA.filter(d => d.id === doctor) : (
        specialty ? DOCTORS_DATA.filter(d => d.specialty === specialty) : DOCTORS_DATA
    );

    const handleSpecialtyChange = (value: string) => {
        setSpecialty(value);
        setDoctor("");
        setTime("");
    };

    const availableSlots = doctor ? (DOCTORS_DATA.find(d => d.id === doctor)?.schedule || []) : [];


    const getStatusBadge = (status: string) => {
        if (status === "agendado" || status === "realizado") {
            return (
                <span className="inline-flex items-center self-start md:self-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            );
        } else if (status === "pendente") {
            return (
                <span className="inline-flex items-center self-start md:self-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                    <AlertCircle className="mr-1 h-3 w-3" />
                    Pendente
                </span>
            );
        } else if (status === "cancelado") {
            return (
                <span className="inline-flex items-center self-start md:self-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                    <Ban className="mr-1 h-3 w-3" />
                    Cancelado
                </span>
            );
        }
        else if (status === "nao_compareceu") {
            return (
                <span className="inline-flex items-center self-start md:self-center rounded-full bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/20">
                    <UserX className="mr-1 h-3 w-3" />
                    Não Compareceu
                </span>
            );
        }
        return null;
    };

    const handleCreateOrUpdateAppointment = () => {
        setError(null);

        if (!date || !time || !doctor || !modality) {
            setError("Por favor, preencha todos os campos obrigatórios: Médico, Data, Horário e Modalidade.");
            return;
        }

        const selectedDoctor = DOCTORS_DATA.find(d => d.id === doctor);

        const appointmentData = {
            date,
            time,
            duration: `${duration}min`,
            patientName: "Você (Logado)",
            doctorName: selectedDoctor ? `${selectedDoctor.name} - ${selectedDoctor.specialty.charAt(0).toUpperCase() + selectedDoctor.specialty.slice(1)}` : "Médico Desconhecido",
            description: reason || "Sem descrição",
            modality: modality,
            status: 'agendado' as const
        };

        if (editId) {
            const existing = appointments.find(a => a.id === editId);
            if (existing) {
                updateAppointment({
                    ...existing,
                    ...appointmentData,
                    status: existing.status === 'cancelado' ? 'agendado' : existing.status
                });
            }
        } else {
            addAppointment(appointmentData);
        }

        resetForm();
    };

    const handleEdit = (appointment: Appointment) => {
        setError(null);
        setEditId(appointment.id);
        setModality(appointment.modality);
        setDuration(appointment.duration.replace('min', '') || "30");
        setReason(appointment.description);
        setDate(appointment.date);
        setTime(appointment.time);

        if (appointment.doctorName) {
            const foundDoctor = DOCTORS_DATA.find(d => appointment.doctorName.includes(d.name));
            if (foundDoctor) {
                setDoctor(foundDoctor.id);
                setSpecialty(foundDoctor.specialty);
            } else {
                setDoctor("");
                setSpecialty("");
            }
        }

        setIsCreating(true);
    };

    const resetForm = () => {
        setIsCreating(false);
        setEditId(null);
        setError(null);
        setReason("");
        setDate("");
        setTime("");
        setSpecialty("");
    };

    const startCreate = () => {
        resetForm();
        setIsCreating(true);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agendamentos</h1>
                <p className="text-slate-500">Gestão de consultas e procedimentos</p>
            </div>


            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full md:w-1/3 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Data</label>
                            <Input
                                type="date"
                                className="w-full"
                                disabled={isCreating}
                            />
                        </div>

                        <div className="w-full md:w-1/3 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Status</label>
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                                disabled={isCreating}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione o status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todos">Todos</SelectItem>
                                    <SelectItem value="agendado">Agendado</SelectItem>
                                    <SelectItem value="realizado">Realizado</SelectItem>
                                    <SelectItem value="pendente">Pendente</SelectItem>
                                    <SelectItem value="cancelado">Cancelado</SelectItem>
                                    <SelectItem value="nao_compareceu">Não Compareceu</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-full md:w-1/3">
                            <Button
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={startCreate}
                                disabled={isCreating}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Agendar Consulta
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>


            {isCreating ? (
                <Card className="shadow-lg border-blue-100">
                    <CardHeader className="border-b pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-xl font-semibold text-slate-900">
                                {editId ? "Editar Agendamento" : "Novo Agendamento"}
                            </CardTitle>
                            <Button variant="ghost" size="icon" onClick={resetForm}>
                                <X className="h-4 w-4 text-slate-500" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Erro</AlertTitle>
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-3">
                            <label className="text-sm font-medium text-slate-700">Modalidade de Atendimento</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    className={cn(
                                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                        modality === "presential"
                                            ? "border-blue-600 bg-blue-50/50 text-blue-700"
                                            : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                                    )}
                                    onClick={() => setModality("presential")}
                                >
                                    <CalendarIcon className="h-6 w-6 mb-2" />
                                    <span className="font-semibold">Presencial</span>
                                    <span className="text-xs text-center opacity-80">Atendimento no hospital</span>
                                </button>
                                <div className="relative overflow-hidden group rounded-xl border-2 transition-all cursor-pointer hover:border-blue-600 hover:shadow-md" onClick={() => setModality("telemedicine")}>
                                    <div className={cn(
                                        "flex flex-col items-center justify-center p-4 h-full z-10 relative transition-colors",
                                        modality === "telemedicine" ? "bg-blue-50/90 text-blue-700" : "bg-white/90 text-slate-600"
                                    )}>
                                        <Video className="h-6 w-6 mb-2" />
                                        <span className="font-semibold">Telemedicina</span>
                                        <span className="text-xs text-center opacity-80">Consulta por vídeo</span>
                                    </div>
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-cover bg-center transition-opacity duration-300",
                                            modality === "telemedicine" ? "opacity-20" : "opacity-10 group-hover:opacity-20"
                                        )}
                                        style={{ backgroundImage: `url('/doctor.jpg')` }}
                                    />
                                    <div className={cn(
                                        "absolute inset-0 border-2 rounded-xl pointer-events-none transition-colors",
                                        modality === "telemedicine" ? "border-blue-600" : "border-transparent"
                                    )} />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Especialidade</label>
                            <Select value={specialty} onValueChange={handleSpecialtyChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a especialidade" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cardiologia">Cardiologia</SelectItem>
                                    <SelectItem value="pediatria">Pediatria</SelectItem>
                                    <SelectItem value="ortopedia">Ortopedia</SelectItem>
                                    <SelectItem value="clinico">Clínico Geral</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Médico <span className="text-red-500">*</span></label>
                            <Select value={doctor} onValueChange={setDoctor}>
                                <SelectTrigger className={cn(!doctor && error && "border-red-500 focus-visible:ring-red-500")}>
                                    <SelectValue placeholder="Selecione um médico" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filteredDoctors.map((doc) => (
                                        <SelectItem key={doc.id} value={doc.id}>
                                            {doc.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Data <span className="text-red-500">*</span></label>
                                <Input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className={cn(!date && error && "border-red-500 focus-visible:ring-red-500")}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Horário <span className="text-red-500">*</span></label>
                                <Select value={time} onValueChange={setTime} disabled={!doctor}>
                                    <SelectTrigger className={cn(!time && error && "border-red-500 focus-visible:ring-red-500")}>
                                        <SelectValue placeholder={doctor ? "Selecione um horário" : "Selecione um médico primeiro"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableSlots.map((slot) => (
                                            <SelectItem key={slot} value={slot}>
                                                {slot}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Duração</label>
                            <Select value={duration} onValueChange={setDuration}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecione a duração" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="15">15 minutos</SelectItem>
                                    <SelectItem value="30">30 minutos</SelectItem>
                                    <SelectItem value="45">45 minutos</SelectItem>
                                    <SelectItem value="60">1 hora</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Motivo da Consulta</label>
                            <Textarea
                                placeholder="Descreva o motivo da consulta..."
                                className="h-24 resize-none"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </div>


                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button variant="outline" onClick={resetForm}>Cancelar</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateOrUpdateAppointment}>
                                {editId ? "Salvar Alterações" : "Agendar Consulta"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Total</p>
                                <p className="text-2xl font-bold text-slate-900">{appointments.length}</p>
                            </div>
                            <div className="p-3 bg-blue-50 rounded-lg">
                                <CalendarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Agendados</p>
                                <p className="text-2xl font-bold text-slate-900">{appointments.filter(a => a.status === 'agendado').length}</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Pendentes</p>
                                <p className="text-2xl font-bold text-slate-900">{appointments.filter(a => a.status === 'pendente').length}</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg">
                                <AlertCircle className="h-6 w-6 text-orange-600" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Realizados</p>
                                <p className="text-2xl font-bold text-slate-900">{appointments.filter(a => a.status === 'realizado').length}</p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg">
                                <CheckCircle2 className="h-6 w-6 text-purple-600" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}


            <Card className="shadow-sm">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-6">Próximos Agendamentos</h3>

                    <div className="space-y-6">
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => (
                                <div key={appointment.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b last:border-0 last:pb-0">
                                    <div className="flex gap-6">
                                        <div className="w-16 shrink-0">
                                            <span className="block text-sm font-bold text-slate-900">{appointment.time}</span>
                                            <span className="text-xs text-slate-500">{appointment.duration}</span>
                                            {appointment.date && <span className="block text-xs text-slate-400 mt-1">{appointment.date.split('-').reverse().join('/')}</span>}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-slate-400" />
                                                <span className="text-sm font-semibold text-slate-900">{appointment.patientName}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Stethoscope className="h-4 w-4 text-slate-400" />
                                                <span className="text-sm">{appointment.doctorName}</span>
                                            </div>
                                            <p className="text-xs text-slate-500 pl-6">{appointment.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {getStatusBadge(appointment.status)}

                                        <div className="flex items-center gap-1">
                                            {appointment.status !== 'cancelado' && (
                                                <>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600" onClick={() => handleEdit(appointment)}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                                                                <Ban className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Cancelar Agendamento</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Voltar</AlertDialogCancel>
                                                                <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => cancelAppointment(appointment.id)}>
                                                                    Confirmar Cancelamento
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-300">
                                <CalendarIcon className="h-12 w-12 mb-3 opacity-20" />
                                <p className="text-slate-500">Nenhum agendamento encontrado.</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
