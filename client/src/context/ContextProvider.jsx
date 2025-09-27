import React, { createContext, useContext, useState, useEffect } from 'react';

const MealyContext = createContext();

export const useMealyContext = () => {
  const context = useContext(MealyContext);
  if (!context) {
    throw new Error('useMealyContext must be used within a MealyProvider');
  }
  return context;
};

export const MealyProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      name: 'Fish & Chips', 
      price: 850, 
      category: 'Seafood', 
      image: 'https://images.unsplash.com/photo-1559847844-d7a5ceadf3b1?w=400&h=300&fit=crop&crop=center' 
    }
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customer: 'Wanjiku Mwangi', items: 'Nyama Choma x1, Ugali x2', total: 1900, status: 'delivered', date: '2024-09-27', time: '12:30 PM' },
    { id: 2, customer: 'James Kiprotich', items: 'Pilau Rice x1, Chapati x2', total: 1130, status: 'preparing', date: '2024-09-27', time: '1:15 PM' },
    { id: 3, customer: 'Grace Njoki', items: 'Githeri Special x2, Samosas x6', total: 860, status: 'ready', date: '2024-09-27', time: '11:45 AM' },
    { id: 4, customer: 'David Otieno', items: 'Fish & Chips x1, Mutura x1', total: 1270, status: 'delivered', date: '2024-09-27', time: '7:30 PM' },
    { id: 5, customer: 'Mary Wanjiru', items: 'Ugali & Sukuma x2, Chapati x3', total: 1140, status: 'preparing', date: '2024-09-27', time: '2:00 PM' }
  ]);

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
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const addMeal = (newMeal) => {
    try {
      const meal = { 
        id: Date.now(), 
        ...newMeal,
        price: parseFloat(newMeal.price),
        // Default image if none provided
        image: newMeal.image || 'https://static.vecteezy.com/system/resources/thumbnails/025/728/485/small_2x/good-investment-opportunities-404-error-animation-building-strategy-choosing-way-error-message-gif-motion-graphic-thinking-investor-animated-character-cartoon-4k-isolated-on-white-background-video.jpg'
      };
      setMenu(prev => [...prev, meal]);
      return true;
    } catch (err) {
      setError('Failed to add meal');
      return false;
    }
  };

  // Update meal function
  const updateMeal = (updatedMeal) => {
    try {
      setMenu(prev => prev.map(meal => 
        meal.id === updatedMeal.id 
          ? { 
              ...meal, 
              ...updatedMeal,
              price: parseFloat(updatedMeal.price)
            }
          : meal
      ));
      return true;
    } catch (err) {
      setError('Failed to update meal');
      return false;
    }
  };

  //  Delete meal function
  const deleteMeal = (mealId) => {
    try {
      setMenu(prev => prev.filter(meal => meal.id !== mealId));
      return true;
    } catch (err) {
      setError('Failed to delete meal');
      return false;
    }
  };

  const addOrder = (newOrder) => {
    try {
      const order = { id: Date.now(), ...newOrder };
      setOrders(prev => [...prev, order]);
      setDashboard(prev => ({
        ...prev,
        totalOrders: prev.totalOrders + 1
      }));
      return true;
    } catch (err) {
      setError('Failed to add order');
      return false;
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
    addMeal, 
    updateMeal,     
    deleteMeal,     
    addOrder, 
    updateOrderStatus, 
    getDailyRevenue, 
    formatCurrency, 
    setError 
  };

  return <MealyContext.Provider value={value}>{children}</MealyContext.Provider>;
};