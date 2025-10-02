const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const getHeaders = (includeAuth = true) => {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

export const authAPI = {
  register: (userData) =>
    fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(userData)
    }).then(handleResponse),

  login: (credentials) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify(credentials)
    }).then(handleResponse),

  googleAuth: (token) =>
    fetch(`${API_BASE}/auth/google`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ token })
    }).then(handleResponse),

  appleAuth: (idToken, code, user) =>
    fetch(`${API_BASE}/auth/apple`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ id_token: idToken, code, user })
    }).then(handleResponse),

  getMe: () =>
    fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders()
    }).then(handleResponse)
};

export const menuAPI = {
  getDailyMenus: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/daily-menus?${query}`, {
      headers: getHeaders()
    }).then(handleResponse);
  },

  getDishes: (menuId) =>
    fetch(`${API_BASE}/dishes?daily_menu_id=${menuId}`, {
      headers: getHeaders()
    }).then(handleResponse)
};

export const orderAPI = {
  placeOrder: (orderData) =>
    fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(orderData)
    }).then(handleResponse),

  getMyOrders: () =>
    fetch(`${API_BASE}/orders/my`, {
      headers: getHeaders()
    }).then(handleResponse),

  updateOrder: (orderId, items) =>
    fetch(`${API_BASE}/orders/${orderId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ items })
    }).then(handleResponse),

  cancelOrder: (orderId) =>
    fetch(`${API_BASE}/orders/${orderId}/cancel`, {
      method: 'POST',
      headers: getHeaders()
    }).then(handleResponse)
};

export const adminAPI = {
  addDish: (dishData) =>
    fetch(`${API_BASE}/dishes`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(dishData)
    }).then(handleResponse),

  updateDish: (dishId, dishData) =>
    fetch(`${API_BASE}/dishes/${dishId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(dishData)
    }).then(handleResponse),

  deleteDish: (dishId) =>
    fetch(`${API_BASE}/dishes/${dishId}`, {
      method: 'DELETE',
      headers: getHeaders()
    }).then(handleResponse),

  getOrders: (params) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${API_BASE}/admin/orders?${query}`, {
      headers: getHeaders()
    }).then(handleResponse);
  }
};
