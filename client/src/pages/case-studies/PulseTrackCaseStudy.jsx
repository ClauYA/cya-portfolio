import { useContext } from 'react';
import { AppCtx }    from '../../context/AppContext';
import { PROJECTS }  from '../../data/projects';
import useReadingProgress from '../../hooks/useReadingProgress';

import Eyebrow   from '../../components/ui/Eyebrow';
import Btn       from '../../components/ui/Btn';
import Tag       from '../../components/ui/Tag';
import Reveal    from '../../components/ui/Reveal';
import Container from '../../components/ui/Container';
import Footer    from '../../components/Footer';

export default function PulseTrackCaseStudy({ project = PROJECTS[0] }) {
  const { setPage } = useContext(AppCtx);
  const readingPct  = useReadingProgress();

  const CsSection = ({ eyebrow, children, sage }) => (
    <section style={{ padding: 'clamp(48px,6vw,80px) 0', borderBottom: '1px solid var(--border)' }}>
      <Container>
        <Reveal><Eyebrow sage={sage}>{eyebrow}</Eyebrow></Reveal>
        {children}
      </Container>
    </section>
  );

  const statStyle = {
    textAlign: 'center', padding: '24px 16px', borderRadius: 18,
    background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s',
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <div className="reading-progress-bar">
        <div className="reading-progress-fill" style={{ width: `${readingPct}%` }} />
      </div>

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0 clamp(32px,4vw,56px)' }}>
        <Container>
          <button onClick={() => setPage('projects')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink-2)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 32, transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-2)'}>
            ← Back to projects
          </button>

          <div className="anim-fadeup"><Eyebrow>Case study · {project.num}</Eyebrow></div>
          <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
            {project.title.split('—')[0].trim()} <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>{project.title.split('—')[1]?.trim() || ''}</em>
          </h1>

          <div className="anim-fadeup d200" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 24, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            {[['Role', project.role], ['Duration', project.duration], ['Platform', 'iOS + Android'], ['Tools', project.tools.join(' · ')]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--ink-2)' }}>
                <strong style={{ color: 'var(--ink)' }}>{k}</strong> {v}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── OVERVIEW ── */}
      <CsSection eyebrow="Overview">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, alignItems: 'start', marginTop: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem,2.5vw,2rem)', fontWeight: 400, marginBottom: 20 }}>The central challenge.</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--ink-2)', lineHeight: 1.72 }}>{project.summary}</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.7, marginTop: 16 }}>{project.problem}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['67%','Retention lift'],['4.8★','App Store rating'],['2.1M','Active users'],['-40%','Support tickets']].map(([n, l]) => (
              <div key={l} style={statStyle}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 400, color: 'var(--accent)', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: 8, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </CsSection>

      {/* ── THE PROBLEM ── */}
      <CsSection eyebrow="The Problem">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginTop: 16, marginBottom: 24 }}>Three root causes behind the crisis.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {[
            ['Finding 01','Overwhelming onboarding',   'Users input 12 data points before seeing any value. 41% of all drop-offs occurred here.'],
            ['Finding 02','No perceived progress',     'App tracked data but failed to communicate achievement. Users worked for the app — not the reverse.'],
            ['Finding 03','Generic experience',        'One-size-fits-all content ignored context. Beginners and athletes got identical recommendations.'],
          ].map(([n, t, d]) => (
            <div key={n} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 14, padding: 22 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 10 }}>{n}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{t}</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </CsSection>

      {/* ── RESEARCH ── */}
      <CsSection eyebrow="Research & User Insights" sage>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, marginTop: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 20 }}>3-week sprint: qual + quant.</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 20 }}>18 moderated sessions across 3 segments, heatmap analysis of 12,000+ sessions, 9-app competitive review.</p>
            {[['User interviews','18 sessions'],['Survey responses','340 responses'],['Heatmap sessions','12,000+'],['Competitors reviewed','9 apps']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: 8 }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{k}</span>
                <Tag variant="sage">{v}</Tag>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 20 }}>What users told us.</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                ['Beginners',     '"I feel judged when I miss a day. The streak system makes me want to quit."'],
                ['Intermediates', '"I want to see progress that means something — not just raw numbers."'],
                ['Athletes',      '"The suggestions are for people who\'ve never exercised. Doesn\'t respect my level."'],
                ['Dropouts',      '"I forgot it existed after a week. Nothing made coming back feel worth it."'],
              ].map(([p, q]) => (
                <div key={p} style={{ padding: 18, borderRadius: 12, background: 'var(--sage-s)', border: '1px solid var(--sage-g)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--sage)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>{p}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--ink-2)', fontStyle: 'italic', lineHeight: 1.6 }}>"{q}"</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CsSection>

      {/* ── WIREFRAMES ── */}
      <CsSection eyebrow="Wireframes">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, marginTop: 24, alignItems: 'start' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 20 }}>Early structure exploration.</h2>
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/10', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ width: '82%', height: '78%', display: 'grid', gridTemplateColumns: '1fr 3.2fr', gap: 10 }}>
                <div style={{ background: 'var(--bg-inset)', borderRadius: 5 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ height: 26, background: 'var(--bg-inset)', borderRadius: 5 }} />
                  <div style={{ flex: 1, background: 'var(--bg-inset)', borderRadius: 5 }} />
                  <div style={{ height: 13, background: 'var(--bg-inset)', borderRadius: 5, width: '55%' }} />
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', fontSize: '0.72rem', color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>Dashboard — Low fidelity</div>
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 20 }}>Key decisions.</h2>
            {[
              ['Progressive disclosure', 'Reduced setup from 12 fields to 3. Show value first, collect context gradually.'],
              ['Momentum-based streaks', 'Flexible "momentum" — users can pause without losing progress or feeling shame.'],
              ['Personalized language',  'Dynamic microcopy adapts to level — encouragement for beginners, metrics for athletes.'],
              ['Smart re-engagement',   'Nudge system learns patterns and sends relevant, timely notifications — not spam.'],
            ].map(([t, d]) => (
              <div key={t} style={{ padding: '16px 18px', borderRadius: 10, background: 'var(--bg-card)', border: '1px solid var(--border)', marginBottom: 10 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: 4 }}>{t}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </CsSection>

      {/* ── ITERATIONS ── */}
      <CsSection eyebrow="Iterations">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginTop: 16, marginBottom: 24 }}>Three rounds in four weeks.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 16 }}>
          {[
            ['default','Round 1','Initial concepts',  '3 directions tested: gamification vs. minimalism vs. community.',                              '→ Users wanted encouragement, not competition'],
            ['accent', 'Round 2','Refined direction', '"Warm minimalism" — personal milestones, soft progress indicators, motivational copy.',          '→ Task completion up 38%'],
            ['default','Round 3','Final polish',      'Accessibility audit, animation refinement, edge cases, nudge system.',                          '→ Engineering handoff ready'],
          ].map(([v, r, t, d, ins]) => (
            <div key={r} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', borderTop: v === 'accent' ? '3px solid var(--accent)' : undefined, transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)' }}><Tag variant={v}>{r}</Tag></div>
              <div style={{ padding: '16px 18px' }}>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>{t}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 10 }}>{d}</p>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: 600 }}>{ins}</div>
              </div>
            </div>
          ))}
        </div>
      </CsSection>

      {/* ── DESIGN SYSTEM ── */}
      <CsSection eyebrow="UI Design & Design System" sage>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 48, marginTop: 24 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 20 }}>A lean, scalable component library.</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--ink-2)', lineHeight: 1.7, marginBottom: 24 }}>140+ components, tokenized color variables (dark/light), motion guidelines, developer-ready annotations.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[['140+','Components'],['48','Color tokens'],['12','Type styles'],['8px','Base grid unit']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center', padding: 20, borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', fontWeight: 400, color: 'var(--accent)', lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', marginTop: 6, fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginBottom: 20 }}>Brand color system.</h2>
            {[
              ['#366464','#F0F7F7','Deep Teal · Accent'],
              ['#6B8A73','#fff',   'Muted Sage · Secondary'],
              ['#D9D4CC','#1F1F1F','Light Sand · Neutral'],
              ['#F8F6F2','#1F1F1F','Warm Off-White · Background', '1px solid var(--border)'],
            ].map(([bg, clr, label, border]) => (
              <div key={label} style={{ height: 44, borderRadius: 8, background: bg, color: clr, border, display: 'flex', alignItems: 'center', padding: '0 16px', fontSize: '0.75rem', fontWeight: 600, marginBottom: 8 }}>{label}</div>
            ))}
          </div>
        </div>
      </CsSection>

      {/* ── IMPACT ── */}
      <CsSection eyebrow="Impact">
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, marginTop: 16, marginBottom: 36, letterSpacing: '-.02em' }}>
          The numbers <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>tell the story.</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 14 }}>
          {[['67%','Increase in 30-day retention'],['4.8★','App Store rating (from 3.9)'],['−78%','Onboarding drop-off rate']].map(([n, l]) => (
            <div key={l} style={{ ...statStyle, padding: 36 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.6rem,5vw,3.8rem)', fontWeight: 400, color: 'var(--accent)', lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--ink-3)', marginTop: 10, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </CsSection>

      {/* ── LESSONS ── */}
      <section style={{ padding: 'clamp(48px,6vw,80px) 0' }}>
        <Container>
          <Reveal><Eyebrow>Lessons learned</Eyebrow></Reveal>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', fontWeight: 400, marginTop: 16, marginBottom: 28 }}>What this project taught me.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
            {[
              ['01','Behavior change ≠ better features', 'The solution was removing friction and rewiring the emotional feedback loop — not adding more.'],
              ['02','Test assumptions, not just designs',  'The biggest insight came from questioning the core metric (streaks), not from refining how they looked.'],
              ['03','Language is a design material',       'Microcopy changes drove as much behavior shift as the visual redesign.'],
              ['04','Ship fast, learn faster',             '3 rounds of testing in 4 weeks taught more than weeks of isolated refinement.'],
            ].map(([n, t, d]) => (
              <Reveal key={n}>
                <div style={{ padding: 22, borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', display: 'flex', gap: 18, transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--sage)'; e.currentTarget.style.boxShadow = 'var(--sh-sage)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--border-s)', flexShrink: 0, width: 26, lineHeight: 1.1 }}>{n}</div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 6 }}>{t}</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
              <button onClick={() => setPage('projects')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 500, color: 'var(--ink-2)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color .15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-2)'}>
                ← All projects
              </button>
              <Btn variant="accent" size="lg" onClick={() => setPage('contact')}>Work with me →</Btn>
            </div>
          </Reveal>
        </Container>
      </section>
      <Footer />
    </div>
  );
}