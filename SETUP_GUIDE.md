# Setup Guide - MongoDB Backend API

This guide will help you set up the MongoDB backend API for the Health Care Preventive Care Portal.

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Install MongoDB Community Edition or use MongoDB Compass
   - Windows: [Download MongoDB](https://www.mongodb.com/try/download/community)
   - Mac: `brew install mongodb-community`
   - Or use [MongoDB Compass](https://www.mongodb.com/products/compass) (GUI tool)

## Step-by-Step Setup

### 1. Install Backend Dependencies

Open a terminal in the project root and navigate to the `api` folder:

```bash
cd api
npm install
```

This will install:
- Express.js (web server)
- Mongoose (MongoDB ODM)
- CORS (cross-origin resource sharing)
- dotenv (environment variables)

### 2. Configure MongoDB Connection

Create a `.env` file in the `api` directory:

**Windows/Mac/Linux:**
```bash
cd api
copy .env.example .env
```

Or manually create `api/.env` with:
```env
MONGODB_URI=mongodb://localhost:27017/healthcare-portal
PORT=3000
```

### 3. Start MongoDB

**Option A: Using MongoDB Service (Recommended)**
- **Windows:** MongoDB should start automatically as a Windows service
- **Mac/Linux:** Run `mongod` in a terminal or start the service:
  ```bash
  brew services start mongodb-community  # Mac
  sudo systemctl start mongod            # Linux
  ```

**Option B: Using MongoDB Compass**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. If connection is successful, MongoDB is running

**Verify MongoDB is running:**
- Try connecting with MongoDB Compass to `mongodb://localhost:27017`
- Or check if port 27017 is listening

### 4. Seed the Database

Run the seed script to populate MongoDB with sample patient data:

```bash
cd api
npm run seed
```

You should see output like:
```
✅ Connected to MongoDB
🗑️  Cleared existing patients
✅ Inserted 6 patients

📊 Sample Patients Created:
1. John Smith - High compliance (85%)
2. Emily Johnson - Medium compliance (65%)
...
```

### 5. Start the API Server

```bash
# Development mode (auto-reload on changes)
npm run dev

# Or production mode
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
📊 Database: healthcare-portal
🚀 Server running on http://localhost:3000
📡 API endpoints available at http://localhost:3000/api
```

### 6. Verify the Setup

**Test the API:**
1. Open browser: `http://localhost:3000/api/health`
   - Should return: `{"status":"OK","message":"Health Care API is running"}`

2. Test patients endpoint: `http://localhost:3000/api/patients`
   - Should return JSON array of patients

**Check MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `healthcare-portal` database
4. Click on `patients` collection
5. You should see 6 patient documents

### 7. Start the Frontend

In a new terminal (keep the API server running):

```bash
# From project root
npm run dev
```

The frontend will connect to the API at `http://localhost:3000/api`

## Database Structure

The `patients` collection contains documents with this structure:

```javascript
{
  _id: ObjectId,
  name: "John Smith",
  email: "john.smith@email.com",
  phone: "+1-555-0101",
  complianceStatus: "High" | "Medium" | "Low",
  complianceScore: 85,
  assignedDate: ISODate,
  goals: [
    {
      title: "Daily Steps Goal",
      description: "Walk 10,000 steps daily",
      targetValue: 10000,
      currentValue: 8500,
      unit: "steps",
      deadline: ISODate,
      status: "active"
    }
  ],
  dailyLogs: [
    {
      date: ISODate,
      steps: 8500,
      sleepHours: 7.5,
      notes: "Good day"
    }
  ],
  reminders: [...],
  complianceNotes: [...]
}
```

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solutions:**
1. Make sure MongoDB is running:
   ```bash
   # Check if MongoDB is running
   # Windows: Check Services
   # Mac: brew services list
   # Linux: sudo systemctl status mongod
   ```

2. Start MongoDB:
   ```bash
   # Mac
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Or run directly
   mongod
   ```

3. Verify connection string in `api/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/healthcare-portal
   ```

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solutions:**
1. Change port in `api/.env`:
   ```
   PORT=3001
   ```

2. Update frontend API URL in `src/utils/api.ts` or create `.env` in root:
   ```
   VITE_API_BASE_URL=http://localhost:3001/api
   ```

### No Data Showing

1. Run seed script again:
   ```bash
   cd api
   npm run seed
   ```

2. Check MongoDB Compass to verify data exists

3. Check server logs for errors

4. Verify API is running: `http://localhost:3000/api/health`

### CORS Errors

If you see CORS errors in the browser console, make sure:
1. API server is running on port 3000
2. CORS is enabled in `api/server.js` (already configured)
3. Frontend is making requests to the correct API URL

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient detail
- `POST /api/compliance-notes` - Add compliance note

## Next Steps

1. ✅ Backend API is running
2. ✅ Database is seeded with sample data
3. ✅ Frontend can connect to API
4. 🎉 Start using the Provider portal at `http://localhost:5173/provider`

## Useful Commands

```bash
# Start API server
cd api && npm run dev

# Seed database
cd api && npm run seed

# Check MongoDB connection (in MongoDB Compass)
mongodb://localhost:27017
```

