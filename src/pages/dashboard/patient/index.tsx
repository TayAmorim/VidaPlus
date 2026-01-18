import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, FileText, Bell, Clock } from "lucide-react"
import { useAppointments } from "@/hooks/useAppointments"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

export default function PatientDashboard() {
    const { appointments } = useAppointments();

    const stats = useMemo(() => {
        return {
            total: appointments.length,
            realized: appointments.filter(a => a.status === 'realizado').length,
            scheduled: appointments.filter(a => a.status === 'agendado').length,
            pending: appointments.filter(a => a.status === 'pendente').length
        }
    }, [appointments]);

    const nextAppointment = useMemo(() => {
        const now = new Date();
        const upcoming = appointments
            .filter(a => (a.status === 'agendado' || a.status === 'pendente') && a.date)
            .map(a => ({
                ...a,
                dateTime: new Date(`${a.date}T${a.time}`)
            }))
            .filter(a => a.dateTime > now)
            .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());

        return upcoming.length > 0 ? upcoming[0] : null;
    }, [appointments]);

    const recentAppointments = useMemo(() => {
        return [...appointments]
            .sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`).getTime();
                const dateB = new Date(`${b.date}T${b.time}`).getTime();
                return dateB - dateA;
            })
            .slice(0, 5);
    }, [appointments]);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "-";
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'realizado':
                return <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">Realizada</span>;
            case 'agendado':
                return <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800">Agendada</span>;
            case 'pendente':
                return <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-semibold text-orange-800">Pendente</span>;
            case 'cancelado':
                return <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800">Cancelada</span>;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-blue-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                        <p className="text-xs text-slate-500">Total de Consultas</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.realized}</div>
                        <p className="text-xs text-slate-500">Consultas Realizadas</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2 gap-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <FileText className="h-6 w-6 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">{stats.scheduled + stats.pending}</div>
                        <p className="text-xs text-slate-500">Agendadas / Pendentes</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className={cn("text-white border-none shadow-md transition-colors", nextAppointment ? "bg-blue-800/60" : "bg-slate-700/60")}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
                            <Calendar className="h-5 w-5" />
                            {nextAppointment ? "Próxima Consulta" : "Sem Consultas Futuras"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {nextAppointment ? (
                            <>
                                <div className="space-y-1">
                                    <p className="text-blue-100 text-sm">Data e Hora</p>
                                    <p className="text-xl font-bold">{formatDate(nextAppointment.date)} às {nextAppointment.time}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-blue-100 text-sm">Médico</p>
                                    <p className="font-semibold">{nextAppointment.doctorName}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-blue-100 text-sm">Especialidade (ou Descrição)</p>
                                    <p className="font-semibold">{nextAppointment.description || "Consulta Geral"}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-blue-100 text-sm">Modalidade</p>
                                    <p className="font-semibold capitalize">{nextAppointment.modality === 'presential' ? 'Presencial' : 'Telemedicina'}</p>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-6 text-center">
                                <p className="text-slate-200">Você não tem consultas agendadas.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                            <Bell className="h-5 w-5 text-slate-500" />
                            Lembretes Importantes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-3">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                                <span className="text-sm text-slate-700">Realizar exames de sangue antes da próxima consulta</span>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-3">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
                                <span className="text-sm text-slate-700">Tomar medicação prescrita 2x ao dia</span>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-lg flex items-start gap-3">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-500 shrink-0" />
                                <span className="text-sm text-slate-700">Manter dieta com baixo teor de sódio</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                        <Clock className="h-5 w-5 text-slate-500" />
                        Histórico de Consultas Recentes
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-slate-50/50">
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Data</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Médico</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Motivo/Descrição</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {recentAppointments.length > 0 ? (
                                    recentAppointments.map((app) => (
                                        <tr key={app.id} className="border-b transition-colors hover:bg-slate-50/50">
                                            <td className="p-4 align-middle">{formatDate(app.date)}</td>
                                            <td className="p-4 align-middle">{app.doctorName}</td>
                                            <td className="p-4 align-middle max-w-[200px] truncate" title={app.description}>{app.description}</td>
                                            <td className="p-4 align-middle">
                                                {getStatusBadge(app.status)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-slate-500">
                                            Nenhuma consulta registrada.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
