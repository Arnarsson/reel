// Keep essential imports for data fetching and passing props
import React from "react"
import { ModuleProps } from "@/components/module-item" // Keep type import
import { DashboardClientLayout } from "@/components/dashboard-client-layout" // Import the new client layout
import { currentUser } from "@clerk/nextjs/server"; // Import Clerk helper

// Define a type for the fetched dashboard data
interface DashboardData {
  userName: string;
  modules: ModuleProps[];
  activeCourses: number;
  hoursSpent: number;
  achievements: number;
}

// Placeholder function to simulate fetching dashboard data
// Replace this with your actual data fetching logic (e.g., API call)
// We can remove this function now or fetch other data here
async function fetchDashboardData(): Promise<Omit<DashboardData, 'userName'>> { // Remove userName from return type
  console.log("Fetching non-user dashboard data...");
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Fetch Modules (keep this part or replace with real data source)
  const modules: ModuleProps[] = [
    {
      title: "Module 1: Introduction to AI",
      description: "Core concepts and terminology",
      duration: "45 min",
      status: "completed",
      expanded: true,
      lessons: [
        { title: "What is Artificial Intelligence?", type: "video", duration: "10 min", completed: true },
        { title: "History of AI Development", type: "reading", duration: "15 min", completed: true },
        { title: "Types of AI Systems", type: "video", duration: "12 min", completed: true },
        { title: "Knowledge Check: AI Fundamentals", type: "quiz", duration: "8 min", completed: true },
      ],
    },
    {
      title: "Module 2: Machine Learning Basics",
      description: "Understanding how machines learn",
      duration: "1h 15min",
      status: "in_progress",
      expanded: false,
      lessons: [
        { title: "Supervised vs. Unsupervised Learning", type: "video", duration: "15 min", completed: true },
        { title: "Neural Networks Explained", type: "reading", duration: "20 min", completed: true },
        { title: "Training Models: Best Practices", type: "video", duration: "18 min", completed: false },
        { title: "Your First Machine Learning Model", type: "exercise", duration: "22 min", completed: false },
      ],
    },
    {
      title: "Module 3: Language Models",
      description: "Deep dive into NLP and language models",
      duration: "1h 30min",
      status: "locked",
      expanded: false,
      lessons: [
        { title: "Introduction to NLP", type: "video", duration: "12 min", completed: false },
        { title: "How Language Models Work", type: "reading", duration: "15 min", completed: false },
        { title: "Prompt Engineering Fundamentals", type: "video", duration: "20 min", completed: false },
        { title: "Crafting Effective Prompts", type: "exercise", duration: "25 min", completed: false },
        { title: "Module Assessment", type: "quiz", duration: "18 min", completed: false },
      ],
    },
     {
      title: "Module 4: Advanced Topics",
      description: "Exploring further AI concepts",
      duration: "2h",
      status: "locked",
      expanded: false,
      lessons: [
        { title: "AI Ethics and Responsibility", type: "reading", duration: "30 min", completed: false },
        { title: "Reinforcement Learning Intro", type: "video", duration: "25 min", completed: false },
        { title: "Building an AI Project", type: "exercise", duration: "65 min", completed: false },
      ],
    },
  ];

  // Placeholder stats (keep this part or replace with real data source)
  const activeCourses = 5;  // Example value
  const hoursSpent = 25.5;  // Example value
  const achievements = 12;  // Example value

  return { modules, activeCourses, hoursSpent, achievements };
}

// Make the Page component async
export default async function DashboardPage() {
  // Fetch user data using Clerk
  const user = await currentUser();
  const userName = user?.firstName || user?.username || "User"; // Get first name, fallback to username, then generic

  // Fetch other dashboard data
  const otherData = await fetchDashboardData();

  // Calculate progress based on fetched data
  const totalLessons = otherData.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = otherData.modules.reduce(
    (acc, m) => acc + m.lessons.filter((l) => l.completed).length,
    0,
  );
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Render the Client Component wrapper, passing fetched data as props
  return (
    <DashboardClientLayout
      userName={userName} // Use the fetched user name
      modules={otherData.modules}
      overallProgress={overallProgress}
      activeCourses={otherData.activeCourses}
      hoursSpent={otherData.hoursSpent}
      achievements={otherData.achievements}
    />
  );
}
