import { useState, useEffect, useRef } from 'react';
import { Headphones, Play, MessageCircle, Heart, Phone, Lightbulb, X } from 'lucide-react';

export default function Discover() {
  const [activeTab, setActiveTab] = useState('insights');
  const [selectedInsight, setSelectedInsight] = useState(null);

  const insightsRef = useRef(null);
  const resourcesRef = useRef(null);

  const INSIGHT_DATA = {
    stressTrap: {
      title: "The $100k Stress Trap",
      stat: "67%",
      desc1: "of Gen Z view 'income stacking' as a survival requirement, not a choice.",
      desc2: "Our data shows that while side hustles boost income confidence, they are directly correlated with a 40% drop in recovery time and social engagement. Users consistently prioritize hitting arbitrary income milestones without realizing they are essentially paying for that income with their mental health."
    },
    growthHunting: {
      title: "Growth-Hunting over Job-Hopping",
      stat: "1.1 yrs",
      desc2: "They move rapidly to stay ahead of inflation and seek the 70% of promotions they expect within 18 months—prioritizing skills and iteration over corporate loyalty. This creates a highly volatile work environment where 'staying put' is actually viewed as a severe financial risk factor."
    }
  };

  const TIPS_DATA = {
    walkaway: {
      title: 'The "Walk Away" Fund',
      stat: '6mo',
      desc1: 'of basic living expenses saved in cash to buy your freedom.',
      desc2: 'A walk-away fund is not an emergency fund—it is pure career leverage. It gives you the physical and psychological ability to quit a toxic job, take a lower-paying role for drastically better mental health, or negotiate aggressively without the fear of financial ruin.'
    },
    automate: {
      title: 'Robo-Investing',
      stat: '20%',
      desc1: 'of your income should vanish into investments before you see it.',
      desc2: 'Willpower is a finite resource. If you have to actively choose to transfer money to savings every single month, you will eventually fail. Automate your index fund contributions so your wealth compounds in the background while you focus your energy on living.'
    },
    lifestyle: {
      title: 'Lifestyle Deflation',
      stat: 'Flat',
      desc1: 'Keep your fixed costs totally flat even as your income scales.',
      desc2: 'The quickest way back into the rat race is upgrading your car, apartment, and daily habits the second you get a raise. By keeping your monthly burn rate artificially low, every pay bump translates directly into accelerated financial independence.'
    }
  };

  const isClicking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isClicking.current) return;
      if (!resourcesRef.current) return;
      
      const rect = resourcesRef.current.getBoundingClientRect();
      // Physical check considering sticky 180px header height
      if (rect.top <= window.innerHeight * 0.55) {
        setActiveTab('resources');
      } else {
        setActiveTab('insights');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    isClicking.current = true;
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isClicking.current = false; }, 800);
    } else {
      isClicking.current = false;
    }
  };

  return (
    <div className="page-container" style={{ paddingBottom: '120px' }}>
      
      {/* Unified Sticky Top Area covering the notch, header, and tabs */}
      <div className="discover-sticky-header">
        <header className="page-header" style={{ marginBottom: '16px' }}>
          <h1>Discover</h1>
          <p>Validation & Resources</p>
        </header>

        <div className="sub-tabs" style={{ marginBottom: 0 }}>
          <button 
            className={activeTab === 'insights' ? 'active' : ''} 
            onClick={() => scrollToSection('insights')}
          >
            Insights
          </button>
          <button 
            className={activeTab === 'resources' ? 'active' : ''} 
            onClick={() => scrollToSection('resources')}
          >
            Resources
          </button>
        </div>
      </div>

      <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '56px', paddingTop: '24px' }}>
        
        {/* INSIGHTS SECTION */}
        <div id="insights" ref={insightsRef} className="scroll-section">
          
          <div style={{ marginBottom: '24px' }}>
            <h2 className="section-title" style={{ margin: 0, fontSize: '20px' }}>Data Insights</h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-body)' }}>Empirical truths about the Gen Z economy.</p>
          </div>

          <div className="list-spacing">
            <section className="card infographic-card clickable" onClick={() => setSelectedInsight(INSIGHT_DATA.stressTrap)}>
              <h2 style={{ color: "var(--color-stress)" }}>{INSIGHT_DATA.stressTrap.title}</h2>
              <div className="stat-block">
                <span className="stat-number">{INSIGHT_DATA.stressTrap.stat}</span>
                <p>{INSIGHT_DATA.stressTrap.desc1}</p>
              </div>
              <p className="stat-insight line-clamp-2">{INSIGHT_DATA.stressTrap.desc2}</p>
              <div style={{ marginTop: '12px', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600 }}>READ FULL ARTICLE →</div>
            </section>

            <section className="card infographic-card clickable" onClick={() => setSelectedInsight(INSIGHT_DATA.growthHunting)}>
              <h2>{INSIGHT_DATA.growthHunting.title}</h2>
              <div className="stat-block">
                <span className="stat-number">{INSIGHT_DATA.growthHunting.stat}</span>
                <p>{INSIGHT_DATA.growthHunting.desc1}</p>
              </div>
              <p className="stat-insight line-clamp-2">{INSIGHT_DATA.growthHunting.desc2}</p>
              <div style={{ marginTop: '12px', color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600 }}>READ FULL ARTICLE →</div>
            </section>
          </div>

          <div style={{ marginTop: '40px', marginBottom: '24px' }}>
            <h2 className="section-title" style={{ margin: 0, fontSize: '20px' }}>Featured Audio</h2>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-body)' }}>Deep dives and expert interviews.</p>
          </div>

          <section className="card podcast-card" style={{ padding: '24px' }}>
            <div className="podcast-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ backgroundColor: 'var(--color-primary-light)', padding: '12px', borderRadius: '14px', display: 'flex' }}>
                <Headphones size={24} color="#ffffff" />
              </div>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '0.5px' }}>AUDIO EPISODE</span>
                <h3 style={{ margin: '2px 0 0', fontSize: '16px', fontWeight: 600 }}>The Hustler vs The Balancer</h3>
              </div>
            </div>
            <p style={{ margin: '0 0 20px', fontSize: '13px', color: 'var(--color-text-body)', lineHeight: 1.5 }}>
              Is the pursuit of wealth costing us more than we realize? Hear real stories and hidden psychological trade-offs.
            </p>
            <button className="play-button"><Play size={18} style={{ marginRight: '6px' }} /> Play Episode</button>
          </section>
        </div>

        {/* RESOURCES SECTION */}
        <div id="resources" ref={resourcesRef} className="scroll-section">
          
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div className="icon-box" style={{ backgroundColor: '#fcf6bd', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Lightbulb size={24} color="#cca000" />
              </div>
              <div>
                <h2 className="section-title" style={{ margin: 0, fontSize: '20px' }}>Financial Playbooks</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-body)' }}>Actionable strategies for ultimate freedom.</p>
              </div>
            </div>
            
            <div className="list-spacing">
              <section className="card playbook-card clickable" onClick={() => setSelectedInsight(TIPS_DATA.walkaway)} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', position: 'relative', zIndex: 10 }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '14px', background: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#ffffff', pointerEvents: 'none' }}>1</div>
                <div style={{ flex: 1, pointerEvents: 'none' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600, color: 'var(--color-text-title)' }}>The "Walk Away" Fund</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-body)', lineHeight: 1.4 }}>Why 6 months of expenses is the ultimate career leverage.</p>
                </div>
              </section>

              <section className="card playbook-card clickable" onClick={() => setSelectedInsight(TIPS_DATA.automate)} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', position: 'relative', zIndex: 10 }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '14px', background: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#ffffff', pointerEvents: 'none' }}>2</div>
                <div style={{ flex: 1, pointerEvents: 'none' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600, color: 'var(--color-text-title)' }}>Robo-Investing</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-body)', lineHeight: 1.4 }}>Automate 20% of income before you even see it.</p>
                </div>
              </section>

              <section className="card playbook-card clickable" onClick={() => setSelectedInsight(TIPS_DATA.lifestyle)} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '20px', position: 'relative', zIndex: 10 }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '14px', background: '#e05780', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 800, color: '#ffffff', pointerEvents: 'none' }}>3</div>
                <div style={{ flex: 1, pointerEvents: 'none' }}>
                  <h4 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600, color: 'var(--color-text-title)' }}>Lifestyle Deflation</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: 'var(--color-text-body)', lineHeight: 1.4 }}>Keep fixed costs low to maximize ultimate freedom.</p>
                </div>
              </section>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div className="icon-box" style={{ backgroundColor: '#ffc8dd', width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={24} color="#e05780" />
              </div>
              <div>
                <h2 className="section-title" style={{ margin: 0, fontSize: '20px' }}>Crisis & Support</h2>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--color-text-body)' }}>You are more than your productivity.</p>
              </div>
            </div>

            <section className="card resource-card" style={{ padding: '24px' }}>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--color-text-body)', margin: '0 0 24px' }}>
                If burnout is overwhelming you or you feel isolated chasing wealth, please reach out. There is always a way out that doesn't cost your sanity.
              </p>
              <a href="tel:988" className="hotline-button urgent" style={{ marginBottom: '12px' }}><Phone size={18} /> Call Crisis Lifeline (988)</a>
              <button className="hotline-button"><MessageCircle size={18} /> Connect to a Therapist</button>
            </section>
          </div>

        </div>

      </div>

      {/* Insight Reader Modal */}
      {selectedInsight && (
        <div className="modal-overlay" onClick={() => setSelectedInsight(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedInsight(null)}><X size={20} /></button>
            <h2 style={{ marginTop: '12px', marginBottom: '24px', fontSize: '22px' }}>{selectedInsight.title}</h2>
            <div className="stat-block" style={{ marginBottom: '24px', alignItems: 'center' }}>
              <span className="stat-number" style={{ fontSize: '48px', color: 'var(--color-primary)' }}>{selectedInsight.stat}</span>
              <p style={{ fontSize: '15px' }}>{selectedInsight.desc1}</p>
            </div>
            <div style={{ lineHeight: 1.8, color: 'var(--color-text-body)', fontSize: '15px' }}>
              <p>{selectedInsight.desc2}</p>
              <br/>
              <p>Consider how this statistic plays a role in your own decision-making process. Are you optimizing for the metric, or for the quality of life you actually want to experience?</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
