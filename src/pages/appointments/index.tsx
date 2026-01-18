import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
    Stethoscope
} from "lucide-react"

export default function AppointmentsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Agendamentos</h1>
                <p className="text-slate-500">Gestão de consultas e procedimentos</p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                        <div className="w-full md:w-1/3 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Data</label>
                            <Input type="date" className="w-full" defaultValue="2024-11-24" />
                        </div>

                        <div className="w-full md:w-1/3 space-y-2">
                            <label className="text-sm font-medium text-slate-700">Status</label>
                            <Select defaultValue="todos">
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
                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Agendar Consulta
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Hoje</p>
                            <p className="text-2xl font-bold text-slate-900">3</p>
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
                            <p className="text-2xl font-bold text-slate-900">2</p>
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
                            <p className="text-2xl font-bold text-slate-900">1</p>
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
                            <p className="text-2xl font-bold text-slate-900">1</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <CheckCircle2 className="h-6 w-6 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* List */}
            <Card className="shadow-sm">
                <CardContent className="p-6">
                    <h3 className="font-semibold text-slate-900 mb-6">Agendamentos para 23 de novembro de 2024</h3>

                    <div className="space-y-6">
                        {/* Item 1 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b last:border-0 last:pb-0">
                            <div className="flex gap-6">
                                <div className="w-16 shrink-0">
                                    <span className="block text-sm font-bold text-slate-900">09:00</span>
                                    <span className="text-xs text-slate-500">30min</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm font-semibold text-slate-900">Ana Paula Silva</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Stethoscope className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm">Dr. Carlos Silva - Cardiologia</span>
                                    </div>
                                    <p className="text-xs text-slate-500 pl-6">Consulta de rotina</p>
                                </div>
                            </div>
                            <span className="inline-flex items-center self-start md:self-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Agendado
                            </span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b last:border-0 last:pb-0">
                            <div className="flex gap-6">
                                <div className="w-16 shrink-0">
                                    <span className="block text-sm font-bold text-slate-900">10:30</span>
                                    <span className="text-xs text-slate-500">45min</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm font-semibold text-slate-900">Carlos Eduardo Santos</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Stethoscope className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm">Dra. Maria Santos - Pediatria</span>
                                    </div>
                                    <p className="text-xs text-slate-500 pl-6">Acompanhamento pediátrico</p>
                                </div>
                            </div>
                            <span className="inline-flex items-center self-start md:self-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                                Agendado
                            </span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex gap-6">
                                <div className="w-16 shrink-0">
                                    <span className="block text-sm font-bold text-slate-900">14:00</span>
                                    <span className="text-xs text-slate-500">30min</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm font-semibold text-slate-900">Beatriz Oliveira</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Stethoscope className="h-4 w-4 text-slate-400" />
                                        <span className="text-sm">Dr. João Costa - Ortopedia</span>
                                    </div>
                                    <p className="text-xs text-slate-500 pl-6">Dor no joelho</p>
                                </div>
                            </div>
                            <span className="inline-flex items-center self-start md:self-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20">
                                <AlertCircle className="mr-1 h-3 w-3" />
                                Pendente
                            </span>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
