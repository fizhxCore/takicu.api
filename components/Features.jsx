import settings from '../src/config/setting.js'

const techStack = [
  {
    name: 'Next.js 16',
    role: 'Frontend & App Router',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 17.562l-7.098-9.986V17.5h-1.928V6.438h1.928l7.098 9.986V6.438h1.928v11.124h-1.928z"/>
      </svg>
    ),
    color: '#F2F1EC',
    bg: 'rgba(242, 241, 236, 0.08)'
  },
  {
    name: 'Hono.js',
    role: 'Ultrafast Web Standards API',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    color: '#FB923C',
    bg: 'rgba(251, 146, 60, 0.12)'
  },
  {
    name: 'Node.js / Bun',
    role: 'High Performance Runtime',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2zm0 2.31l7.5 4.12v7.14L12 19.69l-7.5-4.12V8.43L12 4.31z"/>
      </svg>
    ),
    color: '#4ADE80',
    bg: 'rgba(74, 222, 128, 0.12)'
  },
  {
    name: 'Zod & OpenAPI',
    role: 'Strict Type-Safe Validation',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    color: '#8B7FF5',
    bg: 'rgba(139, 127, 245, 0.12)'
  },
  {
    name: 'Telegram Bot API',
    role: 'Realtime Request Log & Commands',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.66-.54.82-1.09.51l-3.01-2.22-1.45 1.4c-.16.16-.3.3-.61.3l.21-3.05 5.56-5.02c.24-.22-.05-.34-.37-.13l-6.87 4.32-2.96-.92c-.64-.2-.65-.64.13-.95l11.57-4.46c.54-.2 1.01.13.86.94z"/>
      </svg>
    ),
    color: '#38BDF8',
    bg: 'rgba(56, 189, 248, 0.12)'
  }
]

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="container">
        {/* Section 1: Features */}
        <div className="section-title reveal">
          <span className="eyebrow">features</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Why Choose {settings.name}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Designed to deliver exceptional developer experience and performance.</p>
        </div>

        <div className="grid-features" style={{ marginBottom: '4rem' }}>
          {/* Card 1: Ultra Low Latency */}
          <div className="feature-card reveal delay-100">
            <div className="feature-icon" style={{ background: 'rgba(242, 169, 59, 0.12)', color: 'var(--primary)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3>Ultra Low Latency</h3>
            <p>Powered by Next.js & Hono framework for ultra fast, predictable execution speed on <code>{settings.apiUrl}</code>.</p>
          </div>

          {/* Card 2: Realtime Metrics */}
          <div className="feature-card reveal delay-200">
            <div className="feature-icon" style={{ background: 'rgba(62, 207, 142, 0.12)', color: 'var(--success)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <h3>Realtime Metrics & Telegram Bot</h3>
            <p>Built-in system statistics monitor with Telegram Bot integration for live request logging & owner commands.</p>
          </div>

          {/* Card 3: OpenAPI Specs */}
          <div className="feature-card reveal delay-300">
            <div className="feature-icon" style={{ background: 'rgba(139, 127, 245, 0.12)', color: 'var(--accent-violet)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <h3>OpenAPI 3.0 Specs</h3>
            <p>Fully typed endpoints backed by Zod schemas with instant interactive testing playground.</p>
          </div>
        </div>

        {/* Section 2: Technology Stack with Icons */}
        <div className="section-title reveal" style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Powered By Modern Tech Stack</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Teknologi industri mutakhir untuk performa & reliabilitas maksimal.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          {techStack.map((tech, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: tech.bg,
                  color: tech.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {tech.icon}
              </div>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>{tech.name}</h4>
                <p style={{ margin: '2px 0 0', fontSize: '0.775rem', color: 'var(--text-secondary)' }}>{tech.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
