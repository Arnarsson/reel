import React from "react"
import { LessonLayout } from "@/components/lesson-layout"

// Types (can be moved to shared types file)
interface LessonData {
  id: string;
  title: string;
  type: "video" | "reading" | "quiz" | "exercise";
  content: any; // This should be typed more strictly based on lesson type
  duration: string;
  completed: boolean;
}

interface LessonContext extends LessonData {
  courseId: string;
  courseTitle: string;
  moduleTitle: string;
  lessonIndexInModule: number;
  lessonsInModuleCount: number;
  nextLessonId: string | null;
  previousLessonId: string | null;
}

// Placeholder function to fetch data for a specific lesson and its context
async function fetchLessonContext(courseId: string, lessonId: string): Promise<LessonContext | null> {
  console.log(`Fetching context for lesson: ${lessonId} in course: ${courseId}`);
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate delay

  // --- Replace with actual data fetching --- 
  // 1. Fetch course structure (e.g., from fetchCourse in the course page, or separate API)
  // 2. Find the current lesson, its module, and index
  // 3. Determine next/previous lesson IDs
  // 4. Fetch actual lesson content (video URL, reading text, quiz questions etc.)

  // Placeholder data structure mimicking finding the lesson
  const allCourses = {
    "ai-fundamentals": {
      id: "ai-fundamentals", title: "AI Fundamentals",
      modules: [
        {
          id: "m1", title: "Introduction to AI", 
          lessons: [
            { id: "l1", title: "What is AI?", type: "video" as const, duration: "10 min", completed: false, content: { videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" } },
            { id: "l2", title: "History of AI", type: "reading" as const, duration: "15 min", completed: false, content: { content: "<p>Reading content goes here...</p>" } },
            { id: "l3", title: "Types of AI", type: "video" as const, duration: "12 min", completed: false, content: { videoUrl: "https://www.youtube.com/embed/ABCDEFGHIJK" } },
          ]
        },
        {
          id: "m2", title: "Machine Learning Basics", 
          lessons: [
             { id: "l4", title: "Supervised Learning", type: "video" as const, duration: "15 min", completed: true, content: { videoUrl: "https://www.youtube.com/embed/LMNOPQRSTUVW" } },
             { id: "l5", title: "Neural Networks", type: "reading" as const, duration: "20 min", completed: true, content: { content: "<p>More reading...</p>" } },
             { id: "l6", title: "Training Models", type: "video" as const, duration: "18 min", completed: false, content: { videoUrl: "https://www.youtube.com/embed/XYZABCDEFGHI" } },
          ]
        },
      ],
    },
  };

  const course = allCourses[courseId as keyof typeof allCourses];
  if (!course) return null;

  let currentLesson: (LessonData & { courseId: string, courseTitle: string, moduleTitle: string }) | null = null;
  let lessonIndex = -1;
  let moduleIndex = -1;
  let prevLessonId: string | null = null;
  let nextLessonId: string | null = null;

  // Find lesson and its context
  for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
    const module = course.modules[mIdx];
    const lIdx = module.lessons.findIndex(l => l.id === lessonId);
    if (lIdx !== -1) {
      lessonIndex = lIdx;
      moduleIndex = mIdx;
      currentLesson = { 
        ...module.lessons[lIdx],
        courseId: course.id,
        courseTitle: course.title,
        moduleTitle: module.title,
       }; // Fetch actual content here
      
      // Find previous lesson ID
      if (lIdx > 0) {
        prevLessonId = module.lessons[lIdx - 1].id;
      } else if (mIdx > 0) {
        const prevModule = course.modules[mIdx - 1];
        prevLessonId = prevModule.lessons[prevModule.lessons.length - 1]?.id || null;
      }
      
      // Find next lesson ID
      if (lIdx < module.lessons.length - 1) {
        nextLessonId = module.lessons[lIdx + 1].id;
      } else if (mIdx < course.modules.length - 1) {
        nextLessonId = course.modules[mIdx + 1].lessons[0]?.id || null;
      }
      break; // Found the lesson
    }
  }

  if (!currentLesson) {
    console.warn(`Lesson ${lessonId} in course ${courseId} not found.`);
    return null;
  }

  return {
    ...currentLesson,
    lessonIndexInModule: lessonIndex,
    lessonsInModuleCount: course.modules[moduleIndex].lessons.length,
    previousLessonId: prevLessonId,
    nextLessonId: nextLessonId,
  };
  // --- End of placeholder fetching logic ---
}

// Page component receives params from the route
export default async function LessonPage({ params }: { params: { courseId: string; lessonId: string } }) {
  const lessonContext = await fetchLessonContext(params.courseId, params.lessonId);

  if (!lessonContext) {
    // Handle lesson not found - maybe redirect or show a specific message
    // For now, render basic message
    return <div className="container mx-auto py-8 text-center">Lesson not found.</div>;
  }

  // Render the client layout component, passing fetched data
  return (
    <LessonLayout
      lesson={lessonContext} // Contains id, title, type, content, etc.
      courseId={lessonContext.courseId}
      courseTitle={lessonContext.courseTitle}
      moduleTitle={lessonContext.moduleTitle}
      lessonIndexInModule={lessonContext.lessonIndexInModule}
      lessonsInModuleCount={lessonContext.lessonsInModuleCount}
      nextLessonId={lessonContext.nextLessonId}
      previousLessonId={lessonContext.previousLessonId}
    />
  );
} 