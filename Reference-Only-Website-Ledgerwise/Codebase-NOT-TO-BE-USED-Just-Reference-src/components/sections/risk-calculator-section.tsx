"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export function RiskCalculatorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [activeProjects, setActiveProjects] = useState(4);
  const [clientDeposits, setClientDeposits] = useState(800000);
  const [subsPerProject, setSubsPerProject] = useState(8);

  const riskMetrics = useMemo(() => {
    // Total funds at risk = client deposits held
    const fundsAtRisk = clientDeposits;

    // Potential lien exposure = avg subs * projects * avg payment (~$15k per sub)
    const lienExposure = activeProjects * subsPerProject * 15000;

    // Risk level calculation (0-100)
    const riskScore = Math.min(100, Math.round(
      (fundsAtRisk / 500000) * 30 +
      (lienExposure / 500000) * 40 +
      (activeProjects / 10) * 30
    ));

    return {
      fundsAtRisk,
      lienExposure,
      riskScore,
      riskLevel: riskScore > 70 ? "High" : riskScore > 40 ? "Medium" : "Low",
    };
  }, [activeProjects, clientDeposits, subsPerProject]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getRiskColor = (score: number) => {
    if (score > 70) return "#ef4444";
    if (score > 40) return "#f59e0b";
    return "#22c55e";
  };

  return (
    <section className="min-h-screen flex items-center py-32 px-8 bg-[#18181b]/[0.02]">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="max-w-2xl mb-16">
            <p className="text-sm font-medium text-[#18181b]/60 uppercase tracking-wider mb-4">
              Risk Calculator
            </p>
            <h2 className="font-serif text-[48px] leading-[1.15] tracking-tight text-[#18181b] mb-4">
              What's Your Exposure Right Now?
            </h2>
            <p className="text-xl text-[#71717a] leading-relaxed">
              Between client deposits, outstanding sub bills, and material costs, you're managing massive amounts of money. If something goes wrong, how much is at risk?
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Calculator Inputs */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Active projects */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Number of active projects
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{activeProjects} projects</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={activeProjects}
                  onChange={(e) => setActiveProjects(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>

              {/* Client deposits */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Total client deposits currently held
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{formatCurrency(clientDeposits)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="3000000"
                  step="50000"
                  value={clientDeposits}
                  onChange={(e) => setClientDeposits(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>

              {/* Subs per project */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Average subs per project
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{subsPerProject} subs</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={subsPerProject}
                  onChange={(e) => setSubsPerProject(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>
            </motion.div>

            {/* Results */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-3xl p-10 border border-[#18181b]/10 shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${getRiskColor(riskMetrics.riskScore)}20` }}
                  >
                    <AlertTriangle
                      className="w-5 h-5"
                      style={{ color: getRiskColor(riskMetrics.riskScore) }}
                    />
                  </div>
                  <span className="text-[#71717a] text-sm font-medium">Current Risk Assessment</span>
                </div>

                {/* Risk gauge */}
                <div className="mb-8">
                  <div className="flex justify-between items-end mb-3">
                    <span
                      className="text-2xl font-bold"
                      style={{ color: getRiskColor(riskMetrics.riskScore) }}
                    >
                      {riskMetrics.riskLevel} Risk
                    </span>
                    <span className="text-4xl font-serif text-[#18181b]">
                      {riskMetrics.riskScore}%
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: getRiskColor(riskMetrics.riskScore) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${riskMetrics.riskScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="p-4 rounded-xl bg-[#18181b]/5">
                    <p className="text-sm text-[#71717a] mb-1">Total funds at risk</p>
                    <p className="text-3xl font-serif text-[#18181b]">
                      {formatCurrency(riskMetrics.fundsAtRisk)}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#18181b]/5">
                    <p className="text-sm text-[#71717a] mb-1">Potential lien exposure</p>
                    <p className="text-3xl font-serif text-[#18181b]">
                      {formatCurrency(riskMetrics.lienExposure)}
                    </p>
                  </div>
                </div>

                <p className="text-[#71717a] text-sm mb-6">
                  That's a lot riding on spreadsheets and trust. One missed payment, one lien, one dispute could unravel everything.
                </p>

                <Button size="lg" className="w-full">
                  Protect Your Business — Request a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
