import useScrollNavigation from '../../hooks/useScrollNavigation';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Projects.css';
import { useEffect, useState, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════
// ASSETS
// ═══════════════════════════════════════════════════

import DevHireImg from '../../assets/DevHire.png';
import FormForgeImg from '../../assets/FormForge.jpeg';
import SmartCivicImg from '../../assets/SmartCivic.png';

// ═══════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════

interface ProjectData {
  id: string;
  title: string;
  description: string;
  label: string;
  status: 'live' | 'in-progress';
  statusText: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════

const projects: ProjectData[] = [
  {
    id: 'devhire',
    title: 'DevHire — Smart Job Board with Python AI Matching',
    description:
      "Developer-focused job board. Companies post roles, candidates upload resumes. Python backend extracts skills and scores match % using sentence-transformers — built from scratch, no OpenAI wrapper. Full RLS ensures company A never sees company B\u2019s applicants.",
    label: '[AI MATCH ENGINE]',
    status: 'live',
    statusText: 'LIVE',
    image: DevHireImg,
    tags: ['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Python', 'FastAPI', 'sentence-transformers', 'Vercel', 'Railway'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'formforge',
    title: 'FormForge — No-Code Form Builder with Analytics & PDF Reports',
    description:
      'Create, share, collect and analyze responses. Drag-and-drop form canvas with a real-time analytics dashboard — response charts, per-field breakdowns, and one-click PDF export.',
    label: '[DRAG & DROP EDITOR]',
    status: 'live',
    statusText: 'LIVE',
    image: FormForgeImg,
    tags: ['React', 'TypeScript', 'Supabase', 'Charts', 'PDF Export', 'Vercel'],
    githubUrl: '#',
    liveUrl: '#',
  },
  {
    id: 'smartcivic',
    title: 'SmartCivic — Community Issue Reporting Platform',
    description:
      'Lets residents report local civic issues (potholes, waste, streetlights) with photo + geolocation, and lets authorities track status from submission to resolution.',
    label: '[CIVIC TECH]',
    status: 'in-progress',
    statusText: 'IN PROGRESS',
    image: SmartCivicImg,
    tags: ['React', 'Supabase', 'PostgreSQL', 'Maps API'],
    githubUrl: '#',
    liveUrl: '#',
  },
];

// ═══════════════════════════════════════════════════
// CARD ANIMATION VARIANTS
// ═══════════════════════════════════════════════════

const cardEntranceVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ═══════════════════════════════════════════════════
// PROJECT CARD
// ═══════════════════════════════════════════════════

interface ProjectCardProps {
  project: ProjectData;
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <article className="prj-card">
    {/* ── Image Banner ── */}
    <div className="prj-card-image-wrap">
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
      />
      {/* Monospace label top-left */}
      <span className="prj-card-label">{project.label}</span>
      {/* Status pill top-right */}
      <span className={`prj-card-status ${project.status}`}>
        <span className={`prj-status-dot ${project.status}`} />
        {project.statusText}
      </span>
    </div>

    {/* ── Card Body ── */}
    <div className="prj-card-body">
      {/* Featured eyebrow */}
      <div className="prj-eyebrow">
        <FiStar />
        FEATURED PROJECT
      </div>

      {/* Title */}
      <h3 className="prj-card-title">{project.title}</h3>

      {/* Description */}
      <p className="prj-card-desc">{project.description}</p>

      {/* Tech tags */}
      <div className="prj-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="prj-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="prj-actions">
        <a
          href={project.githubUrl}
          className="prj-btn prj-btn-outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiGithub size={18} />
          GitHub
        </a>
        <a
          href={project.liveUrl}
          className="prj-btn prj-btn-filled"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiExternalLink size={18} />
          Live Demo
        </a>
      </div>
    </div>
  </article>
);

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

const Projects = () => {
  useScrollNavigation();
  // existing component code continues

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  // ── Scroll-snap index tracking ──
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const children = Array.from(container.children) as HTMLElement[];
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;

    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      // Each child is centered, so the snap point is the child's left offset
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const viewCenter = scrollLeft + containerWidth / 2;
      const distance = Math.abs(childCenter - viewCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    const target = children[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    if (activeIndex > 0) scrollToIndex(activeIndex - 1);
  }, [activeIndex, scrollToIndex]);

  const scrollNext = useCallback(() => {
    if (activeIndex < projects.length - 1) scrollToIndex(activeIndex + 1);
  }, [activeIndex, scrollToIndex]);

  // Trigger entrance animation once on mount
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Star field canvas (preserved from original)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    // Seeded pseudo-random for stable layout
    const rand = (() => {
      let s = 42;
      return () => { s = (s * 16807 + 0) % 2147483647; return (s - 1) / 2147483646; };
    })();

    const NUM_STARS = 110;
    const stars: any[] = [];
    for (let i = 0; i < NUM_STARS; i++) {
      rand();
      rand();
      const b = rand();
      const o = rand();
      const sz = rand();

      let x, y;
      if (i < 15) {
        x = 0.55 + rand() * 0.35;
        y = 0.25 + rand() * 0.45;
      } else if (i < 28) {
        x = 0.02 + rand() * 0.30;
        y = 0.55 + rand() * 0.40;
      } else {
        x = rand();
        y = rand();
      }

      const blueShift = b > 0.6;
      stars.push({
        xFrac: x,
        yFrac: y,
        size: 1.0 + sz * 1.5,
        opacity: 0.4 + o * 0.6,
        blue: blueShift,
        bright: sz > 0.85,
      });
    }

    const constellations = [
      [3, 11], [11, 22], [22, 37],
      [50, 63], [63, 78],
    ];

    function draw() {
      if (!ctx) return;
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      ctx.lineWidth = 0.5;
      constellations.forEach(([a, b]) => {
        const sa = stars[a], sb = stars[b];
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.moveTo(sa.xFrac * W, sa.yFrac * H);
        ctx.lineTo(sb.xFrac * W, sb.yFrac * H);
        ctx.stroke();
      });

      stars.forEach(star => {
        const x = star.xFrac * W;
        const y = star.yFrac * H;
        const color = star.blue
          ? `rgba(160,230,220,${star.opacity})`
          : `rgba(255,255,255,${star.opacity})`;

        ctx.beginPath();
        ctx.arc(x, y, star.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        if (star.bright) {
          const grad = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2.5);
          grad.addColorStop(0, star.blue ? 'rgba(140,220,210,0.25)' : 'rgba(255,255,255,0.25)');
          grad.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(x, y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });
    }

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a14',
        width: '100%',
        fontFamily: 'var(--prj-font-sans)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Star field canvas */}
      <canvas ref={canvasRef} className="star-canvas" />

      {/* Teal center glow */}
      <div className="center-glow" />

      {/* Main content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* ── Header with dots + nav arrows ── */}
        <div className="prj-page-header">
          <div className="prj-header-row">
            <div>
              <h1
                style={{
                  fontSize: '42px',
                  fontWeight: 800,
                  color: 'var(--prj-text-primary)',
                  marginBottom: '12px',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  lineHeight: 1.1,
                  textTransform: 'none' as const,
                  letterSpacing: '-0.01em',
                }}
              >
                Projects
              </h1>
              <div
                style={{
                  width: '56px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'linear-gradient(90deg, #2DD9C4, #0d9488)',
                }}
              />
            </div>

            {/* Dots + Arrow Nav */}
            <div className="prj-nav-cluster">
              {/* Dot indicators */}
              <div className="prj-dots">
                {projects.map((_, i) => (
                  <button
                    key={i}
                    className={`prj-dot ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
              </div>

              {/* Chevron arrows */}
              <div className="prj-nav-arrows">
                <button
                  className="prj-nav-btn"
                  onClick={scrollPrev}
                  disabled={activeIndex === 0}
                  aria-label="Previous project"
                >
                  <FiChevronLeft size={22} />
                </button>
                <button
                  className="prj-nav-btn"
                  onClick={scrollNext}
                  disabled={activeIndex === projects.length - 1}
                  aria-label="Next project"
                >
                  <FiChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Carousel Container ── */}
        <div className="prj-carousel-wrapper">
          {/* Edge chevron overlays (large screens) */}
          <button
            className="prj-edge-arrow prj-edge-arrow-left"
            onClick={scrollPrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            <FiChevronLeft size={28} />
          </button>
          <button
            className="prj-edge-arrow prj-edge-arrow-right"
            onClick={scrollNext}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
          >
            <FiChevronRight size={28} />
          </button>

          {/* Scroll-snap track */}
          <motion.div
            className="prj-carousel-track"
            ref={scrollRef}
            onScroll={handleScroll}
            variants={cardEntranceVariants}
            initial="hidden"
            animate={hasAnimated ? 'visible' : 'hidden'}
          >
            {projects.map((project) => (
              <div key={project.id} className="prj-carousel-slide">
                <ProjectCard project={project} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Mobile dots (below carousel) ── */}
        <div className="prj-dots-mobile">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`prj-dot ${i === activeIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
