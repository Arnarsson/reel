import React from "react"
import { CourseLayout } from "@/components/course-layout"

// Type definitions (can also be moved to a shared types file)
interface LessonData {
  id: string;
  title: string;
  type: string;
  duration: string;
  completed: boolean;
}
interface ModuleData {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: string;
  lessons: LessonData[];
}
interface CourseData {
  id: string;
  title: string;
  description: string;
  progress: number;
  instructor: string;
  duration: string;
  level: string;
  modules: ModuleData[];
}

// Placeholder function to fetch data for a specific course ID
// Replace with actual data fetching logic
async function fetchCourse(courseId: string): Promise<CourseData | null> {
  console.log(`Fetching data for course: ${courseId}`);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay

  // Define the type for the placeholder data structure explicitly
  const allCourses: Record<string, CourseData | undefined> = {
    "ai-fundamentals": {
      id: "ai-fundamentals",
      title: "AI Fundamentals",
      description: "Learn the core concepts of artificial intelligence and machine learning",
      progress: 45,
      instructor: "Dr. Sarah Chen",
      duration: "8 weeks",
      level: "Beginner",
      modules: [
        {
          id: "m1", title: "Introduction to AI", description: "Core concepts...", duration: "45 min", status: "completed",
          lessons: [
            { id: "l1", title: "What is AI?", type: "video", duration: "10 min", completed: true },
            { id: "l2", title: "History of AI", type: "reading", duration: "15 min", completed: true },
            { id: "l3", title: "Types of AI", type: "video", duration: "12 min", completed: true },
          ]
        },
        {
          id: "m2", title: "Machine Learning Basics", description: "How machines learn...", duration: "1h 15min", status: "in_progress",
          lessons: [
             { id: "l4", title: "Supervised Learning", type: "video", duration: "15 min", completed: true },
             { id: "l5", title: "Neural Networks", type: "reading", duration: "20 min", completed: true },
             { id: "l6", title: "Training Models", type: "video", duration: "18 min", completed: false },
          ]
        },
        // Add other modules...
      ],
    },
    "ml-basics": { /* ... data for ml-basics ... */ id: "ml-basics", title: "ML Basics", description: "...", progress: 10, instructor: "Prof. B", duration: "6 weeks", level: "Intermediate", modules: [] },
    // Add other courses...
  };

  // Now TypeScript understands indexing with a string is possible
  const course = allCourses[courseId];
  if (!course) {
     console.warn(`Course with ID ${courseId} not found.`);
  }
  return course || null;
  // --- End of placeholder fetching logic ---
}

// Page component is now async and receives params
export default async function CoursePage({ params }: { params: { courseId: string } }) {
  const courseData = await fetchCourse(params.courseId);
  
  // Render the client layout component, passing fetched data
  return <CourseLayout courseData={courseData} />;
} 