"use client"

import { cn } from "@/utils/tailwind"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import { HeroParallax } from "./milestone-background"
import Link from "next/link"
import milestones from '../../data/milestones.json'


export const Card = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        "p-2 sm:p-6 rounded-lg  transition-colors duration-300 overflow-hidden border border-transparent  relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}

export const CardTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <h4 className={cn("text-4xl font-bold mb-4", className)}>
      {children}
    </h4>
  )
}

export const CardDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => {
  return (
    <p
      className={cn(
        "text-gray-300 leading-relaxed",
        className
      )}
    >
      {children}
    </p>
  )
}

export const HackofestaMilestones = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="sm:bg-transparent bg-indigo-900 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] overflow-hidden relative text-white p-4 sm:p-8 my-12 flex items-center justify-center">
      <HeroParallax  />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center">
          STATE360 MILSTONES
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-8">
          {milestones.map((milestone, idx) => (
            <div
              key={idx}
              className="relative group block p-2 h-full w-full"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <AnimatePresence>
                {hoveredIndex === idx && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-white/20 block rounded-3xl"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { duration: 0.15 },
                    }}
                    exit={{
                      opacity: 0,
                      transition: { duration: 0.15, delay: 0.2 },
                    }}
                  />
                )}
              </AnimatePresence>
              <Card>
                <CardTitle>{milestone.number}</CardTitle>
                <CardDescription>{milestone.description}</CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

