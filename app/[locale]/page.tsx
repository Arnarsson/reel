"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
// We might not need Header here if it's always in layout
// import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { HeroLines } from "@/components/hero-lines"
// Use standard next/link for now
import Link from 'next/link'; 
import Image from "next/image"
import { useTranslations } from 'next-intl';

// Import extracted components
import { AnimatedBrain } from "@/components/animated-brain"
import { AnimatedCounter } from "@/components/animated-counter"
import { TestimonialCard } from "@/components/testimonial-card"

// Main Page Component
export default function HomePage() {
  const t = useTranslations('LandingPage');

  // isLoading state might not be needed anymore depending on final design
  // const [isLoading, setIsLoading] = useState(true)
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000)
  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <>
      {/* Header is now likely rendered in app/[locale]/layout.tsx */}
      {/* <Header /> */}
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
              {t.rich('heroTitle', {
                advantage: (chunks) => <span className="text-gradient">{chunks}</span>
              })}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('heroSubtitle')}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center sm:flex-row sm:justify-center gap-4"
            >
              <Button size="lg" className="relative z-20">
                {t('ctaBookMeeting')} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                {/* Ensure /dashboard is configured in navigation.ts if it needs localization */}
                <Link href="/dashboard"> 
                  {t('ctaSeeHowItWorks')}
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
                { value: 2, labelKey: "statsImplementationDays" },
                { value: 90, labelKey: "statsCustomersContinue" },
                { value: 6, labelKey: "statsTimeToValue" },
                { value: 4, labelKey: "statsROI" }
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
                    {t(stat.labelKey).includes("x") ? "" : t(stat.labelKey).includes("Måneder") ? "" : "%"} 
                  </div>
                  <div className="text-gray-400">{t(stat.labelKey)}</div>
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
              {t('whyHardTitle')}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { titleKey: "whyHardItem1Title", descKey: "whyHardItem1Desc" },
                { titleKey: "whyHardItem2Title", descKey: "whyHardItem2Desc" },
                { titleKey: "whyHardItem3Title", descKey: "whyHardItem3Desc" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-border hover:border-muted transition-colors bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground">{t(item.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(item.descKey)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* New Section: Is This For You? */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
             {t('isThisForYouTitle')}
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              {t('isThisForYouSubtitle')}
            </motion.p>
            
            <motion.ul 
              className="space-y-4 text-left inline-block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {[
                t('isThisForYouItem1'),
                t('isThisForYouItem2'),
                t('isThisForYouItem3'),
                t('isThisForYouItem4')
              ].map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3 text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <ArrowRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
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
              {t('ourMethodTitle')}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  titleKey: "ourMethodDay1Title",
                  itemKeys: [
                    "ourMethodDay1Item1",
                    "ourMethodDay1Item2",
                    "ourMethodDay1Item3",
                    "ourMethodDay1Item4"
                  ]
                },
                {
                  titleKey: "ourMethodDay2Title",
                  itemKeys: [
                    "ourMethodDay2Item1",
                    "ourMethodDay2Item2",
                    "ourMethodDay2Item3",
                    "ourMethodDay2Item4"
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
                  <h3 className="text-2xl font-bold mb-6 text-foreground">{t(day.titleKey)}</h3>
                  <ul className="space-y-4">
                    {day.itemKeys.map((itemKey, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary mt-1" />
                        <span className="text-muted-foreground">{t(itemKey)}</span>
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
              {t('resultsTitle')}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { titleKey: "resultsItem1Title", descKey: "resultsItem1Desc" },
                { titleKey: "resultsItem2Title", descKey: "resultsItem2Desc" },
                { titleKey: "resultsItem3Title", descKey: "resultsItem3Desc" },
                { titleKey: "resultsItem4Title", descKey: "resultsItem4Desc" },
                { titleKey: "resultsItem5Title", descKey: "resultsItem5Desc" }
              ].map((result, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-lg border border-border hover:border-muted transition-colors bg-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-4 text-foreground">{t(result.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(result.descKey)}</p>
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
              {t('teamTitle')}
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  nameKey: "teamMember1Name",
                  roleKey: "teamMember1Role",
                  achievementKeys: [
                    "teamMember1Ach1",
                    "teamMember1Ach2",
                    "teamMember1Ach3"
                  ]
                },
                {
                  nameKey: "teamMember2Name",
                  roleKey: "teamMember2Role",
                  achievementKeys: [
                    "teamMember2Ach1",
                    "teamMember2Ach2",
                    "teamMember2Ach3"
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
                  <h3 className="text-2xl font-bold mb-2 text-foreground">{t(member.nameKey)}</h3>
                  <p className="text-primary mb-4">{t(member.roleKey)}</p>
                  <ul className="space-y-2">
                    {member.achievementKeys.map((achievementKey, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <ArrowRight className="h-5 w-5 text-primary mt-1" />
                        <span className="text-muted-foreground">{t(achievementKey)}</span>
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
              {t('ctaFinalTitle')}
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('ctaFinalSubtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {/* TODO: Link this button correctly */}
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                {t('ctaFinalButton')} <ArrowRight className="ml-2 h-4 w-4" />
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
              {t('contactTitle')}
            </motion.h2>
            <motion.div 
              className="space-y-4 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p>{t('contactCompany')}</p>
              <p>{t('contactDescription')}</p>
              <div className="flex flex-col items-center gap-2">
                {/* TODO: Make email/phone proper links */} 
                <p>📧 {t('contactEmail')}</p>
                <p>📞 {t('contactPhone')}</p>
                <p>📍 {t('contactAddress')}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  )
} 