import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, DollarSign, TrendingUp, UserCheck, AlertCircle, AlertTriangle, Clock, Activity, Building2 } from "lucide-react"

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <div className="p-2 bg-green-100 rounded-lg">
                            <DollarSign className="h-6 w-6 text-green-600" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+15%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">R$ 284.5K</div>
                        <p className="text-xs text-slate-500">Receita Mensal</p>
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

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <UserCheck className="h-6 w-6 text-purple-600" />
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+2%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">124</div>
                        <p className="text-xs text-slate-500">Profissionais Ativos</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="p-2 bg-red-100 rounded-lg">
                            <AlertCircle className="h-6 w-6 text-red-600" />
                        </div>
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">-8%</span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-slate-900">R$ 45.2K</div>
                        <p className="text-xs text-slate-500">Pendências Financeiras</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                            <AlertTriangle className="h-5 w-5 text-orange-500" />
                            Alertas e Notificações
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-red-500 mr-3 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-900">Equipamento em manutenção</p>
                                    <p className="text-sm text-slate-500">Ressonância Magnética - Sala 3</p>
                                    <p className="text-xs text-slate-400">1 hora atrás</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 mr-3 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-900">Estoque baixo</p>
                                    <p className="text-sm text-slate-500">Luvas cirúrgicas - Reposição necessária</p>
                                    <p className="text-xs text-slate-400">3 horas atrás</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-yellow-500 mr-3 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-900">Pagamento pendente</p>
                                    <p className="text-sm text-slate-500">12 faturas aguardando processamento</p>
                                    <p className="text-xs text-slate-400">5 horas atrás</p>
                                </div>
                            </div>

                            <div className="flex items-start bg-slate-50 p-3 rounded-lg">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 mr-3 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-slate-900">Novo profissional cadastrado</p>
                                    <p className="text-sm text-slate-500">Dr. Fernando Alves - Ortopedia</p>
                                    <p className="text-xs text-slate-400">6 horas atrás</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>


                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                            <Building2 className="h-5 w-5 text-slate-500" />
                            Status dos Departamentos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-slate-700">Cardiologia</span>
                                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">12/15 consultas</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[80%]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-slate-700">Pediatria</span>
                                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">18/20 consultas</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[90%]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-slate-700">Ortopedia</span>
                                <span className="text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">14/15 consultas</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 w-[93%]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="font-semibold text-slate-700">Neurologia</span>
                                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">8/10 consultas</span>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[80%]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">

                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                            <DollarSign className="h-5 w-5 text-slate-500" />
                            Resumo Financeiro
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                                <p className="text-sm text-green-700 font-medium">Receitas do Mês</p>
                                <p className="text-xl font-bold text-slate-900">R$ 284.500,00</p>
                            </div>
                            <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                            <div>
                                <p className="text-sm text-red-700 font-medium">Despesas do Mês</p>
                                <p className="text-xl font-bold text-slate-900">R$ 156.200,00</p>
                            </div>
                            <Activity className="h-6 w-6 text-red-600" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div>
                                <p className="text-sm text-blue-700 font-medium">Saldo Líquido</p>
                                <p className="text-xl font-bold text-slate-900">R$ 128.300,00</p>
                            </div>
                            <DollarSign className="h-6 w-6 text-blue-600" />
                        </div>

                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                            <div>
                                <p className="text-sm text-yellow-700 font-medium">Contas a Receber</p>
                                <p className="text-xl font-bold text-slate-900">R$ 45.200,00</p>
                            </div>
                            <AlertCircle className="h-6 w-6 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>


                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between text-base font-semibold text-slate-900">
                            Atividades do Sistema
                            <Clock className="h-4 w-4 text-slate-400" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex items-start">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 mr-3 ring-4 ring-green-100 text-green-600 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none text-slate-900">Maria Silva</p>
                                    <p className="text-sm text-slate-500">Consulta realizada</p>
                                    <p className="text-xs text-slate-400">2 horas atrás</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 mr-3 ring-4 ring-blue-100 text-blue-600 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none text-slate-900">João Santos</p>
                                    <p className="text-sm text-slate-500">Exame agendado</p>
                                    <p className="text-xs text-slate-400">3 horas atrás</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-orange-500 mr-3 ring-4 ring-orange-100 text-orange-600 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none text-slate-900">Ana Costa</p>
                                    <p className="text-sm text-slate-500">Internação</p>
                                    <p className="text-xs text-slate-400">5 horas atrás</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="mt-1.5 h-2 w-2 rounded-full bg-green-500 mr-3 ring-4 ring-green-100 text-green-600 shrink-0" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none text-slate-900">Pedro Oliveira</p>
                                    <p className="text-sm text-slate-500">Alta médica</p>
                                    <p className="text-xs text-slate-400">6 horas atrás</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
