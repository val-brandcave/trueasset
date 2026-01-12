"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

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

export function CostCalculatorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [daysToGetPaid, setDaysToGetPaid] = useState(45);
  const [daysToPaySubs, setDaysToPaySubs] = useState(30);
  const [monthlyVolume, setMonthlyVolume] = useState(500000);
  const [creditCardUsage, setCreditCardUsage] = useState(20);
  const [lineOfCreditRate, setLineOfCreditRate] = useState(8);

  const annualCost = useMemo(() => {
    // Float period (days between paying subs and getting paid from client)
    const floatDays = Math.max(0, daysToGetPaid - daysToPaySubs);

    // Average float amount
    const averageFloat = (monthlyVolume * floatDays) / 30;

    // Interest cost on line of credit
    const locInterest = (averageFloat * (lineOfCreditRate / 100)) * 12;

    // Credit card fees (assuming 2.5% processing fee)
    const ccFees = (monthlyVolume * (creditCardUsage / 100) * 0.025) * 12;

    // Opportunity cost (conservative 5% annual return on capital)
    const opportunityCost = averageFloat * 0.05;

    return {
      total: Math.round(locInterest + ccFees + opportunityCost),
      interest: Math.round(locInterest),
      fees: Math.round(ccFees),
      opportunity: Math.round(opportunityCost),
    };
  }, [daysToGetPaid, daysToPaySubs, monthlyVolume, creditCardUsage, lineOfCreditRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="min-h-screen flex items-center py-32 px-8">
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
              Cost Calculator
            </p>
            <h2 className="font-serif text-[48px] leading-[1.15] tracking-tight text-[#18181b] mb-4">
              What's It Costing You to Be the Bank?
            </h2>
            <p className="text-xl text-[#71717a] leading-relaxed">
              Most builders have no idea how much they're spending to float client projects. Between interest, fees, and opportunity cost, the real number might shock you.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Calculator Inputs */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Days to get paid */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Average days to get paid by clients
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{daysToGetPaid} days</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  value={daysToGetPaid}
                  onChange={(e) => setDaysToGetPaid(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>

              {/* Days to pay subs */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Average days you pay subs
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{daysToPaySubs} days</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="60"
                  value={daysToPaySubs}
                  onChange={(e) => setDaysToPaySubs(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>

              {/* Monthly volume */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Monthly project volume
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{formatCurrency(monthlyVolume)}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="50000"
                  value={monthlyVolume}
                  onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>

              {/* Credit card usage */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Credit card usage
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{creditCardUsage}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={creditCardUsage}
                  onChange={(e) => setCreditCardUsage(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>

              {/* Line of credit rate */}
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium text-[#18181b]">
                    Line of credit interest rate
                  </label>
                  <span className="text-sm font-semibold text-[#18181b]">{lineOfCreditRate}%</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="15"
                  step="0.5"
                  value={lineOfCreditRate}
                  onChange={(e) => setLineOfCreditRate(Number(e.target.value))}
                  className="w-full h-2 bg-[#18181b]/10 rounded-full appearance-none cursor-pointer accent-[#18181b]"
                />
              </div>
            </motion.div>

            {/* Results */}
            <motion.div variants={itemVariants}>
              <div className="bg-[#18181b] rounded-3xl p-10 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <span className="text-white/60 text-sm font-medium">Annual Cost of Being the Bank</span>
                </div>

                <div className="mb-8">
                  <span className="font-serif text-[64px] leading-none tracking-tight">
                    {formatCurrency(annualCost.total)}
                  </span>
                  <span className="text-white/60 text-lg ml-2">/ year</span>
                </div>

                <div className="space-y-4 mb-8 pt-6 border-t border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Interest costs</span>
                    <span>{formatCurrency(annualCost.interest)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Credit card fees</span>
                    <span>{formatCurrency(annualCost.fees)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Opportunity cost</span>
                    <span>{formatCurrency(annualCost.opportunity)}</span>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-6">
                  That's {formatCurrency(annualCost.total)} you could invest in equipment, hiring, or growth. Instead, it's going to banks and card processors.
                </p>

                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white text-[#18181b] hover:bg-white/90"
                >
                  See How LedgerWise Eliminates This Cost
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
