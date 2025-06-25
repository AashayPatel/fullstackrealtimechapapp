import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
  {
    email: "rahul.sharma@example.com",
    fullName: "Rahul Sharma",
    userName: "rahulsharma1",
    password: "123456",
    bio: "Tech enthusiast and coffee lover ☕",
    staatus: "online",
    profilePic: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    email: "priya.patel@example.com",
    fullName: "Priya Patel",
    userName: "priyapatel2",
    password: "123456",
    bio: "Exploring design and life 🌸",
    staatus: "away",
    profilePic: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "arjun.verma@example.com",
    fullName: "Arjun Verma",
    userName: "arjunverma3",
    password: "123456",
    bio: "Code. Sleep. Repeat.",
    staatus: "busy",
    profilePic: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "ananya.singh@example.com",
    fullName: "Ananya Singh",
    userName: "ananyasingh4",
    password: "123456",
    bio: "Loves books and rain 🌧️",
    staatus: "offline",
    profilePic: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    email: "vikram.das@example.com",
    fullName: "Vikram Das",
    userName: "vikramdas5",
    password: "123456",
    bio: "Backend wizard 🧙‍♂️",
    staatus: "online",
    profilePic: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    email: "isha.jain@example.com",
    fullName: "Isha Jain",
    userName: "ishajain6",
    password: "123456",
    bio: "UI/UX designer ✨",
    staatus: "busy",
    profilePic: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    email: "rohit.kumar@example.com",
    fullName: "Rohit Kumar",
    userName: "rohitkumar7",
    password: "123456",
    bio: "Building cool stuff 🚀",
    staatus: "online",
    profilePic: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    email: "shruti.iyer@example.com",
    fullName: "Shruti Iyer",
    userName: "shrutiiyer8",
    password: "123456",
    bio: "Art & tech ❤️",
    staatus: "away",
    profilePic: "https://randomuser.me/api/portraits/women/25.jpg",
  },
  {
    email: "karthik.nair@example.com",
    fullName: "Karthik Nair",
    userName: "karthiknair9",
    password: "123456",
    bio: "Full-stack dev 🍕",
    staatus: "offline",
    profilePic: "https://randomuser.me/api/portraits/men/26.jpg",
  },
  {
    email: "meera.raj@example.com",
    fullName: "Meera Raj",
    userName: "meeraraj10",
    password: "123456",
    bio: "Music, coffee, code 🎶",
    staatus: "online",
    profilePic: "https://randomuser.me/api/portraits/women/26.jpg",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    await User.insertMany(seedUsers);
    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

seedDatabase();
