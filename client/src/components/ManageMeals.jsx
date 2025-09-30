import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus, Edit, Trash2, UtensilsCrossed, Upload, X } from 'lucide-react';
import { useMealyContext } from '../context/ContextProvider';

const AddMealForm = ({ onSubmit, onCancel, editingMeal = null }) => {
  const [formData, setFormData] = useState({
    name: editingMeal?.name || '', 
    price: editingMeal?.price?.toString() || '', 
    category: editingMeal?.category || 'Traditional', 
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
            {['Traditional', 'Grilled Meats', 'Rice Dishes', 'Stews', 'Street Food', 'Snacks', 'Seafood'].map(cat => (
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

  const handleAddMeal = async (mealData) => {
    const success = await addMeal(mealData);
    return success;
  };

  const handleEditMeal = async (mealData) => {
    const success = await updateMeal(mealData);
    return success;
  };

  const handleDeleteMeal = (meal) => {
    setDeletingMeal(meal);
  };

  const confirmDelete = () => {
    if (deletingMeal) {
      deleteMeal(deletingMeal.id);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menu.map((meal) => (
          <Card key={meal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-32 object-cover rounded-md mb-3"
                onError={(e) => {
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

      {menu.length === 0 && (
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