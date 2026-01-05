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
  ShoppingBag,
} from 'lucide-react';
import { Button } from '@movie-hub/shacdn-ui/button';
import { ScrollArea } from '@movie-hub/shacdn-ui/scroll-area';
import { cn } from '@movie-hub/shacdn-utils';
import { useClerk, useUser } from '@clerk/nextjs';
import { RequireAdminClerkAuth } from '@/components/require-admin-clerk-auth';
import PageWrapper from '@/components/providers/page-wrapper';

const menuSections = [
  {
    label: 'Chính',
    items: [
      {
        icon: LayoutDashboard,
        label: 'Bảng điều khiển',
        href: '/admin',
        disabled: false,
      },
    ],
  },
  {
    label: 'Cơ sở vật chất',
    items: [
      {
        icon: Building2,
        label: 'Rạp chiếu phim',
        href: '/admin/cinemas',
        disabled: false,
      },
      {
        icon: DoorOpen,
        label: 'Phòng chiếu',
        href: '/admin/halls',
        disabled: false,
      },
      {
        icon: Wrench,
        label: 'Trạng thái ghế',
        href: '/admin/seat-status',
        disabled: false,
      },
    ],
  },
  {
    label: 'Quản lý nội dung',
    items: [
      { icon: Film, label: 'Phim', href: '/admin/movies', disabled: false },
      { icon: Tag, label: 'Thể loại', href: '/admin/genres', disabled: false },
      {
        icon: Calendar,
        label: 'Phát hành phim',
        href: '/admin/movie-releases',
        disabled: false,
      },
    ],
  },
  {
    label: 'Quản lý suất chiếu',
    items: [
      {
        icon: Calendar,
        label: 'Suất chiếu',
        href: '/admin/showtimes',
        disabled: false,
      },
      {
        icon: Eye,
        label: 'Ghế suất chiếu',
        href: '/admin/showtime-seats',
        disabled: false,
      },
      {
        icon: Zap,
        label: 'Suất chiếu hàng loạt',
        href: '/admin/batch-showtimes',
        disabled: false,
      },
    ],
  },
  {
    label: 'Doanh thu & Bán hàng',
    items: [
      {
        icon: DollarSign,
        label: 'Định giá vé',
        href: '/admin/ticket-pricing',
        disabled: false,
      },
      {
        icon: ShoppingBag,
        label: 'Đồ ăn',
        href: '/admin/concessions',
        disabled: false,
      },
      {
        icon: Ticket,
        label: 'Đặt chỗ',
        href: '/admin/reservations',
        disabled: false,
      },
    ],
  },
  {
    label: 'Quan hệ khách hàng',
    items: [
      {
        icon: MessageSquare,
        label: 'Đánh giá',
        href: '/admin/reviews',
        disabled: false,
      },
    ],
  },
  {
    label: 'Quản lý',
    items: [
      {
        icon: Users,
        label: 'Nhân viên',
        href: '/admin/staff',
        disabled: false,
      },
      {
        icon: BarChart3,
        label: 'Báo cáo',
        href: '/admin/reports',
        disabled: false,
      },
      {
        icon: Settings,
        label: 'Cài đặt',
        href: '/admin/settings',
        disabled: false,
      },
    ],
  },
];

const menuItems = menuSections.flatMap((section) => section.items);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Auth pages (login, signup, reset-password) should not have admin layout
  const isAuthPage =
    pathname.startsWith('/admin/login') ||
    pathname.startsWith('/admin/sign-up') ||
    pathname.startsWith('/admin/reset-password') ||
    pathname.startsWith('/admin/verify');

  if (isAuthPage) {
    // Render auth pages without sidebar/navbar
    return <>{children}</>;
  }

  return (
    <RequireAdminClerkAuth>
      <PageWrapper>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </PageWrapper>
    </RequireAdminClerkAuth>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { signOut } = useClerk();
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 admin-light-mode">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-white border-r border-gray-200',
          sidebarOpen ? 'w-64' : 'w-20'
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {sidebarOpen && (
            <Link href="/admin">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                  🎬
                </div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Cinema
                </h1>
              </div>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="px-3 py-6 space-y-6">
            {menuSections.map((section, idx) => (
              <div key={`section-${idx}`}>
                {sidebarOpen && (
                  <h3 className="px-3 mb-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {section.label}
                  </h3>
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/admin' &&
                        pathname.startsWith(item.href + '/'));

                    return (
                      <Link
                        key={item.href}
                        href={item.disabled ? '#' : item.href}
                        onClick={(e) => item.disabled && e.preventDefault()}
                        className="block"
                      >
                        <div
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                            item.disabled
                              ? 'bg-amber-50 text-amber-600 border border-amber-200 cursor-not-allowed'
                              : isActive
                              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer'
                          )}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          {sidebarOpen && (
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <span className="truncate">{item.label}</span>
                              {item.disabled && (
                                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-bold flex-shrink-0">
                                  NO API
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="px-3 py-6 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="ml-3">Đăng xuất</span>}
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
                {menuItems.find(
                  (item) =>
                    pathname === item.href ||
                    (item.href !== '/admin' && pathname.startsWith(item.href))
                )?.label || 'Bảng điều khiển'}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right mr-3">
                <p className="text-sm font-medium">
                  {user?.fullName || user?.firstName || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress ||
                    'admin@cinema.com'}
                </p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold overflow-hidden">
                {user?.firstName?.charAt(0).toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
