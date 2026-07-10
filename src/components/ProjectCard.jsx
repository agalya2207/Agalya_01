import React from 'react';
import ProjectDiagram from './ProjectDiagram';

const Tag = ({ label }) => {
  const isPython = label.startsWith('[') && label.endsWith(']');
  const displayText = isPython ? label.slice(1, -1) : label;
  
  let colorClass = 'text-slate-300 bg-white/5 border border-white/10';
  if (isPython || ['[Python]', '[FastAPI]', '[Pandas]', '[OpenCV]', '[scikit-learn]', '[ReportLab]', '[sentence-transformers]'].includes(label)) {
    colorClass = 'text-amber-400 bg-amber-400/10 border border-amber-400/20';
  } else if (['React', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Vercel', 'Railway', 'dnd-kit', 'Recharts', 'Mapbox'].includes(label)) {
    colorClass = 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20';
  }

  return (
    <span className={`inline-flex items-center text-[13px] font-medium px-3 py-1.5 rounded-full ${colorClass}`}>
      {displayText}
    </span>
  );
};

const Badge = ({ text, variant }) => {
  const classes = {
    green: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
    purple: 'text-purple-400 bg-purple-400/10 border border-purple-400/20',
    amber: 'text-amber-400 bg-amber-400/10 border border-amber-400/20',
  };
  return (
    <span className={`inline-flex items-center w-fit ${classes[variant]} text-xs font-bold tracking-wide px-3 py-1.5 rounded-full mb-6`}>
      {text}
    </span>
  );
};

const ProjectCard = ({ project, featured = false }) => {
  return (
    <article className="bg-[#0b0f19] rounded-[24px] overflow-hidden border border-[#1e293b] flex flex-col shadow-xl hover:shadow-[0_0_40px_-10px_rgba(20,184,166,0.18)] hover:border-[#14b8a6]/40 transition-all duration-300 w-full group">
      
      {/* Diagram Area - Fixed Height 240px */}
      <div className="relative border-b border-[#1e293b] bg-[#070a11] flex justify-center items-center w-full h-[240px] shrink-0 overflow-hidden">
        <div className="absolute top-5 left-5 text-[11px] font-mono text-slate-500 tracking-widest uppercase z-10">{project.label}</div>
        <ProjectDiagram type={project.diagramType} />
      </div>
      
      {/* Content Area - Generous Padding */}
      <div className="p-8 lg:p-10 flex flex-col flex-grow">
        
        {/* Layout Order: Badge -> Title -> Description -> Tech -> Buttons */}
        <Badge text={project.badge.text} variant={project.badge.variant} />
        
        <h3 className="text-2xl lg:text-3xl font-bold font-sans text-white mb-4 leading-tight shrink-0">
          {project.title}
        </h3>
        
        <p className="text-[#94a3b8] mb-8 text-[15px] lg:text-[16px] leading-relaxed shrink-0">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2.5 mb-10 shrink-0">
          {project.tags.map(t => <Tag key={t} label={t} />)}
        </div>
        
        {/* Actions - Two Column Layout, Equal Width */}
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <a href={project.github} className="flex justify-center items-center h-[52px] bg-[#1e293b] hover:bg-slate-700 text-white text-[15px] font-semibold rounded-xl transition-colors">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.4-1.34-1.77-1.34-1.77-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02.01 2.05.14 3 .4 2.28-1.55 3.28-1.23 3.28-1.23.66 1.64.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href={project.live} className="flex justify-center items-center h-[52px] bg-[#0d9488] hover:bg-[#0f766e] text-white text-[15px] font-semibold rounded-xl transition-colors shadow-lg shadow-teal-500/25">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            Live Demo
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
