import { ResumeData } from "./resumeTypes";

export const defaultResumeData: ResumeData = {
  name: "Natwar Rathor",
  title: "MERN Stack Developer / AI Automation Specialist",
  contact: {
    email: "natwarrathor961@gmail.com",
    phone: "+91 9977020949",
    location: "Indore, Madhya Pradesh, India",
    linkedin: "linkedin.com/in/natwar-singh-rathor-617190215",
    github: null,
    portfolio: null
  },
  summary: "Full-stack developer with 1+ year of MERN stack experience and hands-on exposure to Python, Redis, and RabbitMQ. Skilled in designing and delivering real-time, AI-enabled applications with scalable frontend and robust backend architectures. Interested in building AI automation workflows, model integrations, and end-to-end automation pipelines.",
  experience: [
    {
      role: "Software Developer",
      company: "Walkover Web Solution · Indore",
      period: "Jul 2024 – Present",
      bullets: [
        "Led frontend development for GTWY.AI using React and Next.js; integrated Node.js and Python-based microservices to support AI agent interactions and automation workflows",
        "Built scalable MERN-based APIs and Python services with end-to-end testing to improve reliability and application performance",
        "Implemented Generative AI concepts into product features, including AI workflow orchestration, model integrations, and real-time application experiences"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Indore Institute of Science and Technology",
      year: "Dec 2021 – Jun 2025",
      gpa: "7.9"
    },
    {
      degree: "Senior Secondary",
      institution: "Gurukul Academy Karnawad, Indore",
      year: "2020",
      gpa: null
    },
    {
      degree: "Matriculation",
      institution: "Gurukul Academy Karnawad, Indore",
      year: "2018",
      gpa: null
    }
  ],
  skills: [
    {
      category: "Languages",
      items: ["JavaScript", "Python", "C", "C++"]
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Bootstrap"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "REST APIs", "Python"]
    },
    {
      category: "Databases & Data",
      items: ["MongoDB", "SQL", "PostgreSQL"]
    },
    {
      category: "Messaging & Caching",
      items: ["Redis", "RabbitMQ", "WebSocket"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Google Cloud", "End-to-end testing"]
    },
    {
      category: "AI / Automation",
      items: ["Generative AI", "AI workflows", "Model integration", "RAG workflows", "AI agent automation"]
    }
  ],
  projects: [
    {
      name: "GTWY AI",
      description: "AI agent deployment platform supporting memory, RAG workflows, and multi-channel deployment across chat, WhatsApp, email, Slack, and APIs.",
      stack: "React.js · Node.js · Python · API Integrations"
    },
    {
      name: "Chat Web Application",
      description: "Real-time chat application with React frontend and Node.js backend using WebSocket for scalable cross-device messaging and media sharing.",
      stack: "React.js · Node.js · WebSocket"
    },
    {
      name: "Food Ordering Web Application",
      description: "Responsive food delivery web application with a React.js and Tailwind CSS frontend; backend data retrieval optimized using Express.js and Node.js.",
      stack: "React.js · Tailwind CSS · Express.js · Node.js"
    }
  ],
  certifications: [
    {
      name: "AWS Academy Graduate - AWS Academy Cloud Foundation",
      issuer: "AWS",
      year: "2023"
    },
    {
      name: "Google Cloud Career Practitioners Pathway",
      issuer: "Google Cloud",
      year: "2022"
    }
  ],
  languages: [
    {
      language: "English",
      level: "Professional"
    },
    {
      language: "Hindi",
      level: "Native"
    }
  ]
};
