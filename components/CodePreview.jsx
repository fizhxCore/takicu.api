import settings from '../src/config/setting.js'

export default function CodePreview() {
  return (
    <section className="code-preview">
      <div className="container">
        <div className="code-box reveal">
          <div className="code-header">
            <div className="code-dots">
              <div className="code-dot red"></div>
              <div className="code-dot yellow"></div>
              <div className="code-dot green"></div>
            </div>
            <div className="code-title">GET /api/stats</div>
          </div>
          
          <div className="code-body" style={{ fontFamily: "var(--font-mono)", fontSize: '0.875rem', lineHeight: '1.6' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>// Quick request example</div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ color: 'var(--accent-violet)', fontWeight: 600 }}>curl</span> -X GET <span style={{ color: 'var(--primary)' }}>{`"${settings.baseUrl}/api/stats?apikey=${settings.apiKey}"`}</span>
            </div>

            <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>// Response 200 OK</div>
            <pre style={{ margin: 0, padding: '12px 14px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border-color)', color: 'var(--success)', overflowX: 'auto' }}>
{`{
    "creator": "${settings.creator}",
    "status": "online",
    "system": {
        "platform": "linux",
        "arch": "x64",
        "uptime": "12h 45m"
    },
    "cpu": {
        "cores": 8,
        "model": "ARMv8 Processor"
    },
    "memory": {
        "used": "120 MB",
        "total": "8192 MB"
    }
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
