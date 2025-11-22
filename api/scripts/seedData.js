import mongoose from "mongoose";
import dotenv from "dotenv";
import Patient from "../models/Patient.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/healthcare-portal";

const samplePatients = [
  {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-0101",
    complianceStatus: "High",
    complianceScore: 85,
    assignedDate: new Date("2024-01-15"),
    goals: [
      {
        title: "Daily Steps Goal",
        description: "Walk 10,000 steps daily",
        targetValue: 10000,
        currentValue: 8500,
        unit: "steps",
        deadline: new Date("2024-12-31"),
        status: "active",
      },
      {
        title: "Sleep Duration",
        description: "Get 8 hours of sleep per night",
        targetValue: 8,
        currentValue: 7.5,
        unit: "hours",
        deadline: new Date("2024-12-31"),
        status: "active",
      },
    ],
    dailyLogs: [
      {
        date: new Date("2024-12-01"),
        steps: 8500,
        sleepHours: 7.5,
        notes: "Good day, walked in the park",
      },
      {
        date: new Date("2024-12-02"),
        steps: 9200,
        sleepHours: 8,
        notes: "Met step goal",
      },
      {
        date: new Date("2024-12-03"),
        steps: 7800,
        sleepHours: 6.5,
        notes: "Busy day at work",
      },
    ],
    reminders: [
      {
        title: "Annual Checkup",
        description: "Schedule annual health checkup",
        dueDate: new Date("2024-12-15"),
        completed: false,
        priority: "high",
      },
      {
        title: "Medication Refill",
        description: "Refill blood pressure medication",
        dueDate: new Date("2024-12-10"),
        completed: true,
        priority: "medium",
      },
    ],
    complianceNotes: [
      {
        note: "Patient is very compliant with daily goals",
        createdBy: "Dr. Sarah Johnson",
        createdAt: new Date("2024-11-20"),
      },
    ],
  },
  {
    name: "Emily Johnson",
    email: "emily.johnson@email.com",
    phone: "+1-555-0102",
    complianceStatus: "Medium",
    complianceScore: 65,
    assignedDate: new Date("2024-02-20"),
    goals: [
      {
        title: "Weight Loss Goal",
        description: "Lose 10 pounds in 3 months",
        targetValue: 10,
        currentValue: 6,
        unit: "pounds",
        deadline: new Date("2025-03-01"),
        status: "active",
      },
      {
        title: "Exercise Routine",
        description: "Exercise 5 times per week",
        targetValue: 5,
        currentValue: 3,
        unit: "times/week",
        deadline: new Date("2024-12-31"),
        status: "active",
      },
    ],
    dailyLogs: [
      {
        date: new Date("2024-12-01"),
        steps: 6500,
        sleepHours: 6,
        notes: "Missed morning walk",
      },
      {
        date: new Date("2024-12-02"),
        steps: 7200,
        sleepHours: 7,
        notes: "Went to gym",
      },
    ],
    reminders: [
      {
        title: "Follow-up Appointment",
        description: "Follow-up on weight loss progress",
        dueDate: new Date("2024-12-20"),
        completed: false,
        priority: "medium",
      },
    ],
    complianceNotes: [
      {
        note: "Patient missed daily goals",
        createdBy: "Dr. Michael Chen",
        createdAt: new Date("2024-11-25"),
      },
    ],
  },
  {
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1-555-0103",
    complianceStatus: "Low",
    complianceScore: 35,
    assignedDate: new Date("2024-03-10"),
    goals: [
      {
        title: "Blood Pressure Management",
        description: "Monitor and maintain blood pressure below 140/90",
        targetValue: 140,
        currentValue: 155,
        unit: "mmHg",
        deadline: new Date("2025-01-31"),
        status: "active",
      },
    ],
    dailyLogs: [
      {
        date: new Date("2024-12-01"),
        steps: 3200,
        sleepHours: 5,
        notes: "Did not exercise today",
      },
    ],
    reminders: [
      {
        title: "Medication Adherence",
        description: "Review medication compliance",
        dueDate: new Date("2024-12-05"),
        completed: false,
        priority: "high",
      },
      {
        title: "Lifestyle Counseling",
        description: "Schedule lifestyle change consultation",
        dueDate: new Date("2024-12-12"),
        completed: false,
        priority: "high",
      },
    ],
    complianceNotes: [
      {
        note: "Patient missed daily goals",
        createdBy: "Dr. Sarah Johnson",
        createdAt: new Date("2024-11-28"),
      },
      {
        note: "Lifestyle change recommended",
        createdBy: "Dr. Sarah Johnson",
        createdAt: new Date("2024-12-01"),
      },
    ],
  },
  {
    name: "Sarah Davis",
    email: "sarah.davis@email.com",
    phone: "+1-555-0104",
    complianceStatus: "High",
    complianceScore: 92,
    assignedDate: new Date("2024-01-05"),
    goals: [
      {
        title: "Cardio Fitness",
        description: "30 minutes of cardio daily",
        targetValue: 30,
        currentValue: 30,
        unit: "minutes",
        deadline: new Date("2024-12-31"),
        status: "active",
      },
      {
        title: "Water Intake",
        description: "Drink 8 glasses of water daily",
        targetValue: 8,
        currentValue: 8,
        unit: "glasses",
        deadline: new Date("2024-12-31"),
        status: "active",
      },
    ],
    dailyLogs: [
      {
        date: new Date("2024-12-01"),
        steps: 12000,
        sleepHours: 8.5,
        notes: "Excellent day!",
      },
      {
        date: new Date("2024-12-02"),
        steps: 11500,
        sleepHours: 8,
        notes: "Morning run completed",
      },
      {
        date: new Date("2024-12-03"),
        steps: 13000,
        sleepHours: 8,
        notes: "Exceeded all goals",
      },
    ],
    reminders: [
      {
        title: "Routine Lab Work",
        description: "Complete quarterly blood work",
        dueDate: new Date("2024-12-25"),
        completed: false,
        priority: "medium",
      },
    ],
    complianceNotes: [
      {
        note: "Completed appointments",
        createdBy: "Dr. Michael Chen",
        createdAt: new Date("2024-11-15"),
      },
    ],
  },
  {
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1-555-0105",
    complianceStatus: "Medium",
    complianceScore: 58,
    assignedDate: new Date("2024-04-12"),
    goals: [
      {
        title: "Diabetes Management",
        description: "Maintain blood sugar levels",
        targetValue: 120,
        currentValue: 135,
        unit: "mg/dL",
        deadline: new Date("2025-02-28"),
        status: "active",
      },
    ],
    dailyLogs: [
      {
        date: new Date("2024-12-01"),
        steps: 5500,
        sleepHours: 7,
        notes: "Moderate activity",
      },
      {
        date: new Date("2024-12-02"),
        steps: 4800,
        sleepHours: 6.5,
        notes: "Low activity day",
      },
    ],
    reminders: [
      {
        title: "Blood Sugar Monitoring",
        description: "Review blood sugar logs",
        dueDate: new Date("2024-12-08"),
        completed: false,
        priority: "high",
      },
    ],
    complianceNotes: [],
  },
  {
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1-555-0106",
    complianceStatus: "High",
    complianceScore: 88,
    assignedDate: new Date("2024-01-25"),
    goals: [
      {
        title: "Stress Management",
        description: "Practice meditation 20 minutes daily",
        targetValue: 20,
        currentValue: 20,
        unit: "minutes",
        deadline: new Date("2024-12-31"),
        status: "active",
      },
      {
        title: "Healthy Eating",
        description: "Follow meal plan 6 days per week",
        targetValue: 6,
        currentValue: 6,
        unit: "days/week",
        deadline: new Date("2024-12-31"),
        status: "active",
      },
    ],
    dailyLogs: [
      {
        date: new Date("2024-12-01"),
        steps: 9500,
        sleepHours: 8,
        notes: "Followed meal plan",
      },
      {
        date: new Date("2024-12-02"),
        steps: 10000,
        sleepHours: 7.5,
        notes: "Meditation completed",
      },
    ],
    reminders: [
      {
        title: "Nutrition Consultation",
        description: "Follow-up on meal plan",
        dueDate: new Date("2024-12-18"),
        completed: false,
        priority: "low",
      },
    ],
    complianceNotes: [
      {
        note: "Patient is very compliant with daily goals",
        createdBy: "Dr. Sarah Johnson",
        createdAt: new Date("2024-11-10"),
      },
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing patients
    await Patient.deleteMany({});
    console.log("🗑️  Cleared existing patients");

    // Insert sample patients
    const insertedPatients = await Patient.insertMany(samplePatients);
    console.log(`✅ Inserted ${insertedPatients.length} patients`);

    console.log("\n📊 Sample Patients Created:");
    insertedPatients.forEach((patient, index) => {
      console.log(`${index + 1}. ${patient.name} - ${patient.complianceStatus} compliance (${patient.complianceScore}%)`);
    });

    console.log("\n✨ Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

