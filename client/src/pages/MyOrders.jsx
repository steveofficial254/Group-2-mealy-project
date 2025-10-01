import React, { useEffect, useState } from 'react';
import { orderAPI } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getMyOrders();
      setOrders(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      await orderAPI.cancelOrder(orderId);
      await fetchOrders(); // Refresh orders list
      alert('Order cancelled successfully!');
    } catch (err) {
      alert(err.message || 'Failed to cancel order');
    } finally {
      setCancellingOrderId(null);
    }
  };

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
                      <span>{item.qty}x {item.dish?.name || `Item #${item.dish_id}`}</span>
                      <span>KSh {(item.line_total_cents / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total:</span>
                    <span className="text-xl font-bold text-green-600">
                      KSh {(order.total_cents / 100).toFixed(2)}
                    </span>
                  </div>

                  {/* Cancel button - only show for placed/edited orders */}
                  {(order.status === 'placed' || order.status === 'edited') && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={cancellingOrderId === order.id}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        cancellingOrderId === order.id
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                  )}

                  {/* Show message for cancelled/served orders */}
                  {order.status === 'cancelled' && (
                    <div className="text-center text-red-600 text-sm py-2">
                      This order has been cancelled
                    </div>
                  )}
                  {order.status === 'served' && (
                    <div className="text-center text-green-600 text-sm py-2">
                      This order has been completed
                    </div>
                  )}
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
