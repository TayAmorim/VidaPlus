import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, MessageSquare, Users } from "lucide-react";
import doctorAvatar from '@/assets/doctor-user.jpg';
import patientAvatar from '@/assets/patient-user.jpg';
import { cn } from "@/lib/utils";

export default function TelemedicinePage() {
    useParams();
    const navigate = useNavigate();
    const [isMuted, setIsMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [currentTime, setCurrentTime] = useState("");
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
            setDuration(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEndCall = () => {

        navigate('/dashboard/patient');
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6 z-10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-white font-semibold tracking-tight">Dr. Maria Silva</h1>
                        <span className="text-xs text-green-400 flex items-center gap-1">
                            <span className="block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Conectado • 00:{formatDuration(duration)}
                        </span>
                    </div>
                </div>
                <div className="text-slate-400 text-sm font-medium">
                    {currentTime}
                </div>
            </div>

            <div className="flex-1 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-hidden">

                <Card className="relative bg-slate-900 border-slate-800 overflow-hidden flex items-center justify-center group h-full">
                    <img
                        src={doctorAvatar}
                        alt="Doctor"
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-4 left-4 bg-slate-950/60 px-3 py-1 rounded-full text-white text-sm backdrop-blur-sm">
                        Dr. Maria Silva
                    </div>

                    <div className="absolute top-4 right-4 flex gap-1 items-end h-4">
                        <div className="w-1 h-2 bg-green-500 rounded-sm"></div>
                        <div className="w-1 h-3 bg-green-500 rounded-sm"></div>
                        <div className="w-1 h-4 bg-green-500 rounded-sm"></div>
                    </div>
                </Card>

                <Card className="relative bg-slate-900 border-slate-800 overflow-hidden flex items-center justify-center group h-full">
                    {isVideoOff ? (
                        <div className="flex flex-col items-center gap-4 text-slate-400">
                            <div className="w-24 h-24 rounded-full bg-slate-800 flex items-center justify-center">
                                <VideoOff className="w-10 h-10" />
                            </div>
                            <p>Sua câmera está desligada</p>
                        </div>
                    ) : (
                        <img
                            src={patientAvatar}
                            alt="Patient"
                            className="absolute inset-0 w-full h-full object-cover opacity-90 scale-x-[-1]" // Mirror effect
                        />
                    )}
                    <div className="absolute top-4 left-4 bg-slate-950/60 px-3 py-1 rounded-full text-white text-sm backdrop-blur-sm">
                        Você (Maria Oliveira)
                    </div>
                    {isMuted && (
                        <div className="absolute top-4 right-4 bg-red-500/80 px-2 py-2 rounded-full text-white backdrop-blur-sm">
                            <MicOff className="w-4 h-4" />
                        </div>
                    )}
                </Card>

            </div>

            <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-6 z-10">

                <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                        "rounded-full w-12 h-12 transition-colors",
                        isMuted ? "bg-red-500 hover:bg-red-600 text-white border-none" : "bg-slate-800 text-white hover:bg-slate-700 hover:text-white border-slate-700"
                    )}
                    onClick={() => setIsMuted(!isMuted)}
                >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>

                <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                        "rounded-full w-12 h-12 transition-colors",
                        isVideoOff ? "bg-red-500 hover:bg-red-600 text-white border-none" : "bg-slate-800 text-white hover:bg-slate-700 hover:text-white border-slate-700"
                    )}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>

                <Button
                    variant="destructive"
                    className="rounded-full w-16 h-12 px-0 bg-red-600 hover:bg-red-700"
                    onClick={handleEndCall}
                >
                    <PhoneOff className="h-6 w-6" />
                </Button>

                <div className="w-px h-8 bg-slate-800 mx-2 hidden md:block"></div>

                <div className="hidden md:flex gap-4">
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full">
                        <MessageSquare className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full">
                        <Users className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-full">
                        <Settings className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
