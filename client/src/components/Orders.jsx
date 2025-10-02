import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, Search, Clock, CheckCircle } from 'lucide-react';
import { useMealyContext } from '../context/ContextProvider';

// Badge component
const Badge = ({ className, children }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
);

const AddOrderForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ customer: '', items: '', total: '', status: 'preparing' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      ...formData,
      total: parseFloat(formData.total),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    try {
      await onSubmit(newOrder);
      setFormData({ customer: '', items: '', total: '', status: 'preparing' });
      onCancel();
    } catch (err) {
      console.error('Failed to add order:', err);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader><CardTitle>Add New Order</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="text" placeholder="Customer name" required value={formData.customer} onChange={(e) => setFormData({...formData, customer: e.target.value})} className="p-2 border rounded-md focus:ring-2 focus:ring-green-500" />
          <input type="text" placeholder="Items (e.g., Nyama Choma x1)" required value={formData.items} onChange={(e) => setFormData({...formData, items: e.target.value})} className="p-2 border rounded-md focus:ring-2 focus:ring-green-500" />
          <input type="number" placeholder="Total (KSh)" required value={formData.total} onChange={(e) => setFormData({...formData, total: e.target.value})} className="p-2 border rounded-md focus:ring-2 focus:ring-green-500" />
          <div className="flex space-x-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white flex-1"><Plus className="h-4 w-4 mr-1" />Add</Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const OrderTracker = ({ order, onStatusUpdate }) => {
  const statusSteps = [
    { key: 'preparing', icon: Clock, color: 'text-yellow-600' },
    { key: 'ready', icon: CheckCircle, color: 'text-blue-600' },
    { key: 'delivered', icon: CheckCircle, color: 'text-green-600' }
  ];
  const currentIndex = statusSteps.findIndex(step => step.key === order.status);

  return (
    <div className="flex items-center space-x-2">
      {statusSteps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index <= currentIndex;
        return (
          <div key={step.key} className="flex items-center">
            <button onClick={() => onStatusUpdate(order.id, step.key)} className={`p-2 rounded-full ${isActive ? 'bg-green-100' : 'bg-gray-100'}`}>
              <Icon className={`h-4 w-4 ${isActive ? step.color : 'text-gray-400'}`} />
            </button>
            {index < statusSteps.length - 1 && <div className={`w-8 h-0.5 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />}
          </div>
        );
      })}
    </div>
  );
};

const Orders = () => {
  const { loading, error, orders, addOrder, updateOrderStatus, getDailyRevenue, formatCurrency, fetchAdminData } = useMealyContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [realOrders, setRealOrders] = useState([]);
  const [loadingReal, setLoadingReal] = useState(true);

  const today = new Date().toISOString().split('T')[0];
  const todayRevenue = getDailyRevenue(today);

  // Fetch real orders from the API
  React.useEffect(() => {
    const fetchRealOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Get user to find caterer_id
        const userResponse = await fetch('http://localhost:5001/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const userData = await userResponse.json();

        // Get caterers to find the admin's caterer
        const catererResponse = await fetch('http://localhost:5001/debug/caterers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const caterers = await catererResponse.json();
        const adminCaterer = caterers.find(c => c.owner_user_id === userData.id);

        if (adminCaterer) {
          // Fetch orders for this caterer
          const ordersResponse = await fetch(`http://localhost:5001/admin/orders?caterer_id=${adminCaterer.id}&date=${today}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const ordersData = await ordersResponse.json();
          setRealOrders(ordersData.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch real orders:', err);
      } finally {
        setLoadingReal(false);
      }
    };

    fetchRealOrders();
  }, [today]);

  const handleStatusUpdate = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
    if (fetchAdminData) {
      setTimeout(() => fetchAdminData(), 500);
    }
  };

  if (loading || loadingReal) return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div></div>;
  if (error) return <div className="p-6 text-center"><div className="text-red-600">Error: {error}</div></div>;

  // Combine mock orders with real orders for display
  const allOrders = [
    ...orders,
    ...realOrders.map(order => ({
      id: `real-${order.id}`,
      customer: order.user?.full_name || 'Unknown Customer',
      items: order.items?.map(item => `${item.qty}x ${item.dish?.name}`).join(', ') || 'No items',
      total: order.total_cents / 100,
      status: order.status === 'placed' ? 'preparing' : order.status === 'served' ? 'delivered' : order.status,
      date: new Date(order.created_at).toISOString().split('T')[0],
      time: new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isReal: true
    }))
  ];

  const filteredOrders = allOrders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.items.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    const config = { delivered: 'bg-green-100 text-green-800', preparing: 'bg-yellow-100 text-yellow-800', ready: 'bg-blue-100 text-blue-800', canceled: 'bg-red-100 text-red-800' };
    return config[status] || config.preparing;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kenyan Cuisine Orders</h1>
          <p className="text-gray-600">Track and manage customer orders</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-gray-600">Today's Revenue</div>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(todayRevenue)}</div>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700 text-white">
            <Plus className="h-4 w-4 mr-2" />Add Order
          </Button>
        </div>
      </div>

      {showAddForm && <AddOrderForm onSubmit={addOrder} onCancel={() => setShowAddForm(false)} />}

      <div className="flex space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 border rounded-lg">
          <option value="all">All Status</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <Card>
        <CardHeader><CardTitle>Orders ({filteredOrders.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Total</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Progress</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">#{order.id}</td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4">{order.items}</td>
                    <td className="py-3 px-4">{formatCurrency(order.total)}</td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusBadge(order.status)}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <OrderTracker order={order} onStatusUpdate={handleStatusUpdate} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
