# Admin API Reference

## Base URL
```
http://localhost:3000/api/admin
```

## Authentication
All Admin endpoints require JWT authentication with SuperAdmin role. Include the token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

---

## Endpoints

### 1. Admin Login

**Endpoint:** `POST /login`

**Description:** Authenticates an Admin user and returns a JWT token.

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "string (required, valid email)",
  "password": "string (required)"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "6710f9f0a8b2e0f49d9d3d12",
    "fullname": "John Doe",
    "username": "john_admin",
    "email": "john@example.com",
    "role": "Admin",
    "phone": "+919876543210",
    "adminArea": "Mumbai",
    "company": {
      "_id": "66f3a9abbb1234567890abcd",
      "company_name": "ABC Corp",
      "company_email": "contact@abccorp.com"
    },
    "status": "active",
    "lastLogin": "2025-01-17T16:30:15.123Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**

**400 - Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Please enter a valid email address"
  ]
}
```

**401 - Invalid Credentials:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**401 - Account Inactive:**
```json
{
  "success": false,
  "message": "Account is inactive or suspended"
}
```

---

### 2. Admin Logout

**Endpoint:** `POST /logout`

**Description:** Logs out the current Admin user. Since JWT is stateless, the client should remove the token from storage.

**Authentication:** Not required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 3. Create Admin

**Endpoint:** `POST /api/superadmin/create-admin`

**Description:** Creates a new Admin account and assigns it to a company. Only SuperAdmin can access this endpoint.

**Authentication:** Required (SuperAdmin only)

**Request Body:**
```json
{
  "fullname": "string (required, 2-100 characters)",
  "username": "string (required, 3-50 characters, alphanumeric)",
  "email": "string (required, valid email)",
  "role": "string (required, must be 'Admin')",
  "password": "string (required, minimum 6 characters)",
  "phone": "string (required, 10-20 characters)",
  "adminArea": "string (required, 2-100 characters)",
  "company": "string (required, valid MongoDB ObjectId)"
}
```

**Validation Rules:**
- `fullname`: Required, 2-100 characters
- `username`: Required, 3-50 characters, alphanumeric only, unique
- `email`: Required, valid email format, unique
- `role`: Required, must be 'Admin'
- `password`: Required, minimum 6 characters
- `phone`: Required, 10-20 characters
- `adminArea`: Required, 2-100 characters
- `company`: Required, valid MongoDB ObjectId

**Example Request:**
```json
{
  "fullname": "John Doe",
  "username": "john_admin",
  "email": "john@example.com",
  "role": "Admin",
  "password": "Admin@123",
  "phone": "+919876543210",
  "adminArea": "Mumbai",
  "company": "66f3a9abbb1234567890abcd"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Admin created successfully",
  "data": {
    "_id": "6710f9f0a8b2e0f49d9d3d12",
    "fullname": "John Doe",
    "username": "john_admin",
    "email": "john@example.com",
    "password": "Admin@123",
    "originalPassword": "Admin@123",
    "role": "Admin",
    "phone": "+919876543210",
    "adminArea": "Mumbai",
    "company": "66f3a9abbb1234567890abcd",
    "status": "active",
    "createdAt": "2025-01-17T15:50:21.342Z"
  }
}
```

**Error Responses:**

**400 - Validation Error:**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Full name must be at least 2 characters",
    "Please enter a valid email address"
  ]
}
```

**400 - Email Already Exists:**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**400 - Username Already Taken:**
```json
{
  "success": false,
  "message": "Username already taken"
}
```

**400 - Company Not Found:**
```json
{
  "success": false,
  "message": "Company not found"
}
```

**403 - Unauthorized:**
```json
{
  "success": false,
  "message": "Unauthorized! Only SuperAdmin can create Admins"
}
```

**500 - Server Error:**
```json
{
  "success": false,
  "message": "Server error"
}
```

---

### 2. Get All Admins

**Endpoint:** `GET /api/superadmin/admins`

**Description:** Retrieves all Admin accounts with company and creator information.

**Authentication:** Required (SuperAdmin only)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admins retrieved successfully",
  "data": [
    {
      "_id": "6710f9f0a8b2e0f49d9d3d12",
      "fullname": "John Doe",
      "username": "john_admin",
      "email": "john@example.com",
      "password": "Admin@123",
    "originalPassword": "Admin@123",
      "role": "Admin",
      "phone": "+919876543210",
      "adminArea": "Mumbai",
      "company": {
        "_id": "66f3a9abbb1234567890abcd",
        "company_name": "ABC Corp",
        "company_email": "contact@abccorp.com"
      },
      "created_by": {
        "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "name": "Super Admin",
        "email": "superadmin@example.com"
      },
      "status": "active",
      "createdAt": "2025-01-17T15:50:21.342Z",
      "updatedAt": "2025-01-17T15:50:21.342Z"
    }
  ]
}
```

---

### 3. Get Admin by ID

**Endpoint:** `GET /api/superadmin/admins/:id`

**Description:** Retrieves a specific Admin account by ID.

**Authentication:** Required (SuperAdmin only)

**Parameters:**
- `id`: Admin ID (MongoDB ObjectId)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin retrieved successfully",
  "data": {
    "_id": "6710f9f0a8b2e0f49d9d3d12",
    "fullname": "John Doe",
    "username": "john_admin",
    "email": "john@example.com",
    "password": "Admin@123",
    "originalPassword": "Admin@123",
    "role": "Admin",
    "phone": "+919876543210",
    "adminArea": "Mumbai",
    "company": {
      "_id": "66f3a9abbb1234567890abcd",
      "company_name": "ABC Corp",
      "company_email": "contact@abccorp.com",
      "company_phone": "+911234567890"
    },
    "created_by": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Super Admin",
      "email": "superadmin@example.com"
    },
    "status": "active",
    "createdAt": "2025-01-17T15:50:21.342Z",
    "updatedAt": "2025-01-17T15:50:21.342Z"
  }
}
```

**404 - Admin Not Found:**
```json
{
  "success": false,
  "message": "Admin not found"
}
```

---

### 6. Update Admin

**Endpoint:** `POST /api/superadmin/update-admin/:id`

**Description:** Updates an existing Admin account. Password updates are not supported through this endpoint.

**Authentication:** Required (SuperAdmin only)

**Parameters:**
- `id`: Admin ID (MongoDB ObjectId)

**Request Body:**
```json
{
  "fullname": "string (optional, 2-100 characters)",
  "username": "string (optional, 3-50 characters, alphanumeric)",
  "email": "string (optional, valid email)",
  "phone": "string (optional, 10-20 characters)",
  "department": "string (optional, 2-100 characters)",
  "adminArea": "string (optional, 2-100 characters)",
  "company": "string (optional, valid MongoDB ObjectId)",
  "status": "string (optional, active|inactive|suspended)"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin updated successfully",
  "data": {
    "_id": "6710f9f0a8b2e0f49d9d3d12",
    "fullname": "John Doe Updated",
    "username": "john_admin",
    "email": "john.updated@example.com",
    "role": "Admin",
    "phone": "+919876543210",
    "adminArea": "Mumbai",
    "company": "66f3a9abbb1234567890abcd",
    "status": "active",
    "createdAt": "2025-01-17T15:50:21.342Z",
    "updatedAt": "2025-01-17T16:30:15.123Z"
  }
}
```

---

### 7. Delete Admin

**Endpoint:** `POST /api/superadmin/delete-admin/:id`

**Description:** Deletes an Admin account permanently.

**Authentication:** Required (SuperAdmin only)

**Parameters:**
- `id`: Admin ID (MongoDB ObjectId)

**Success Response (200):**
```json
{
  "success": true,
  "message": "Admin deleted successfully"
}
```

**404 - Admin Not Found:**
```json
{
  "success": false,
  "message": "Admin not found"
}
```

---

## Data Models

### Admin Model
```javascript
{
  "_id": "ObjectId",
  "fullname": "String (required, 2-100 characters)",
  "username": "String (required, unique, 3-50 characters, alphanumeric)",
  "email": "String (required, unique, valid email)",
  "password": "String (required, stored in plain text)",
  "originalPassword": "String (required, stored in plain text)",
  "role": "String (required, default: 'Admin')",
  "phone": "String (required, 10-20 characters)",
  "department": "String (required, 2-100 characters)",
  "adminArea": "String (required, 2-100 characters)",
  "company": "ObjectId (required, ref: 'Company')",
  "created_by": "ObjectId (required, ref: 'SuperAdmin')",
  "status": "String (enum: active|inactive|suspended, default: active)",
  "lastLogin": "Date (optional)",
  "resetPasswordToken": "String (optional)",
  "resetPasswordExpires": "Date (optional)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### JWT Token Payload
```javascript
{
  "id": "ObjectId (user ID)",
  "role": "String (user role)",
  "email": "String (user email)",
  "company": "ObjectId (company ID)",
  "iat": "Number (issued at)",
  "exp": "Number (expiration)"
}
```

---

## Security Notes
- **PLAIN TEXT PASSWORDS**: Admin passwords are stored in plain text (not hashed)
- JWT tokens expire in 7 days by default (configurable via JWT_EXPIRES_IN)
- Email addresses and usernames are stored in lowercase
- All input is validated using Joi schemas
- Request bodies are sanitized (unknown fields are stripped)
- Only SuperAdmin role can access Admin management endpoints
- Company references are validated before creating Admin accounts
- Duplicate email and username prevention
- **SUPERADMIN ACCESS**: SuperAdmin can view admin passwords when retrieving admin details
- Reset password tokens are automatically excluded from responses

---

**Last Updated:** January 2025  
**API Version:** 1.0.0
