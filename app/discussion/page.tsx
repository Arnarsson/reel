import { MessageSquare } from "lucide-react"

export default function DiscussionPage() {
  return (
    <div className="container mx-auto py-12 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold mb-2">Discussion Forum</h1>
      <p className="text-muted-foreground text-center max-w-md">
        This feature is coming soon! Connect with instructors and fellow learners to discuss course content, ask questions, and share insights.
      </p>
    </div>
  )
} 