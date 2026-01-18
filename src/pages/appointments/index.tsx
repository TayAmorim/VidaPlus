"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Calendar as CalendarIcon,
    CheckCircle2,
    AlertCircle,
    Plus,
    User,
    Stethoscope,
    Video,
    X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAppointments } from "@/hooks/useAppointments"

export default function AppointmentsPage() {
    const { appointments, addAppointment } = useAppointments();
    const [statusFilter, setStatusFilter] = useState("todos");
    const [isCreating, setIsCreating] = useState(false);

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
        }
        return null;
    };

    const handleCreateAppointment = () => {
        if (!date || !time || !startCreate) return;

        addAppointment({
            date,
            time,
            duration: `${duration}min`,
            patientName: "Você (Logado)",
            doctorName: doctor === 'any' || !doctor ? `Especialista em ${specialty || 'Clínica Geral'}` : (doctor === 'dr-carlos' ? 'Dr. Carlos Silva' : 'Dra. Maria Santos'),
            description: reason || "Sem descrição",
            modality: modality,
            specialty: specialty || "Clínico Geral"
        } as any);

        setIsCreating(false);
        setReason("");
        setDate("");
        setTime("");
    };

    const startCreate = () => {
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
                            <CardTitle className="text-xl font-semibold text-slate-900">Novo Agendamento</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setIsCreating(false)}>
                                <X className="h-4 w-4 text-slate-500" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">

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
                                <button
                                    className={cn(
                                        "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                                        modality === "telemedicine"
                                            ? "border-blue-600 bg-blue-50/50 text-blue-700"
                                            : "border-slate-100 bg-white text-slate-600 hover:border-slate-200"
                                    )}
                                    onClick={() => setModality("telemedicine")}
                                >
                                    <Video className="h-6 w-6 mb-2" />
                                    <span className="font-semibold">Telemedicina</span>
                                    <span className="text-xs text-center opacity-80">Consulta por vídeo</span>
                                </button>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Especialidade</label>
                            <Select value={specialty} onValueChange={setSpecialty}>
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
                            <label className="text-sm font-medium text-slate-700">Médico (opcional)</label>
                            <Select value={doctor} onValueChange={setDoctor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Qualquer médico disponível" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="any">Qualquer médico disponível</SelectItem>
                                    <SelectItem value="dr-carlos">Dr. Carlos Silva</SelectItem>
                                    <SelectItem value="dra-maria">Dra. Maria Santos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Data</label>
                                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Horário</label>
                                <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
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
                            <Button variant="outline" onClick={() => setIsCreating(false)}>Cancelar</Button>
                            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateAppointment}>Agendar Consulta</Button>
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
                                            {appointment.date && <span className="block text-xs text-slate-400 mt-1">{new Date(appointment.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>}
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
                                    {getStatusBadge(appointment.status)}
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
