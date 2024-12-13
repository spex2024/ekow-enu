'use client'

import { useState, useEffect, useRef } from 'react'
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll,  useSpring, AnimatePresence } from 'framer-motion'
import { Briefcase, Mail, MapPin, Phone, ExternalLink, Download, Github, Linkedin,  ChevronDown, Code, Globe,  ArrowRight,  Folder,  Moon, Sun, GraduationCap, Calendar, Clock, ChevronUp } from 'lucide-react'
import { TypeAnimation } from 'react-type-animation';

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExperienceItem } from "@/components/ExperienceItem"
import { FloatingNav } from '@/components/FloatingNav'

const skills = {
  languages: ["JavaScript", "HTML", "CSS", "SQL", "TypeScript"],
  frameworks: ["React", "Next.js", "Express", "Node.js", "Tailwind CSS"],
  tools: ["Git", "GitHub", "AWS", "Vercel"],
  databases: ["MongoDB", "MySQL", "PostgreSQL"],
  sdlc: [
    "Agile Methodologies",
    "Scrum",
    "Kanban",
    "TDD",
    "CI/CD",
    "DevOps"
  ],
  softSkills: [
    "Problem Solving",
    "Team Leadership",
    "Communication",
    "Adaptability",
    "Critical Thinking"
  ],
  other: ["RESTful APIs", "Microservices", "Serverless Architecture", "Data Structures & Algorithms"]
};

const projects = [
  {
    title: "Spex Africa",
    description: "A meal marketplace that connects food vendors with enterprises and users seeking sustainable food packaging. Features include integrated payment processing, email notifications, and cloud-based file management. Currently at MVP stage.",
    tags: ["Next.js", "MERN Stack", "Tailwind CSS", "shadcn/ui", "Resend", "Paystack", "Vercel", "Cloudinary", "Framer Motion"],
    link: "https://www.spexafrica.app",
    github: "#",
    status: "In Progress (MVP)"
  },
  {
    title: "Alsum Farms Ghana",
    description: "An agricultural innovation platform fostering sustainable growth for Ghanaian communities. Features modern design and responsive layouts with smooth animations.",
    tags: ["React", "Tailwind CSS", "Cloudinary", "AOS", "Hostinger"],
    link: "https://alsumfarmsghana.com",
    github: "#",
    status: "Complete"
  },
  {
    title: "Hopeline Institute",
    description: "Institutional website showcasing programs, resources, and initiatives. Built with modern web technologies focusing on performance and user experience.",
    tags: ["React", "Tailwind CSS", "Cloudinary", "AOS", "Hostinger"],
    link: "https://www.hopelineinstitute.org",
    github: "#",
    status: "Complete"
  },
  {
    title: "DJ Batino",
    description: "A dynamic portfolio website showcasing DJ services, music collections, and booking capabilities.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
    github: "#",
    status: "In Progress"
  },
  {
    title: "The Jess Daniel",
    description: "Personal portfolio website for Jessica Daniels, featuring her professional work and services in an elegant, interactive presentation.",
    tags: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#",
    github: "#",
    status: "In Progress"
  },
  {
    title: "Scented by Dil",
    description: "An upcoming e-commerce platform for fragrances and custom packaging solutions. Offering a unique shopping experience for perfume enthusiasts.",
    tags: ["coming soon"],
    link: "#",
    github: "#",
    status: "Upcoming"
  },
  {
    title: "Akolabone",
    description: "An upcoming e-commerce platform specializing in branded souvenirs and promotional items. Tailored for businesses looking to enhance their brand presence.",
    tags: ["coming soon"],
    link: "#",
    github: "#",
    status: "Upcoming"
  },
];

const education = [
  {
    degree: "BSc Computer Science",
    institution: "Accra Institute of Technology",
    period: "Jan 2023 - Present",
    description: "Currently pursuing a Bachelor's degree in Computer Science.",
    icon: Code,
    degreeType: "Bachelor's",
    duration: "2 years"
  },
  {
    degree: "Certificate in Software Development",
    institution: "Codetrain Africa",
    period: "Feb 2022 - Oct 2023",
    description: "Intensive software development program.",
    icon: Briefcase,
    degreeType: "Certificate",
    duration: "1 year 8 months"
  },
  {
    degree: "Computer Networking Certificate",
    institution: "Ghana Communication Technology University College",
    period: "May 2018 - Sep 2018",
    description: "Specialized training in computer networking.",
    icon: Globe,
    degreeType: "Certificate",
    duration: "4 months"
  }
];

const experience = [
  {
    title: "Product Developer and Manager",
    company: "Dercolbags (Spex Africa product)",
    period: "May 2024 - Present",
    description: [
      "In charge of the Spex Africa product development and management."
    ]
  },
  {
    title: "Software Developer Intern",
    company: "Genesys Technologies",
    period: "January 2023 – December 2023",
    description: [
      "Contributed to the development of a medical records software as a service app.",
      "Enhanced the Moja app using Delphi, Interbase, and Ext JS.",
      "Focused on fine-tuning and optimizing functionality."
    ]
  },
  {
    title: "IT Support / Website Developer",
    company: "Hopeline Institute / Moja",
    period: "February 2020 – January 2024",
    description: [
      "Offered technical support and education to new employees and potential customers of the Moja ecommerce application.",
      "Resolved technical issues and maintained the application.",
      "Developed and maintained a user-friendly website for the institute."
    ]
  },
  {
    title: "IT Support / Website Developer",
    company: "Hopeline Microfinance",
    period: "May 2018 – February 2020",
    description: [
      "Collaborated with the IT manager for IT infrastructure maintenance and security.",
      "Provided technical support and training to staff.",
      "Utilized WordPress for user-friendly website development."
    ]
  }
];

const getStatusColor = (status: string, darkMode: boolean): string => {
  const baseClasses = `px-2 py-1 text-xs font-semibold rounded-full`;
  switch (status) {
    case 'Complete':
      return `${baseClasses} ${darkMode ? 'bg-green-700 text-green-100' : 'bg-green-100 text-green-800'}`;
    case 'In Progress':
    case 'In Progress (MVP)':
      return `${baseClasses} ${darkMode ? 'bg-blue-700 text-blue-100' : 'bg-blue-100 text-blue-800'}`;
    case 'Upcoming':
      return `${baseClasses} ${darkMode ? 'bg-yellow-700 text-yellow-100' : 'bg-yellow-100 text-yellow-800'}`;
    default:
      return `${baseClasses} ${darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-100 text-gray-800'}`;
  }
};

type SectionsRefType = {
  [key: string]: HTMLElement | null;
};

const PortfolioPage = () => {
  const [activeSection, setActiveSection] = useState('hero')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [darkMode, setDarkMode] = useState(false)
  const sectionsRef =useRef<SectionsRefType>({});
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [expandedProjects, setExpandedProjects] = useState<{ [key: string]: boolean }>({})



  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      Object.entries(sectionsRef.current).forEach(([key, ref]) => {
        if (ref && ref.offsetTop <= scrollPosition && ref.offsetTop + ref.offsetHeight > scrollPosition) {
          setActiveSection(key)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const loadMoreProjects = () => {
    setVisibleProjects(prevVisible => Math.min(prevVisible + 3, projects.length))
  }

  const toggleProjectDescription = (projectTitle: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectTitle]: !prev[projectTitle]
    }))
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#002538] text-[#F2EDE4]' : 'bg-[#F2EDE4] text-[#002538]'} transition-colors duration-300`}>
      <div className="relative z-0">
        <motion.div className={`fixed top-0 left-0 right-0 h-1 ${darkMode ? 'bg-[#F2EDE4]' : 'bg-[#002538]'} origin-left z-50`} style={{ scaleX }} />
        
        <main className="relative pb-24">
          {/* Hero Section */}
          <section
            id="hero"
            ref={(el) => {
              if (el) sectionsRef.current["hero"] = el;
            }}
            className="min-h-screen relative overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0">
              <div className={`absolute inset-0 ${
    darkMode 
      ? 'bg-gradient-to-br from-[#002538]/20 to-[#001F3F]/20' 
      : 'bg-gradient-to-br from-white/60 via-yellow-100/40 to-yellow-200/20'
  }`} />
              <motion.div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `radial-gradient(circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(0, 31, 63, 0.3) 0%, transparent 25%)`
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
              <motion.div 
                className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div
                    className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4
                      ${darkMode ? 'bg-[#F2EDE4]/10 text-[#F2EDE4]' : 'bg-[#002538]/10 text-[#002538]'}`}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    👋 Hello, I&apos;m Enoch Ekow Enu
                  </motion.div>
                  <motion.h1
                    className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-[#F2EDE4] via-[#F2EDE4] to-[#F2EDE4]/80' : 'from-[#002538] via-[#002538] to-[#002538]/80'}`}>
                      Crafting Digital
                    </span>
                    <br />
                    <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-[#F2EDE4] via-[#F2EDE4] to-[#F2EDE4]/80' : 'from-[#002538] via-[#002538] to-[#002538]/80'}`}>
                      Experiences
                    </span>
                  </motion.h1>
                </motion.div>

                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <TypeAnimation
                    sequence={[
                      'Full-Stack Developer',
                      2000,
                      'Tech Innovator',
                      2000,
                    ]}
                    wrapper="h2"
                    speed={50}
                    className={`text-2xl lg:text-3xl font-semibold ${darkMode ? 'text-[#F2EDE4]/90' : 'text-[#002538]/90'}`}
                    repeat={Infinity}
                  />
                  <p className={`text-xl max-w-2xl mx-auto lg:mx-0 ${darkMode ? 'text-[#F2EDE4]/70' : 'text-[#002538]/70'} leading-relaxed`}>
                    Transforming complex challenges into elegant, user-centric solutions. Specializing in cutting-edge web technologies and cloud architecture.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-wrap justify-center lg:justify-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <Link href={`#projects`}>
                  <Button 
                    className={`
                      ${darkMode 
                        ? 'bg-[#F2EDE4] text-[#002538] hover:bg-[#D3CFC7] hover:text-[#001F3F]' 
                        : 'bg-[#002538] text-[#F2EDE4] hover:bg-[#001F3F] hover:text-[#F2EDE4]'
                      }
                      px-8 py-4 rounded-full text-lg font-semibold
                      transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                      flex items-center gap-2 relative overflow-hidden
                      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full
                      before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent
                      before:opacity-20 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700
                    `}
                  >
                    <Folder className="w-5 h-5" />
                    Explore Projects
                  </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className={`
                      ${darkMode 
                        ? 'border-[#F2EDE4] text-[#F2EDE4] hover:bg-[#F2EDE4] hover:text-[#002538]' 
                        : 'border-[#002538] text-[#002538] hover:bg-[#002538] hover:text-[#F2EDE4]'
                      }
                      px-8 py-4 rounded-full text-lg font-semibold
                      transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                      flex items-center gap-2 relative overflow-hidden
                      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full
                      before:bg-gradient-to-r before:from-transparent before:via-current before:to-transparent
                      before:opacity-20 before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-700
                    `}
                  >
                    <Download className="w-5 h-5" />
                    Download My CV
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div 
                className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Image
                  src="https://res.cloudinary.com/ddwet1dzj/image/upload/v1733449580/enoch-h_h15oqv.jpg"
                  alt="Enoch Ekow Enu"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                />
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 via-[#001F3F]/60 to-[#001F3F]/40`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
                <motion.div
                  className="absolute bottom-8 left-8 right-8 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  <h3 className="text-2xl font-bold mb-2">Innovating the Digital Landscape</h3>
                  <p className="text-sm">Transforming ideas into impactful, scalable solutions</p>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className={`w-8 h-8 ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`} />
            </motion.div>
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            ref={(el) => {
              if (el) sectionsRef.current["skills"] = el;
            }}
            className="py-20"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-12 text-center ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Skills & Expertise
              </motion.h2>
              <Tabs defaultValue="languages" className="w-full">
                <TabsList className={`grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8 ${darkMode ? 'bg-[#F2EDE4] text-[#002538]' : 'bg-[#002538] text-[#F2EDE4]'} rounded-lg`}>
                  {Object.keys(skills).map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category === 'sdlc' ? 'SDLC' : category === 'softSkills' ? 'Soft Skills' : category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(skills).map(([category, skillList]) => (
                  <TabsContent key={category} value={category}>
                    <Card className={`${darkMode ? 'bg-[#002538] border-[#F2EDE4]' : 'bg-[#F2EDE4] border-[#002538]'} border-opacity-20`}>
                      <CardContent className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {skillList.map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                            >
                              <Badge variant="secondary" className={`w-full justify-center py-2 ${darkMode ? 'bg-[#F2EDE4] text-[#002538]' : 'bg-[#002538] text-[#F2EDE4]'} hover:bg-opacity-90 transition-all duration-300`}>
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            ref={(el) => {
              if (el) sectionsRef.current["experience"] = el;
            }}
            className="py-20"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-12 text-center ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Professional Experience
              </motion.h2>
              <div className="space-y-8">
                {experience.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ExperienceItem
                      title={item.title}
                      company={item.company}
                      period={item.period}
                      description={item.description}
                      darkMode={darkMode}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Education Section */}
          <section
            id="education"
            ref={(el) => {
              if (el) sectionsRef.current["education"] = el;
            }}
            className="py-20"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-12 text-center ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Educational Journey
              </motion.h2>
              <div className="relative">
                {/* Vertical line */}
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full ${darkMode ? 'bg-[#F2EDE4]/30' : 'bg-[#002538]/30'} hidden md:block`} />

                {education.map((item, index) => (
                  <motion.div
                    key={item.degree}
                    className={`flex flex-col md:flex-row items-center mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'} mb-8 md:mb-0`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      >
                        <Card className={`overflow-hidden ${darkMode ? 'bg-[#002538] border-[#F2EDE4]' : 'bg-[#F2EDE4] border-[#002538]'} border-opacity-20 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg ${darkMode ? 'hover:bg-[#003a5a]' : 'hover:bg-[#e0d8c8]'}`}>
                          <CardHeader className={`${darkMode ? 'bg-gradient-to-br from-[#002538] to-[#003a5a]' : 'bg-gradient-to-br from-[#F2EDE4] to-[#e0d8c8]'} text-${darkMode ? '[#F2EDE4]' : '[#002538]'}`}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <CardTitle className="text-2xl font-bold mb-2 sm:mb-0">
                                {item.degree}
                              </CardTitle>
                              <Badge 
                                variant="secondary" 
                                className={`
                                  ${darkMode ? 'bg-[#F2EDE4] text-[#002538]' : 'bg-[#002538] text-[#F2EDE4]'}
                                  px-2 py-0.5 text-[10px] font-medium rounded-full
                                  border ${darkMode ? 'border-[#002538]' : 'border-[#F2EDE4]'}
                                  shadow-sm
                                  transition-all duration-300
                                  hover:scale-105 hover:shadow-md
                                  flex items-center gap-0.5
                                  self-start sm:self-auto
                                `}
                              >
                                <Calendar className="w-3 h-3" />
                                {item.period}
                              </Badge>
                            </div>
                            <CardDescription className={`text-lg ${darkMode ? 'text-[#F2EDE4]/90' : 'text-[#002538]/90'}`}>
                              {item.institution}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                              <div className="flex items-center mb-2 sm:mb-0">
                                <GraduationCap className={`w-5 h-5 mr-2 ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`} />
                                <span className={`font-medium ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}>{item.degreeType}</span>
                              </div>
                              <div className={`px-3 py-1 rounded-full ${darkMode ? 'bg-[#F2EDE4]/10 text-[#F2EDE4]' : 'bg-[#002538]/10 text-[#002538]'}`}>
                                <Clock className="w-4 h-4 inline-block mr-1" />
                                <span className="text-sm">{item.duration}</span>
                              </div>
                            </div>
                            <p className={`${darkMode ? 'text-[#F2EDE4]/80' :'text-[#002538]/80'}`}>
                              {item.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center">
                      <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-[#F2EDE4]' : 'bg-[#002538]'} flex items-center justify-center z-10`}>
                        <item.icon className={`w-8 h-8 ${darkMode ? 'text-[#002538]' : 'text-[#F2EDE4]'}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            ref={(el) => {
              if (el) sectionsRef.current["projects"] = el;
            }}
            className="py-20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-12 text-center ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Featured Projects
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {projects.slice(0, visibleProjects).map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className={`overflow-hidden group cursor-pointer h-full flex flex-col ${
                      darkMode 
                        ? 'bg-[#002538] border-[#F2EDE4] hover:bg-[#003A5A]' 
                        : 'bg-[#F2EDE4] border-[#002538] hover:bg-[#D3CFC7]'
                    } border-opacity-20 hover:border-opacity-100 transition-all duration-300 hover:shadow-lg`}>
                      <CardHeader className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <CardTitle className={`text-2xl font-bold ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'} group-hover:opacity-80 transition-colors`}>{project.title}</CardTitle>
                          <Badge variant="secondary" className={`${getStatusColor(project.status, darkMode)}`}>
                            {project.status}
                          </Badge>
                        </div>
                        <CardDescription className={`${darkMode ? 'text-[#F2EDE4]/70' :'text[#002538]/70'} mb-4`}>
                          <AnimatePresence initial={false}>
                            {expandedProjects[project.title] ? (
                              <motion.p
                                key="expanded"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm"
                              >
                                {project.description}
                              </motion.p>
                            ) : (
                              <motion.p
                                key="collapsed"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-sm"
                              >
                                {project.description.slice(0, 100)}...
                              </motion.p>
                            )}
                          </AnimatePresence>
                          <button
                            onClick={() => toggleProjectDescription(project.title)}
                            className={`mt-2 text-sm font-medium ${darkMode ? 'text-[#F2EDE4]/80 hover:text-[#F2EDE4]' : 'text-[#002538]/80 hover:text-[#002538]'} transition-colors`}
                          >
                            {expandedProjects[project.title] ? (
                              <>View Less <ChevronUp className="inline-block w-4 h-4 ml-1" /></>
                            ) : (
                              <>View More <ChevronDown className="inline-block w-4 h-4 ml-1" /></>
                            )}
                          </button>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-6 pt-0">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag) => (
                            <span key={tag} className={`text-sm ${darkMode ? 'text-[#F2EDE4]/70' : 'text-[#002538]/70'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className={`${darkMode ? 'bg-[#002538]' : 'bg-[#F2EDE4]'} p-4 flex justify-between items-center border-t ${darkMode ? 'border-[#F2EDE4]/20' : 'border-[#002538]/20'}`}>
                        <Link href={project.link} className={`${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'} hover:opacity-80 transition-colors flex items-center`}>
                          View Project <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link href={project.github} className={`${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'} hover:opacity-80 transition-colors`}>
                          <Github className="h-6 w-6" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
              {visibleProjects < projects.length && (
                <div className="mt-12 text-center relative">
                  <div 
                    className={`absolute inset-x-0 bottom-0 h-40 ${
                      darkMode ? 'bg-gradient-to-t from-[#002538] via-[#002538]/80 to-transparent' : 'bg-gradient-to-t from-[#F2EDE4] via-[#F2EDE4]/80 to-transparent'
                    } pointer-events-none`}
                  ></div>
                  <Button
                    onClick={loadMoreProjects}
                    className={`
                      ${darkMode 
                        ? 'bg-[#F2EDE4] text-[#002538] hover:bg-[#D3CFC7] hover:text-[#001F3F]' 
                        : 'bg-[#002538] text-[#F2EDE4] hover:bg-[#001F3F] hover:text-[#F2EDE4]'
                      }
                      px-8 py-3 rounded-full text-lg font-semibold
                      transition-all duration-300 transform hover:scale-105
                      relative z-10
                      shadow-lg hover:shadow-xl
                      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
                      before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                      overflow-hidden
                    `}
                  >
                    <span className="relative z-10">Load More</span>
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            ref={(el) => {
              if (el) sectionsRef.current["contact"] = el;
            }}
            className="py-20"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-12 text-center ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Let&apos;s Connect
              </motion.h2>
              <motion.div
                className={`${darkMode ? 'bg-[#002538] border-[#F2EDE4]' : 'bg-[#F2EDE4] border-[#002538]'} border border-opacity-20 rounded-lg p-8 backdrop-blur-sm`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}>Contact Information</h3>
                    <ul className="space-y-4">
                      {[
                        { icon: MapPin, text: "Oyarifa, Accra Ghana", href: "https://goo.gl/maps/Oyarifa" },
                        { icon: Mail, text: "enoch@ekowenu.site", href: "mailto:enoch@ekowenu.site" },
                        { icon: Phone, text: "+233 552977393 / 593344313", href: "tel:+233552977393" },
                        { icon: ExternalLink, text: "ekowenu.site", href: "https://www.ekowenu.site" },
                      ].map((item, index) => (
                        <motion.li
                          key={item.text}
                          className="flex items-center space-x-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <item.icon className={`w-6 h-6 ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`} />
                          <a 
                            href={item.href}
                            className={`${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'} hover:opacity-80 transition-colors`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.text}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}>Connect with Me</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { icon: Github, href: "https://github.com/ekow1", label: "GitHub" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/enoch-enu-459929184", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:enoch@ekowenu.site", label: "Email" },
                      ].map((item, index) => (
                        <motion.a
                          key={item.label}
                          href={item.href}
                          className={`flex items-center space-x-2 ${
                            darkMode 
                              ? 'text-[#F2EDE4] hover:bg-[#F2EDE4]/20' 
                              : 'text-[#002538] hover:bg-[#002538]/20'
                          } transition-colors p-3 rounded-lg group`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <item.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{item.label}</span>
                        </motion.a>
                      ))}
                    </div>
                    <motion.div
                      className={`mt-8 p-4 ${darkMode ? 'bg-[#F2EDE4]/10' : 'bg-[#002538]/10'} rounded-lg`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <h4 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-[#F2EDE4]' : 'text-[#002538]'}`}>Available for Opportunities</h4>
                      <p className={`${darkMode ? 'text-[#F2EDE4]/70' : 'text-[#002538]/70'}`}>
                        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <FloatingNav darkMode={darkMode} activeSection={activeSection} />
        <motion.div
          className="fixed bottom-20 right-4 sm:bottom-4 sm:right-4 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Button
              variant="outline"
              onClick={() => setDarkMode(!darkMode)}
              className={`
                ${darkMode
                  ? 'bg-[#F2EDE4] text-[#002538] hover:bg-[#D3CFC7]'
                  : 'bg-[#002538] text-[#F2EDE4] hover:bg-[#001F3F]'
                }
                rounded-full w-12 h-12 flex items-center justify-center
                transition-all duration-300 transform hover:scale-110 hover:shadow-lg
              `}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default PortfolioPage

