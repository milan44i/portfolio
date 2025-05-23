"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

interface TimelineItem {
  id: string
  year: string
  title: string
  company: string
  description: string
  icon: string
  skills: string[]
}

const timelineData: TimelineItem[] = [
  {
    id: "job-1",
    year: "April 2024 - Present",
    title: "Software Engineer (Mid-level)",
    company: "PointOne (Data Analysis Platform)",
    description:
      "Building dynamic report dashboards with interactive charts and data picker. Migrated from Redux Toolkit to TanStack Query, optimizing performance and maintainability. Reduced bundle size by 53% through dynamic code-splitting.",
    icon: "📊",
    skills: [
      "React",
      "Redux Toolkit",
      "TanStack Query",
      "Recharts",
      "TypeScript",
    ],
  },
  {
    id: "job-2",
    year: "April 2023 - March 2024",
    title: "Software Engineer (Mid-level)",
    company: "Aktivizm (Social Platform)",
    description:
      "Developed core features including Layout, Feed, Filters, Forms, Tags, and Event Calendar. Built and maintained critical admin interfaces and platform settings pages. Led internationalization efforts to expand platform reach.",
    icon: "🌐",
    skills: ["React", "Next.js", "TypeScript", "React Hook Form", "Tailwind"],
  },
  {
    id: "job-3",
    year: "April 2023 - March 2024",
    title: "Frontend Engineer (Junior)",
    company: "Romoticam (Windmill Damage Inspection)",
    description:
      "Built Blade Picker UI and inspection workflows. Developed features with React, TypeScript, RTK Query, and MUI. Contributed to planning, architecture, and documentation efforts.",
    icon: "🔍",
    skills: ["React", "TypeScript", "RTK Query", "MUI", "Git"],
  },
  {
    id: "job-4",
    year: "April 2023 - March 2024",
    title: "Frontend Engineer (Junior)",
    company: "Connect The Dots",
    description:
      "Refactored legacy code and contributed to modernizing the frontend architecture. Made custom components like Table, Input, Accordion, and Checkbox. Practiced test-driven development with Vitest and Testing Library.",
    icon: "🧩",
    skills: ["Vue", "TypeScript", "Tailwind CSS", "Storybook", "Vitest"],
  },
]

export default function TimelineSection() {
  // Reference for the timeline container
  const ref = useRef<HTMLDivElement>(null)

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section
      id="timeline"
      className="py-20 bg-slate-900 relative overflow-hidden"
    >
      {/* Pixel art background decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <div className="absolute bottom-0 left-0 w-full h-12 bg-green-700" />
        <div className="absolute bottom-12 left-0 w-full">
          <div className="flex justify-between">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={`tree-${i}`}
                className="w-16 h-24 bg-green-600"
                style={{
                  clipPath:
                    "polygon(20% 0%, 80% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block pixel-border bg-slate-800/60 backdrop-blur-sm px-6 py-2 mb-6"
          >
            <h2 className="text-xl text-yellow-400 pixel-text">Timeline</h2>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-white mb-6"
          >
            My Career Journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-slate-300"
          >
            My professional journey as a Frontend Engineer, showcasing my
            experience with React, Vue, TypeScript, and modern frontend
            frameworks and tools.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto" ref={ref}>
          {/* Timeline line with grow effect */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-700 h-full">
            <motion.div
              className="w-full bg-blue-500"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-16 flex ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-slate-900 z-10 flex items-center justify-center">
                <span className="text-xl">{item.icon}</span>
              </div>

              {/* Content */}
              <div
                className={`w-5/12 ${
                  index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                }`}
              >
                <div className="pixel-border bg-slate-800/90 backdrop-blur-sm p-6 pixel-corners">
                  <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-200 rounded-md text-sm mb-3 pixel-corners">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white pixel-text">
                    {item.title}
                  </h3>
                  <h4 className="text-lg text-blue-400 mb-4">{item.company}</h4>
                  <p className="text-slate-300 text-sm mb-4">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-end">
                    {item.skills.map((skill) => (
                      <span
                        key={`${item.id}-${skill}`}
                        className="inline-block bg-slate-700 px-2 py-1 text-xs rounded-md text-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Final point */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-4 w-6 h-6 bg-yellow-400 rounded-full border-4 border-slate-900" />
        </div>
      </div>
    </section>
  )
}
