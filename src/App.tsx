/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { InlineWidget } from 'react-calendly';
import { Calendar, Mail, Building2, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [params, setParams] = useState({
    name: '',
    email: '',
    clinic: '',
  });

  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans flex flex-col">
      {/* Header */}
      <header className="px-8 md:px-12 py-8 flex justify-between items-center border-b border-border shrink-0">
        <div className="font-bold tracking-tighter text-xl uppercase">ASHI OS</div>
        <div className="text-[11px] uppercase tracking-[0.1em] text-text-secondary flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          Priority Invitation
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[440px_1fr] overflow-hidden">
        <AnimatePresence>
          {isLoaded && (
            <>
              {/* Left Section: Hero & Form */}
              <motion.section 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="p-8 md:p-12 flex flex-col justify-center border-r border-border bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03)_0%,transparent_70%)] overflow-y-auto"
              >
                <div className="max-w-sm mx-auto lg:mx-0">
                  <h1 className="text-[40px] leading-[1.1] font-semibold mb-6 tracking-tight">
                    {params.name ? (
                      <>
                        {params.name}, let's review{' '}
                        <span className="text-white underline underline-offset-4 decoration-white/30">
                          {params.clinic || 'your clinic'}
                        </span>
                        's patient retention system.
                      </>
                    ) : (
                      "Let's review your clinic's patient retention system."
                    )}
                  </h1>
                  
                  <p className="text-base leading-relaxed text-text-secondary mb-10">
                    Pick a time below for your 15-minute growth audit. We've pre-filled your details to keep things frictionless.
                  </p>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-text-secondary">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={params.name}
                        onChange={handleInputChange}
                        className="bg-surface border border-border px-4 py-3 rounded-lg text-sm text-text-primary outline-none focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-text-secondary">Company / Clinic</label>
                      <input
                        type="text"
                        name="clinic"
                        value={params.clinic}
                        onChange={handleInputChange}
                        className="bg-surface border border-border px-4 py-3 rounded-lg text-sm text-text-primary outline-none focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] uppercase tracking-wider text-text-secondary">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={params.email}
                        onChange={handleInputChange}
                        className="bg-surface border border-border px-4 py-3 rounded-lg text-sm text-text-primary outline-none focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Right Section: Calendar */}
              <motion.section 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="p-8 md:p-10 flex items-center justify-center bg-bg overflow-y-auto"
              >
                <div className="w-full max-w-[640px] bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
                  <div className="p-6 border-b border-border text-center">
                    <p className="text-sm font-semibold tracking-tight">Select a Time</p>
                  </div>
                  
                  <div className="min-h-[600px] bg-white">
                    <InlineWidget 
                      url="https://calendly.com/ashi-os/30min" 
                      prefill={calendlyPrefill}
                      styles={{
                        height: '650px',
                        width: '100%'
                      }}
                      pageSettings={{
                        backgroundColor: 'ffffff',
                        hideEventTypeDetails: false,
                        hideLandingPageDetails: false,
                        primaryColor: '09090b',
                        textColor: '09090b'
                      }}
                    />
                  </div>

                  <div className="p-6 bg-white/2 border-t border-border text-center">
                    <button className="w-full bg-text-primary text-bg border-none py-3.5 px-7 rounded-lg font-semibold text-sm cursor-pointer uppercase tracking-wider hover:opacity-90 transition-opacity">
                      Confirm My Free Audit
                    </button>
                  </div>
                </div>
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
