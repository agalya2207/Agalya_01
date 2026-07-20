import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code2,
  Trophy,
  Laptop,
  Briefcase,
  BookOpen,
  Layout,
  Webhook,
  Shield,
  Sparkles,
  Award,
  Medal,
  Heart,
  Brain,
  Database,
  Cpu,
  Users,
  Binary,
  Network,
  Layers,
  GraduationCap,
  Figma
} from 'lucide-react';

/* ─────────────────────────────────────────
   SVG BRAND ICONS (From SkillsMainframe.jsx)
   Converted to accept props and use currentColor.
   ───────────────────────────────────────── */
const IconReact = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <circle cx="20" cy="20" r="4" fill="currentColor"/>
    <ellipse cx="20" cy="20" rx="18" ry="6.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <ellipse cx="20" cy="20" rx="18" ry="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)"/>
    <ellipse cx="20" cy="20" rx="18" ry="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)"/>
  </svg>
);

const IconPython = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M20 5C13 5 13.5 8 13.5 8V12h7v1H10.5S5 12.5 5 19s4.5 7 4.5 7H12v-3.5S11.8 18 15 18h9s4.5.1 4.5-4V9.5S29 5 20 5z" fill="currentColor"/>
    <path d="M20 35c7 0 6.5-3 6.5-3V28h-7v-1h10S35 27.5 35 21s-4.5-7-4.5-7H28v3.5S28.2 22 25 22h-9s-4.5-.1-4.5 4V30.5S11 35 20 35z" fill="currentColor"/>
    <circle cx="17" cy="9" r="1.5" fill="currentColor" opacity="0.4"/>
    <circle cx="23" cy="31" r="1.5" fill="currentColor" opacity="0.4"/>
  </svg>
);

const IconJS = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M22 28.5c0 3.5 2 5 5 5 3.2 0 5.2-1.7 5.2-4.9V14h-3.5v14.5c0 1.5-.6 2-1.6 2-1.1 0-1.6-.8-1.6-1.8L22 28.5z" fill="currentColor"/>
    <path d="M12.5 33.5c-3.5 0-5.5-1.7-6.5-4l3-1.8c.7 1.3 1.7 2.2 3.3 2.2 1.5 0 2.3-.7 2.3-1.8 0-1.3-1-1.7-2.7-2.4l-.9-.4C8.5 24.2 7 22.7 7 19.8c0-2.8 2.1-4.8 5.4-4.8 2.3 0 4 .8 5.2 2.9l-2.9 1.9c-.6-1.1-1.3-1.5-2.3-1.5-1.1 0-1.7.6-1.7 1.5 0 1 .7 1.4 2.3 2l.9.4c3 1.3 4.5 2.7 4.5 5.7 0 3.2-2.5 5.6-6.9 5.6z" fill="currentColor"/>
  </svg>
);

const IconTS = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <rect x="2" y="2" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M21 20h5v3h-5v9h-3.5V23H14v-3h7z" fill="currentColor"/>
    <path d="M26.5 22.5c.8.5 2 1.3 2 3 0 2.2-1.8 3.5-4.2 3.5-1.5 0-3-.6-4-1.7l2-2c.6.7 1.4 1 2 1 .8 0 1.2-.3 1.2-.8 0-.6-.6-.9-1.5-1.3l-.6-.3C22 23 21 21.7 21 20c0-2.1 1.8-3.5 4-3.5 1.4 0 2.8.6 3.5 1.7l-2 1.8c-.5-.6-1-.9-1.5-.9-.7 0-1 .3-1 .7 0 .5.5.8 1.4 1.2l1.1.5z" fill="currentColor"/>
  </svg>
);

const IconNode = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M20 3L4 12.5v15L20 37l16-9.5v-15L20 3z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 8l12 7v14l-12 7-12-7V15L20 8z" fill="currentColor" opacity="0.15"/>
    <text x="20" y="23" fontFamily="Arial" fontSize="7.5" fontWeight="bold" fill="currentColor" textAnchor="middle">Node</text>
  </svg>
);

const IconGit = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M37.5 18.3L21.7 2.5a2.4 2.4 0 00-3.4 0l-3.3 3.4 4.2 4.2a2.8 2.8 0 013.5 3.5l4 4a2.8 2.8 0 11-1.6 1.6l-3.7-3.7v9.8a2.8 2.8 0 11-3.3.3V15.1a2.8 2.8 0 01-1.5-3.6l-4.1-4.1L2.5 17.1a2.4 2.4 0 000 3.4L18.3 36.3a2.4 2.4 0 003.4 0L37.5 21.7a2.4 2.4 0 000-3.4z" fill="currentColor"/>
  </svg>
);

const IconGitHub = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 4C11.2 4 4 11.2 4 20c0 7.1 4.6 13.1 11 15.2.8.1 1.1-.4 1.1-.8V31c-4.5 1-5.4-2.2-5.4-2.2-.7-1.9-1.8-2.4-1.8-2.4-1.5-1 .1-1 .1-1 1.6.1 2.4 1.6 2.4 1.6 1.4 2.4 3.7 1.7 4.6 1.3.1-1 .6-1.7 1-2.1-3.6-.4-7.3-1.8-7.3-8 0-1.8.6-3.2 1.6-4.4-.2-.4-.7-2.1.2-4.3 0 0 1.3-.4 4.4 1.6a15.2 15.2 0 018 0c3.1-2 4.4-1.6 4.4-1.6.9 2.2.3 3.9.2 4.3 1 1.1 1.6 2.6 1.6 4.4 0 6.2-3.8 7.6-7.4 8 .6.5 1.1 1.5 1.1 3V34c0 .5.3.9 1.1.8C31.4 33.1 36 27.1 36 20c0-8.8-7.2-16-16-16z" fill="currentColor"/>
  </svg>
);

const IconPostgres = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <ellipse cx="20" cy="12" rx="14" ry="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <path d="M6 12v10c0 3.9 6.3 7 14 7s14-3.1 14-7V12" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <text x="20" y="16" fontFamily="Arial" fontSize="6" fontWeight="bold" fill="currentColor" textAnchor="middle">PGSQL</text>
    <text x="20" y="25" fontFamily="Arial" fontSize="5" fill="currentColor" opacity="0.7" textAnchor="middle">database</text>
  </svg>
);

const IconSupabase = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M22 4L6 24h13l-2 12L36 16H23l2-12z" fill="currentColor"/>
  </svg>
);

const IconVite = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M38 6L21 37l-3-14L4 15l34-9z" fill="currentColor"/>
  </svg>
);

const IconTailwind = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M20 10c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.28 1.96 1.1 2.86 2.01C22.03 17.27 23.57 19 27 19c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.28-1.96-1.1-2.86-2.01C24.97 11.73 23.43 10 20 10zM13 20c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.28 1.96 1.1 2.86 2.01C15.03 27.27 16.57 29 20 29c4 0 6.5-2 7.5-6-1.5 2-3.25-2.75-5.25 2.25-1.14-.28-1.96-1.1-2.86-2.01C17.97 21.73 16.43 20 13 20z" fill="currentColor"/>
  </svg>
);

const IconHTML5 = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M5 3l2.5 28L20 35l12.5-4L35 3H5z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M20 17v4h4.9l-.5 5.5-4.4 1.2V32l7.2-2-.8-9H20z" fill="currentColor"/>
    <path d="M20 12v3h8l-.3-3H20v-3z" fill="currentColor"/>
  </svg>
);

const IconCSS3 = ({ size = 28, ...props }) => (
  <svg viewBox="0 0 40 40" width={size} height={size} {...props}>
    <path d="M5 3l2.5 28L20 35l12.5-4L35 3H5z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M26 17h-6v-4h-7l.3 3H20v4h5.6l-.6 6-5 1.4V31l7.2-2L27 17z" fill="currentColor"/>
    <path d="M20 12v3h8l-.3-3H20v-3z" fill="currentColor"/>
  </svg>
);

/* ─────────────────────────────────────────
   TABS DATA STRUCTURE
   Now maps raw Lucide components to inherit colors.
   ───────────────────────────────────────── */
const TABS_DATA = {
  skills: [
    {
      category: "WEB DEVELOPMENT",
      items: [
        { name: "React", Icon: IconReact },
        { name: "TypeScript", Icon: IconTS },
        { name: "JavaScript", Icon: IconJS },
        { name: "HTML5", Icon: IconHTML5 },
        { name: "CSS3", Icon: IconCSS3 },
        { name: "Tailwind CSS", Icon: IconTailwind },
        { name: "Vite", Icon: IconVite }
      ]
    },
    {
      category: "UI / UX DESIGN",
      items: [
        { name: "Figma", Icon: Figma },
        { name: "Tailwind CSS", Icon: IconTailwind },
        { name: "Responsive Layouts", Icon: Layout }
      ]
    },
    {
      category: "BACKEND & DATABASE",
      items: [
        { name: "Node.js", Icon: IconNode },
        { name: "Python", Icon: IconPython },
        { name: "PostgreSQL", Icon: IconPostgres },
        { name: "Supabase", Icon: IconSupabase }
      ]
    },
    {
      category: "API & ARCHITECTURE",
      items: [
        { name: "REST APIs", Icon: Webhook },
        { name: "Git", Icon: IconGit },
        { name: "GitHub", Icon: IconGitHub },
        { name: "Security & RLS", Icon: Shield }
      ]
    }
  ],
  awards: [
    {
      category: "HACKATHONS",
      items: [
        { name: "1st Place - Smart India Hackathon", Icon: Trophy },
        { name: "Best AI Innovation Award", Icon: Sparkles }
      ]
    },
    {
      category: "ACADEMICS",
      items: [
        { name: "Academic Excellence Award", Icon: Award },
        { name: "Best Data Science Presentation", Icon: Medal }
      ]
    },
    {
      category: "COMMUNITY",
      items: [
        { name: "Top Open Source Contributor", Icon: Heart }
      ]
    }
  ],
  internships: [
    {
      category: "FULL STACK",
      items: [
        { name: "AI Dev Intern @ Tech Solutions", Icon: Brain }
      ]
    },
    {
      category: "BACKEND & DATABASE",
      items: [
        { name: "Database Engineer Intern @ DataCorp", Icon: Database }
      ]
    },
    {
      category: "FRONTEND UI",
      items: [
        { name: "Frontend Intern @ Creative Agency", Icon: Code2 }
      ]
    }
  ],
  experience: [
    {
      category: "DEVELOPMENT",
      items: [
        { name: "Freelance Full Stack Developer (2+ Yrs)", Icon: Briefcase },
        { name: "Open Source Contributor", Icon: IconReact }
      ]
    },
    {
      category: "AI & DATA WORKFLOWS",
      items: [
        { name: "AI Pipeline & Automation Engineer", Icon: Cpu }
      ]
    },
    {
      category: "COLLABORATION",
      items: [
        { name: "Led 3-member team for Smart Civic", Icon: Users }
      ]
    }
  ],
  courses: [
    {
      category: "COMPUTING & MATH",
      items: [
        { name: "Data Structures & Algorithms", Icon: Binary },
        { name: "Machine Learning & Neural Networks", Icon: Network }
      ]
    },
    {
      category: "ENGINEERING",
      items: [
        { name: "Software Architecture & System Design", Icon: Layers },
        { name: "Database Management Systems & SQL", Icon: Database }
      ]
    },
    {
      category: "LANGUAGES",
      items: [
        { name: "Advanced Python Programming", Icon: IconPython },
        { name: "Modern JavaScript & TypeScript", Icon: IconTS }
      ]
    }
  ]
};

/* ─────────────────────────────────────────
   COUNTUP ANIMATION COMPONENT
   ───────────────────────────────────────── */
const CountUp = ({ end, duration = 2.0 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const endNum = parseInt(end, 10);
    if (isNaN(endNum)) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * endNum));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  const isPlus = end.includes('+');

  return (
    <span>
      {count}
      {isPlus && '+'}
    </span>
  );
};

/* ─────────────────────────────────────────
   MAIN ABOUT COMPONENT
   ───────────────────────────────────────── */
const About = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('skills');

  // Scroll to hash after mount
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.substring(1));
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [location]);

  // Framer motion variants
  const leftVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const tabsConfig = [
    { id: 'skills', label: 'Skills', Icon: Code2 },
    { id: 'awards', label: 'Awards', Icon: Trophy },
    { id: 'internships', label: 'Internships', Icon: Laptop },
    { id: 'experience', label: 'Experience', Icon: Briefcase },
    { id: 'courses', label: 'Courses', Icon: BookOpen }
  ];

  return (
    <div className="about-wrapper">
      <style>{CSS_STYLES}</style>

      <div className="about-grid-container">
        {/* LEFT COLUMN: BIO & STATS */}
        <motion.div
          className="about-left-col"
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h1 className="about-hero-title">
            Design with <span className="accent-underlined">[intent]</span>.
          </h1>

          <div className="about-bio-card">
            <p>
              Hello, I'm <span className="highlight-text">Agalya</span> — an <span className="highlight-text">AI & Data Science</span> student at <span className="highlight-text">St. Joseph's College of Engineering</span> (CGPA: <span className="highlight-text">8.71</span>), passionate about building scalable web applications with clean code and thoughtful design.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="about-stats-grid">
            <div className="stat-card">
              <div className="stat-number"><CountUp end="2+" /></div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><CountUp end="5+" /></div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number"><CountUp end="10+" /></div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>

          <div className="about-section-label">ABOUT ME</div>
        </motion.div>

        {/* RIGHT COLUMN: SKILLS PANEL */}
        <motion.div
          className="about-right-col"
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="skills-mainframe-panel">
            {/* Segmented Pill Tabs */}
            <div className="tab-pill-bar">
              {tabsConfig.map((tab) => {
                const TabIcon = tab.Icon;
                return (
                  <button
                    key={tab.id}
                    className={`tab-pill-btn ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                    aria-label={`Show ${tab.label}`}
                  >
                    <TabIcon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Panels with content categorized */}
            <div className="tab-panel-content">
              {TABS_DATA[activeTab].map((group, idx) => (
                <div key={idx} className="category-group">
                  <h3 className="category-group-title">{group.category}</h3>
                  <div className="category-group-row">
                    {group.items.map((item, itemIdx) => {
                      const Icon = item.Icon;
                      return (
                        <div key={itemIdx} className="tech-icon-wrapper">
                          <span className="tech-icon-tooltip">{item.name}</span>
                          <button className="tech-icon-btn" aria-label={item.name}>
                            <Icon size={26} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Status Row */}
            <div className="status-row-bar">
              <div className="pulse-dot"></div>
              <span className="status-row-text">Open to opportunities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   CUSTOM STYLE DEFINITIONS
   ───────────────────────────────────────── */
const CSS_STYLES = `
  /* About Layout Design Tokens */
  :root {
    --accent: #2DD9C4;
    --accent-glow: rgba(45, 217, 196, 0.4);
    --accent-shadow: rgba(45, 217, 196, 0.15);
  }

  .about-wrapper {
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 80vh;
    box-sizing: border-box;
  }

  /* Grid System styling */
  .about-grid-container {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 60px;
    align-items: start;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Left Bio Column details */
  .about-left-col {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .about-hero-title {
    font-family: var(--font-heading), 'Poppins', sans-serif;
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.15;
    color: #ffffff;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: -0.01em;
  }

  .accent-underlined {
    color: var(--accent);
    position: relative;
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-color: var(--accent);
    text-decoration-thickness: 3px;
    text-shadow: 0 0 15px var(--accent-glow);
  }

  .about-bio-card {
    border-left: 4px solid var(--accent);
    padding-left: 20px;
    margin: 8px 0;
  }

  .about-bio-card p {
    color: var(--color-text-muted);
    font-size: 1.05rem;
    line-height: 1.75;
    margin: 0;
  }

  .highlight-text {
    color: var(--accent);
    font-weight: 600;
    text-shadow: 0 0 10px var(--accent-shadow);
  }

  /* Stats cards design */
   .about-stats-grid {
     display: grid;
     grid-template-columns: repeat(3, 1fr);
     gap: 16px;
     margin-top: 12px;
   }

  .stat-card {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 16px 8px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    transition: var(--transition-spring);
  }

  .stat-card:hover {
    transform: translateY(-4px);
    background: rgba(45, 217, 196, 0.03);
    border-color: rgba(45, 217, 196, 0.25);
    box-shadow: 0 12px 35px rgba(45, 217, 196, 0.08);
  }

  .stat-number {
    font-family: var(--font-heading), 'Poppins', sans-serif;
    font-size: 2.2rem;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
    margin-bottom: 6px;
    text-shadow: 0 0 12px var(--accent-glow);
  }

  .stat-label {
    font-size: 0.65rem;
    font-weight: 700;
    color: var(--color-text-muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .about-section-label {
    font-family: 'Poppins', sans-serif;
    font-size: 0.75rem;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 0.3em;
    text-transform: uppercase;
    margin-top: 8px;
    text-shadow: 0 0 10px var(--accent-shadow);
  }

  /* Right Skills/Tabs Column details */
  .about-right-col {
    display: flex;
    flex-direction: column;
  }

  .skills-mainframe-panel {
    background: rgba(15, 10, 32, 0.45);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 20px;
    padding: 32px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(255, 94, 54, 0.01);
    display: flex;
    flex-direction: column;
    gap: 30px;
    min-height: 520px;
  }

  /* Segmented Pill Tabs Bar */
  .tab-pill-bar {
    display: flex;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 9999px;
    padding: 4px;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .tab-pill-bar::-webkit-scrollbar {
    display: none;
  }

  .tab-pill-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 9999px;
    border: none;
    background: transparent;
    color: var(--color-text-muted);
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition-smooth);
    white-space: nowrap;
  }

  .tab-pill-btn:hover {
    color: #ffffff;
  }

  .tab-pill-btn.active {
    background: var(--accent);
    color: #ffffff;
    box-shadow: 0 4px 15px var(--accent-shadow);
  }

  /* Tab Panel Content */
  .tab-panel-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .category-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .category-group-title {
    font-family: 'Poppins', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.95;
  }

  .category-group-row {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  /* Rounded Tech Buttons with single-tone colors default + transitions */
  .tech-icon-wrapper {
    position: relative;
    display: inline-flex;
  }

   .tech-icon-btn {
     width: 54px;
     height: 54px;
     border-radius: 12px;
     background: rgba(255, 255, 255, 0.03);
     border: 1px solid rgba(255, 255, 255, 0.08);
     display: flex;
     align-items: center;
     justify-content: center;
     color: rgba(255, 255, 255, 0.6); /* Subtle gray/default */
     cursor: pointer;
     transition: var(--transition-spring);
     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
   }

  .tech-icon-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 0 15px var(--accent-glow);
    background: rgba(255, 255, 255, 0.03);
  }

  /* Ensure all SVGs inherit parent color fill and stroke values dynamically */
  .tech-icon-btn svg {
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  /* Hover tooltips details */
  .tech-icon-tooltip {
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: rgba(12, 8, 24, 0.96);
    border: 1px solid var(--accent);
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 0.72rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6), 0 0 8px var(--accent-shadow);
    z-index: 100;
  }

  .tech-icon-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--accent);
  }

  .tech-icon-wrapper:hover .tech-icon-tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* Bottom status row details */
  .status-row-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .pulse-dot {
    width: 8px;
    height: 8px;
    background-color: #22c55e;
    border-radius: 50%;
    box-shadow: 0 0 0 rgba(34, 197, 94, 0.4);
    animation: pulse-glow-dot 2s infinite;
  }

  @keyframes pulse-glow-dot {
    0% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(34, 197, 94, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
    }
  }

  .status-row-text {
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--color-text-muted);
  }

  /* Responsive breakpoints */
  @media (max-width: 1024px) {
    .about-grid-container {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .about-hero-title {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 768px) {
    .about-stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .skills-mainframe-panel {
      padding: 24px;
    }
  }

  @media (max-width: 480px) {
    .about-stats-grid {
      grid-template-columns: 1fr;
    }
    .about-hero-title {
      font-size: 2.1rem;
    }
  }
`;

export default About;
