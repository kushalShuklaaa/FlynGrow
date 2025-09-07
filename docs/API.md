# StudyHub Marketplace - API Documentation

## 🔗 Base URL
```
Development: http://localhost:5000/api
Production: https://api.studyhub.com/api
```

## 🔐 Authentication

All protected endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

#### Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "refresh_token_here"
}
```

## 📦 Products API

### Get Products
```http
GET /products?page=1&limit=10&category=ielts&search=preparation
```

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `category`: Product category filter
- `search`: Search term
- `minPrice`: Minimum price filter
- `maxPrice`: Maximum price filter
- `rating`: Minimum rating filter
- `sortBy`: Sort field (price, rating, createdAt)
- `sortOrder`: Sort direction (asc, desc)

### Get Single Product
```http
GET /products/:id
```

### Create Product (Admin Only)
```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "title": "IELTS Complete Pack",
  "description": "Comprehensive IELTS preparation materials",
  "price": 49.99,
  "category": "ielts",
  "tags": ["PDF", "Audio", "Video"],
  "files": [file1, file2],
  "images": [image1, image2]
}
```

## 🛒 Cart API

### Get User Cart
```http
GET /cart
Authorization: Bearer <token>
```

### Add to Cart
```http
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id_here",
  "quantity": 1
}
```

### Update Cart Item
```http
PUT /cart/update/:itemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

### Remove from Cart
```http
DELETE /cart/remove/:itemId
Authorization: Bearer <token>
```

## 🎫 Coupons API

### Get Available Coupons
```http
GET /coupons?active=true
```

### Validate Coupon
```http
POST /coupons/validate
Content-Type: application/json

{
  "code": "SAVE20",
  "orderAmount": 100.00
}
```

### Create Coupon (Admin Only)
```http
POST /coupons
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "code": "SAVE20",
  "description": "20% off on all products",
  "type": "percentage",
  "value": 20,
  "minOrderAmount": 50,
  "usageLimit": 100,
  "validFrom": "2024-01-01T00:00:00Z",
  "validUntil": "2024-12-31T23:59:59Z"
}
```

## 📋 Orders API

### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product_id",
      "quantity": 1
    }
  ],
  "couponCode": "SAVE20",
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "billingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Get User Orders
```http
GET /orders
Authorization: Bearer <token>
```

### Get Single Order
```http
GET /orders/:id
Authorization: Bearer <token>
```

### Update Order Status (Admin Only)
```http
PUT /orders/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "completed"
}
```

## 💳 Payments API

### Create Payment Request
```http
POST /payments/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderId": "order_id_here",
  "amount": 49.99,
  "paymentMethod": "paytm"
}
```

### Payment Callback (Paytm)
```http
POST /payments/callback
Content-Type: application/json

{
  "ORDERID": "order_id",
  "TXNID": "transaction_id",
  "TXNAMOUNT": "49.99",
  "STATUS": "TXN_SUCCESS",
  "CHECKSUMHASH": "checksum_hash"
}
```

### Get Payment Status
```http
GET /payments/status/:orderId
Authorization: Bearer <token>
```

## 👥 Users API

### Get User Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

### Update User Profile
```http
PUT /users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

### Get All Users (Admin Only)
```http
GET /users?page=1&limit=10&role=user
Authorization: Bearer <admin_token>
```

## 📊 Admin API

### Dashboard Stats
```http
GET /admin/dashboard/stats
Authorization: Bearer <admin_token>
```

### Revenue Analytics
```http
GET /admin/analytics/revenue?period=monthly&year=2024
Authorization: Bearer <admin_token>
```

### Export Data
```http
GET /admin/export/orders?format=csv&startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <admin_token>
```

## ⭐ Reviews API

### Get Product Reviews
```http
GET /reviews/product/:productId?page=1&limit=10
```

### Create Review
```http
POST /reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "rating": 5,
  "title": "Excellent material!",
  "comment": "This helped me score 8.5 in IELTS"
}
```

### Update Review
```http
PUT /reviews/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "title": "Updated review",
  "comment": "Updated comment"
}
```

## 📁 File Upload API

### Upload Files
```http
POST /upload/files
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "files": [file1, file2],
  "productId": "product_id"
}
```

### Upload Images
```http
POST /upload/images
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "images": [image1, image2],
  "productId": "product_id"
}
```

## 🔍 Search API

### Global Search
```http
GET /search?q=ielts&type=products&page=1&limit=10
```

### Search Suggestions
```http
GET /search/suggestions?q=iel
```

## 📧 Email API

### Send Order Confirmation
```http
POST /email/order-confirmation
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "orderId": "order_id",
  "userId": "user_id"
}
```

## 🚨 Error Responses

### Standard Error Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information (development only)",
  "errors": {
    "field": ["Validation error message"]
  }
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `500` - Internal Server Error

## 🔄 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Authentication**: 5 requests per 15 minutes per IP
- **File Upload**: 10 requests per hour per user
- **Payment**: 5 requests per minute per user

## 📝 Pagination

All list endpoints support pagination:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🔐 Security Headers

All responses include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Strict-Transport-Security: max-age=31536000`