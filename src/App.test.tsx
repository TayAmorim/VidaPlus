import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useAuth } from "@/context/auth-context";

vi.mock("./pages/Login", () => ({ default: () => <div>Login Page</div> }));
vi.mock("./pages/dashboard/admin", () => ({ default: () => <div>Admin Dashboard</div> }));
vi.mock("./pages/dashboard/professional", () => ({ default: () => <div>Professional Dashboard</div> }));
vi.mock("./pages/dashboard/patient", () => ({ default: () => <div>Patient Dashboard</div> }));
vi.mock("./pages/appointments", () => ({ default: () => <div>Appointments Page</div> }));
vi.mock("./pages/telemedicine", () => ({ default: () => <div>Telemedicine Page</div> }));


vi.mock("@/context/auth-context", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        // @ts-ignore
        ...actual,
        useAuth: vi.fn(),
        AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    };
});

describe("App Routing", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: null,
            isLoading: false,
            isAuthenticated: false,
        });
        window.history.pushState({}, 'Test page', '/');
    });

    it("should render login page on default route", async () => {
        render(<App />);
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    it("should render admin dashboard on /dashboard/admin route when authenticated as admin", async () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: { role: 'admin', name: "Admin User" },
            isLoading: false,
            isAuthenticated: true,
        });
        window.history.pushState({}, 'Admin Dashboard', '/dashboard/admin');

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
        });
    });

    it("should render professional dashboard on /dashboard/professional route when authenticated as professional", async () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: { role: 'professional', name: "Professional User" },
            isLoading: false,
            isAuthenticated: true,
        });
        window.history.pushState({}, 'Professional Dashboard', '/dashboard/professional');

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Professional Dashboard")).toBeInTheDocument();
        });
    });

    it("should render patient dashboard on /dashboard/patient route when authenticated as patient", async () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: { role: 'patient', name: "Patient User" },
            isLoading: false,
            isAuthenticated: true,
        });
        window.history.pushState({}, 'Patient Dashboard', '/dashboard/patient');

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Patient Dashboard")).toBeInTheDocument();
        });
    });

    it("should redirect to login when accessing protected route without auth", async () => {
        (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
            user: null,
            isLoading: false,
            isAuthenticated: false,
        });
        window.history.pushState({}, 'Admin Dashboard', '/dashboard/admin');

        render(<App />);

        await waitFor(() => {
            expect(screen.getByText("Login Page")).toBeInTheDocument();
        });
    });
});
