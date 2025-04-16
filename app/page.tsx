"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Brain, ArrowRight, Shield, Zap, BarChart, MessageSquare, Users } from "lucide-react"
import { Header } from "@/components/header"
import { FeatureCard } from "@/components/feature-card"
import { FloatingOrbs } from "@/components/floating-orbs"
import { LoadingScreen } from "@/components/loading-screen"
import { Button } from "@/components/ui/button"
import { HeroLines } from "@/components/hero-lines"
import Link from "next/link"

// Animated Brain Component
function AnimatedBrain() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-64 h-64 rounded-full bg-primary/10 animate-pulse"></div>
      <div
        className="absolute w-48 h-48 rounded-full bg-purple/20 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div
        className="absolute w-32 h-32 rounded-full bg-primary/30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <motion.div
        className="relative z-10"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        <Brain className="h-32 w-32 text-blue-light" strokeWidth={1} />
      </motion.div>
    </div>
  )
}

// Animated Counter Component
function AnimatedCounter({ value, duration = 2000 }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const inView = useInView(countRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (inView) {
      const startTime = Date.now()
      const updateCount = () => {
        const now = Date.now()
        const progress = Math.min((now - startTime) / duration, 1)
        const currentCount = Math.floor(progress * value)
        if (currentCount !== count) {
          setCount(currentCount)
        }
        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          setCount(value)
        }
      }
      requestAnimationFrame(updateCount)
    }
  }, [inView, value, duration, count])

  return <span ref={countRef}>{count}</span>
}

// Testimonial Card Component
function TestimonialCard({ author, role, company, content, rating, image, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="micro-card p-8 relative overflow-hidden group"
    >
      <div className="relative z-10">
        <div className="flex items-center gap-1 mb-6">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${i < rating ? "text-primary" : "text-muted"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
        </div>
        <p className="text-gray-300 mb-6 italic">{content}</p>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full overflow-hidden bg-black-lighter">
            {image ? (
              <img src={image || "/placeholder.svg"} alt={author} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                {author.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{author}</div>
            <div className="text-sm text-muted-foreground">
              {role}, {company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Main Page Component
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <HeroLines />
          
          <div className="absolute inset-0">
            <div className="floating-orb absolute top-1/4 left-1/4 w-96 h-96"></div>
            <div className="floating-orb absolute bottom-1/4 right-1/4 w-96 h-96" style={{ animationDelay: "-10s" }}></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI der leverer <span className="text-gradient">reel forretningsværdi</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transformer jeres virksomhed på 2 dage – fra abstrakt potentiale til konkrete resultater.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 relative z-20">
                Book en 30-minutters afklaringssamtale <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-700 hover:bg-gray-900" asChild>
                <Link href="/dashboard">
                  Se hvordan det virker
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 border-t border-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: 2, label: "Dage til implementering" },
                { value: 90, label: "Kunder fortsætter selv" },
                { value: 6, label: "Måneder kortere time-to-value" },
                { value: 4, label: "x ROI i første år" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold mb-2 text-gradient">
                    <AnimatedCounter value={stat.value} />
                    {stat.label.includes("x") ? "" : stat.label.includes("Måneder") ? "" : "%"}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why AI is Hard Section */}
        <section className="py-20 px-4 bg-black-lighter">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Hvorfor er AI så svært at implementere?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Fra præsentation til praktisk værdi",
                  description: "AI-demoer er imponerende, men få bliver til brugbare løsninger i jeres kontekst."
                },
                {
                  title: "For meget teori, for lidt handling",
                  description: "\"AI-strategi\" og \"digital transformation\" lyder godt – men skaber sjældent konkrete resultater."
                },
                {
                  title: "Afhængighed af eksterne eksperter",
                  description: "Traditionelle AI-projekter kræver konstant bistand – og efterlader jer uden intern styrke."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Method Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Vores metode: Praktisk AI på 48 timer
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Dag 1: Muligheder & Prototyper",
                  items: [
                    "Identificering af processer med AI-potentiale",
                    "Hands-on træning i relevante værktøjer",
                    "Udvikling af prototype-løsninger",
                    "Opbygning af AI-kompetencer i jeres team"
                  ]
                },
                {
                  title: "Dag 2: Implementering & Overdragelse",
                  items: [
                    "Færdigudvikling og integration af løsninger",
                    "Tilpasning til jeres arbejdsgange",
                    "Kompetenceoverdragelse og dokumentation",
                    "Handlingsplan for de næste 90 dage"
                  ]
                }
              ].map((day, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-6">{day.title}</h3>
                  <ul className="space-y-4">
                    {day.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 px-4 bg-black-lighter">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Dokumenterede resultater
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Risikoanalyse – 85 % effektivitet",
                  description: "Fra manuelle analyser til automatiserede risikovurderinger med billeder, video og manualer."
                },
                {
                  title: "Serviceautomatisering – 75 % mindre admin-tid",
                  description: "AI genererer servicerapporter, reducerer manuelle opgaver og frigør teknikere."
                },
                {
                  title: "Lagerstyring – 32 % lavere lagerværdi",
                  description: "AI analyserer liggetid, identificerer sjældent brugte dele og forbedrer forecast."
                },
                {
                  title: "Dataanalyse – 60x hurtigere",
                  description: "Automatiseret sammenligning af tekniske data fra PDF'er – fra timer til minutter."
                },
                {
                  title: "Garanti-sager – 45 % færre langvarige sager",
                  description: "AI sammenligner rapporter/billeder og bygger database for smartere sagsbehandling."
                }
              ].map((result, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4">{result.title}</h3>
                  <p className="text-gray-400">{result.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Hvem står bag Ethos.ai?
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Sven Arnarsson",
                  role: "Iværksætter & AI-specialist",
                  achievements: [
                    "+20 virksomheder hjulpet",
                    "Baggrund i softwareudvikling og datastruktur",
                    "Underviser og teknologiformidler"
                  ]
                },
                {
                  name: "Carsten Timm",
                  role: "Undervisningsspecialist",
                  achievements: [
                    "+5000 kursister undervist",
                    "Ekspert i pædagogisk formidling af teknologi",
                    "Fokus på praksisnær læring og kompetenceopbygning"
                  ]
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary mt-1" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-black-lighter">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Klar til at komme i gang?
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Lad os finde ud af, om vi er det rette match. Vi hjælper med at identificere jeres potentiale og næste skridt.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                Book en 30-minutters afklaringssamtale <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Kontakt
            </motion.h2>
            <motion.div 
              className="space-y-4 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>Ethos.ai</p>
              <p>Vi hjælper virksomheder med at effektivisere arbejdsgange, reducere spildtid og styrke beslutningskraften – på bare 2 dage.</p>
              <div className="flex flex-col items-center gap-2">
                <p>📧 info@ethos.ai</p>
                <p>📞 +45 29 12 83 81</p>
                <p>📍 Danneskiold-Samsøes Allé 41, 1434 København</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
}
