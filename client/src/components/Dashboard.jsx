import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, Truck, XCircle, DollarSign, Star, Download, FileText, Printer } from 'lucide-react';
import { Button } from './ui/button';
import { useMealyContext } from '../context/ContextProvider';

const MetricCard = ({ title, value, icon: Icon, trend, iconBg = 'bg-green-100', iconColor = 'text-green-600' }) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {trend && <span className="text-xs text-green-600">{trend}</span>}
        </div>
        <div className={`p-3 rounded-full ${iconBg}`}><Icon className={`h-6 w-6 ${iconColor}`} /></div>
      </div>
    </CardContent>
  </Card>
);

const PieChartSection = () => {
  const pieData = [
    { name: 'Total Order', value: 81, color: '#ef4444' },
    { name: 'Customer Growth', value: 22, color: '#10b981' },
    { name: 'Total Revenue', value: 62, color: '#3b82f6' }
  ];

  return (
    <Card>
      <CardHeader><CardTitle>Pie Chart</CardTitle></CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {pieData.map((item) => (
            <div key={item.name} className="text-center">
              <ResponsiveContainer width="100%" height={100}>
                <PieChart>
                  <Pie data={[item, { value: 100 - item.value }]} cx="50%" cy="50%" innerRadius={25} outerRadius={40} startAngle={90} endAngle={450} dataKey="value">
                    <Cell fill={item.color} /><Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <p className="text-xl font-bold">{item.value}%</p>
              <p className="text-xs text-gray-600">{item.name}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const SaveDropdown = ({ onClose, revenueData, formatCurrency }) => {
  const saveCSV = () => {
    const csv = [['Day', 'Revenue'], ...revenueData.map(item => [item.name, item.revenue])].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `revenue-report-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  const printReport = () => {
    const total = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const printContent = `<html><head><title>Revenue Report</title><style>body{font-family:Arial;margin:40px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:10px;text-align:left}th{background:#f2f2f2}</style></head><body><h1>Mealy Revenue Report</h1><p>Date: ${new Date().toLocaleDateString()}</p><table><tr><th>Day</th><th>Revenue</th></tr>${revenueData.map(item => `<tr><td>${item.name}</td><td>${formatCurrency(item.revenue)}</td></tr>`).join('')}<tr style="font-weight:bold"><td>Total</td><td>${formatCurrency(total)}</td></tr></table></body></html>`;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
    onClose();
  };

  return (
    <div className="absolute right-0 top-12 w-40 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-2">
        <button onClick={saveCSV} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-2">
          <FileText className="h-4 w-4" /><span className="text-sm">Export CSV</span>
        </button>
        <button onClick={printReport} className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded flex items-center gap-2">
          <Printer className="h-4 w-4" /><span className="text-sm">Print Report</span>
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { loading, error, dashboard, reviews, revenueData, formatCurrency } = useMealyContext();
  const [showSave, setShowSave] = useState(false);

  if (loading) return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>;
  if (error) return <div className="p-6 text-center"><div className="text-red-600">⚠️ Error: {error}</div></div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Karibu! Welcome back to Mealy Kenyan Cuisine Admin!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Orders" value={dashboard.totalOrders} icon={Package} trend="+15% (30 days)" />
        <MetricCard title="Total Delivered" value={dashboard.totalDelivered} icon={Truck} trend="+23% (30 days)" iconBg="bg-blue-100" iconColor="text-blue-600" />
        <MetricCard title="Total Canceled" value={dashboard.totalCanceled} icon={XCircle} trend="-5% (30 days)" iconBg="bg-red-100" iconColor="text-red-600" />
        <MetricCard title="Total Revenue" value={formatCurrency(dashboard.totalRevenue)} icon={DollarSign} trend="+18% (30 days)" iconBg="bg-purple-100" iconColor="text-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartSection />
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Weekly Revenue</CardTitle>
                <p className="text-sm text-gray-500">Sales performance this week</p>
              </div>
              <div className="relative">
                <Button variant="outline" size="sm" onClick={() => setShowSave(!showSave)}>
                  <Download className="h-4 w-4 mr-2" />Save Report
                </Button>
                {showSave && <SaveDropdown revenueData={revenueData} formatCurrency={formatCurrency} onClose={() => setShowSave(false)} />}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value/1000}K`} />
                <Tooltip formatter={(value) => [formatCurrency(value), 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">Today's Revenue: <span className="font-bold text-green-600">{formatCurrency(15000)}</span></p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Customer Reviews</CardTitle></CardHeader>
        <CardContent>
          {reviews.map(review => (
            <div key={review.id} className="flex items-start space-x-3 p-4 bg-white rounded-lg border mb-4">
              <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm">{review.name}</h4>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                <p className="text-gray-400 text-xs">{review.daysAgo} days ago</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
