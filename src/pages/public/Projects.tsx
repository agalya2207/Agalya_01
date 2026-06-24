import React from 'react';
import './Projects.css';

// ═══════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════

interface TagData {
  label: string;
  variant: 'neutral' | 'highlight';
}

interface BadgeData {
  text: string;
  color: 'green' | 'purple' | 'orange';
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  badge: BadgeData;
  tags: TagData[];
  diagramType: 'ai-match' | 'form-builder' | 'civic';
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
    badge: { text: '★ Featured', color: 'green' },
    tags: [
      { label: 'React', variant: 'neutral' },
      { label: 'TypeScript', variant: 'neutral' },
      { label: 'Supabase', variant: 'neutral' },
      { label: 'PostgreSQL', variant: 'neutral' },
      { label: 'RLS', variant: 'neutral' },
      { label: '[Python]', variant: 'highlight' },
      { label: '[FastAPI]', variant: 'highlight' },
      { label: '[sentence-transformers]', variant: 'highlight' },
      { label: 'Vercel', variant: 'neutral' },
      { label: 'Railway', variant: 'neutral' },
    ],
    diagramType: 'ai-match',
  },
  {
    id: 'formforge',
    title: 'FormForge — No-Code Form Builder with Analytics & PDF Reports',
    description:
      'Drag-and-drop form builder — create, share, collect. Python + Pandas backend generates PDF reports on demand. Response analytics dashboard with charts and CSV export.',
    badge: { text: 'Solo', color: 'purple' },
    tags: [
      { label: 'React', variant: 'neutral' },
      { label: 'TypeScript', variant: 'neutral' },
      { label: 'Supabase', variant: 'neutral' },
      { label: 'dnd-kit', variant: 'neutral' },
      { label: 'Recharts', variant: 'neutral' },
      { label: '[Python]', variant: 'highlight' },
      { label: '[Pandas]', variant: 'highlight' },
      { label: '[ReportLab]', variant: 'highlight' },
    ],
    diagramType: 'form-builder',
  },
  {
    id: 'smartcivic',
    title: 'Smart Civic Reporter — AI Civic Issue Management',
    description:
      'Citizens upload issue photos — AI verifies, classifies, and routes to the right department automatically. Priority engine, 3 dashboards, leaderboard + Civic Hero badge for top contributors.',
    badge: { text: 'Team · 3 members', color: 'orange' },
    tags: [
      { label: 'React', variant: 'neutral' },
      { label: 'TypeScript', variant: 'neutral' },
      { label: 'Supabase', variant: 'neutral' },
      { label: 'RLS', variant: 'neutral' },
      { label: '[Python]', variant: 'highlight' },
      { label: '[FastAPI]', variant: 'highlight' },
      { label: '[OpenCV]', variant: 'highlight' },
      { label: '[scikit-learn]', variant: 'highlight' },
      { label: 'Mapbox', variant: 'neutral' },
    ],
    diagramType: 'civic',
  },
];

// ═══════════════════════════════════════════════════
// DIAGRAM COMPONENTS
// ═══════════════════════════════════════════════════

const AIMatchDiagram = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', padding: '24px' }}>
    {/* Label top-left */}
    <div
      style={{
        fontFamily: 'var(--prj-font-mono)',
        fontSize: '12px',
        letterSpacing: '1px',
        color: 'var(--prj-text-muted)',
        marginBottom: '20px',
      }}
    >
      [AI MATCH ENGINE]
    </div>

    {/* LIVE indicator top-right */}
    <div
      style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <div
        className="prj-live-dot"
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--prj-accent-green)',
        }}
      />
      <span
        style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          color: 'var(--prj-accent-green)',
          fontFamily: 'var(--prj-font-mono)',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}
      >
        LIVE
      </span>
    </div>

    {/* Diagram area — SVG */}
    <svg
      width="100%"
      height="150"
      viewBox="0 0 700 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* ── Dashed connector lines ── */}
      {/* Left top → AI */}
      <path
        d="M 165 40 C 230 40, 280 90, 310 90"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        fill="none"
        className="prj-dash-line"
      />
      {/* Left bottom → AI */}
      <path
        d="M 165 140 C 230 140, 280 90, 310 90"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        fill="none"
        className="prj-dash-line"
      />
      {/* AI → Right top (highlighted — matched) */}
      <line
        x1="390"
        y1="90"
        x2="535"
        y2="40"
        stroke="url(#matchLine)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        className="prj-dash-line"
      />
      {/* AI → Right bottom */}
      <path
        d="M 390 90 C 450 90, 490 140, 535 140"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        fill="none"
        className="prj-dash-line"
      />

      <defs>
        <linearGradient id="matchLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="aiRingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      {/* ── Left column: 2 stacked mini-cards ── */}
      {/* Resume card */}
      <g className="prj-float">
        <rect x="10" y="15" width="150" height="50" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="20" y="33" fill="var(--prj-text-label)" fontSize="11" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">RESUME</text>
        <text x="20" y="50" fill="var(--prj-text-muted)" fontSize="10" fontFamily="var(--prj-font-mono)">resume_agalya.pdf</text>
      </g>
      {/* Skills card */}
      <g className="prj-float prj-float-delay-1">
        <rect x="10" y="77" width="150" height="50" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="20" y="95" fill="var(--prj-text-label)" fontSize="11" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">SKILLS</text>
        <text x="20" y="112" fill="var(--prj-text-muted)" fontSize="10" fontFamily="var(--prj-font-mono)">cv_2026.txt</text>
      </g>

      {/* ── Center: AI node ── */}
      <g className="prj-float prj-float-delay-2">
        {/* Outer glow ring */}
        <circle cx="350" cy="90" r="40" fill="none" stroke="url(#aiRingGrad)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        {/* Inner ring */}
        <circle cx="350" cy="90" r="32" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.7" />
        {/* Core circle */}
        <circle cx="350" cy="90" r="24" fill="#0f0f17" stroke="#a855f7" strokeWidth="2" />
        <text x="350" y="95" textAnchor="middle" fill="#ffffff" fontSize="16" fontWeight="bold" fontFamily="var(--prj-font-sans)">AI</text>
      </g>

      {/* Match % badge below AI */}
      <g>
        <rect x="305" y="145" width="90" height="28" rx="14" fill="rgba(34,197,94,0.15)" />
        <text x="350" y="164" textAnchor="middle" fill="var(--prj-accent-green)" fontSize="12" fontWeight="600" fontFamily="var(--prj-font-mono)">MATCH: 97.4%</text>
      </g>

      {/* ── Right column: 2 stacked result cards ── */}
      {/* Job Posting A — matched */}
      <g className="prj-float prj-float-delay-3">
        <rect x="540" y="15" width="150" height="50" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="550" y="33" fill="var(--prj-text-label)" fontSize="11" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">JOB_POSTING_A</text>
        <text x="550" y="50" fill="var(--prj-accent-green)" fontSize="10" fontWeight="bold" fontFamily="var(--prj-font-mono)">★ 97.4% match</text>
      </g>
      {/* Job Posting B */}
      <g className="prj-float prj-float-delay-1">
        <rect x="540" y="77" width="150" height="50" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="550" y="95" fill="var(--prj-text-label)" fontSize="11" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">JOB_POSTING_B</text>
        <text x="550" y="112" fill="var(--prj-text-muted)" fontSize="10" fontFamily="var(--prj-font-mono)">62.1% match</text>
      </g>
    </svg>
  </div>
);

const FormBuilderDiagram = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', padding: '24px' }}>
    {/* Label */}
    <div
      style={{
        fontFamily: 'var(--prj-font-mono)',
        fontSize: '12px',
        letterSpacing: '1px',
        color: 'var(--prj-text-muted)',
        marginBottom: '16px',
      }}
    >
      [DRAG & DROP EDITOR]
    </div>

    <svg
      width="100%"
      height="140"
      viewBox="0 0 440 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* ── Left: Form Canvas ── */}
      <g className="prj-float">
        <rect x="0" y="0" width="200" height="145" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="100" y="18" textAnchor="middle" fill="var(--prj-text-muted)" fontSize="9" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">FORM CANVAS</text>

        {/* Text Input - Full Name */}
        <rect x="12" y="28" width="176" height="28" rx="4" fill="transparent" stroke="#a855f7" strokeWidth="1" />
        <text x="20" y="46" fill="var(--prj-text-secondary)" fontSize="9" fontFamily="var(--prj-font-mono)">Text Input — Full Name</text>

        {/* Email Input */}
        <rect x="12" y="62" width="176" height="28" rx="4" fill="transparent" stroke="var(--prj-border-medium)" strokeWidth="1" />
        <text x="20" y="80" fill="var(--prj-text-secondary)" fontSize="9" fontFamily="var(--prj-font-mono)">Email Input</text>

        {/* Drop zone */}
        <rect x="12" y="96" width="176" height="24" rx="4" fill="transparent" stroke="var(--prj-text-muted)" strokeWidth="1" strokeDasharray="4 3" />
        <text x="100" y="112" textAnchor="middle" fill="var(--prj-text-muted)" fontSize="9" fontFamily="var(--prj-font-mono)">+ drop here</text>

        {/* Submit button */}
        <rect x="55" y="126" width="90" height="16" rx="8" fill="var(--prj-accent-green)" />
        <text x="100" y="137" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="var(--prj-font-mono)">SUBMIT</text>
      </g>

      {/* ── Right Top: Responses ── */}
      <g className="prj-float prj-float-delay-1">
        <rect x="220" y="0" width="120" height="65" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="240" y="16" fill="var(--prj-text-muted)" fontSize="8" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">RESPONSES</text>
        <text x="310" y="16" fill="var(--prj-accent-green)" fontSize="10" fontWeight="bold" fontFamily="var(--prj-font-mono)">247</text>
        {/* Mini bar chart */}
        <rect x="232" y="42" width="8" height="18" rx="1" fill="var(--prj-accent-green)" opacity="0.8" />
        <rect x="244" y="36" width="8" height="24" rx="1" fill="var(--prj-accent-green)" opacity="0.8" />
        <rect x="256" y="28" width="8" height="32" rx="1" fill="var(--prj-accent-green)" />
        <rect x="268" y="45" width="8" height="15" rx="1" fill="var(--prj-accent-green)" opacity="0.6" />
        <rect x="280" y="38" width="8" height="22" rx="1" fill="var(--prj-accent-green)" opacity="0.8" />
        <rect x="292" y="32" width="8" height="28" rx="1" fill="var(--prj-accent-green)" opacity="0.9" />
        <rect x="304" y="40" width="8" height="20" rx="1" fill="var(--prj-accent-green)" opacity="0.7" />
        <rect x="316" y="34" width="8" height="26" rx="1" fill="var(--prj-accent-green)" opacity="0.85" />
      </g>

      {/* ── Right Bottom: PDF Export ── */}
      <g className="prj-float prj-float-delay-2">
        <rect x="220" y="75" width="120" height="70" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="280" y="92" textAnchor="middle" fill="var(--prj-text-muted)" fontSize="8" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">PDF EXPORT</text>
        {/* Document mockup */}
        <rect x="235" y="100" width="55" height="35" rx="3" fill="#1a1a28" />
        <rect x="240" y="108" width="35" height="2" rx="1" fill="var(--prj-text-muted)" opacity="0.5" />
        <rect x="240" y="114" width="28" height="2" rx="1" fill="var(--prj-text-muted)" opacity="0.4" />
        <rect x="240" y="120" width="40" height="2" rx="1" fill="var(--prj-text-muted)" opacity="0.3" />
        <rect x="240" y="126" width="22" height="2" rx="1" fill="var(--prj-text-muted)" opacity="0.3" />
        {/* PDF icon */}
        <rect x="302" y="103" width="28" height="28" rx="4" fill="#a855f7" opacity="0.2" />
        <text x="316" y="121" textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold" fontFamily="var(--prj-font-mono)">PDF</text>
      </g>
    </svg>
  </div>
);

const CivicAIDiagram = () => (
  <div style={{ position: 'relative', width: '100%', height: '100%', padding: '24px' }}>
    {/* Label */}
    <div
      style={{
        fontFamily: 'var(--prj-font-mono)',
        fontSize: '12px',
        letterSpacing: '1px',
        color: 'var(--prj-text-muted)',
        marginBottom: '16px',
      }}
    >
      [CIVIC AI]
    </div>

    <svg
      width="100%"
      height="150"
      viewBox="0 0 420 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* ── Left: Citizen card ── */}
      <g className="prj-float">
        <rect x="0" y="20" width="80" height="60" rx="8" fill="var(--prj-bg-mini-panel)" stroke="var(--prj-border-light)" strokeWidth="1" />
        <text x="40" y="38" textAnchor="middle" fill="var(--prj-text-label)" fontSize="9" fontFamily="var(--prj-font-mono)">CITIZEN</text>
        {/* Camera icon */}
        <circle cx="30" cy="58" r="8" fill="none" stroke="var(--prj-text-muted)" strokeWidth="1.2" />
        <circle cx="30" cy="58" r="3" fill="var(--prj-text-muted)" />
        <rect x="44" y="50" width="3" height="16" rx="1" fill="var(--prj-text-muted)" opacity="0.6" />
      </g>

      {/* ── Dashed line: Citizen → AI ── */}
      <path d="M 85 50 L 145 50" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeDasharray="4 3" className="prj-dash-line" fill="none" />

      {/* ── Center: AI node ── */}
      <g className="prj-float prj-float-delay-1">
        <circle cx="185" cy="50" r="28" fill="none" stroke="#a855f7" strokeWidth="1.5" opacity="0.5" />
        <circle cx="185" cy="50" r="20" fill="#0f0f17" stroke="#a855f7" strokeWidth="2" />
        <text x="185" y="55" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="var(--prj-font-sans)">AI</text>
      </g>
      <text x="185" y="90" textAnchor="middle" fill="#a855f7" fontSize="8" fontFamily="var(--prj-font-mono)" letterSpacing="0.5px">CLASSIFY + ROUTE</text>

      {/* ── Dashed lines: AI → departments ── */}
      <path d="M 215 40 L 270 18" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 3" className="prj-dash-line" fill="none" />
      <path d="M 215 50 L 270 50" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 3" className="prj-dash-line" fill="none" />
      <path d="M 215 60 L 270 82" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" strokeDasharray="4 3" className="prj-dash-line" fill="none" />

      {/* ── Right: Priority chips ── */}
      {/* Roads — HIGH */}
      <g className="prj-float prj-float-delay-2">
        <rect x="275" y="4" width="135" height="28" rx="6" fill="var(--prj-bg-mini-panel)" stroke="rgba(244,63,94,0.4)" strokeWidth="1" />
        <rect x="275" y="4" width="3" height="28" rx="1" fill="#f43f5e" />
        <text x="290" y="18" fill="#fb7185" fontSize="8" fontWeight="600" fontFamily="var(--prj-font-mono)">ROADS</text>
        <text x="290" y="28" fill="var(--prj-text-muted)" fontSize="7" fontFamily="var(--prj-font-mono)">HIGH PRIORITY</text>
        <circle cx="396" cy="14" r="4" fill="#f43f5e" opacity="0.6" />
      </g>

      {/* Electric — MED */}
      <g className="prj-float prj-float-delay-3">
        <rect x="275" y="38" width="135" height="28" rx="6" fill="var(--prj-bg-mini-panel)" stroke="rgba(251,146,60,0.4)" strokeWidth="1" />
        <rect x="275" y="38" width="3" height="28" rx="1" fill="#fb923c" />
        <text x="290" y="52" fill="#fb923c" fontSize="8" fontWeight="600" fontFamily="var(--prj-font-mono)">ELECTRIC</text>
        <text x="290" y="62" fill="var(--prj-text-muted)" fontSize="7" fontFamily="var(--prj-font-mono)">MED PRIORITY</text>
        <circle cx="396" cy="48" r="4" fill="#fb923c" opacity="0.6" />
      </g>

      {/* Parks — LOW */}
      <g className="prj-float prj-float-delay-1">
        <rect x="275" y="72" width="135" height="28" rx="6" fill="var(--prj-bg-mini-panel)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
        <rect x="275" y="72" width="3" height="28" rx="1" fill="#22c55e" />
        <text x="290" y="86" fill="#22c55e" fontSize="8" fontWeight="600" fontFamily="var(--prj-font-mono)">PARKS</text>
        <text x="290" y="96" fill="var(--prj-text-muted)" fontSize="7" fontFamily="var(--prj-font-mono)">LOW PRIORITY</text>
        <circle cx="396" cy="82" r="4" fill="#22c55e" opacity="0.6" />
      </g>

      {/* ── Civic Hero Badge ── */}
      <rect x="125" y="108" width="120" height="24" rx="12" fill="rgba(168,85,247,0.1)" stroke="#a855f7" strokeWidth="1" />
      <text x="185" y="124" textAnchor="middle" fill="#c084fc" fontSize="8" fontWeight="bold" fontFamily="var(--prj-font-mono)">🏆 CIVIC HERO BADGE</text>
    </svg>
  </div>
);

// ═══════════════════════════════════════════════════
// TAG COMPONENT
// ═══════════════════════════════════════════════════

const Tag = ({ label, variant }: TagData) => {
  const isHighlight = variant === 'highlight';
  const isTealTag = ['React', 'Supabase', 'TypeScript'].includes(label);

  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontFamily: 'var(--prj-font-mono)',
    border: '1px solid',
    lineHeight: 1.4,
  };

  if (isHighlight) {
    return (
      <span
        style={{
          ...baseStyle,
          color: 'var(--prj-accent-orange)',
          backgroundColor: 'rgba(251,146,60,0.08)',
          borderColor: 'rgba(251,146,60,0.3)',
        }}
      >
        {label}
      </span>
    );
  }

  return (
    <span
      style={{
        ...baseStyle,
        color: isTealTag ? 'var(--prj-text-teal)' : 'var(--prj-text-tag)',
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderColor: 'var(--prj-border-medium)',
      }}
    >
      {label}
    </span>
  );
};

// ═══════════════════════════════════════════════════
// BADGE COMPONENT
// ═══════════════════════════════════════════════════

const Badge = ({ text, color }: BadgeData) => {
  const colorMap = {
    green: { bg: 'rgba(34,197,94,0.12)', text: 'var(--prj-accent-green)' },
    purple: { bg: 'rgba(168,85,247,0.12)', text: 'var(--prj-accent-purple)' },
    orange: { bg: 'rgba(251,146,60,0.12)', text: 'var(--prj-accent-orange)' },
  };
  const c = colorMap[color];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        width: 'fit-content',
        backgroundColor: c.bg,
        color: c.text,
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        marginBottom: '16px',
        lineHeight: 1,
      }}
    >
      {text}
    </span>
  );
};

// ═══════════════════════════════════════════════════
// PROJECT CARD WRAPPER
// ═══════════════════════════════════════════════════

const diagramComponents: Record<string, React.FC> = {
  'ai-match': AIMatchDiagram,
  'form-builder': FormBuilderDiagram,
  'civic': CivicAIDiagram,
};

interface ProjectCardProps {
  project: ProjectData;
  featured?: boolean;
}

const ProjectCard = ({ project, featured = false }: ProjectCardProps) => {
  const DiagramComponent = diagramComponents[project.diagramType];

  return (
    <article
      className="prj-card-hover"
      style={{
        width: '100%',
        backgroundColor: 'var(--prj-bg-card)',
        border: '1px solid var(--prj-border-card)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ── Visual / Diagram Header Zone ── */}
      <div
        style={{
          backgroundColor: 'var(--prj-bg-card-header)',
          borderBottom: '1px solid var(--prj-border-subtle)',
          minHeight: '150px',
        }}
      >
        {DiagramComponent && <DiagramComponent />}
      </div>

      {/* ── Content Zone ── */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Badge text={project.badge.text} color={project.badge.color} />

        <h3
          style={{
            fontSize: featured ? '24px' : '22px',
            fontWeight: 700,
            color: 'var(--prj-text-primary)',
            marginBottom: '16px',
            lineHeight: 1.3,
            fontFamily: 'var(--prj-font-sans)',
            textTransform: 'none',
            letterSpacing: 'normal',
          }}
        >
          {project.title}
        </h3>

        {/* Horizontal divider */}
        <div
          style={{
            height: '1px',
            width: '100%',
            backgroundColor: 'var(--prj-border-light)',
            marginBottom: '16px',
          }}
        />

        <p
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: 'var(--prj-text-secondary)',
            marginBottom: '20px',
            fontFamily: 'var(--prj-font-sans)',
          }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {project.tags.map((tag, i) => (
            <Tag key={i} label={tag.label} variant={tag.variant} />
          ))}
        </div>
      </div>
    </article>
  );
};

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

const Projects = () => {
  return (
    <div
      className="prj-bg-stars"
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--prj-bg-main)',
        width: '100%',
        fontFamily: 'var(--prj-font-sans)',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '0 24px',
          paddingTop: '48px',
        }}
      >
        {/* ── Header ── */}
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

        {/* Accent underline */}
        <div
          style={{
            width: '56px',
            height: '4px',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, #a855f7, #6366f1)',
            marginBottom: '32px',
          }}
        />
      </div>

      {/* ── Horizontal Scroll Container ── */}
      <div
        className="prj-horizontal-scroll"
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          overflowY: 'hidden',
          gap: '24px',
          scrollBehavior: 'smooth',
          scrollSnapType: 'x mandatory',
          flexWrap: 'nowrap',
          padding: '0 24px 48px 24px',
          width: '100%',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              flexShrink: 0,
              width: '600px',
              scrollSnapAlign: 'start',
              display: 'flex', // So ProjectCard can fill vertical space if needed
            }}
          >
            <ProjectCard project={project} featured={project.id === 'devhire'} />
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .prj-horizontal-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.15) transparent;
        }
        .prj-horizontal-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .prj-horizontal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .prj-horizontal-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255,255,255,0.15);
          border-radius: 4px;
        }
        @media (max-width: 768px) {
          .prj-horizontal-scroll > div {
            width: 85vw !important; /* Adjust width on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
