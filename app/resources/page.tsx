import { Bookmark } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto py-12 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Bookmark className="h-16 w-16 text-muted-foreground mb-4" />
      <h1 className="text-3xl font-bold mb-2">Resources</h1>
      <p className="text-muted-foreground text-center max-w-md">
        Coming soon! Access supplementary materials, downloadable content, external links, and other helpful resources related to your courses.
      </p>
    </div>
  )
} 