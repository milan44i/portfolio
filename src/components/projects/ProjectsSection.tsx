"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  demoUrl: string;
  codeUrl: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce App',
    description: 'A full-featured e-commerce platform built with React, Redux, and Firebase. Features include user authentication, product filtering, cart management, and payment processing.',
    tags: ['React', 'Firebase', 'Redux', 'Stripe'],
    image: 'https://via.placeholder.com/600x400/0A2463/FFFFFF?text=E-commerce+App',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Weather Dashboard',
    description: 'Real-time weather application with location detection, 5-day forecast, and weather alerts. Built with React and OpenWeather API.',
    tags: ['React', 'API Integration', 'Geolocation'],
    image: 'https://via.placeholder.com/600x400/247BA0/FFFFFF?text=Weather+App',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'project-3',
    title: 'Task Manager',
    description: 'Productivity application with task management, categories, and reminders. Features drag-and-drop interface and data persistence.',
    tags: ['React', 'TypeScript', 'Drag & Drop API'],
    image: 'https://via.placeholder.com/600x400/83253F/FFFFFF?text=Task+Manager',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    featured: true,
  },
  {
    id: 'project-4',
    title: 'Fitness Tracker',
    description: 'Mobile app for tracking workouts, nutrition, and fitness goals. Built with React Native and integrates with health APIs.',
    tags: ['React Native', 'HealthKit', 'Google Fit'],
    image: 'https://via.placeholder.com/600x400/1F6521/FFFFFF?text=Fitness+Tracker',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 'project-5',
    title: 'Chat Application',
    description: 'Real-time messaging app with user profiles, group chats, and media sharing capabilities. Uses WebSockets for instant messaging.',
    tags: ['React', 'WebSockets', 'Firebase'],
    image: 'https://via.placeholder.com/600x400/4C4C9D/FFFFFF?text=Chat+App',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    featured: false,
  },
  {
    id: 'project-6',
    title: 'Recipe Finder',
    description: 'App for discovering recipes based on available ingredients, dietary restrictions, and meal preferences. Includes favorite recipes and meal planning.',
    tags: ['React', 'API Integration', 'LocalStorage'],
    image: 'https://via.placeholder.com/600x400/73628A/FFFFFF?text=Recipe+Finder',
    demoUrl: 'https://example.com',
    codeUrl: 'https://github.com',
    featured: false,
  },
];

export default function ProjectsSection() {
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block pixel-border bg-slate-800/60 backdrop-blur-sm px-6 py-2 mb-6"
          >
            <h2 className="text-xl text-yellow-400 pixel-text">Projects</h2>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-white mb-6"
          >
            My Game Levels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-slate-300"
          >
            Explore my projects and applications built with React and React Native, showcasing responsive design, engaging user experiences, and solid code architecture.
          </motion.p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="bg-slate-800 rounded-full p-1 pixel-border inline-flex">
            <Button
              variant={filter === 'all' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('all')}
              className={`pixel-text rounded-full mr-1 ${
                filter === 'all' ? 'bg-blue-600 hover:bg-blue-700' : 'text-slate-300'
              }`}
            >
              All Projects
            </Button>
            <Button
              variant={filter === 'featured' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setFilter('featured')}
              className={`pixel-text rounded-full ${
                filter === 'featured' ? 'bg-blue-600 hover:bg-blue-700' : 'text-slate-300'
              }`}
            >
              Featured
            </Button>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map(project => (
            <motion.div key={project.id} variants={itemVariants}>
              <Card className="relative bg-slate-800/70 border-slate-700 overflow-hidden h-full flex flex-col pixel-corners">
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center pixelated-bg"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-blue-900/30 backdrop-blur-sm" />

                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-500 px-2 py-1 text-xs font-bold text-black pixel-corners">
                      FEATURED
                    </div>
                  )}
                </div>

                <CardContent className="flex-grow p-6">
                  <h3 className="text-xl font-bold text-white mb-2 pixel-text">{project.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map(tag => (
                      <span
                        key={`${project.id}-${tag}`}
                        className="inline-block bg-slate-700 px-2 py-1 text-xs rounded-md text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 border-t border-slate-700 flex justify-between gap-4">
                  <Button asChild className="w-1/2 bg-blue-600 hover:bg-blue-700 pixel-text">
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      Demo
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-1/2 border-blue-600 text-blue-400 pixel-text">
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      Code
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
