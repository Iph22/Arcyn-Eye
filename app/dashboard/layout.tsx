import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UserNav } from "@/components/auth/user-nav";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MessageSquare, Settings, Infinity } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Left Sidebar - Conversations */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="glass-strong border-b border-border/50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Infinity className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold tracking-tight">ARCYN UNIX</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-muted/50 rounded-lg transition-colors">
              <Settings className="h-5 w-5" />
            </button>
            <UserNav user={user} />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
