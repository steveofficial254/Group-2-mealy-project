import React, { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderAPI.getMyOrders();
        setOrders(response.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      placed: 'bg-blue-100 text-blue-800',
      edited: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      served: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No orders yet</p>
            <button
              onClick={() => window.location.href = '/menu'}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Items:</h4>
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm mb-1">
                      <span>{item.qty}x Item #{item.dish_id}</span>
                      <span>KSh {(item.line_total_cents / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4 flex justify-between items-center">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-green-600">
                    KSh {(order.total_cents / 100).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;
