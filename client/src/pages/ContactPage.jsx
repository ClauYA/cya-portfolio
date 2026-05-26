import { useContext, useState } from 'react';
import { AppCtx } from '../context/AppContext';

import Eyebrow   from '../components/ui/Eyebrow';
import Btn       from '../components/ui/Btn';
import Reveal    from '../components/ui/Reveal';
import Container from '../components/ui/Container';
import Section   from '../components/ui/Section';
import Footer    from '../components/Footer';

export default function ContactPage() {
  const { setPage } = useContext(AppCtx);

  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [formData,  setFormData]  = useState({
    firstName: '', lastName: '', email: '',
    company: '', budget: '', message: '',
  });

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Could not connect. Please email me directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: '11px 14px', borderRadius: 10,
    border: '1.5px solid var(--border-m)',
    background: 'var(--bg)', color: 'var(--ink)',
    fontSize: '0.9rem', width: '100%', outline: 'none',
    transition: 'border-color .2s, box-shadow .2s',
  };
  const focusInput = (e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-g)'; };
  const blurInput  = (e) => { e.target.style.borderColor = 'var(--border-m)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ paddingTop: 68 }}>
      <Section>
        <Container>
          {/* Header */}
          <div style={{ maxWidth: 580, marginBottom: 56 }}>
            <div className="anim-fadeup"><Eyebrow>Get in touch</Eyebrow></div>
            <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.8rem,6vw,4.5rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
              Let's build <em style={{ color: 'var(--accent)' }}>something</em><br />great together.
            </h1>
            <p className="anim-fadeup d200" style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 20, lineHeight: 1.72 }}>
              Building from scratch, refining an existing product, or looking for a long-term design partner — I'd love to hear from you.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.15fr)', gap: 'clamp(40px,7vw,80px)', alignItems: 'start' }}>

            {/* Contact links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                ['✉️', 'Email',            '',                 'mailto:info@yaczoe.com'],
                ['💼', 'LinkedIn',         '',      'https://www.linkedin.com/in/claudia-ya/'],
                ['🎨', 'Dribbble',         '',                'https://dribbble.com/cya'],
                ['📅', 'Book a 30-min call','Calendly · Free discovery call', 'https://calendly.com/cyabittner/30min'],
              ].map(([icon, label, val, href], i) => (
                <Reveal key={label} delay={i * 60}>
                  <a href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 20px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--ink)', transition: 'all .2s', textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--bg-inset)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.72rem', color: 'var(--ink-3)', fontWeight: 500, marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{val}</div>
                    </div>
                    <span style={{ color: 'var(--ink-3)' }}>→</span>
                  </a>
                </Reveal>
              ))}

              <Reveal delay={280}>
                <div style={{ padding: '16px 20px', borderRadius: 14, background: 'var(--sage-s)', border: '1px solid var(--sage-g)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.2rem' }}>🌿</span>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--sage)', marginBottom: 2 }}>Currently available</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}>Accepting new projects for Q3 2026. Response within 24h.</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal delay={100} direction="right">
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 22, padding: 'clamp(28px,4vw,44px)', boxShadow: 'var(--sh-lg)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>Send a message</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', marginBottom: 28 }}>Tell me about your project and I'll get back to you shortly.</p>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Message sent!</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)' }}>I'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      {[['First name', 'firstName', 'Jane'], ['Last name', 'lastName', 'Smith']].map(([l, field, p]) => (
                        <div key={l}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>{l}</label>
                          <input
                            placeholder={p}
                            value={formData[field]}
                            onChange={handleChange(field)}
                            style={inputStyle}
                            onFocus={focusInput}
                            onBlur={blurInput}
                          />
                        </div>
                      ))}
                    </div>

                    {[
                      ['Email address',        'email',   'jane@company.com',       'email'],
                      ['Company / Project type','company', 'e.g. Fitness App Startup','text'],
                    ].map(([l, field, p, type]) => (
                      <div key={l}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input
                          type={type}
                          placeholder={p}
                          value={formData[field]}
                          onChange={handleChange(field)}
                          style={inputStyle}
                          onFocus={focusInput}
                          onBlur={blurInput}
                        />
                      </div>
                    ))}

                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Budget range</label>
                      <select
                        value={formData.budget}
                        onChange={handleChange('budget')}
                        style={inputStyle}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      >
                        <option value="">Select a range</option>
                        {['Under $5,000','$5,000 – $15,000','$15,000 – $30,000','$30,000+','Let\'s discuss'].map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>Tell me about your project</label>
                      <textarea
                        placeholder="What are you building? What problem needs solving? What's the timeline?"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange('message')}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    </div>

                    <Btn variant="accent" fullWidth onClick={handleSubmit}>
                      {loading ? 'Sending...' : 'Send message →'}
                    </Btn>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
      <Footer />
    </div>
  );
}