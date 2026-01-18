'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Footer,
  Particles,
} from '@/components/ui';
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Calendar,
  MapPin,
  User,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Data objects
const biography = {
  title: 'About Me',
  content: [
    `I am a passionate computer science enthusiast with a strong commitment to continuous academic growth and research. With a keen interest in machine learning, deep learning and software engineering, I actively seek opportunities to expand my skills while strengthening my existing knowledge. I bring strong problem solving abilities and a logical, systematic approach to complex challenges. My main goal is to contribute meaningfully to academic and research initiatives, support effective student learning, and help deliver high quality results that align with the advancement of knowledge in modern technologies.`,
    'I am a passionate researcher and educator in the field of Computer Science, currently serving as a Demonstrator at SLTC Research University. My journey in academia has been driven by a deep fascination with how artificial intelligence can be leveraged to solve complex real-world problems while maintaining ethical standards and human-centered design principles.',
    'Beyond research, I am deeply committed to mentoring students and fostering the next generation of computer scientists. I strive to create an inclusive learning environment where diverse perspectives are valued and every student can reach their full potential.',
  ],
};

const researchInterests = [
  {
    title: 'Machine Learning',
    description:
      'Developing algorithms and models for pattern recognition, predictive analytics, and data-driven decision making.',
  },
  {
    title: 'Deep Learning',
    description:
      'Exploring neural network architectures and optimization techniques for complex data representations and tasks.',
  },
  {
    title: 'Software Engineering',
    description:
      'Designing, developing, testing, and maintaining software systems with a focus on quality, scalability, and maintainability.',
  },
];

const education = [
  {
    title: 'B.Sc. (Hons) in Computer Science and Technology',
    institution: 'Uva Wellassa University of Sri Lanka',
    location: 'Badulla, Sri Lanka',
    period: '2021 - 2025',
    achievements: [
      'First Class',
      "Selected for the Dean's List for all semesters",
      'CGPA: 3.93',
    ],
  },
  {
    title: 'G.C.E. Advanced Level',
    institution: 'H/Weeraketiya Rajapaksha Central College',
    location: 'Weeraketiya, Sri Lanka',
    period: '2017 - 2019',
    achievements: ['1B & 2Cs (Biological Sciences Stream)'],
  },
  {
    title: 'G.C.E. Ordinary Level',
    institution: 'H/Weeraketiya Rajapaksha Central College',
    location: 'Weeraketiya, Sri Lanka',
    period: '2011 - 2016',
    achievements: ['8As & 1B'],
  },
];

const experience = [
  {
    title: 'Demonstrator',
    organization: 'SLTC Research University',
    location: 'Padukka, Sri Lanka',
    period: '2025 - Present',
    responsibilities: [
      'Conduct laboratory practicals and tutorial sessions.',
      'Guide students in applying theoretical knowledge to practical exercises.',
    ],
  },
  {
    title: 'Software Engineer Intern',
    organization: 'WIDYA Lanka Pvt Ltd.',
    location: 'Sydney, Australia',
    period: '2025 - 2025',
    responsibilities: [
      'Contributed to software development and research-oriented projects.',
      'Collaborated with an interdisciplinary team of developers.',
    ],
  },
  {
    title: 'Volunteer ICT Teacher',
    organization: 'Thalawa National School',
    location: 'Hambanthota, Sri Lanka',
    period: '2020 - 2021',
    responsibilities: [
      'Assisted in teaching ICT to Grade 10 and 11 students.',
      'Delivered engaging and comprehensive lessons.',
      'Adapted teaching methods to diverse learning needs.',
      'Provided guidance to support students’ academic growth.',
    ],
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.3 } },
};

const cardContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const timelineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const timelineItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function About() {
  const { theme } = useTheme();
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const newColor = theme === 'dark' ? '#fff' : '#000000';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setColor(newColor);
  }, [theme]);

  return (
    <>
      <main className="relative min-h-screen bg-background overflow-hidden">
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
        <motion.div
          className="relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Biography */}
          <motion.section
            className="container mx-auto px-4 pt-24 md:pt-32"
            variants={sectionVariants}
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="w-6 h-6 text-primary" />
                </div>
                {biography.title}
              </h2>
              <div className="space-y-4">
                {biography.content.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-lg text-muted-foreground leading-relaxed text-justify"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Research Interests */}
          <motion.section className="w-full" variants={sectionVariants}>
            <div className="container mx-auto px-4 py-16 pb-0">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  Research Interests
                </h2>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={cardContainerVariants}
                >
                  {researchInterests.map((interest, index) => {
                    return (
                      <motion.div key={index} variants={cardVariants}>
                        <Card className="hover:shadow-lg transition-all hover:-translate-y-1">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              {interest.title}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">
                              {interest.description}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Education Timeline */}
          <motion.section
            className="container mx-auto px-4 py-16 pb-0"
            variants={sectionVariants}
          >
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                Education
              </h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                <motion.div className="space-y-12" variants={timelineVariants}>
                  {education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="relative pl-8 md:pl-20"
                      variants={timelineItemVariants}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                      <Card className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                            <CardTitle className="text-xl">
                              {edu.title}
                            </CardTitle>
                            <Badge variant="outline" className="w-fit">
                              <Calendar className="w-3 h-3 mr-1" />
                              {edu.period}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <p className="text-lg font-semibold text-primary">
                              {edu.institution}
                            </p>
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {edu.location}
                            </p>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                              {edu.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Experience Timeline */}
          <motion.section className="w-full" variants={sectionVariants}>
            <div className="container mx-auto px-4 pt-16">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  Professional Experience
                </h2>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-border"></div>

                  <motion.div
                    className="space-y-12"
                    variants={timelineVariants}
                  >
                    {experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="relative pl-8 md:pl-20"
                        variants={timelineItemVariants}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                        <Card className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                              <CardTitle className="text-xl">
                                {exp.title}
                              </CardTitle>
                              <div className="flex gap-2">
                                <Badge variant="outline">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {exp.period}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <p className="text-lg font-semibold text-primary">
                                {exp.organization}
                              </p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </p>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                {exp.responsibilities.map(
                                  (responsibility, i) => (
                                    <li key={i}>{responsibility}</li>
                                  )
                                )}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <Footer />
        </motion.div>
      </main>
    </>
  );
}
