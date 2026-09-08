import { useContext, useState, useEffect } from 'react';
import { AppCtx } from '../context/AppContext';

import Eyebrow   from '../components/ui/Eyebrow';
import Btn       from '../components/ui/Btn';
import Reveal    from '../components/ui/Reveal';
import Container from '../components/ui/Container';
import Section   from '../components/ui/Section';
import Footer    from '../components/Footer';

export default function ContactPage() {
  const { lang } = useContext(AppCtx);
  const es = lang === 'es';

  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [formData,  setFormData]  = useState({
    firstName: '', lastName: '', email: '',
    company: '', budget: '', message: '',
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 920);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= 920);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
      try {
        const response = await fetch('https://yaczoe.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(es ? 'Algo salió mal. Por favor intenta de nuevo.' : 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert(es ? 'No se pudo conectar. Por favor escríbeme directamente.' : 'Could not connect. Please email me directly.');
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
            <div className="anim-fadeup"><Eyebrow>{es ? 'Conversemos' : 'Get in touch'}</Eyebrow></div>
            <h1 className="anim-fadeup d100" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-.03em', marginTop: 16 }}>
              {es
                ? <>Construyamos <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>algo</em> grande juntos.</>
                : <>Let's build <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>something</em> great together.</>}
            </h1>
            <p className="anim-fadeup d200" style={{ fontSize: '1.05rem', color: 'var(--ink-2)', marginTop: 20, lineHeight: 1.72 }}>
              {es
                ? 'Ya sea construir desde cero, pulir un producto existente o buscar una socia de diseño a largo plazo — me encantaría saber de ti.'
                : "Building from scratch, refining an existing product, or looking for a long-term design partner — I'd love to hear from you."}
            </p>
          </div>

          {/* ── Grid: links + formulario ── */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: 'clamp(32px,5vw,80px)',
            alignItems: 'start',
          }}>

            {/* ── Links — siempre primero ── */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 12,
              width: isMobile ? '100%' : undefined,
              flexShrink: 0,
              order: 1,
            }}>
              {[
            { 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>,
              label: 'Email',
              value: 'info@yaczoe.com',
              href: 'mailto:info@yaczoe.com'
            },
            { 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>,
              label: 'LinkedIn',
              value: 'linkedin.com/in/claudia-ya',
              href: 'https://www.linkedin.com/in/claudiabittner'
            },
            { 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="#181717">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>,
              label: 'GitHub',
              value: 'github.com/ClauYA',
              href: 'https://github.com/ClauYA'
            },
            { 
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#006BFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>,
              label: es ? 'Agenda una llamada de 30 min' : 'Book a 30-min call',
              value: es ? 'Calendly · Llamada de descubrimiento gratis' : 'Calendly · Free discovery call',
              href: 'https://calendly.com/cyabittner/coffee-chats'
            },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderRadius: 14, background: 'var(--bg-card)', border: '1px solid var(--border)', transition: 'all .2s', textDecoration: 'none' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--sh-md)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div style={{ flexShrink: 0 }}>{icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-3)' }}>{value}</div>
              </div>
            </a>
          ))}


              <Reveal delay={280}>
                <div style={{ padding: '16px 20px', borderRadius: 14, background: 'var(--sage-s)', border: '1px solid var(--sage-g)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--ink-2)' }}>{es ? 'Acepto nuevos proyectos para el Q3 2026. Respondo en menos de 24 h.' : 'Accepting new projects for Q3 2026. Response within 24h.'}</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* ── Formulario — siempre segundo ── */}
            <Reveal delay={100} direction={isMobile ? 'up' : 'right'} style={{ width: isMobile ? '100%' : undefined, flex: isMobile ? undefined : 1, order: 2 }}>
              <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 22, padding: 'clamp(24px,4vw,44px)', boxShadow: 'var(--sh-lg)' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>{es ? 'Envía un mensaje' : 'Send a message'}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-3)', marginBottom: 28 }}>{es ? 'Cuéntame sobre tu proyecto y te respondo pronto.' : "Tell me about your project and I'll get back to you shortly."}</p>

                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '48px 20px' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>{es ? '¡Mensaje enviado!' : 'Message sent!'}</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--ink-2)' }}>{es ? 'Te respondo dentro de las próximas 24 horas.' : "I'll get back to you within 24 hours."}</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      {(es ? [['Nombre','firstName','Ana'],['Apellido','lastName','Pérez']] : [['First name','firstName','Jane'],['Last name','lastName','Smith']]).map(([l, field, p]) => (
                        <div key={l}>
                          <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>{l}</label>
                          <input placeholder={p} value={formData[field]} onChange={handleChange(field)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                        </div>
                      ))}
                    </div>

                    {(es
                      ? [
                          ['Correo electrónico',    'email',   'ana@empresa.com',              'email'],
                          ['Empresa / Tipo de proyecto', 'company', 'ej. Startup de app de fitness', 'text'],
                        ]
                      : [
                          ['Email address',         'email',   'jane@company.com',        'email'],
                          ['Company / Project type', 'company', 'e.g. Fitness App Startup','text'],
                        ]
                    ).map(([l, field, p, type]) => (
                      <div key={l}>
                        <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>{l}</label>
                        <input type={type} placeholder={p} value={formData[field]} onChange={handleChange(field)} style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
                      </div>
                    ))}

                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>{es ? 'Rango de presupuesto' : 'Budget range'}</label>
                      <select value={formData.budget} onChange={handleChange('budget')} style={inputStyle} onFocus={focusInput} onBlur={blurInput}>
                        <option value="">{es ? 'Selecciona un rango' : 'Select a range'}</option>
                        {(es
                          ? ['Menos de $5,000','$5,000 – $15,000','$15,000 – $30,000','$30,000+','Conversémoslo']
                          : ['Under $5,000','$5,000 – $15,000','$15,000 – $30,000','$30,000+','Let\'s discuss']
                        ).map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--ink-2)', display: 'block', marginBottom: 6 }}>{es ? 'Cuéntame sobre tu proyecto' : 'Tell me about your project'}</label>
                      <textarea placeholder={es ? '¿Qué estás construyendo? ¿Qué problema hay que resolver? ¿Cuál es el plazo?' : "What are you building? What problem needs solving? What's the timeline?"} rows={4} value={formData.message} onChange={handleChange('message')} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusInput} onBlur={blurInput} />
                    </div>

                    <Btn variant="accent" fullWidth onClick={handleSubmit}>
                      {loading ? (es ? 'Enviando...' : 'Sending...') : (es ? 'Enviar mensaje →' : 'Send message →')}
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