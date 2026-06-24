import React from 'react';

const AIMatchDiagram = () => (
  <svg width="100%" height="100%" viewBox="0 0 800 320" className="w-full h-full object-contain md:object-cover font-mono p-4 md:p-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* LIVE indicator */}
    <g transform="translate(400, 50)">
      <circle cx="-25" cy="-4" r="4" fill="#10b981" />
      <text x="-12" y="0" fill="#10b981" fontSize="11" fontWeight="bold" letterSpacing="0.1em">LIVE</text>
    </g>

    {/* Connections */}
    <path d="M 220 100 Q 310 100 360 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
    <path d="M 220 220 Q 310 220 360 160" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
    <path d="M 440 160 Q 490 100 580 100" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
    <path d="M 440 160 Q 490 220 580 220" stroke="#334155" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

    {/* Left Nodes */}
    <g transform="translate(80, 80)">
      <rect width="140" height="40" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="70" y="16" textAnchor="middle" fill="#64748b" fontSize="9" letterSpacing="0.05em">RESUME</text>
      <text x="70" y="30" textAnchor="middle" fill="#cbd5e1" fontSize="10">resume_agalya.pdf</text>
    </g>
    <g transform="translate(80, 200)">
      <rect width="140" height="40" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="70" y="16" textAnchor="middle" fill="#64748b" fontSize="9" letterSpacing="0.05em">SKILLS</text>
      <text x="70" y="30" textAnchor="middle" fill="#cbd5e1" fontSize="10">cv_2026.txt</text>
    </g>

    {/* Right Nodes */}
    <g transform="translate(580, 80)">
      <rect width="140" height="40" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="70" y="16" textAnchor="middle" fill="#64748b" fontSize="9" letterSpacing="0.05em">JOB_POSTING_A</text>
      <text x="70" y="30" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">★ 97.4% match</text>
    </g>
    <g transform="translate(580, 200)">
      <rect width="140" height="40" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
      <text x="70" y="16" textAnchor="middle" fill="#64748b" fontSize="9" letterSpacing="0.05em">JOB_POSTING_B</text>
      <text x="70" y="30" textAnchor="middle" fill="#64748b" fontSize="10">62.1% match</text>
    </g>

    {/* Center AI Node */}
    <g transform="translate(400, 160)">
      <circle cx="0" cy="0" r="45" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="0" cy="0" r="35" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />
      <circle cx="0" cy="0" r="25" fill="#0f172a" stroke="#8b5cf6" strokeWidth="2" />
      <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="sans-serif">AI</text>
    </g>

    {/* Match Badge */}
    <g transform="translate(400, 240)">
      <rect x="-60" y="0" width="120" height="24" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
      <text x="0" y="16" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">MATCH: 97.4%</text>
    </g>
  </svg>
);

const FormBuilderDiagram = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 220" className="w-full h-full object-contain md:object-cover font-mono p-4 md:p-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Canvas */}
    <rect x="30" y="40" width="180" height="150" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
    <text x="120" y="58" textAnchor="middle" fill="#64748b" fontSize="9" letterSpacing="0.05em">FORM CANVAS</text>
    
    <rect x="40" y="70" width="160" height="24" rx="4" fill="#1e293b" />
    <text x="48" y="85" fill="#cbd5e1" fontSize="9">Text Input - Full Name</text>
    
    <rect x="40" y="100" width="160" height="24" rx="4" fill="#1e293b" />
    <text x="48" y="115" fill="#cbd5e1" fontSize="9">Email Input</text>

    <rect x="40" y="130" width="160" height="30" rx="4" fill="transparent" stroke="#334155" strokeDasharray="4 4" />
    <text x="120" y="148" textAnchor="middle" fill="#475569" fontSize="9">+ drop here</text>

    <rect x="70" y="170" width="100" height="22" rx="11" fill="#059669" />
    <text x="120" y="184" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">SUBMIT</text>

    {/* Right Top - Responses */}
    <rect x="230" y="40" width="100" height="70" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
    <text x="280" y="58" textAnchor="middle" fill="#64748b" fontSize="8" letterSpacing="0.05em">RESPONSES</text>
    <text x="280" y="70" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">247</text>
    <rect x="245" y="85" width="10" height="15" fill="#10b981" />
    <rect x="260" y="80" width="10" height="20" fill="#10b981" />
    <rect x="275" y="70" width="10" height="30" fill="#10b981" />
    <rect x="290" y="90" width="10" height="10" fill="#10b981" />
    <rect x="305" y="80" width="10" height="20" fill="#10b981" />

    {/* Right Bottom - PDF */}
    <rect x="230" y="125" width="100" height="65" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
    <text x="280" y="142" textAnchor="middle" fill="#64748b" fontSize="8" letterSpacing="0.05em">PDF EXPORT</text>
    <rect x="245" y="155" width="70" height="20" rx="3" fill="#1e293b" />
    <rect x="250" y="162" width="40" height="2" fill="#475569" />
    <rect x="250" y="168" width="30" height="2" fill="#475569" />
    <rect x="295" y="158" width="14" height="14" rx="2" fill="#8b5cf6" />
    <text x="302" y="168" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">P</text>
  </svg>
);

const CivicDiagram = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 220" className="w-full h-full object-contain md:object-cover font-mono p-4 md:p-0" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Left Citizen Node */}
    <rect x="30" y="80" width="80" height="60" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
    <text x="70" y="98" textAnchor="middle" fill="#64748b" fontSize="9">CITIZEN</text>
    <circle cx="55" cy="115" r="10" stroke="#475569" strokeWidth="1.5" />
    <circle cx="55" cy="115" r="4" fill="#475569" />
    <rect x="75" y="108" width="2" height="14" fill="#475569" />
    <text x="70" y="132" textAnchor="middle" fill="#475569" fontSize="8">photo</text>

    {/* Connection to AI */}
    <path d="M 110 110 L 155 110" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />

    {/* Center AI Node */}
    <g transform="translate(195, 110)">
      <rect x="-40" y="-35" width="80" height="70" rx="8" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
      <circle cx="0" cy="-5" r="14" fill="none" stroke="#8b5cf6" strokeWidth="1.5" />
      <text x="0" y="-1" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">AI</text>
      <text x="0" y="24" textAnchor="middle" fill="#8b5cf6" fontSize="7">CLASSIFY & ROUTE</text>
      <circle cx="30" cy="-25" r="3" fill="#10b981" />
    </g>

    {/* Connection from AI to Departments */}
    <path d="M 235 110 Q 255 110 255 65 L 275 65" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    <path d="M 235 110 L 275 110" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
    <path d="M 235 110 Q 255 110 255 155 L 275 155" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />

    {/* Departments */}
    <g transform="translate(275, 50)">
      <rect width="90" height="30" rx="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="1" />
      <text x="45" y="14" textAnchor="middle" fill="#fb7185" fontSize="8">⚠️ ROADS</text>
      <text x="45" y="24" textAnchor="middle" fill="#64748b" fontSize="7">HIGH PRIORITY</text>
    </g>
    <g transform="translate(275, 95)">
      <rect width="90" height="30" rx="4" fill="#0f172a" stroke="#eab308" strokeWidth="1" />
      <text x="45" y="14" textAnchor="middle" fill="#fde047" fontSize="8">💡 ELECTRIC</text>
      <text x="45" y="24" textAnchor="middle" fill="#64748b" fontSize="7">MED PRIORITY</text>
    </g>
    <g transform="translate(275, 140)">
      <rect width="90" height="30" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
      <text x="45" y="14" textAnchor="middle" fill="#34d399" fontSize="8">🍃 PARKS</text>
      <text x="45" y="24" textAnchor="middle" fill="#64748b" fontSize="7">LOW PRIORITY</text>
    </g>

    {/* Hero Badge */}
    <g transform="translate(195, 175)">
      <rect x="-55" y="0" width="110" height="24" rx="12" fill="#3b0764" stroke="#a855f7" strokeWidth="1" />
      <text x="0" y="15" textAnchor="middle" fill="#e879f9" fontSize="8" fontWeight="bold">🏆 CIVIC HERO BADGE</text>
    </g>
  </svg>
);

const diagrams = {
  'ai-match': AIMatchDiagram,
  'form-builder': FormBuilderDiagram,
  'civic': CivicDiagram,
};

const ProjectDiagram = ({ type }) => {
  const DiagramComponent = diagrams[type];
  return DiagramComponent ? <DiagramComponent /> : null;
};

export default ProjectDiagram;
