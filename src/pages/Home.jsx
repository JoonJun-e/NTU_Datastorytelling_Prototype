import { useAppContext } from '../context/AppContext';
import { INSIGHTS } from './Simulator';
import logo from '../assets/logo.jpeg';

function MoodFace({ score, size = 64 }) {
  if (score < 20) {
    // 0-19%: Exhausted — warm red
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="45" fill="#ef4444" opacity="0.15" />
        <circle cx="50" cy="50" r="45" fill="none" stroke="#ef4444" strokeWidth="6" />
        <path d="M 30 35 L 42 47 M 42 35 L 30 47" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
        <path d="M 58 35 L 70 47 M 70 35 L 58 47" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
        <path d="M 30 70 L 40 60 L 50 70 L 60 60 L 70 70" fill="none" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  } else if (score < 40) {
    // 20-39%: Stressed — orange
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="45" fill="#f97316" opacity="0.15"/>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="6" />
        <circle cx="35" cy="40" r="5" fill="#f97316" />
        <circle cx="65" cy="40" r="5" fill="#f97316" />
        <path d="M 30 75 Q 50 55 70 75" fill="none" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  } else if (score < 60) {
    // 40-59%: Neutral — yellow (on-theme)
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="45" fill="#eab308" opacity="0.2"/>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#ca8a04" strokeWidth="6" />
        <circle cx="35" cy="40" r="5" fill="#ca8a04" />
        <circle cx="65" cy="40" r="5" fill="#ca8a04" />
        <path d="M 35 65 L 65 65" fill="none" stroke="#ca8a04" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  } else if (score < 80) {
    // 60-79%: Content — coral red
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="45" fill="#f43f5e" opacity="0.15"/>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#f43f5e" strokeWidth="6" />
        <circle cx="35" cy="40" r="5" fill="#f43f5e" />
        <circle cx="65" cy="40" r="5" fill="#f43f5e" />
        <path d="M 30 65 Q 50 80 70 65" fill="none" stroke="#f43f5e" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  } else {
    // 80-100%: Zen / Happy — vivid red
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r="45" fill="#ef4444" opacity="0.15"/>
        <circle cx="50" cy="50" r="45" fill="none" stroke="#dc2626" strokeWidth="6" />
        <path d="M 25 45 Q 35 30 45 45" fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        <path d="M 55 45 Q 65 30 75 45" fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
        <path d="M 30 60 Q 50 85 70 60" fill="none" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }
}

export default function Home() {
  const { lifeQualityScore, monthlyIncome, weeklyHours } = useAppContext();
  
  const insightIndex = Math.min(19, Math.max(0, Math.floor(lifeQualityScore / 5)));
  const currentInsight = INSIGHTS[insightIndex];

  const events = [
    { date: "Today, 6:00 PM", title: "Dinner with friends", type: "social" },
    { date: "Tomorrow, 7:00 AM", title: "Gym Session", type: "health" },
    { date: "Saturday, 12:00 PM", title: "Rest Day / Digital Detox", type: "mental" }
  ];

  return (
    <div className="page-container">
      <header className="page-header">
        <div style={{ height: '75px', overflow: 'hidden', marginBottom: '0px', marginLeft: '-22px' }}>
          <img
            src={logo}
            alt="BalanZE Logo"
            style={{
              height: '110px',
              width: 'auto',
              display: 'block',
              marginTop: '-18px',
              mixBlendMode: 'multiply'
            }}
          />
        </div>
        <p>Your Daily Life Quality Dashboard</p>
      </header>

      <section className="card highlight-card">
        <h2 className="highlight-title">Current Life Quality</h2>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div className="hq-score-display" style={{ margin: 0 }}>
            <span className="big-score">
              {lifeQualityScore}%
            </span>
            <div className="hq-stats">
              <p>Target: <strong>${monthlyIncome.toLocaleString()}</strong></p>
              <p>Effort: <strong>{weeklyHours}h/wk</strong></p>
            </div>
          </div>
          <MoodFace score={lifeQualityScore} size={68} />
        </div>

        <div style={{ borderTop: '1px solid rgba(28,25,23,0.15)', marginTop: '20px', paddingTop: '16px' }}>
          <h3 style={{ margin: '0 0 6px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(28,25,23,0.55)' }}>Insight of the Day</h3>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: 'rgba(28,25,23,0.85)' }}>
            "{currentInsight}"
          </p>
        </div>
      </section>

      <section className="card events-section">
        <h2>Life Events Calendar</h2>
        <p className="subtitle">Remember to prioritize non-work hours.</p>
        <div className="events-list">
          {events.map((ev, i) => (
            <div key={i} className="event-item">
              <div className="event-dot" data-type={ev.type}></div>
              <div className="event-info">
                <h3>{ev.title}</h3>
                <p>{ev.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
