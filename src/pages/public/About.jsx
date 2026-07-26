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
  Figma,
  BarChart2,
  BarChart3,
  Filter,
  LineChart,
} from 'lucide-react';
import {
  SiPython,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiOpencv,
  SiSupabase,
  SiFirebase,
  SiMysql,
  SiGit,
  SiGithub,
  SiStreamlit,
  SiFlask,
  SiDocker,
} from 'react-icons/si';
import { FaCss3, FaDatabase, FaAws } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';

/* ─────────────────────────────────────────
   TABS DATA STRUCTURE
   ───────────────────────────────────────── */
const TABS_DATA = {
  skills: [
    {
      category: "PROGRAMMING & WEB",
      items: [
        { name: "Python", Icon: SiPython },
        { name: "SQL", Icon: FaDatabase },
        { name: "HTML", Icon: SiHtml5 },
        { name: "CSS", Icon: FaCss3 },
        { name: "JavaScript", Icon: SiJavascript },
        { name: "React", Icon: SiReact },
      ]
    },
    {
      category: "AI & MACHINE LEARNING",
      items: [
        { name: "NumPy", Icon: SiNumpy },
        { name: "Pandas", Icon: SiPandas },
        { name: "Scikit-learn", Icon: SiScikitlearn },
        { name: "TensorFlow", Icon: SiTensorflow },
        { name: "Matplotlib", Icon: BarChart2 },
        { name: "OpenCV", Icon: SiOpencv },
        { name: "Data Science", Icon: Brain },
      ]
    },
    {
      category: "DATA & DATABASES",
      items: [
        { name: "Supabase", Icon: SiSupabase },
        { name: "Firebase", Icon: SiFirebase },
        { name: "MySQL", Icon: SiMysql },
        { name: "Power BI", Icon: BarChart3 },
        { name: "Data Cleaning", Icon: Filter },
        { name: "EDA", Icon: LineChart },
      ]
    },
    {
      category: "TOOLS & DEPLOYMENT",
      items: [
        { name: "Git", Icon: SiGit },
        { name: "GitHub", Icon: SiGithub },
        { name: "VS Code", Icon: VscCode },
        { name: "Streamlit", Icon: SiStreamlit },
        { name: "Flask", Icon: SiFlask },
        { name: "Docker", Icon: SiDocker },
        { name: "AWS", Icon: FaAws },
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
      title: "Full Stack Development Intern – NoviTech R&D Pvt. Ltd.",
      year: "2025"
    },
    {
      title: "MERN Stack Development Intern – NoviTech R&D Pvt. Ltd.",
      year: "2025-26"
    }
  ],
  experience: [
    {
      category: "DEVELOPMENT",
      items: [
        { name: "Freelance Full Stack Developer (2+ Yrs)", Icon: Briefcase },
        { name: "Open Source Contributor", Icon: SiReact }
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
        { name: "Data Structures & Algorithms", type: "Course", Icon: Binary },
        { name: "Introduction to Generative AI Studio", type: "Workshop", Icon: Sparkles },
        { name: "Agentic AI Workshop", type: "Workshop", Icon: Cpu },
        { name: "Machine Learning & Neural Networks", type: "Course", Icon: Network }
      ]
    },
    {
      category: "ENGINEERING",
      items: [
        { name: "Full Stack Development MasterClass", type: "Course", Icon: Code2 },
        { name: "Software Architecture & System Design", type: "Course", Icon: Layers },
        { name: "Database Management Systems & SQL", type: "Course", Icon: Database }
      ]
    },
    {
      category: "LANGUAGES",
      items: [
        { name: "Advanced Python Programming", type: "Course", Icon: SiPython },
        { name: "Modern JavaScript & TypeScript", type: "Course", Icon: SiJavascript }
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
    { id: 'courses', label: 'Courses & Workshops', Icon: BookOpen }
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
              {activeTab === 'internships' ? (
                <div className="timeline-container">
                  <div className="timeline-line" />
                  {TABS_DATA.internships.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot-wrapper">
                        <div className="timeline-dot" />
                      </div>
                      <div className="timeline-card">
                        <span className="timeline-title">{item.title}</span>
                        <span className="timeline-badge">{item.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                TABS_DATA[activeTab].map((group, idx) => (
                  <div key={idx} className="category-group">
                    <h3 className="category-group-title">{group.category}</h3>
                    <div className="category-group-row">
                      {group.items.map((item, itemIdx) => {
                        const Icon = item.Icon;
                        return (
                          <div key={itemIdx} className="tech-icon-wrapper">
                            <button className="tech-icon-btn" aria-label={item.name}>
                              <Icon size={24} />
                            </button>
                            <span className="tech-icon-label">{item.name}</span>
                            {item.type && (
                              <span className="item-type-badge">{item.type}</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
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
  overflow-x: hidden; /* Prevent horizontal scroll */
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
    padding: 24px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(255, 94, 54, 0.01);
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 82vh;
    overflow: hidden;
  }

  /* Segmented Pill Tabs Bar (Sticky Header) */
  .tab-pill-bar {
    position: sticky;
    top: 0;
    z-index: 10;
    display: flex;
    background: rgba(15, 10, 32, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(45, 217, 196, 0.25);
    border-radius: 9999px;
    padding: 4px;
    gap: 4px;
    overflow-x: auto;
    flex-shrink: 0;
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

  /* Tab Panel Content (Scrollable Inner Region) */
  .tab-panel-content {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 4px;
    scrollbar-width: thin;
    scrollbar-color: rgba(45, 217, 196, 0.25) transparent;
  }

  .tab-panel-content::-webkit-scrollbar {
    width: 4px;
  }
  .tab-panel-content::-webkit-scrollbar-track {
    background: transparent;
  }
  .tab-panel-content::-webkit-scrollbar-thumb {
    background: rgba(45, 217, 196, 0.25);
    border-radius: 4px;
  }

  .category-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .category-group-title {
    font-family: 'Poppins', 'Inter', sans-serif;
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.95;
  }

  .category-group-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 8px;
  }

  /* Rounded Tech Buttons with single-tone colors default + transitions */
  .tech-icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 80px;
  }

  .tech-icon-btn {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.75);
    cursor: pointer;
    transition: var(--transition-spring);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .tech-icon-btn:hover {
    color: var(--accent);
    border-color: var(--accent);
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 0 15px var(--accent-glow);
    background: rgba(45, 217, 196, 0.08);
  }

  .tech-icon-label {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 500;
    color: #cbd5e1;
    text-align: center;
    line-height: 1.3;
    white-space: normal;
    word-break: keep-all;
    overflow-wrap: normal;
    width: 80px;
    max-width: 80px;
  }

  .item-type-badge {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    font-weight: 600;
    color: var(--accent);
    background: rgba(45, 217, 196, 0.12);
    border: 1px solid rgba(45, 217, 196, 0.25);
    border-radius: 9999px;
    padding: 2px 7px;
    line-height: 1;
    margin-top: 3px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    white-space: nowrap;
  }

  /* Vertical Timeline Layout for Internships */
  .timeline-container {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 8px 4px 8px 24px;
  }

  .timeline-line {
    position: absolute;
    top: 24px;
    bottom: 24px;
    left: 8px;
    width: 2px;
    background: linear-gradient(
      to bottom,
      var(--accent) 0%,
      rgba(45, 217, 196, 0.25) 100%
    );
    border-radius: 2px;
  }

  .timeline-item {
    position: relative;
    display: flex;
    align-items: center;
  }

  .timeline-dot-wrapper {
    position: absolute;
    left: -16px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    transform: translateX(-50%);
    z-index: 2;
  }

  .timeline-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #0f0a20;
    border: 2px solid var(--accent);
    box-shadow: 0 0 8px var(--accent-glow);
    transition: var(--transition-smooth);
  }

  .timeline-item:hover .timeline-dot {
    background: var(--accent);
    box-shadow: 0 0 12px var(--accent);
    transform: scale(1.25);
  }

  .timeline-card {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 14px 18px;
    transition: var(--transition-spring);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .timeline-card:hover {
    transform: translateX(4px);
    background: rgba(45, 217, 196, 0.05);
    border-color: rgba(45, 217, 196, 0.3);
    box-shadow: 0 6px 20px rgba(45, 217, 196, 0.1);
  }

  .timeline-title {
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.4;
  }

  .timeline-badge {
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent);
    background: rgba(45, 217, 196, 0.1);
    border: 1px solid rgba(45, 217, 196, 0.25);
    border-radius: 9999px;
    padding: 4px 12px;
    white-space: nowrap;
    flex-shrink: 0;
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
    .skills-mainframe-panel {
      max-width: 100%;
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
      width: 100%;
      max-width: 500px; /* Limit width on large screens */
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
