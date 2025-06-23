# Leave Managemnt- Backend

## Description

This is the backend of a **User Login and Leave Management System** built with Laravel 10+. It provides secure user authentication using **Laravel Passport** and handles core functionalities such as:

- **User Registration & Login** with token-based authentication
- **Leave Application** submission by users
- **Leave Approval/Reject** functionality for admins
- **Leave History** tracking for each user

The backend exposes REST

---

## 🔧 Backend Technologies Used

- **Laravel 12** – PHP framework for building robust web applications.
- **MySQL** – Relational database management system.
- **Laravel Passport** – API authentication using OAuth2.

---

## 🚀 Getting Started

### Prerequisites

- PHP >= 8.1
- Composer
- MySQL
- Node.js & NPM (if frontend or API docs included)

### Importent 

1. Run to Backend
   ```bash
   git clone https://github.com/chamalanuradha/-leave_management_system
   ```


2. Database Credintials 

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=leave_management
   DB_USERNAME=root
   DB_PASSWORD=

3. APT end points
   
   ## POST /api/register
 

### Request
    ```bash
    {
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
    ```
### Response(Success)
    ```bash
    {
  "status": 'success',
  "message": "User registered successfully.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "USER",
      "created_at": "2025-06-23T10:00:00.000000Z",
      "updated_at": "2025-06-23T10:00:00.000000Z"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "error": null
}
    ```

### Response(fail)

```bash
{
    "status": 'fail',
  "message": "The given data was invalid.",
  "data": null
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

## POST /api/login

### Request

```bash
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
### Response(Success)
```bash
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "USER",
      "created_at": "2025-06-23T10:00:00.000000Z",
      "updated_at": "2025-06-23T10:00:00.000000Z"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  "error": null
}

```
### Response(fail)
```bash
{
  "status": "fail",
  "message": "Unauthorized",
  "data": null,
  "error": "Invalid Credentials"
}

```
```bash
{
  "status": "error",
  "message": "Login failed",
  "data": null,
  "error": "Error message details..."
}


```



## GET /api/leaves

### Request

```bash
GET /api/leaves
Authorization: Bearer {access_token}
```
### Response(Success)

```bash
{
  "status": "success",
  "message": "Leave records fetched successfully.",
  "data": [
    {
      "id": 1,
      "user_id": 3,
      "type": "Annual",
      "reason": "Family trip",
      "from_date": "2025-06-24",
      "to_date": "2025-06-28",
      "status": "Pending",
      "created_at": "2025-06-20T10:23:45.000000Z",
      "updated_at": "2025-06-20T10:23:45.000000Z",
      "user": {
        "id": 3,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "USER"
      }
    },
    ...
  ],
  "error": null
}

```
### Response(fail)

```bash
{
  "status": "fail",
  "message": "Unauthorized: Only admins can view all leave records.",
  "data": null,
  "error": "Access denied"
}

```
```bash
{
  {
  "status": "fail",
  "message": "Failed to fetch leave records.",
  "data": null,
  "error": "SQLSTATE[HY000]... (example error message)"
}

}

```


## POST /api/leaves

### Request
```bash
{
  "leave_date": "2025-07-01",
  "leave_type": "Annual",
  "reason": "Family vacation"
}
```
### Response(Success)
```bash
{
  "status": "success",
  "message": "Leave request submitted.",
  "data": {
    "id": 1,
    "user_id": 3,
    "leave_date": "2025-07-01",
    "leave_type": "Annual",
    "reason": "Family vacation",
    "status": "PENDING",
    "created_at": "2025-06-23T12:30:00.000000Z",
    "updated_at": "2025-06-23T12:30:00.000000Z"
  },
  "error": null
}

```
### Response(fail)
```bash
{
  "status": "fail",
  "message": "Leave request failed.",
  "data": null,
  "error": "SQLSTATE[23000]: Integrity constraint violation: 1048 Column 'user_id' cannot be null"
}

```





## PUT /api/leaves/{id}

### Request
```bash
{
  "status": "APPROVED"
}

```
### Response(Success)
```bash
{
  "status": "success",
  "message": "Leave status updated.",
  "data": {
    "id": 5,
    "user_id": 3,
    "leave_date": "2025-07-01",
    "leave_type": "Annual",
    "reason": "Family vacation",
    "status": "APPROVED",
    "created_at": "2025-06-23T12:30:00.000000Z",
    "updated_at": "2025-06-23T14:45:00.000000Z"
  },
  "error": null
}

```
### Response(fail)
```bash
{
  "status": "fail",
  "message": "Unauthorized: Only admins can update leave status.",
  "data": null,
  "error": "Access denied"
}
```
```bash
{
  "status": "fail",
  "message": "Failed to update leave status.",
  "data": null,
  "error": "SQLSTATE[HY000]: General error: ..."
}

```



## GET /api/my-leaves

### Request
```bash
GET /api/my-leaves
Authorization: Bearer {access_token}
```
### Response(Success)
```bash
{
  "status": "success",
  "message": "Your leave records fetched successfully.",
  "data": [
    {
      "id": 1,
      "user_id": 3,
      "leave_date": "2025-07-01",
      "leave_type": "Annual",
      "reason": "Family vacation",
      "status": "APPROVED",
      "created_at": "2025-06-23T12:30:00.000000Z",
      "updated_at": "2025-06-23T14:45:00.000000Z"
    },
    {
      "id": 2,
      "user_id": 3,
      "leave_date": "2025-08-15",
      "leave_type": "Medical",
      "reason": "Doctor appointment",
      "status": "PENDING",
      "created_at": "2025-07-10T09:00:00.000000Z",
      "updated_at": "2025-07-10T09:00:00.000000Z"
    }
  ],
  "error": null
}

```
### Response(fail)
```bash
{
  "status": "fail",
  "message": "Failed to fetch your leave records.",
  "data": null,
  "error": "SQLSTATE[HY000]: General error: ..."
}

```


## GET /api/leaves/status-summary

### Request
```bash
GET /api/leaves/status-summary
Authorization: Bearer {access_token}
```
### Response(Success)
```bash
{
  "status": "success",
  "message": "Leave status summary fetched successfully.",
  "data": [
    {
      "status": "APPROVED",
      "total": 3
    },
    {
      "status": "PENDING",
      "total": 5
    },
    {
      "status": "REJECTED",
      "total": 2
    }
  ],
  "error": null
}

```
### Response(fail)
```bash
{
  "status": "fail",
  "message": "Unauthorized: Only admins can access this chart.",
  "data": null,
  "error": "Access denied"
}
```
```bash
{
  "status": "fail",
  "message": "Failed to fetch summary.",
  "data": null,
  "error": "SQLSTATE[42S22]: Column not found: ..."
}

```

## GET /api/leaves/type-per-users

### Request
```bash
GET /api/leaves/type-per-usersy
Authorization: Bearer {access_token}
```
### Response(Success)
```bash
{
  "status": "success",
  "message": "Leave types by user fetched successfully.",
  "data": [
    {
      "user": "Employee One",
      "types": [
        {
          "type": "CASUAL",
          "count": 2
        },
        {
          "type": "SICK",
          "count": 1
        }
      ]
    },
    {
      "user": "Employee Two",
      "types": [
        {
          "type": "CASUAL",
          "count": 1
        },
        {
          "type": "ANNUAL",
          "count": 3
        }
      ]
    }
  ],
  "error": null
}

```
### Response(fail)
```bash
{
  "status": "fail",
  "message": "Unauthorized: Only admins can access this chart.",
  "data": null,
  "error": "Access denied"
}

```
```bash
{
  "status": "fail",
  "message": "Failed to fetch leave types.",
  "data": null,
  "error": "SQLSTATE[42S22]: Column not found: ..."
}
```

4. Default credentials:

## Admin:
Email: admin@example.com
Password: password

## Employee:
Email: employee1@example.com
Password: password

5. Database Seeding

To quickly populate the database with initial data for testing and development, this project uses Laravel seeders.

Seeders Included
UsersTableSeeder: Creates sample users, including:

An Admin User with role ADMIN

An Employee User with role USER

LeavesTableSeeder: (Assumed) Creates sample leave records associated with users.

How to Run Seeders
After setting up your database and running migrations, run 

```bash
php artisan db:seed
```

This will execute the DatabaseSeeder, which calls the individual seeders in this order:

1. UsersTableSeeder – seeds users first (important for relational integrity)
2. LeavesTableSeeder – seeds leave requests linked to the seeded users