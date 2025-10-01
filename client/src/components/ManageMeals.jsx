import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, Edit, Trash2, UtensilsCrossed, Upload, X } from 'lucide-react';
import { useMealyContext } from '../context/ContextProvider';

// Import all images for local mapping
import image4 from '../assets/image4.jpg';
import image21 from '../assets/image21.jpg';
import image22 from '../assets/image22.jpg';
import image23 from '../assets/image23.jpg';
import image24 from '../assets/image24.jpg';
import image25 from '../assets/image25.jpg';
import image26 from '../assets/image26.jpg';
import image27 from '../assets/image27.jpg';
import image28 from '../assets/image28.jpg';
import image29 from '../assets/image29.jpg';
import image30 from '../assets/image30.jpg';
import image31 from '../assets/image31.jpg';
import image32 from '../assets/image32.jpg';
import image33 from '../assets/image33.jpg';
import image34 from '../assets/image34.jpg';
import image35 from '../assets/image35.jpg';
import image36 from '../assets/image36.jpg';
import image37 from '../assets/image37.jpg';
import image38 from '../assets/image38.jpg';
import image39 from '../assets/image39.jpg';
import image40 from '../assets/image40.jpg';
import image41 from '../assets/image41.jpg';
import image42 from '../assets/image42.jpg';
import image43 from '../assets/image43.jpg';
import image44 from '../assets/image44.jpg';
import image45 from '../assets/image45.jpg';
import image46 from '../assets/image46.jpg';
import image47 from '../assets/image47.jpg';
import image48 from '../assets/image48.jpg';
import image49 from '../assets/image49.jpg';
import image50 from '../assets/image50.jpg';
import image51 from '../assets/image51.jpg';
import image52 from '../assets/image52.jpg';
import image53 from '../assets/image53.jpg';

// Map image URLs to imported images
const imageMap = {
  'image21.jpg': image21, 'image22.jpg': image22, 'image23.jpg': image23,
  'image24.jpg': image24, 'image25.jpg': image25, 'image26.jpg': image26,
  'image27.jpg': image27, 'image28.jpg': image28, 'image29.jpg': image29,
  'image30.jpg': image30, 'image31.jpg': image31, 'image32.jpg': image32,
  'image33.jpg': image33, 'image34.jpg': image34, 'image35.jpg': image35,
  'image36.jpg': image36, 'image37.jpg': image37, 'image38.jpg': image38,
  'image39.jpg': image39, 'image40.jpg': image40, 'image41.jpg': image41,
  'image42.jpg': image42, 'image43.jpg': image43, 'image44.jpg': image44,
  'image45.jpg': image45, 'image46.jpg': image46, 'image47.jpg': image47,
  'image48.jpg': image48, 'image49.jpg': image49, 'image50.jpg': image50,
  'image51.jpg': image51, 'image52.jpg': image52, 'image53.jpg': image53
};

const getImageFromUrl = (imageUrl) => {
  if (!imageUrl) return image4;

  // If it's a base64 data URL, return it directly
  if (imageUrl.startsWith('data:image/')) {
    return imageUrl;
  }

  // If it's already a full URL (http/https), return it directly
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Otherwise, try to match it to imported images
  const filename = imageUrl.split('/').pop();
  return imageMap[filename] || image4;
};

const AddMealForm = ({ onSubmit, onCancel, editingMeal = null }) => {
  const [formData, setFormData] = useState({
    name: editingMeal?.name || '',
    price: editingMeal?.price?.toString() || '',
    category: editingMeal?.category || 'Daily Menu',
    image: editingMeal?.image || ''
  });
  const [imagePreview, setImagePreview] = useState(editingMeal?.image || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImagePreview(result);
        setFormData({...formData, image: result});
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mealData = {
      ...formData,
      price: parseFloat(formData.price),
      ...(editingMeal && { id: editingMeal.id })
    };
    const success = await onSubmit(mealData);
    if (success) {
      setFormData({ name: '', price: '', category: 'Traditional', image: '' });
      setImagePreview(null);
      onCancel();
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{editingMeal ? 'Edit Kenyan Dish' : 'Add New Kenyan Dish'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" 
            placeholder="Dish name (e.g., Nyama Choma)" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number" 
            step="1" 
            placeholder="Price in KSh (e.g., 1200)" 
            required
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
          >
            {['Daily Menu', 'Pizzas', 'Garlic Bread', 'Calzone', 'Kebabas', 'Salads', 'Cold drinks', 'Happy Mealy', 'Desserts', 'Coffee', 'Sauces', 'KUKU', 'Traditional', 'Grilled Meats', 'Rice Dishes', 'Stews', 'Street Food', 'Snacks', 'Seafood'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Dish Image</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => {setImagePreview(null); setFormData({...formData, image: ''});}}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                  </div>
                )}
              </label>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
              {editingMeal ? 'Update Dish' : 'Add Dish'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const DeleteConfirmationDialog = ({ meal, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{meal.name}</strong>? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button 
            onClick={onConfirm} 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const ManageMeals = () => {
  const { loading, error, menu, addMeal, updateMeal, deleteMeal, formatCurrency } = useMealyContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [deletingMeal, setDeletingMeal] = useState(null);
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoadingAllItems, setIsLoadingAllItems] = useState(true);

  const handleAddMeal = async (mealData) => {
    const success = await addMeal(mealData);
    if (success) {
      await fetchAllMenuItems(); // Refetch to show the new dish
    }
    return success;
  };

  const handleEditMeal = async (mealData) => {
    const success = await updateMeal(mealData);
    if (success) {
      await fetchAllMenuItems(); // Refetch to show updated dish
    }
    return success;
  };

  const handleDeleteMeal = (meal) => {
    setDeletingMeal(meal);
  };

  const confirmDelete = async () => {
    if (deletingMeal) {
      const success = await deleteMeal(deletingMeal.id);
      if (success) {
        await fetchAllMenuItems(); // Refetch to remove deleted dish
      }
      setDeletingMeal(null);
    }
  };

  const handleEditClick = (meal) => {
    setEditingMeal(meal);
    setShowAddForm(true);
  };

  const handleFormCancel = () => {
    setShowAddForm(false);
    setEditingMeal(null);
  };

  // Fetch all menu items including database dishes and static categories
  const fetchAllMenuItems = React.useCallback(async () => {
    try {
      setIsLoadingAllItems(true);
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      // Get today's daily menu
      const today = new Date().toISOString().split('T')[0];
      const menusResponse = await fetch(`http://localhost:5000/daily-menus?date=${today}`, { headers });
      const menusData = await menusResponse.json();

      let fetchedItems = [];

      if (menusData.data && menusData.data.length > 0) {
        const menuId = menusData.data[0].id;

        // Fetch all dishes (increase per_page to get all items)
        const dishesResponse = await fetch(`http://localhost:5000/dishes?daily_menu_id=${menuId}&per_page=1000`, { headers });
        const dishesData = await dishesResponse.json();

        if (dishesData.data) {
          fetchedItems = dishesData.data.map(dish => ({
            id: dish.id,
            name: dish.name,
            price: dish.price_cents / 100,
            category: dish.category,
            image: getImageFromUrl(dish.image_url)
          }));
          console.log('✓ Fetched dishes for admin:', fetchedItems.length, 'items');
          console.log('Sample dish:', fetchedItems[0]);
        }
      }

      // Combine with items from context (fallback)
      const combined = fetchedItems.length > 0 ? fetchedItems : menu;
      setAllMenuItems(combined);
    } catch (error) {
      console.error('Failed to fetch all menu items:', error);
      setAllMenuItems(menu); // Fallback to context menu
    } finally {
      setIsLoadingAllItems(false);
    }
  }, [menu]);

  React.useEffect(() => {
    fetchAllMenuItems();
  }, [fetchAllMenuItems]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <div className="text-red-600 mb-2">Error Loading Meals</div>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  // Get unique categories
  const categories = ['All', ...new Set(allMenuItems.map(item => item.category))];

  // Filter items by selected category
  const displayedItems = selectedCategory === 'All'
    ? allMenuItems
    : allMenuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mealy Menu</h1>
          <p className="text-gray-600">Manage authentic Kenyan dishes and traditional foods</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />Add New Dish
        </Button>
      </div>

      {showAddForm && (
        <AddMealForm
          onSubmit={editingMeal ? handleEditMeal : handleAddMeal}
          onCancel={handleFormCancel}
          editingMeal={editingMeal}
        />
      )}

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items count */}
      <div className="text-sm text-gray-600">
        Showing {displayedItems.length} {selectedCategory === 'All' ? 'total' : selectedCategory} items
      </div>

      {isLoadingAllItems ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((meal) => (
          <Card key={meal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => {
                  console.warn('Image failed to load:', meal.image);
                  e.target.onerror = null; // Prevent infinite loop
                  e.target.src = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop';
                }}
              />
              <h3 className="font-semibold text-lg mb-1">{meal.name}</h3>
              <p className="text-green-600 font-bold text-lg mb-2">{formatCurrency(meal.price)}</p>
              <p className="text-gray-500 text-sm mb-3">{meal.category}</p>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleEditClick(meal)}
                >
                  <Edit className="h-4 w-4 mr-1" />Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteMeal(meal)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          ))}
        </div>
      )}

      {displayedItems.length === 0 && !isLoadingAllItems && (
        <div className="text-center py-12">
          <UtensilsCrossed className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No dishes yet</h3>
          <p className="text-gray-600">Add your first Kenyan dish to get started</p>
        </div>
      )}

      {deletingMeal && (
        <DeleteConfirmationDialog
          meal={deletingMeal}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingMeal(null)}
        />
      )}
    </div>
  );
};

export default ManageMeals;