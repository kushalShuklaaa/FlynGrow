'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@studyhub/ui';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Download
} from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$125,430',
      change: '+12.5%',
      changeType: 'positive',
      icon: DollarSign,
      description: 'vs last month'
    },
    {
      title: 'Total Orders',
      value: '2,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: ShoppingCart,
      description: 'vs last month'
    },
    {
      title: 'Total Users',
      value: '15,234',
      change: '+15.3%',
      changeType: 'positive',
      icon: Users,
      description: 'vs last month'
    },
    {
      title: 'Total Products',
      value: '1,247',
      change: '+5.1%',
      changeType: 'positive',
      icon: Package,
      description: 'vs last month'
    }
  ];

  const recentOrders = [
    {
      id: 'SH240115001',
      customer: 'John Doe',
      product: 'IELTS Complete Pack',
      amount: '$49.99',
      status: 'Completed',
      date: '2024-01-15'
    },
    {
      id: 'SH240115002',
      customer: 'Jane Smith',
      product: 'GRE Math Guide',
      amount: '$39.99',
      status: 'Processing',
      date: '2024-01-15'
    },
    {
      id: 'SH240115003',
      customer: 'Mike Johnson',
      product: 'TOEFL Bundle',
      amount: '$34.99',
      status: 'Pending',
      date: '2024-01-14'
    },
    {
      id: 'SH240115004',
      customer: 'Sarah Wilson',
      product: 'GMAT Verbal Pack',
      amount: '$44.99',
      status: 'Completed',
      date: '2024-01-14'
    }
  ];

  const topProducts = [
    {
      name: 'IELTS Complete Preparation Pack',
      sales: 1247,
      revenue: '$62,350',
      growth: '+15.2%'
    },
    {
      name: 'GRE Quantitative Mastery Guide',
      sales: 892,
      revenue: '$35,680',
      growth: '+8.7%'
    },
    {
      name: 'TOEFL Speaking & Writing Bundle',
      sales: 654,
      revenue: '$22,890',
      growth: '+12.1%'
    },
    {
      name: 'GMAT Verbal Reasoning Pack',
      sales: 743,
      revenue: '$33,435',
      growth: '+6.3%'
    }
  ];

  return (
    <div className="admin-content">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="stat-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="stat-label">{stat.title}</p>
                  <p className="stat-value">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'positive' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`stat-change ${stat.changeType}`}>
                      {stat.change}
                    </span>
                    <span className="text-gray-500 text-sm ml-1">
                      {stat.description}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <stat.icon className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.amount}</p>
                    <p className={`text-sm ${
                      order.status === 'Completed' ? 'text-green-600' :
                      order.status === 'Processing' ? 'text-blue-600' :
                      'text-yellow-600'
                    }`}>
                      {order.status}
                    </p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Top Selling Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-purple-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-600">{product.sales} sales</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.revenue}</p>
                    <p className="text-sm text-green-600">{product.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <Package className="h-8 w-8 text-purple-600 mb-2" />
              <p className="font-semibold text-gray-900">Add Product</p>
              <p className="text-sm text-gray-600">Create new study material</p>
            </button>
            <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
              <Tag className="h-8 w-8 text-blue-600 mb-2" />
              <p className="font-semibold text-gray-900">Create Coupon</p>
              <p className="text-sm text-gray-600">Add discount code</p>
            </button>
            <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
              <Eye className="h-8 w-8 text-green-600 mb-2" />
              <p className="font-semibold text-gray-900">View Analytics</p>
              <p className="text-sm text-gray-600">Check performance</p>
            </button>
            <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
              <Download className="h-8 w-8 text-orange-600 mb-2" />
              <p className="font-semibold text-gray-900">Export Data</p>
              <p className="text-sm text-gray-600">Download reports</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;