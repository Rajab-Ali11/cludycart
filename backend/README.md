# CludyCart Backend

Laravel backend for CludyCart digital bookstore.

## Setup

### 1. Install Dependencies
```bash
cd backend
composer install
```

### 2. Environment
```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` with your PostgreSQL credentials:
```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=cludycart
DB_USERNAME=postgres
DB_PASSWORD=your_password
```

### 3. Database
```bash
php artisan migrate
php artisan db:seed
```

### 4. Storage Link
```bash
php artisan storage:link
```

### 5. Run
```bash
php artisan serve
```

Admin panel: http://localhost:8000/admin

**Default credentials:**
- Email: admin@cludycart.com
- Password: password

## API Endpoints

### Products
- `GET /api/products` - List all active products
- `GET /api/products/{slug}` - Get single product

### Orders
- `POST /api/orders` - Create new order

## Admin Panel

### Products
- `/admin/products` - List products
- `/admin/products/create` - Add product
- `/admin/products/{id}/edit` - Edit product
- `/admin/products/{id}/toggle` - Toggle active status

### Orders
- `/admin/orders` - List orders
- `/admin/orders/{id}` - View order details
- `/admin/orders/{id}/status` - Update order status
