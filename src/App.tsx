import React from 'react';
import { Layout } from './components/Layout.js';
import { ThreeBackground } from './components/ThreeBackground.js';
import { motion } from 'motion/react';

function SectionLabel({ label, num }: { label: string, num: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-sm text-text-muted">{num}</span>
      <span className="block w-8 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {label}
      </span>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <ThreeBackground />
      <div className="relative w-full lg:w-[55vw] z-10 flex flex-col bg-bg/80 lg:bg-transparent lg:backdrop-blur-none backdrop-blur-md">
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 md:pt-56 md:pb-32 px-6 md:px-12 w-full min-h-[90vh] flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-brand leading-[1.05] mb-8">
            The stablecoin <br />
            <span className="text-text-muted">blockchain.</span>
          </h1>
          <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-12">
            The unified Layer-1 uniting every stablecoin across every chain and bank account into a single liquidity layer. 
            No destination gas fees. Global liquidity lives here, and routes seamlessly everywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#docs" className="bg-brand-light text-white px-8 py-4 rounded font-medium hover:bg-brand transition text-center shadow-lg shadow-brand/10">
              Read Documentation
            </a>
          </div>
        </motion.div>
      </section>

      {/* Gas Section */}
      <section id="gas" className="py-24 border-t border-border overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
          <SectionLabel num="01" label="Gas Mechanism" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
            Multi-Currency Gas
          </h2>
          
          <div className="mb-12">
            <p className="text-lg text-text-muted leading-relaxed">
              Pay gas in any stablecoin—no native gas token required. Validators receive direct credit in the chosen currency, eliminating swaps and slippage.
            </p>
          </div>

          <div className="mt-8">
            <div className="space-y-8">
              {[
                { title: 'FX Oracle', desc: 'On-chain FX translation with strong outlier filtering for accurate fee metering.' },
                { title: 'Auto-Resolve', desc: 'Wallet-inferred fee token resolution allows seamless transactions for the user.' },
                { title: 'EVM Ready', desc: 'Vanilla EVM wallets work natively with stablecoin fee deduction.' },
              ].map((item, idx) => (
                <div key={idx} className="border-t border-border/40 pt-6">
                  <h3 className="font-medium text-brand text-lg mb-2">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gateway Section */}
      <section id="gateway" className="py-24 border-t border-border relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
          <SectionLabel num="02" label="Fiat Rails" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
            Native Gateway Protocol
          </h2>
          
          <div className="mb-12">
            <p className="text-lg text-text-muted leading-relaxed">
              Native fiat rail integration. <strong className="text-brand font-medium">MGP</strong> offers gateway precompiles, on-chain escrow, and slashable settlement attestations.
            </p>
          </div>

          <div className="mt-8">
            <div className="border-y border-border/40 divide-y divide-border/40">
                {[
                  { name: 'VietQR', region: 'VN', type: 'Instant Payment' },
                  { name: 'M-Pesa', region: 'KE', type: 'Mobile Money' },
                  { name: 'GCash', region: 'PH', type: 'E-Wallet' },
                  { name: 'UPI', region: 'IN', type: 'Real-time Payment' },
                  { name: 'PIX', region: 'BR', type: 'Instant Payment' }
                ].map((rail) => (
                  <div key={rail.name} className="flex justify-between items-center py-4 group">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-text-dim w-8 group-hover:text-brand-light/70 transition-colors">{rail.region}</span>
                      <span className="font-medium text-brand group-hover:text-brand-light transition-colors">{rail.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-text-muted hidden sm:block">{rail.type}</span>
                      <span className="font-mono text-[10px] text-green tracking-widest">ACTIVE</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          
          <div className="border-l-2 border-brand-light/30 pl-4 py-1 mt-12">
            <p className="text-sm text-text-dim">
              Protocol primitives, not application-layer wrappers. Integrated with Magnus Bridge Standard (MBS).
            </p>
          </div>
        </div>
      </section>

      {/* Netting Section */}
      <section id="netting" className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-12 relative">
          <SectionLabel num="03" label="Liquidity Routing" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
            Multilateral Netting
          </h2>
          
          <div className="mb-12">
            <p className="text-lg text-text-muted leading-relaxed">
              Our <span className="text-brand font-medium">90%+ netting target</span> means most cross-chain transfers never hit a bridge — they net out. This fundamental shift in routing mechanics makes gas-free outbound sends sustainable, as the protocol covers destination gas using netting savings.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-16 pt-8 border-t border-border/40">
            {/* Legacy Bridges */}
            <div className="space-y-6">
              <div className="font-mono text-[10px] text-text-dim uppercase tracking-widest border-b border-border/40 pb-4">Legacy Bridges</div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-text-dim">Topology</span> <span className="text-text-muted">N² Connections</span></div>
                <div className="flex justify-between"><span className="text-text-dim">Efficiency</span> <span className="text-text-muted">High rebalancing costs</span></div>
              </div>
            </div>

            {/* Magnus Protocol */}
            <div className="space-y-6">
              <div className="font-mono text-[10px] text-brand-light uppercase tracking-widest border-b border-brand-light/20 pb-4 flex justify-between">
                <span>Magnus Protocol</span>
                <span className="text-green text-[10px]">90% NET</span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-text-dim">Topology</span> <span className="text-brand">Hub-and-Spoke</span></div>
                <div className="flex justify-between"><span className="text-text-dim">Efficiency</span> <span className="text-brand">Internalized savings</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVM Section */}
      <section id="evm" className="py-24 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <SectionLabel num="04" label="Performance" />
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8 leading-tight text-brand">
            Standard EVM. <br />
            Sub-second finality.
          </h2>
          
          <div className="mt-8">
            <div className="space-y-8">
              {[
                { title: 'High-Performance Execution', desc: 'Standard EVM execution environment. Fully compatible with standard Solidity tooling out of the box.' },
                { title: 'Optimized Consensus', desc: 'Delivers ~200ms blocks with ~300ms deterministic finality.' },
                { title: 'MEV Protection', desc: 'No public mempool. First-come-first-serve ordering natively guarantees no front-running.' },
                { title: 'Isolated Resource Pools', desc: 'Advanced token standard with dedicated payment lanes to prevent noisy-neighbor contention.' },
              ].map((item, idx) => (
                <div key={idx} className="border-t border-border/40 pt-6">
                  <h3 className="font-medium text-brand text-lg mb-2">{item.title}</h3>
                  <p className="text-text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-12 px-6 md:px-12 w-full">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-sm text-text-muted">
          <div className="flex gap-4 items-center">
            <span className="text-brand font-medium flex items-center gap-2">
              <span className="block w-2 h-2 rounded-full bg-brand-light" /> 
              Magnus Network
            </span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-light transition">Twitter</a>
            <a href="#" className="hover:text-brand-light transition">Docs</a>
            <a href="#" className="hover:text-brand-light transition">GitHub</a>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
