# Women's Beauty Parlour - MERN Stack Project

A complete full-stack web application for managing a women's beauty parlour with user authentication, coupon management, and admin dashboard.

## 🚀 Features

### User Side
- Simple login/registration system
- View beauty parlour advertisements
- Special coupon offer (₹2000 for 3 facials)
- Purchase and track coupon usage
- Beautiful, intuitive UI

### Manager Side
- Separate admin login
- Manage advertisements (Add/Edit/Delete)
- Monitor customer coupons
- Update facial usage for customers
- View customer coupon statistics

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn

## 🛠️ Installation Steps

### 1. Clone or Create Project Structure

```bash
mkdir beauty-parlour
cd beauty-parlour
mkdir backend frontend
```

### 2. Backend Setup

```bash
cd backend
npm init -y
npm install express mongoose cors dotenv
npm install -D nodemon
```

Create `.env` file in backend folder:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/beauty-parlour
```

### 3. Frontend Setup

```bash
cd ../frontend
npx create-react-app .
npm install axios
```

### 4. Database Setup

Start MongoDB:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Compass / Atlas
```

### 5. Insert Sample Data

Open MongoDB Compass or Mongo Shell and insert:

**Admin User:**
```javascript
use beauty-parlour

db.admins.insertOne({
  username: "admin",
  password: "admin123",
  role: "admin"
})
```

**Sample User:**
```javascript
db.users.insertOne({
  name: "Priya Sharma",
  password: "priya123",
  role: "user",
  createdAt: new Date()
})
```

**Sample Advertisements:**
```javascript
db.advertisements.insertMany([
  {
    title: "Summer Glow Special",
    description: "Get glowing skin this summer with our exclusive facial treatments! Special discount for new customers.",
    imageUrl: "",
    isActive: true,
    createdAt: new Date()
  },
  {
    title: "Bridal Makeup Package",
    description: "Complete bridal makeup package with trial session. Book now for your special day!",
    imageUrl: "",
    isActive: true,
    createdAt: new Date()
  },
  {
    title: "Hair Spa Treatment",
    description: "Revitalize your hair with our premium spa treatment. Limited slots available!",
    imageUrl: "",
    isActive: true,
    createdAt: new Date()
  }
])
```

## 🏃‍♀️ Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm start
# Server will run on http://localhost:5000
```

### Terminal 2 - Frontend
```bash
cd frontend
npm start
# App will open on http://localhost:3000
```

##  Login Credentials

### Manager Login
- **Username:** admin
- **Password:** admin123

### Sample User Login
- **Name:** Priya Sharma
- **Password:** priya123

Or register a new user through the registration form.

##  Project Structure

```
beauty-parlour/
├── backend/
│   ├── models/
│   │   ├── User.js           # Customer schema
│   │   ├── Admin.js          # Manager schema
│   │   ├── Coupon.js         # Coupon tracking schema
│   │   └── Advertisement.js  # Advertisement schema
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   ├── user.js           # User-side routes
│   │   └── admin.js          # Admin-side routes
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js            # Login/Register component
│   │   │   ├── UserDashboard.js    # Customer dashboard
│   │   │   ├── ManagerDashboard.js # Manager dashboard
│   │   │   └── CouponCard.js       # Coupon display component
│   │   ├── App.js            # Main app component
│   │   ├── App.css           # Styling
│   │   └── index.js
│   └── package.json
└── README.md
```


## Probelm faced
- Change in the database name in .env file, therefore it created another database named by it and store null values, ~> so check the database name once before using in the .env file.
- Keep an Eye on keywords, and update in all files with the same keywords. 

## API Endpoints

### Authentication
- `POST /api/auth/user/login` - User login
- `POST /api/auth/user/register` - User registration
- `POST /api/auth/admin/login` - Admin login

### User Routes
- `GET /api/user/advertisements` - Get active ads
- `GET /api/user/coupon-offer` - Get coupon details
- `POST /api/user/purchase-coupon` - Purchase coupon
- `GET /api/user/my-coupon/:userId` - Get user's coupon

### Admin Routes
- `GET /api/admin/advertisements` - Get all ads
- `POST /api/admin/advertisements` - Add new ad
- `PUT /api/admin/advertisements/:id` - Update ad
- `DELETE /api/admin/advertisements/:id` - Delete ad
- `GET /api/admin/coupons` - Get all coupons
- `PUT /api/admin/coupons/:id/update-facial` - Update facial usage

## 🎯 Features Implemented

✅ Simple authentication (no JWT/OTP)  
✅ User dashboard with advertisements  
✅ Eye-catching coupon offer display  
✅ Coupon purchase functionality  
✅ Coupon usage tracking  
✅ Manager dashboard  
✅ Advertisement management (CRUD)  
✅ Coupon monitoring table  
✅ Facial usage updates  
✅ Clean, beginner-friendly code  
✅ Responsive design  

## 🎨 Design Highlights

- **Gradient Backgrounds:** Beautiful color schemes
- **Smooth Animations:** Hover effects and transitions
- **Clean Layout:** Easy navigation
- **Responsive:** Works on mobile and desktop
- **Intuitive UX:** Clear call-to-actions

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Try using 127.0.0.1 instead of localhost

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### CORS Error
- Ensure backend is running before frontend
- Check proxy setting in frontend/package.json

## 📝 Notes

- This is a beginner-friendly project
- No external UI libraries used
- Simple authentication without JWT
- All features work as specified
- Code is well-commented for learning

## 🔮 Future Enhancements (Not Required)

- JWT authentication
- Email notifications
- Image upload for advertisements
- Payment gateway integration
- Appointment booking system

## 👨‍💻 Development

Built with:
- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Styling:** Pure CSS

---

**Happy Coding! 💖**


***LandingPage.jsx is the maon page***
# and there are Login.jsx, AppointmentModal.jsx, Navbarjsx, PaymentModel.jsx ~> working

# to do
# make the navbar glass effect slightly
# make the user login extra features, like record of coupon used and active coupons.
# make the admin page workable to manage and update the advertisements and coupons.
