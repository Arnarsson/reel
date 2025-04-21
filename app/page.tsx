"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { HeroLines } from "@/components/hero-lines"
import Link from "next/link"
import Image from "next/image"

// Import extracted components
import { AnimatedBrain } from "@/components/animated-brain"
import { AnimatedCounter } from "@/components/animated-counter"
import { TestimonialCard } from "@/components/testimonial-card"

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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <HeroLines />
          
          <div className="absolute inset-0">
            <div className="floating-orb absolute top-1/4 left-1/4 w-96 h-96"></div>
            <div className="floating-orb absolute bottom-1/4 right-1/4 w-96 h-96" style={{ animationDelay: "-10s" }}></div>
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI der leverer <span className="text-gradient">reel forretningsværdi</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8"
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
              className="flex flex-col items-center sm:flex-row sm:justify-center gap-4"
            >
              <Button size="lg" className="relative z-20">
                Book en 30-minutters afklaringssamtale <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/dashboard">
                  Se hvordan det virker
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 border-t border-border">
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
                  className="p-6 rounded-lg border border-border hover:border-muted transition-colors"
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
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground"
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
                  className="p-6 rounded-lg border border-border hover:border-muted transition-colors bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Method Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground"
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
                  className="p-6 rounded-lg border border-border hover:border-muted transition-colors bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-6 text-foreground">{day.title}</h3>
                  <ul className="space-y-4">
                    {day.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary mt-1" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground"
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
                  className="p-6 rounded-lg border border-border hover:border-muted transition-colors bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground">{result.title}</h3>
                  <p className="text-muted-foreground">{result.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Hvem står bag HARKA?
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
                  className="p-6 rounded-lg border border-border hover:border-muted transition-colors bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{member.name}</h3>
                  <p className="text-primary mb-4">{member.role}</p>
                  <ul className="space-y-2">
                    {member.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary mt-1" />
                        <span className="text-muted-foreground">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Klar til at komme i gang?
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
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
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Book en 30-minutters afklaringssamtale <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Kontakt
            </motion.h2>
            <motion.div 
              className="space-y-4 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>HARKA</p>
              <p>Vi hjælper virksomheder med at effektivisere arbejdsgange, reducere spildtid og styrke beslutningskraften – på bare 2 dage.</p>
              <div className="flex flex-col items-center gap-2">
                <p>📧 info@harka.ai</p>
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
