import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CheckCircle, FileText, Bell, Clock } from "lucide-react"

export default function PatientDashboard() {
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
                        <div className="text-2xl font-bold text-slate-900">12</div>
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
                        <div className="text-2xl font-bold text-slate-900">10</div>
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
                        <div className="text-2xl font-bold text-slate-900">2</div>
                        <p className="text-xs text-slate-500">Consultas Agendadas</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-blue-800/60 text-white border-none shadow-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-white">
                            <Calendar className="h-5 w-5" />
                            Próxima Consulta
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-1">
                            <p className="text-blue-100 text-sm">Data e Hora</p>
                            <p className="text-xl font-bold">24/01/2026 às 14:30</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-blue-100 text-sm">Médico</p>
                            <p className="font-semibold">Dr. Roberto Silva</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-blue-100 text-sm">Especialidade</p>
                            <p className="font-semibold">Cardiologia</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-blue-100 text-sm">Local</p>
                            <p className="font-semibold">Consultório 3 - 2º andar</p>
                        </div>
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
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Especialidade</th>
                                    <th className="h-12 px-4 align-middle font-medium text-slate-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                <tr className="border-b transition-colors hover:bg-slate-50/50">
                                    <td className="p-4 align-middle">15/01/2026</td>
                                    <td className="p-4 align-middle">Dr. Roberto Silva</td>
                                    <td className="p-4 align-middle">Cardiologia</td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                                            Realizada
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-slate-50/50">
                                    <td className="p-4 align-middle">10/12/2025</td>
                                    <td className="p-4 align-middle">Dra. Maria Santos</td>
                                    <td className="p-4 align-middle">Clínico Geral</td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                                            Realizada
                                        </span>
                                    </td>
                                </tr>
                                <tr className="border-b transition-colors hover:bg-slate-50/50">
                                    <td className="p-4 align-middle">05/11/2025</td>
                                    <td className="p-4 align-middle">Dr. Roberto Silva</td>
                                    <td className="p-4 align-middle">Cardiologia</td>
                                    <td className="p-4 align-middle">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                                            Realizada
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
