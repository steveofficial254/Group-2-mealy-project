# Setup Guide

## Backend Setup (Flask)
```bash
cd server
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
python seed_menu.py  # Seed database
python app.py  # Runs on http://localhost:5000
```

## Frontend Setup (React)
```bash
cd client
npm install
npm start  # Runs on http://localhost:3000
```

## Features
- JWT authentication with role-based access
- Menu browsing with cart functionality
- Order placement and cancellation
- Admin dashboard for meals and orders
- Responsive design with Tailwind CSS

## Key API Endpoints
- POST /auth/register, /auth/login
- GET /daily-menus, /dishes
- POST /orders, GET /orders/my, PATCH /orders/:id
- Admin: POST/PATCH/DELETE /dishes, GET /admin/orders

## Testing Flow
**Customer**: Sign up → Browse menu → Add to cart → Checkout → View orders
**Admin**: Login (admin@mealy.com / admin123) → Dashboard → Manage orders/meals → Logout

## Status
✅ Full system integration complete
✅ Database seeded with images
✅ Order management working
✅ Customer order cancellation
✅ Improved error handling