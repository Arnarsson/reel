import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// Placeholder type for course data
interface Course {
  id: string;
  title: string;
  // Add other fields like description, image, etc.
}

// Placeholder function to fetch course list
async function fetchCourses(): Promise<Course[]> {
  // Replace with actual API call or database query
  console.log("Fetching course list...");
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate delay
  return [
    { id: "ai-fundamentals", title: "AI Fundamentals" },
    { id: "ml-basics", title: "Machine Learning Basics" },
    { id: "data-science", title: "Data Science Essentials" },
    { id: "python-ai", title: "Python for AI" },
    { id: "deep-learning", title: "Deep Learning" },
  ];
}

// Make component async
export default async function CoursesPage() {
  const courses = await fetchCourses();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>
      <p className="text-muted-foreground mb-8">Browse and access all your enrolled courses.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <Card className="hover-lift h-full">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground col-span-full">No courses found.</p>
        )}
      </div>
      {/* We can add filtering/sorting options here later */}
    </div>
  );
} 