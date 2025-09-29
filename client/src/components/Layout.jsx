import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, Search, Bell, ShoppingCart, User, X } from 'lucide-react';
import { useMealyContext } from '../context/ContextProvider';

const Dropdown = ({ items, title, onClose, onAction, onSelect }) => (
  <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border z-50 max-h-64 overflow-y-auto">
    <div className="p-3 border-b flex justify-between"><h3 className="font-semibold">{title}</h3><button onClick={onClose}><X className="h-4 w-4" /></button></div>
    {items.length === 0 ? <div className="p-4 text-center text-gray-500">No items</div> : items.map((item) => (
      <div key={item.id} className="p-3 border-b hover:bg-gray-50 flex justify-between" onClick={() => onSelect && onSelect(item)}>
        <div>
          <p className="text-sm font-medium">{item.title || item.name || item.customer}</p>
          <p className="text-xs text-gray-600">{item.message || (item.price && `KSh ${item.price}`) || (item.items && `${item.items} - KSh ${item.total}`)}</p>
          {item.time && <span className="text-xs text-gray-400">{item.time}</span>}
        </div>
        {onAction && <button onClick={(e) => {e.stopPropagation(); onAction(item.id);}} className="text-red-500"><X className="h-4 w-4" /></button>}
        {item.type && <span className={`px-2 py-1 rounded text-xs ${item.type === 'menu' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>{item.type === 'menu' ? 'Menu' : 'Order'}</span>}
      </div>
    ))}
  </div>
);

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { menu, orders } = useMealyContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([{id: 1, name: 'Nyama Choma', price: 1200}, {id: 2, name: 'Ugali', price: 150}]);

  const notifications = [
    {id: 1, title: 'New Order', message: 'Order #123 from James Kamau', time: '2 min ago'},
    {id: 2, title: 'Low Stock', message: 'Ugali running low', time: '15 min ago'}
  ];

  const menuItems = [
    {path: '/', label: 'Dashboard', icon: LayoutDashboard},
    {path: '/meals', label: 'Manage Meals', icon: UtensilsCrossed},
    {path: '/orders', label: 'Orders', icon: ShoppingBag}
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    setShowSearch(value.length > 0);
  };

  const getSearchResults = () => {
    if (!searchTerm) return [];
    const menuResults = menu.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())).map(item => ({...item, type: 'menu'}));
    const orderResults = orders.filter(order => order.customer.toLowerCase().includes(searchTerm.toLowerCase()) || order.items.toLowerCase().includes(searchTerm.toLowerCase())).map(order => ({...order, type: 'order'}));
    return [...menuResults, ...orderResults];
  };

  const handleSearchSelect = (item) => {
    navigate(item.type === 'menu' ? '/meals' : '/orders');
    setShowSearch(false);
    setSearchTerm('');
  };

  const closeDropdowns = () => {
    setShowNotifications(false);
    setShowCart(false);
    setShowSearch(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50" onClick={closeDropdowns}>
      <div className="w-64 bg-white shadow-sm border-r" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <div className="text-2xl font-bold text-green-600">Mealy</div>
          <div className="text-sm text-gray-500">Admin Dashboard</div>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${location.pathname === item.path ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input type="text" placeholder="Search menu items, orders..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
              {showSearch && <Dropdown items={getSearchResults()} title={`Search Results (${getSearchResults().length})`} onClose={() => setShowSearch(false)} onSelect={handleSearchSelect} />}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={(e) => {e.stopPropagation(); setShowNotifications(!showNotifications); setShowCart(false);}}>
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{notifications.length}</span>
                </button>
                {showNotifications && <Dropdown items={notifications} title="Notifications" onClose={() => setShowNotifications(false)} />}
              </div>
              
              <div className="relative">
                <button onClick={(e) => {e.stopPropagation(); setShowCart(!showCart); setShowNotifications(false);}}>
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartItems.length}</span>
                </button>
                {showCart && <Dropdown items={cartItems} title="Cart Items" onClose={() => setShowCart(false)} onAction={(id) => setCartItems(prev => prev.filter(item => item.id !== id))} />}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Hello, David</span>
                <User className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
