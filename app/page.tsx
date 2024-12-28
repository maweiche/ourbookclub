// src/app/page.tsx
'use client'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Users,
  MessageCircle,
  Star,
  Calendar,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    title: 'Book Clubs',
    description: 'Create or join reading groups with like-minded readers',
    icon: Users,
  },
  {
    title: 'Group Discussions',
    description: 'Share insights and engage in meaningful conversations',
    icon: MessageCircle,
  },
  {
    title: 'Reading Progress',
    description: 'Track your reading journey and set personal goals',
    icon: BookOpen,
  },
  {
    title: 'Book Ratings',
    description: "Rate and review books you've read with your group",
    icon: Star,
  },
  {
    title: 'Meeting Scheduler',
    description: 'Organize and manage your book club meetings',
    icon: Calendar,
  },
]

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null)

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Hero Section */}
      <div className="flex-1 px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Now in Beta
          </Badge>
          <h1 className="mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to BookClub
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">
            Join a community of readers, share your thoughts, and discover your
            next favorite book.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={scrollToFeatures}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-50 py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
              Everything you need to run your book club
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Streamline your reading group experience with our comprehensive
              platform
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title}>
                    <CardHeader>
                      <Icon className="h-10 w-10 text-primary" />
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24">
        <Card className="mx-auto max-w-3xl">
          <CardContent className="flex flex-col items-center p-12 text-center">
            <BookOpen className="h-12 w-12 text-primary" />
            <CardTitle className="mt-6 text-2xl">
              Ready to start your reading journey?
            </CardTitle>
            <CardDescription className="mb-6 mt-2">
              Create your account now and join our community of book lovers.
            </CardDescription>
            <Button size="lg">
              Join BookClub
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
