import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarContent } from './sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function AppLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <div className="flex flex-1 flex-col md:pl-64 transition-all duration-300">

                <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-white px-6 shadow-sm md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <Menu className="h-6 w-6 text-slate-600" />
                                <span className="sr-only">Toggle sidebar</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-72">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                    <div className="font-semibold text-lg text-slate-800">VidaPlus</div>
                </header>


                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
