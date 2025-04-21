import React from "react"
import { ProfileLayout } from "@/components/profile-layout" // Import the new client layout
import { Star, CheckCircle, Clock } from "lucide-react"

// Types (can be moved to shared types file)
interface Achievement { id: string; title: string; description: string; icon: React.ReactNode; }
interface CourseProgress { id: string; title: string; progress: number; status: string; lastAccessed: string; }
interface Certificate { id: string; title: string; issueDate: string; image: string; }
interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinDate: string;
  progress: { coursesCompleted: number; coursesInProgress: number; totalHoursLearned: number; certificatesEarned: number; };
  achievements: Achievement[];
  courses: CourseProgress[];
  certificates: Certificate[];
}

// Placeholder function to fetch user profile data
async function fetchUserProfile(): Promise<UserData | null> {
  console.log("Fetching user profile data...");
  await new Promise(resolve => setTimeout(resolve, 400)); // Simulate delay

  // --- Replace with actual data fetching (e.g., based on logged-in user) ---
  const userData: UserData = {
    id: "1",
    name: "Sven Arnarsson", // Updated Name
    email: "sven.arnarsson@example.com", // Updated Email
    avatar: "/placeholder-user.jpg", // Use a different placeholder
    role: "AI Implementer", // Updated Role
    joinDate: "July 2024", // Updated Date
    progress: {
      coursesCompleted: 1,
      coursesInProgress: 2,
      totalHoursLearned: 15,
      certificatesEarned: 1,
    },
    achievements: [
      { id: "1", title: "AI Explorer", description: "Completed AI Fundamentals", icon: <Star className="h-5 w-5 text-yellow-500" /> },
      { id: "2", title: "Code Runner", description: "Completed 5 exercises", icon: <CheckCircle className="h-5 w-5 text-green-500" /> },
      { id: "3", title: "Weekend Warrior", description: "Learned for 3 hours on a weekend", icon: <Clock className="h-5 w-5 text-blue-500" /> },
    ],
    courses: [
      { id: "ai-fundamentals", title: "AI Fundamentals", progress: 100, status: "completed", lastAccessed: "3 days ago" },
      { id: "ml-basics", title: "Machine Learning Basics", progress: 65, status: "in_progress", lastAccessed: "Yesterday" },
      { id: "python-ai", title: "Python for AI", progress: 20, status: "in_progress", lastAccessed: "Today" },
      { id: "deep-learning", title: "Deep Learning", progress: 0, status: "not_started", lastAccessed: "Never" },
    ],
    certificates: [
      { id: "cert-ai-fundamentals", title: "AI Fundamentals Certificate", issueDate: "August 1, 2024", image: "/placeholder-logo.svg" }, // Updated Certificate
    ],
  };
  // --- End of placeholder fetching logic ---

  return userData;
}

// Profile Page Server Component
export default async function ProfilePage() {
  const userData = await fetchUserProfile();

  // Handle case where user data couldn't be fetched (e.g., not logged in)
  if (!userData) {
    // Redirect to login or show an error message
    // For now, showing a simple message
    return <div className="container mx-auto py-8 text-center">Please log in to view your profile.</div>;
  }

  // Render the client layout component, passing fetched data
  return <ProfileLayout initialUserData={userData} />;
} 