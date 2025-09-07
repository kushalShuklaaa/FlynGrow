'use client';

import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <AdminDashboard />
      </div>
    </div>
  );
}