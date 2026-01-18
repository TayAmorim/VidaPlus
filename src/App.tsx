import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import Login from "./pages/Login"
import AdminDashboard from "./pages/dashboard/admin"
import ProfessionalDashboard from "./pages/dashboard/professional"
import PatientDashboard from "./pages/dashboard/patient"
import AppLayout from "@/components/layout/app-layout"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<AppLayout />}>
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['professional']} />}>
              <Route path="/dashboard/professional" element={<ProfessionalDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
              <Route path="/dashboard/patient" element={<PatientDashboard />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
