import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"

export default function ProfessionalDashboard() {
    const { user, signOut } = useAuth();

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Painel do Profissional</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">Olá, {user?.name}</span>
                    <Button variant="outline" onClick={signOut}>Sair</Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 bg-white rounded-lg shadow border">
                    <h3 className="font-semibold mb-2">Meus Pacientes</h3>
                    <p className="text-gray-500">Gerenciamento de consultas e prontuários.</p>
                </div>
            </div>
        </div>
    )
}
