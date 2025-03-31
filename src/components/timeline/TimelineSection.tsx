"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  company: string;
  description: string;
  icon: string;
  skills: string[];
}

const timelineData: TimelineItem[] = [
  {
    id: "job-1",
    year: "2022 - Present",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    description: "Leading the development of responsive web applications using React and Next.js. Implementing component design systems, optimizing performance, and mentoring junior developers.",
    icon: "🚀",
    skills: ["React", "Next.js", "TypeScript", "GraphQL", "Performance Optimization"],
  },
  {
    id: "job-2",
    year: "2020 - 2022",
    title: "React Native Developer",
    company: "Mobile Solutions Ltd.",
    description: "Developed cross-platform mobile applications with React Native. Integrated native modules, implemented state management with Redux, and ensured app performance across iOS and Android.",
    icon: "📱",
    skills: ["React Native", "Redux", "Native Modules", "iOS/Android", "API Integration"],
  },
  {
    id: "job-3",
    year: "2018 - 2020",
    title: "Frontend Developer",
    company: "Web Crafters Co.",
    description: "Built interactive web interfaces using React and modern JavaScript. Collaborated with designers to implement pixel-perfect UIs and improved website performance metrics.",
    icon: "💻",
    skills: ["React", "JavaScript (ES6+)", "SCSS", "Responsive Design", "Web Performance"],
  },
  {
    id: "job-4",
    year: "2016 - 2018",
    title: "Junior Web Developer",
    company: "Digital Agency XYZ",
    description: "Created responsive websites using HTML, CSS, and JavaScript. Worked closely with the design team to ensure consistent implementation across browsers and devices.",
    icon: "🌐",
    skills: ["HTML5", "CSS3", "JavaScript", "jQuery", "Bootstrap"],
  },
];

export default function TimelineSection() {
  // Reference for the timeline container
  const ref = useRef<HTMLDivElement>(null);

  // Parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-20 bg-slate-900 relative overflow-hidden">
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
                  clipPath: "polygon(20% 0%, 80% 0%, 100% 40%, 100% 100%, 0% 100%, 0% 40%)"
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
            The path of my professional growth and experience in frontend development, including key roles and technologies I've mastered along the way.
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
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                <div className="pixel-border bg-slate-800/90 backdrop-blur-sm p-6 pixel-corners">
                  <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-200 rounded-md text-sm mb-3 pixel-corners">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-white pixel-text">{item.title}</h3>
                  <h4 className="text-lg text-blue-400 mb-4">{item.company}</h4>
                  <p className="text-slate-300 text-sm mb-4">{item.description}</p>

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
  );
}
