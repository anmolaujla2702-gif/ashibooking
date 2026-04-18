/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InlineWidget } from 'react-calendly';
import { Calendar, Mail, Building2, User, ArrowRight, CheckCircle2, Star, TrendingUp, TrendingDown, DollarSign, ChevronDown, ChevronUp, Check, ShieldCheck, X } from 'lucide-react';

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-white transition-colors"
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-text-secondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="bg-surface border border-white/10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative z-10 shadow-2xl custom-scrollbar"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-8 text-white tracking-tight">{title}</h2>
            <div className="text-text-secondary leading-relaxed space-y-6 font-light">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const [params, setParams] = useState({
    name: '',
    email: '',
    clinic: '',
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showBAA, setShowBAA] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setParams({
      name: urlParams.get('name') || '',
      email: urlParams.get('email') || '',
      clinic: urlParams.get('clinic') || '',
    });
    setIsLoaded(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({ ...prev, [name]: value }));
  };

  // Calendly pre-fill configuration
  const calendlyPrefill = {
    email: params.email,
    firstName: params.name.split(' ')[0],
    lastName: params.name.split(' ').slice(1).join(' '),
    customAnswers: {
      a1: params.clinic, // Assuming a1 is the clinic field in Calendly
    },
  };

  const scrollToCalendar = () => {
    document.getElementById('calendar-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans selection:bg-white/10">
      {/* SECTION 1: Trust Stack + Hero */}
      
      {/* TOP TRUST BAR */}
      <div className="bg-white/[0.03] border-b border-border py-2 px-4 shrink-0 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-text-secondary font-medium">
          <div className="flex items-center gap-2"><Check className="text-green-500" size={12} strokeWidth={3} /> HIPAA-Compliant & BAA-Signed</div>
          <div className="flex items-center gap-2"><Check className="text-green-500" size={12} strokeWidth={3} /> 47+ Healthcare Practices Audited</div>
          <div className="flex items-center gap-2"><Check className="text-green-500" size={12} strokeWidth={3} /> $2.3M Revenue Recovered</div>
          <div className="flex items-center gap-2"><Check className="text-green-500" size={12} strokeWidth={3} /> 4.9/5.0 Client Rating | NPS: 72</div>
        </div>
      </div>

      <header className="px-8 md:px-12 py-6 flex justify-between items-center bg-bg/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
        <div className="font-bold tracking-tighter text-xl uppercase italic text-white">ASHI OS</div>
        <div className="text-[11px] uppercase tracking-[0.15em] text-text-secondary flex items-center gap-2 font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Priority Invitation
        </div>
      </header>

      <main>
        <AnimatePresence>
          {isLoaded && (
            <>
              {/* HERO SECTION */}
              <section className="relative px-6 py-20 md:py-32 overflow-hidden border-b border-border">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
                
                <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
                      Your 30-Day Revenue Audit <br />
                      <span className="text-text-secondary font-light">
                        (And the Exact Playbook to Recover $40k–$120k)
                      </span>
                    </h1>
                  </motion.div>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-lg md:text-2xl text-text-secondary max-w-3xl mx-auto font-light leading-relaxed"
                  >
                    {params.name ? `${params.name}, most` : "Most"} practices are leaving <span className="text-white font-medium">$100k–$300k on the table annually</span> in invisible patient revenue. We'll show you exactly where yours is and how to recover it in the next 30 days.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center gap-4 pt-6"
                  >
                    <button 
                      onClick={scrollToCalendar}
                      className="bg-white text-bg px-10 py-5 rounded-full font-bold text-lg hover:bg-white/90 transition-all shadow-xl shadow-white/10 group uppercase tracking-tight"
                    >
                      Ready to See Your Numbers?
                      <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                    </button>
                  </motion.div>
                </div>
              </section>

              {/* SECTION: Integrated Calendly (Moved Up) */}
              <section id="calendar-section" className="px-6 py-20 md:py-32 bg-white/[0.02] border-b border-border">
                <div className="max-w-4xl mx-auto space-y-12 text-center">
                  <div className="space-y-6">
                    <div className="text-[10px] md:text-xs font-bold text-white/40 uppercase tracking-[0.4em] flex items-center justify-center gap-3">
                      <Calendar size={14} className="text-green-500" />
                      Onboarding 3–4 practices this month
                    </div>
                  </div>

                  <div className="bg-surface border border-white/5 p-4 md:p-8 rounded-[48px] shadow-2xl relative">
                    <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 bg-white text-bg px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border-4 border-bg shadow-[0_10px_30px_rgba(255,255,255,0.1)]">
                      5 Spots Available This Week
                    </div>

                    <div className="overflow-hidden rounded-[32px] bg-white">
                      <InlineWidget 
                        url="https://calendly.com/anmolaujla2702/new-meeting-1" 
                        prefill={calendlyPrefill}
                        styles={{
                          height: '750px',
                          width: '100%'
                        }}
                        pageSettings={{
                          backgroundColor: 'ffffff',
                          hideEventTypeDetails: true,
                          hideLandingPageDetails: true,
                          primaryColor: '09090b',
                          textColor: '09090b'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: Social Proof / Credibility */}
              <section className="px-6 py-20 md:py-32 border-b border-border bg-white/[0.01]">
                <div className="max-w-7xl mx-auto">
                  {/* STATS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32 text-center">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                        <TrendingUp size={24} />
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white">+12–18%</div>
                        <div className="text-text-secondary text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 font-bold">Patient Reactivation (Month 1)</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 border-y md:border-y-0 md:border-x border-white/10 py-12 md:py-0">
                      <div className="mx-auto w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                        <TrendingDown size={24} />
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white">-25–35%</div>
                        <div className="text-text-secondary text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 font-bold">No-Show Reduction (Month 1)</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center text-yellow-500">
                        <DollarSign size={24} />
                      </div>
                      <div>
                        <div className="text-4xl md:text-5xl font-bold tracking-tighter text-white">$40k–$120k</div>
                        <div className="text-text-secondary text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 font-bold">Avg Month 1 Revenue Recovery</div>
                      </div>
                    </div>
                  </div>

                  {/* TESTIMONIALS */}
                  <div className="space-y-12">
                    <h3 className="text-center text-text-secondary uppercase tracking-[0.3em] text-[10px] font-bold opacity-50">Proven Results</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="bg-surface border border-white/5 p-8 md:p-10 rounded-3xl space-y-6 hover:border-white/10 transition-colors">
                        <div className="flex gap-1 text-yellow-500/80">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                        </div>
                        <p className="text-xl md:text-2xl font-light italic leading-relaxed text-white/90">
                          "I went from thinking we had a marketing problem to realizing it was actually a retention problem. The audit showed us exactly where we were bleeding revenue. We recovered $87,000 in Month 1 alone."
                        </p>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                          <img src="https://picsum.photos/seed/doc1/100/100" alt="Dr. Sarah Chen" className="w-12 h-12 rounded-full grayscale border border-white/10" referrerPolicy="no-referrer" />
                          <div>
                            <div className="font-semibold text-white">Dr. Sarah Chen</div>
                            <div className="text-xs text-text-secondary">MedSpa Owner, Austin, TX</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-surface border border-white/5 p-8 md:p-10 rounded-3xl space-y-6 hover:border-white/10 transition-colors">
                        <div className="flex gap-1 text-yellow-500/80">
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                          <Star size={14} fill="currentColor" />
                        </div>
                        <p className="text-xl md:text-2xl font-light italic leading-relaxed text-white/90">
                          "The no-show automation script alone has freed up 6+ hours per week. That's both revenue recovery and staff sanity. Best investment we made."
                        </p>
                        <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                          <img src="https://picsum.photos/seed/doc2/100/100" alt="Dr. Marcus Johnson" className="w-12 h-12 rounded-full grayscale border border-white/10" referrerPolicy="no-referrer" />
                          <div>
                            <div className="font-semibold text-white">Dr. Marcus Johnson</div>
                            <div className="text-xs text-text-secondary">Cosmetic Dentist, Miami, FL</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 3: What They Actually Get */}
              <section className="px-6 py-24 md:py-32 border-b border-border bg-bg">
                <div className="max-w-4xl mx-auto space-y-20">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">Here's Exactly What Happens <br /> On Your 15-Minute Audit Call</h2>
                  </div>

                  <div className="space-y-0">
                    {[
                      {
                        step: "01",
                        title: "Revenue Leak Analysis (5 min)",
                        desc: "We'll calculate your specific annual revenue leakage using your clinic's data (patient count, LTV, attrition, no-shows).",
                        result: "You'll leave knowing the exact dollar amount you're losing monthly."
                      },
                      {
                        step: "02",
                        title: "The Opportunity (5 min)",
                        desc: "We'll show which of the three systems (reactivation, no-shows, upsells) will give you the fastest Month 1 recovery.",
                        result: "Most practices find $40k–$120k in recoverable revenue."
                      },
                      {
                        step: "03",
                        title: "Your 30-Day Implementation Playbook (3 min)",
                        desc: "We'll outline the exact plan: which system first, how long, expected KPIs, and cost.",
                        result: "You walk away knowing your numbers and your options."
                      },
                      {
                        step: "04",
                        title: "Next Steps (2 min)",
                        desc: "If you want us to implement: We'll discuss the pilot program. If you want to DIY: We'll send the playbook (no cost).",
                        result: "A clear path forward, either with us or on your own."
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="relative pl-12 md:pl-20 pb-16 last:pb-0 group">
                        {idx !== 3 && <div className="absolute left-[5px] md:left-[9px] top-4 w-[1px] h-full bg-white/10 group-hover:bg-white/30 transition-colors" />}
                        <div className="absolute left-0 md:left-2 top-0 w-[12px] h-[12px] md:w-[15px] md:h-[15px] rounded-full border border-white/20 bg-bg ring-4 ring-bg flex items-center justify-center">
                          <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white" />
                        </div>
                        <div className="space-y-3">
                          <div className="text-[10px] font-bold text-white/30 tracking-[0.3em] uppercase">{item.step}</div>
                          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{item.title}</h3>
                          <p className="text-text-secondary leading-relaxed max-w-2xl text-sm md:text-base font-light">{item.desc}</p>
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/5 text-[10px] md:text-xs text-green-400 font-bold border border-green-500/10">
                            <Check size={12} strokeWidth={3} /> Result: {item.result}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 4: Risk Reversal */}
              <section className="px-6 py-24 md:py-32 border-b border-border bg-white/[0.01]">
                <div className="max-w-4xl mx-auto text-center space-y-16">
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">Zero Risk, Maximum Transparency</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {[
                      "The audit is completely free (no CC required)",
                      "No sales pitch during the call (just data + a plan)",
                      "If we don't think you're a fit, we'll tell you directly",
                      "If you want to DIY, we'll send the playbook (no cost)",
                      "Missed KPIs in pilot = 50% credit on Month 2"
                    ].map((bullet, idx) => (
                      <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-surface border border-white/5 items-center">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                          <Check size={14} strokeWidth={3} />
                        </div>
                        <span className="text-white/90 text-sm md:text-base font-medium">{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 5: FAQ */}
              <section className="px-6 py-24 md:py-32 border-b border-border bg-bg">
                <div className="max-w-3xl mx-auto space-y-16">
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Common CEO Objections</h2>
                  </div>
                  <div className="space-y-0 border-t border-white/10">
                    <FAQItem 
                      question='How long is the audit call?'
                      answer='Exactly 15 minutes. We respect your time. Most calls end in 12-14 min.'
                    />
                    <FAQItem 
                      question='Do I need to prepare anything?'
                      answer="Just have handy: approximate patient count, average treatment price, and rough no-show rate. If you don't know these, we estimate during the call."
                    />
                    <FAQItem 
                      question='Is this a sales pitch?'
                      answer='No. We audit 40+ practices monthly. Our job is to show you the numbers and leave it at that. No pressure.'
                    />
                    <FAQItem 
                      question="What if we&apos;re already optimized?"
                      answer='Some practices are. We&apos;ll tell you if that&apos;s the case. But ~85% of practices we audit find $30k–$50k minimum in recoverable revenue.'
                    />
                    <FAQItem 
                      question="What's the cost if we move forward?"
                      answer='Setup: $2,500 (one-time). Monthly: $2,497. Full pilot is 30 days. If you hit the projected KPIs, you keep us. If not, $1,248.50 credit toward Month 2.'
                    />
                    <FAQItem 
                      question="Do you work with [my practice type]?"
                      answer='Yes. We work with MedSpas, dental practices, dermatology clinics, cosmetic surgery, and medical aesthetics.'
                    />
                  </div>
                </div>
              </section>

              {/* FOOTER */}

              <footer className="border-t border-white/5 py-20 px-6 text-center bg-bg relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/20 to-transparent" />
                </div>
                
                <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                  <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 text-white/40">
                      <ShieldCheck size={28} />
                      <div className="font-black tracking-tighter text-2xl uppercase italic text-white/80">ASHI OS</div>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20">
                      © 2024 ASHI INTELLIGENCE • ALL RIGHTS RESERVED
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    <button onClick={() => setShowPrivacy(true)} className="hover:text-white cursor-pointer transition-colors bg-transparent border-none p-0 uppercase tracking-[0.2em] font-bold text-[10px]">Privacy</button>
                    <button onClick={() => setShowTerms(true)} className="hover:text-white cursor-pointer transition-colors bg-transparent border-none p-0 uppercase tracking-[0.2em] font-bold text-[10px]">Terms</button>
                    <button onClick={() => setShowBAA(true)} className="hover:text-white cursor-pointer transition-colors bg-transparent border-none p-0 uppercase tracking-[0.2em] font-bold text-[10px]">BAA Agreement</button>
                  </div>
                </div>
              </footer>

              <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Policy">
                <p className="text-xs uppercase tracking-widest text-white/30 mb-8 font-bold">Last Revised: April 18, 2026</p>
                <p>At Ashi Intelligence, we are committed to protecting the privacy and security of our users' information. This Privacy Policy describes how we collect, use, and disclose information in connection with our website and services, including the Ashi OS patient retention system.</p>
                
                <div className="space-y-4">
                  <h3 className="text-white font-bold">1. Information We Collect</h3>
                  <p>We collect information that you provide directly to us through the Ashi OS funnel, including your name, email address, and the name of your healthcare practice or clinic. We also collect information automatically through cookies and similar tracking technologies, such as Google Analytics, to analyze website traffic and improve our services.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold">2. Use of Information</h3>
                  <p>We use the information we collect to provide and improve the Ashi OS patient retention audit, schedule growth audits, facilitate pilot programs, and communicate with you about our services.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold">3. HIPAA Compliance & BAA</h3>
                  <p>As a provider of services to healthcare practices, we understand the importance of PHI (Protected Health Information) security. Ashi Intelligence is HIPAA-compliant. We sign Business Associate Agreements (BAAs) with all of our healthcare clients to ensure the integrity and confidentiality of patient data.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold">4. Data Sharing</h3>
                  <p>We do not sell your personal information. We may share information with trusted third-party service providers (e.g., Calendly for scheduling) who assist us in operating our business, subject to strict confidentiality and security requirements.</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-bold">5. Your Rights</h3>
                  <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at anmolaujla2702@gmail.com.</p>
                </div>
              </Modal>

              <Modal isOpen={showTerms} onClose={() => setShowTerms(false)} title="Terms of Service">
                <p className="text-xs uppercase tracking-widest text-white/30 mb-8 font-bold">Effective Date: April 18, 2026</p>
                <div className="space-y-4">
                  <h3 className="text-white font-bold">1. Acceptable Use</h3>
                  <p>By using Ashi OS, you agree to provide accurate information and use our services only for legitimate business purposes within the healthcare sector.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-bold">2. Service Scope</h3>
                  <p>Our revenue audits are based on data provided by you and industry benchmarks. Results are projections and not guaranteed financial outcomes.</p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-white font-bold">3. Intellectual Property</h3>
                  <p>All scripts, playbooks, and systems provided during the audit and pilot programs remain the intellectual property of Ashi Intelligence.</p>
                </div>
              </Modal>

              <Modal isOpen={showBAA} onClose={() => setShowBAA(false)} title="BAA Agreement">
                <div className="space-y-4">
                  <h3 className="text-white font-bold">Business Associate Agreement (Summary)</h3>
                  <p>This Business Associate Agreement ("BAA") is entered into between Ashi Intelligence ("Business Associate") and the Healthcare Practice ("Covered Entity") signing up for our services.</p>
                  <p>We agree to:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Maintain appropriate administrative, physical, and technical safeguards to protect PHI.</li>
                    <li>Report any unauthorized use or disclosure of PHI.</li>
                    <li>Ensure any subcontractors agree to the same restrictions.</li>
                    <li>Make our internal practices, books, and records available to the Secretary of HHS for compliance purposes.</li>
                  </ul>
                  <p className="italic text-sm">The full BAA is provided to clients upon onboarding for the 30-day pilot program.</p>
                </div>
              </Modal>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
