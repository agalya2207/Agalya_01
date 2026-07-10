import React, { useRef, useState, useEffect } from 'react';
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
  tags: TagData[];
  githubUrl?: string;
  liveUrl?: string;
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
      height="150"
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
        maxWidth: '1080px',
        width: '100%',
        height: 'fit-content',
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
          minHeight: '180px',
          height: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {DiagramComponent && <DiagramComponent />}
      </div>

      {/* ── Content Zone ── */}
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
          {project.tags.map((tag, i) => (
            <Tag key={i} label={tag.label} variant={tag.variant} />
          ))}
        </div>

        {/* ── Actions / Buttons ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <a
            href={project.githubUrl || '#'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '52px',
              backgroundColor: 'var(--prj-bg-mini-panel)',
              border: '1px solid var(--prj-border-light)',
              color: 'var(--prj-text-primary)',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '12px',
              textDecoration: 'none',
              gap: '8px',
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.01 2.05.14 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.64.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href={project.liveUrl || '#'}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '52px',
              backgroundColor: 'var(--prj-accent-green)',
              color: '#ffffff',
              fontSize: '15px',
              fontWeight: 600,
              borderRadius: '12px',
              textDecoration: 'none',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(34,197,94,0.15)',
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
};

// ═══════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Star field canvas
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
      rand(); // discarded — preserves seeded sequence
      rand(); // discarded — preserves seeded sequence                                      
      const b = rand();
      const o = rand();
      const sz = rand();

      // Spread with mild clustering near center-right and bottom-left
      let x, y;
      if (i < 15) {
        // Cluster near center-right
        x = 0.55 + rand() * 0.35;
        y = 0.25 + rand() * 0.45;
      } else if (i < 28) {
        // Cluster near bottom-left
        x = 0.02 + rand() * 0.30;
        y = 0.55 + rand() * 0.40;
      } else {
        x = rand();
        y = rand();
      }

      // Mix: white, slightly blue-white
      const blueShift = b > 0.6;
      stars.push({
        xFrac: x,
        yFrac: y,
        size: 1.0 + sz * 1.5,          // 1.0–2.5 px
        opacity: 0.4 + o * 0.6,         // 0.4–1.0
        blue: blueShift,
        bright: sz > 0.85,              // few large bright dots
      });
    }

    // 4 constellation connections (indices of star pairs)
    const constellations = [
      [3, 11], [11, 22], [22, 37],
      [50, 63], [63, 78],
    ];

    function draw() {
      if (!ctx) return;
      const W = canvas!.width;
      const H = canvas!.height;
      ctx.clearRect(0, 0, W, H);

      // Draw constellation lines first (behind stars)
      ctx.lineWidth = 0.5;
      constellations.forEach(([a, b]) => {
        const sa = stars[a], sb = stars[b];
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.10)';
        ctx.moveTo(sa.xFrac * W, sa.yFrac * H);
        ctx.lineTo(sb.xFrac * W, sb.yFrac * H);
        ctx.stroke();
      });

      // Draw stars
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

        // Extra soft glow for bright stars
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

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft } = scrollRef.current;
    
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    let closestIndex = 0;
    let minDistance = Infinity;
    
    children.forEach((child, index) => {
      // 24px is the container paddingLeft
      const distance = Math.abs(child.offsetLeft - scrollLeft - 24);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    setActiveIndex(closestIndex);
  };

  const scrollPrev = () => {
    if (!scrollRef.current || activeIndex === 0) return;
    const newIndex = activeIndex - 1;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    const target = children[newIndex];
    if (target) {
      scrollRef.current.scrollTo({
        left: target.offsetLeft - 24,
        behavior: 'smooth'
      });
    }
  };

  const scrollNext = () => {
    if (!scrollRef.current || activeIndex === projects.length - 1) return;
    const newIndex = activeIndex + 1;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    const target = children[newIndex];
    if (target) {
      scrollRef.current.scrollTo({
        left: target.offsetLeft - 24,
        behavior: 'smooth'
      });
    }
  };

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

      {/* Purple center glow */}
      <div className="center-glow" />

      {/* Main content wrapper */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            width: '100%',
            padding: '0 24px',
            paddingTop: '48px',
          }}
        >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <div>
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
              }}
            />
          </div>

          {/* ── Navigation ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '4px' }}>
            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', marginRight: '8px' }}>
              {projects.map((_, i) => (
                <div 
                  key={i} 
                  style={{ 
                    width: '6px', height: '6px', borderRadius: '50%', 
                    backgroundColor: i === activeIndex ? '#a855f7' : 'rgba(255,255,255,0.2)',
                    transition: 'background-color 0.3s ease'
                  }} 
                />
              ))}
            </div>

            {/* Left/Right Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={scrollPrev}
                disabled={activeIndex === 0}
                className="prj-nav-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                onClick={scrollNext}
                disabled={activeIndex === projects.length - 1}
                className="prj-nav-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Horizontal Scroll Container ── */}
      <div
        className="prj-horizontal-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
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
              width: 'calc(100vw - 48px)',
              scrollSnapAlign: 'start',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
          >
            <ProjectCard project={project} featured={project.id === 'devhire'} />
          </div>
        ))}
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .prj-horizontal-scroll {
          scrollbar-width: none; /* Firefox */
        }
        .prj-horizontal-scroll::-webkit-scrollbar {
          display: none; /* Chrome/Safari/Edge */
        }
        .prj-nav-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #14141f;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }
        .prj-nav-btn:hover:not(:disabled) {
          background: #1e1e2a;
          border-color: rgba(255,255,255,0.2);
          color: #ffffff;
        }
        .prj-nav-btn:disabled {
          opacity: 0.3;
          pointer-events: none;
        }
        .prj-nav-btn svg {
          width: 20px;
          height: 20px;
        }

        /* Star field canvas */
        .star-canvas {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        /* Purple center glow behind hero */
        .center-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 900px;
          height: 600px;
          background: radial-gradient(ellipse at center,
            rgba(13, 148, 136, 0.40) 0%,
            rgba(8, 100, 92, 0.18) 40%,
            transparent 70%);
          z-index: 2;
          pointer-events: none;
        }
      `}</style>
      </div>
    </div>
  );
};

export default Projects;
