# Health Care API Server

Backend API server for the Health Care Preventive Care Portal using Express.js and MongoDB.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB installed and running locally (or MongoDB Compass)
- MongoDB connection string: `mongodb://localhost:27017`

## Setup Instructions

### 1. Install Dependencies

```bash
cd api
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `api` directory:

```env
MONGODB_URI=mongodb://localhost:27017/healthcare-portal
PORT=3000
```

**Note:** If you're using MongoDB Compass, make sure MongoDB is running on `localhost:27017`. The default connection string should work.

### 3. Start MongoDB

Make sure MongoDB is running on your local machine:

- **Windows:** MongoDB should be running as a service
- **Mac/Linux:** Run `mongod` or start MongoDB service
- **MongoDB Compass:** Make sure you can connect to `mongodb://localhost:27017`

### 4. Seed the Database

Run the seed script to populate the database with sample patient data:

```bash
npm run seed
```

This will create 6 sample patients with:
- Patient information
- Goals
- Daily logs
- Reminders
- Compliance notes

### 5. Start the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient detail with goals, logs, reminders, and notes

### Compliance Notes

- `POST /api/compliance-notes` - Add a compliance note to a patient
  - Body: `{ patientId: string, note: string, createdBy: string }`

### Health Check

- `GET /api/health` - Check if API is running

## Database Structure

### Patient Collection

Each patient document contains:

- **Basic Info:** name, email, phone, complianceStatus, complianceScore, assignedDate
- **Goals:** Array of goal objects (title, description, targetValue, currentValue, unit, deadline, status)
- **Daily Logs:** Array of daily log objects (date, steps, sleepHours, notes)
- **Reminders:** Array of reminder objects (title, description, dueDate, completed, priority)
- **Compliance Notes:** Array of note objects (note, createdAt, createdBy)

## MongoDB Compass Connection

1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. You should see the `healthcare-portal` database
4. Navigate to the `patients` collection to view the data

## Troubleshooting

### MongoDB Connection Error

- Make sure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `.env` file
- Check if port 27017 is not blocked by firewall

### Port Already in Use

- Change `PORT` in `.env` file to a different port (e.g., 3001)
- Update frontend API_BASE_URL accordingly

### Data Not Showing

- Run the seed script: `npm run seed`
- Check MongoDB Compass to verify data exists
- Check server logs for errors

