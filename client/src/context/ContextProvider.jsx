import React, { createContext, useContext, useState, useEffect } from 'react';
import { menuAPI, orderAPI, adminAPI } from '../services/api';

const MealyContext = createContext();

export const useMealyContext = () => {
  const context = useContext(MealyContext);
  if (!context) {
    throw new Error('useMealyContext must be used within a MealyProvider');
  }
  return context;
};

export const MealyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const [dashboard, setDashboard] = useState({
    totalOrders: 156,
    totalDelivered: 289,
    totalCanceled: 23,
    totalRevenue: 245000
  });

  // FIXED IMAGE LINKS - Using working Unsplash URLs
  const [menu, setMenu] = useState([
    { 
      id: 1, 
      name: 'Nyama Choma Platter', 
      price: 1200, 
      category: 'Grilled Meats', 
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop&crop=center' 
    },
    { 
      id: 2, 
      name: 'Ugali & Sukuma Wiki', 
      price: 350, 
      category: 'Traditional', 
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Ugali_%26_Sukuma_Wiki.jpg' 
    },
    { 
      id: 3, 
      name: 'Pilau Rice', 
      price: 650, 
      category: 'Rice Dishes', 
      image: 'https://soyummyrecipes.com/wp-content/uploads/2020/12/Chicken-pilau-rice-1-2.jpg.webp' 
    },
    { 
      id: 4, 
      name: 'Githeri Special', 
      price: 280, 
      category: 'Traditional', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8jo17LHxmHZeRXbkwED5MIthJXthXYlmTMQ&s' 
    },
    { 
      id: 5, 
      name: 'Chapati & Beef Stew', 
      price: 480, 
      category: 'Stews', 
      image: 'https://i.pinimg.com/1200x/11/51/72/1151724a874912495a0dc0440a5c179e.jpg' 
    },
    { 
      id: 6, 
      name: 'Samosas (6 pcs)', 
      price: 300, 
      category: 'Snacks', 
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&crop=center' 
    },
    { 
      id: 7, 
      name: 'Mutura Combo', 
      price: 420, 
      category: 'Street Food', 
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=300&fit=crop&crop=center' 
    },
    { 
      id: 8, 
      name: 'Fish & ugali', 
      price: 850, 
      category: 'Seafood', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6F-5ExO6HnUWgNnQ1_qRzsFXgDsu9j2KxOTPxXx_MgqIGxR1saR-bbCPdx-HsfmIocQc&usqp=CAU' 
    }
  ]);

  const [orders, setOrders] = useState([]);

  const reviews = [
    {
      id: 1, name: 'James Kamau', daysAgo: 1, rating: 4.8,
      comment: 'The nyama choma was perfectly grilled! Reminded me of home. The ugali was soft and the sukuma wiki had that authentic taste.',
      image: 'https://media.istockphoto.com/id/843435036/photo/portrait-of-an-afro-athletic-man.jpg?s=612x612&w=0&k=20&c=Vpvtf1pKXHYRHIHdj4qwDTOnQ10Lcvft-jmNVT2jcHA='
    },
    {
      id: 2, name: 'Grace Wanjiku', daysAgo: 2, rating: 4.5,
      comment: 'Amazing pilau! The spices were just right and the rice was perfectly cooked. The portion size was generous too.',
      image: 'https://entrepreneurship.babson.edu/magazine-archive/wp-content/uploads/2018/08/nduati-waceke-2-400x618.jpg'
    },
    {
      id: 3, name: 'David Otieno', daysAgo: 1, rating: 4.9,
      comment: 'Best githeri in Nairobi! Takes me back to my grandmother\'s cooking. The beans and maize were perfectly cooked.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9S9T1D29Z7XCvzWSJcZuUJcokn4xs3FCGfQ&s'
    }
  ];

  const revenueData = [
    { name: 'Monday', revenue: 12500 },
    { name: 'Tuesday', revenue: 18200 },
    { name: 'Wednesday', revenue: 15800 },
    { name: 'Thursday', revenue: 22100 },
    { name: 'Friday', revenue: 28500 },
    { name: 'Saturday', revenue: 35200 },
    { name: 'Sunday', revenue: 15000 }
  ];

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setCurrentUser(user);

        if (user.role === 'admin') {
          fetchAdminData();
        }
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  const fetchAdminData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await adminAPI.getOrders({
        caterer_id: 1,
        date: today
      });

      if (response.data) {
        const formattedOrders = response.data.map(order => ({
          id: order.id,
          customer: `Customer #${order.user_id}`,
          items: order.items ? order.items.map(i => `Item ${i.dish_id} x${i.qty}`).join(', ') : 'N/A',
          total: order.total_cents / 100,
          status: order.status === 'placed' ? 'preparing' : order.status === 'served' ? 'delivered' : order.status,
          date: new Date(order.created_at).toISOString().split('T')[0],
          time: new Date(order.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        }));
        setOrders(formattedOrders);

        const totalRevenue = formattedOrders.reduce((sum, o) => sum + o.total, 0);
        const deliveredCount = formattedOrders.filter(o => o.status === 'delivered').length;

        setDashboard(prev => ({
          ...prev,
          totalOrders: formattedOrders.length,
          totalDelivered: deliveredCount,
          totalRevenue: totalRevenue
        }));
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  const addMeal = async (newMeal) => {
    try {
      const dishData = {
        daily_menu_id: newMeal.daily_menu_id || 1,
        name: newMeal.name,
        price_cents: Math.round(parseFloat(newMeal.price) * 100),
        category: newMeal.category,
        image_url: newMeal.image,
        description: newMeal.description || '',
        ingredients: newMeal.ingredients || '',
        available_qty: newMeal.available_qty || 10
      };
      const response = await adminAPI.addDish(dishData);
      setMenu(prev => [...prev, {
        id: response.id,
        name: response.name,
        price: response.price_cents / 100,
        category: response.category,
        image: response.image_url
      }]);
      return true;
    } catch (err) {
      setError('Failed to add meal');
      return false;
    }
  };

  const updateMeal = async (updatedMeal) => {
    try {
      const dishData = {
        name: updatedMeal.name,
        price_cents: Math.round(parseFloat(updatedMeal.price) * 100),
        category: updatedMeal.category,
        image_url: updatedMeal.image,
        available_qty: updatedMeal.available_qty || 10
      };
      await adminAPI.updateDish(updatedMeal.id, dishData);
      setMenu(prev => prev.map(meal =>
        meal.id === updatedMeal.id ? { ...meal, ...updatedMeal } : meal
      ));
      return true;
    } catch (err) {
      setError('Failed to update meal');
      return false;
    }
  };

  const deleteMeal = (mealId) => {
    try {
      setMenu(prev => prev.filter(meal => meal.id !== mealId));
      return true;
    } catch (err) {
      setError('Failed to delete meal');
      return false;
    }
  };

  const addOrder = async (orderData) => {
    try {
      const response = await orderAPI.placeOrder(orderData);
      setOrders(prev => [...prev, response]);
      setDashboard(prev => ({
        ...prev,
        totalOrders: prev.totalOrders + 1
      }));
      return response;
    } catch (err) {
      setError(err.message || 'Failed to place order');
      throw err;
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    try {
      setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
      if (newStatus === 'delivered') {
        setDashboard(prev => ({
          ...prev,
          totalDelivered: prev.totalDelivered + 1
        }));
      } else if (newStatus === 'canceled') {
        setDashboard(prev => ({
          ...prev,
          totalCanceled: prev.totalCanceled + 1
        }));
      }
      return true;
    } catch (err) {
      setError('Failed to update order status');
      return false;
    }
  };

  const getDailyRevenue = (date) => {
    if (date === new Date().toISOString().split('T')[0]) {
      return 15000;
    }
    return orders.filter(order => order.date === date && order.status === 'delivered').reduce((sum, order) => sum + order.total, 0);
  };

  const formatCurrency = (amount) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  const value = {
    loading,
    error,
    dashboard,
    menu,
    orders,
    reviews,
    revenueData,
    currentUser,
    addMeal,
    updateMeal,
    deleteMeal,
    addOrder,
    updateOrderStatus,
    getDailyRevenue,
    formatCurrency,
    setError,
    setCurrentUser,
    fetchAdminData
  };

  return <MealyContext.Provider value={value}>{children}</MealyContext.Provider>;
};