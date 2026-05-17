# Product Inventory API: Setup & Testing Guide
## 1. Environment Setup
Create a '.env' file in the root directory and add:

PORT=8000\
MONGO_URI=your_mongodb_connection_string\
JWT_SECRET=your_jwt_secret

## 2. Install Dependencies
`npm install`

## 3. Seed the Database
This will:
- Reset existsing data
- Create an admin user and a normal user
- Populate sample products

Run:\
`npm run seed`

## 4. Start the Server
`npm start`

Server runs at:\
`http://localhost:<port>`\
or in case port wasn't specified in the `.env` file:\
`http://localhost:3000`

## 5. Default Credentials
### Admin User
username: admin\
password: admin123

### Normal User
username: user\
password: user123

## 6. API Endpoints
### Auth (User)
- POST `/auth/register`: registers a user and returns a JWT token
- POST `/auth/login`: returns JWT token

### Products
#### Public
- GET `/products`: gets all products (10 per page)
- GET `/products/:id`: gets a single product

#### Admin Protected
- POST `/products`: creates a product
- PUT `/products/:id`: updates a product
- DELETE `/products/:id`: deletes a product

## 7. Testing Protected Routes
1. Login using `/auth/login`
2. Copy token from response
3. Add the following header:\
`Authorization: Bearer <token>`