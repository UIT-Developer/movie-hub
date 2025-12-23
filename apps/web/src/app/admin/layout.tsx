'use client';

export const dynamic = 'force-dynamic';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Film,
  Building2,
  DoorOpen,
  Calendar,
  Users,
  Ticket,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Tag,
  Zap,
  Wrench,
  Eye,
  DollarSign,
  User,
} from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import { ScrollArea } from '@movie-hub/shacdn-ui/scroll-area';
import { cn } from '@movie-hub/shacdn-utils';
import { useClerk, useUser, SignedIn, SignedOut } from '@clerk/nextjs';
import { RequireAdminClerkAuth } from '@/components/require-admin-clerk-auth';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', disabled: false },
  { icon: Building2, label: 'Cinemas', href: '/admin/cinemas', disabled: false },
  { icon: DoorOpen, label: 'Halls', href: '/admin/halls', disabled: false },
  { icon: Wrench, label: 'Seat Status', href: '/admin/seat-status', disabled: false },
  { icon: Film, label: 'Movies', href: '/admin/movies', disabled: false },
  { icon: Tag, label: 'Genres', href: '/admin/genres', disabled: false },
  { icon: Calendar, label: 'Movie Releases', href: '/admin/movie-releases', disabled: false },
  { icon: Calendar, label: 'Showtimes', href: '/admin/showtimes', disabled: false },
  { icon: Eye, label: 'Showtime Seats', href: '/admin/showtime-seats', disabled: false },
  { icon: Zap, label: 'Batch Showtimes', href: '/admin/batch-showtimes', disabled: false },
  { icon: DollarSign, label: 'Ticket Pricing', href: '/admin/ticket-pricing', disabled: false },
  { icon: Ticket, label: 'Reservations', href: '/admin/reservations', disabled: false },
  { icon: MessageSquare, label: 'Reviews', href: '/admin/reviews', disabled: false },
  { icon: Users, label: 'Staff', href: '/admin/staff', disabled: false },
  { icon: BarChart3, label: 'Reports', href: '/admin/reports', disabled: false },
  { icon: Settings, label: 'Settings', href: '/admin/settings', disabled: false },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't wrap login page with auth protection
  if (pathname === '/admin/login') {
    return <AdminLayoutContent>{children}</AdminLayoutContent>;
  }

  return (
    <RequireAdminClerkAuth>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </RequireAdminClerkAuth>
  );
}

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-white border-r',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {sidebarOpen && (
            <Link href="/admin">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Cinema Admin
              </h1>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)] px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || 
                              (item.href !== '/admin' && pathname.startsWith(item.href + '/'));
              
              return (
                <Link 
                  key={item.href} 
                  href={item.disabled ? '#' : item.href}
                  onClick={(e) => item.disabled && e.preventDefault()}
                >
                  <div
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                      item.disabled 
                        ? 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 cursor-not-allowed'
                        : 'hover:bg-purple-50 hover:text-purple-600 cursor-pointer',
                      isActive && !item.disabled
                        ? 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 shadow-sm'
                        : !item.disabled && 'text-gray-700'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {sidebarOpen && (
                      <div className="flex items-center gap-2 flex-1">
                        <span>{item.label}</span>
                        {item.disabled && (
                          <span className="text-[10px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded font-semibold">
                            NO API
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 pt-6 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              {sidebarOpen && <span>Logout</span>}
            </Button>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          'flex-1 transition-all duration-300',
          sidebarOpen ? 'ml-64' : 'ml-20'
        )}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find((item) => 
                  pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href))
                )?.label || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right mr-3">
                <p className="text-sm font-medium">{user?.fullName || user?.firstName || 'Admin User'}</p>
                <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress || 'admin@cinema.com'}</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold overflow-hidden">
                {user?.firstName?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
