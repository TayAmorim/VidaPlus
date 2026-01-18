import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Activity, TrendingUp, Clock } from "lucide-react"

const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return `Há ${Math.floor(interval)} anos`;

    interval = seconds / 2592000;
    if (interval > 1) return `Há ${Math.floor(interval)} meses`;

    interval = seconds / 86400;
    if (interval > 1) return `Há ${Math.floor(interval)} dias`;

    interval = seconds / 3600;
    if (interval > 1) return `Há ${Math.floor(interval)} horas`;

    interval = seconds / 60;
    if (interval > 1) return `Há ${Math.floor(interval)} minutos`;

    return "Agora mesmo";
};

const activities = [
    {
        name: "Maria Silva",
        action: "Consulta realizada",
        color: "bg-green-500",
        ring: "ring-green-100",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
        name: "João Santos",
        action: "Exame agendado",
        color: "bg-blue-500",
        ring: "ring-blue-100",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) // 3 hours ago
    },
    {
        name: "Ana Costa",
        action: "Internação",
        color: "bg-orange-500",
        ring: "ring-orange-100",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    },
    {
        name: "Pedro Oliveira",
        action: "Alta médica",
        color: "bg-green-500",
        ring: "ring-green-100",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
    }
];

export default function ProfessionalDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-slate-500">Visão geral do sistema - VidaPlus</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">2,847</div>
                        <p className="text-xs text-slate-500">Total de Pacientes</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <Calendar className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+8%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">48</div>
                        <p className="text-xs text-slate-500">Consultas Hoje</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Activity className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+5%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">156</div>
                        <p className="text-xs text-slate-500">Pacientes Ativos</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <TrendingUp className="h-6 w-6 text-orange-600" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+3%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">78%</div>
                        <p className="text-xs text-slate-500">Taxa de Ocupação</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-semibold text-slate-900">Atividades Recentes</CardTitle>
                        <Clock className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {activities.map((activity, index) => (
                                <div key={index} className="flex items-start">
                                    <div className={`mt-1.5 h-2 w-2 rounded-full ${activity.color} mr-3 ring-4 ${activity.ring}`} />
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none text-slate-900">{activity.name}</p>
                                        <p className="text-sm text-slate-500">{activity.action}</p>
                                        <p className="text-xs text-slate-400">{getTimeAgo(activity.timestamp)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-semibold text-slate-900">Consultas de Hoje</CardTitle>
                        <Calendar className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                <div className="ml-2 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-blue-700">09:00</span>
                                        <span className="text-sm font-semibold text-slate-900">Carlos Alberto</span>
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <span className="mr-2">30min</span>
                                        <span>Cardiologia - Dr. Silva</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center p-3 bg-green-50 rounded-lg">
                                <div className="ml-2 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-green-700">10:30</span>
                                        <span className="text-sm font-semibold text-slate-900">Beatriz Santos</span>
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <span className="mr-2">45min</span>
                                        <span>Pediatria - Dra. Maria</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                                <div className="ml-2 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-bold text-purple-700">14:00</span>
                                        <span className="text-sm font-semibold text-slate-900">Fernando Lima</span>
                                    </div>
                                    <div className="flex items-center text-xs text-slate-500">
                                        <span className="mr-2">30min</span>
                                        <span>Ortopedia - Dr. Costa</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
