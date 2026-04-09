import { useState, useEffect, useRef, useCallback } from "react";
import { useAppContext } from "../context/AppContext";

// Soft, non-intrusive pastel colors for a more human/organic feel
const COLORS = {
  primary: "var(--color-primary)",
  freeTime: "#bde0fe", // soft blue
  stress: "#ffc8dd",   // soft pink
  social: "#cdb4db",   // soft lavender
  mental: "#a2d2ff",   // light blue
  jobSat: "#ffafcc",   // peach pink
  relation:"#fcf6bd",  // soft yellow
};

export const INSIGHTS = [
  "You are running on fumes. The bank account might look okay, but you're trading your entire youth and sanity for it. Is this survival or self-sabotage?",
  "Total system overload. You've sacrificed sleep, friends, and recovery just to hit a financial aesthetic. The crash is coming.",
  "You're treating yourself like an indestructible machine. The money is flowing, but your social life and mental health are bankrupt.",
  "High extreme hustle without a safety net. You're optimizing for wealth, but paying for it with isolation and chronic stress.",
  "You're defending your projected income, but your mental health is paying the actual bill. Is this milestone worth arriving exhausted?",
  "The hustle is padding your savings, but draining your recovery time. When does 'just one more project' become your entire personality?",
  "A fragile success. You're making decent money, but one bad week could tip your stress levels into a full breakdown.",
  "You're hyper-focused on financial survival. It works for now, but your relationships are starting to feel like distant memories.",
  "You're in the 'grind phase'. You are making sacrifices intentionally, but be careful not to let this temporary sprint become a marathon.",
  "Just barely holding the line. Your ambition is loud, but your need for rest is getting louder. Tipping point approaching.",
  "A shaky equilibrium. You're making compromises to keep afloat financially while desperately trying to retain a sliver of personal time.",
  "You're walking the tightrope. The trade-offs are real, but manageable. Keep protecting your weekends before the hustle creeps in.",
  "Not bad. You're trading some comfort for stability, but you've managed to keep your head above water without losing your friends.",
  "A decent middle ground. You prioritize growth but know when to log off. Your mental health is thanking you for the boundaries.",
  "Solid balance. You've realized that compounding stability is often better than quick, high-stress cash grabs.",
  "You are maintaining a rare equilibrium, keeping your ambition from cannibalizing your free time. Protect this setup.",
  "Great lifestyle design. You're earning what you need while aggressively protecting your peace and social battery.",
  "You've successfully decentralized work from your identity. High free time, low stress—you've traded maximum wealth for maximum life.",
  "Almost zen. You treat income as a tool, not a scoreboard. Your relationships and health are thriving in the space you've created.",
  "Peak Life Quality. You've completely opted out of the hyper-hustle culture. You are rich in time, peace, and human connection."
];

function RadarChart({ data }) {
  const cx = 180, cy = 180, r = 110;
  const labels = ["Free Time", "Stress", "Social Life", "Mental", "Job Sat.", "Relation"];
  const colors = [COLORS.freeTime, COLORS.stress, COLORS.social, COLORS.mental, COLORS.jobSat, COLORS.relation];
  const n = labels.length;
  
  const values = [
    data.freeTime / 10,
    (10 - data.stress) / 10, 
    data.social / 10,
    data.mental / 10,
    data.jobSat / 10,
    data.relation / 10,
  ];

  const angleOf = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, scale) => {
    const a = angleOf(i);
    return [cx + Math.cos(a) * r * scale, cy + Math.sin(a) * r * scale];
  };

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const polyPath = values.map((v, i) => pt(i, Math.max(0.1, Math.min(v, 1))))
                         .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + " Z";

  return (
    <div className="radar-container">
      <svg viewBox="0 0 360 360" width="100%" height="100%" style={{ overflow: "visible" }}>
        {gridLevels.map((lvl) => (
          <polygon
            key={lvl}
            points={Array.from({ length: n }, (_, i) => pt(i, lvl).join(",")).join(" ")}
            fill="none"
            stroke="var(--color-grid)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: n }, (_, i) => {
          const [x, y] = pt(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={x.toFixed(1)} y2={y.toFixed(1)} stroke="var(--color-grid)" strokeWidth="1" />;
        })}
        <path d={polyPath} fill="var(--color-primary-light)" fillOpacity="0.4" stroke="var(--color-primary)" strokeWidth="2" strokeLinejoin="round" />
        {values.map((v, i) => {
          const [x, y] = pt(i, Math.max(0.1, Math.min(v, 1)));
          return <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r="5" fill={colors[i]} />;
        })}
        {labels.map((label, i) => {
          const [x, y] = pt(i, 1.25);
          const anchor = x < cx - 10 ? "end" : x > cx + 10 ? "start" : "middle";
          return (
            <text key={i} x={x.toFixed(1)} y={y.toFixed(1)} textAnchor={anchor} dominantBaseline="middle" className="radar-label">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function ScoreBar({ label, value, max = 10, color }) {
  const pct = Math.max(0, Math.min((value / max) * 100, 100));
  return (
    <div className="score-bar-wrapper">
      <div className="score-bar-header">
        <span>{label}</span>
        <span style={{ color }}>{value}/{max}</span>
      </div>
      <div className="score-bar-track">
        <div className="score-bar-fill" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step = 1, format, onChange }) {
  const percent = ((value - min) / (max - min)) * 100;
  return (
    <div className="input-group">
      <div className="input-header">
        <span>{label}</span>
        <span className="input-value">{format ? format(value) : value}</span>
      </div>
      <input 
        type="range" 
        min={min} 
        max={max} 
        step={step} 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ '--val': `${percent}%` }}
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="toggle-group">
      <span>{label}</span>
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="slider-toggle"></span>
      </label>
    </div>
  );
}

export default function Simulator() {
  const { 
    weeklyHours, setWeeklyHours,
    monthlyIncome, setMonthlyIncome,
    wealthImportance, setWealthImportance,
    riskAppetite, setRiskAppetite,
    jobChanges, setJobChanges,
    sideHustle, setSideHustle,
    outcomes, lifeQualityScore 
  } = useAppContext();
  
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const fetchInsight = useCallback(async (score) => {
    setLoading(true);
    setInsight("");
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 600));
    
    // 5% intervals: 0-4% => index 0, 95-100% => index 19
    const index = Math.min(19, Math.max(0, Math.floor(score / 5)));
    setInsight(INSIGHTS[index]);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchInsight(lifeQualityScore);
    }, 600);
    return () => clearTimeout(debounceRef.current);
  }, [lifeQualityScore, fetchInsight]);

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Trade-off Simulator</h1>
        <p>Directly adjust your choices.</p>
      </header>

      {/* Inputs Section ON TOP for immediate visibility of changes */}
      <section className="card inputs-section">
        <h2>Career Choices</h2>
        <div className="inputs-list">
          <Slider label="Weekly Work Hours" value={weeklyHours} min={20} max={80} format={v => `${v}h`} onChange={setWeeklyHours} />
          <Slider label="Monthly Income Target" value={monthlyIncome} min={2000} max={15000} step={500} format={v => `$${v.toLocaleString()}`} onChange={setMonthlyIncome} />
          <Slider label="Wealth Importance" value={wealthImportance} min={1} max={10} onChange={setWealthImportance} />
          <Slider label="Risk Appetite" value={riskAppetite} min={1} max={10} onChange={setRiskAppetite} />
          <Slider label="Job Changes So Far" value={jobChanges} min={0} max={10} onChange={setJobChanges} />
          <Toggle label="Side Hustle" checked={sideHustle} onChange={setSideHustle} />
        </div>
      </section>

      <section className="card visualizer-section">
        <div className="score-header">
          <h2>Life Quality</h2>
          <div className="score-badge">{lifeQualityScore}%</div>
        </div>
        <RadarChart data={outcomes} />
      </section>

      <section className="card breakdown-section">
        <h2>Impact Breakdown</h2>
        <div className="bar-list">
          <ScoreBar label="Free Time" value={outcomes.freeTime} color={COLORS.freeTime} />
          <ScoreBar label="Stress" value={outcomes.stress} color={COLORS.stress} />
          <ScoreBar label="Social Life" value={outcomes.social} color={COLORS.social} />
          <ScoreBar label="Mental Health" value={outcomes.mental} color={COLORS.mental} />
          <ScoreBar label="Job Satisfaction" value={outcomes.jobSat} color={COLORS.jobSat} />
          <ScoreBar label="Relationships" value={outcomes.relation} color={COLORS.relation} />
        </div>
      </section>

      <section className="card insight-section">
        <h2>AI Analyst Insight</h2>
        <div className="insight-box">
          {loading ? (
            <div className="loading-container">
              <span className="loader"></span>
              <p>Analyzing trade-offs...</p>
            </div>
          ) : (
            <p className="insight-text">{insight}</p>
          )}
        </div>
      </section>
    </div>
  );
}
