import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock, Mail, Hospital, AlertCircle } from "lucide-react"
import { useAuth } from '@/context/auth-context';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, isLoading, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate('/dashboard/admin');
      else if (user.role === 'professional') navigate('/dashboard/professional');
      else if (user.role === 'patient') navigate('/dashboard/patient');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signIn(email, password);
      // Navigation handled by useEffect
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao autenticar');
    }
  };

  const fillCredentials = (role: 'admin' | 'professional' | 'patient') => {
    if (role === 'admin') {
      setEmail('admin@vidaplus.com');
      setPassword('admin123');
    } else if (role === 'professional') {
      setEmail('doc@vidaplus.com');
      setPassword('doc123');
    } else {
      setEmail('patient@vidaplus.com');
      setPassword('patient123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4 font-sans">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="space-y-4 text-center pt-10">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-3 rounded-xl bg-blue-600">
              <Hospital className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl font-normal text-slate-600">Sistema de Gestão Hospitalar</CardTitle>
            <CardDescription className="text-2xl font-bold text-slate-800">
              VidaPlus - SGHSS
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2 text-left">
              <Label htmlFor="email" className="text-slate-600">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  type="email"
                  className="pl-10 h-11 bg-white border-slate-200 focus-visible:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <Label htmlFor="password" className="text-slate-600">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="........"
                  type="password"
                  className="pl-10 h-11 bg-white border-slate-200 focus-visible:ring-blue-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500">
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-center text-sm text-slate-500 mb-4">
              Acesso rápido (demonstração):
            </div>

            <Button
              variant="outline"
              className="w-full h-11 justify-center bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100 hover:text-purple-800"
              onClick={() => fillCredentials('admin')}
            >
              Entrar como Administrador
            </Button>

            <Button
              variant="outline"
              className="w-full h-11 justify-center bg-green-50 text-green-700 border-green-100 hover:bg-green-100 hover:text-green-800"
              onClick={() => fillCredentials('professional')}
            >
              Entrar como Profissional de Saúde
            </Button>

            <Button
              variant="outline"
              className="w-full h-11 justify-center bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100 hover:text-blue-800"
              onClick={() => fillCredentials('patient')}
            >
              Entrar como Paciente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
