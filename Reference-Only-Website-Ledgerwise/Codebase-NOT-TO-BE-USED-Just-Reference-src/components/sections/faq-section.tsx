"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "What exactly does LedgerWise do?",
    answer:
      "LedgerWise provides dedicated payment infrastructure for construction — the same kind of financial layer that real estate has had for decades. Each project gets its own deposit account. Client funds flow directly to subs and suppliers, never through your operating account. You manage the build, not the bank.",
  },
  {
    question: "How is this different from using a separate bank account?",
    answer:
      "A separate account is still your money, your liability, your balance sheet. With LedgerWise, client funds are held by a licensed third party at JP Morgan. They're FDIC-insured, protected from your creditors, and completely separate from your business. It's a different architecture entirely.",
  },
  {
    question: "Do I lose control over payments?",
    answer:
      "You gain control, not lose it. You approve every payment before it's released. You see exactly where every dollar goes across every project. The difference is you're removed from the financial risk while maintaining full authority over fund flow.",
  },
  {
    question: "What's in it for subcontractors?",
    answer:
      "Subs get paid in days, not months. They're one ACH away from the source of funds — no more waiting for money to cascade down. And our promise is simple: you sign the lien waiver, we pay. That guarantee doesn't exist anywhere else in construction.",
  },
  {
    question: "Why hasn't construction had this before?",
    answer:
      "It has — in California. Companies have provided this infrastructure for 65 years there. But they're manual, pre-internet operations. LedgerWise modernizes this proven model with software, fintech infrastructure, and proper licensing for national scale.",
  },
  {
    question: "What does it cost?",
    answer:
      "Clients pay a small transaction fee (around 0.4%) for the financial protection they receive. GCs pay a one-time platform fee. Subs pay nothing — ever. Most builders find it costs less than the credit card fees and float they're currently paying.",
  },
];

function QuestionBubble({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="flex justify-start w-full"
    >
      <div className="relative w-full md:w-auto">
        <div className="relative px-5 py-3 md:px-7 md:py-4 w-full md:max-w-[500px] bg-white border border-[#18181b] rounded-2xl md:rounded-full">
          <p className="text-[14px] md:text-[16px] font-medium text-[#18181b]">{children}</p>
        </div>
        <div className="absolute w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-md bg-white border border-[#18181b] -left-4 md:-left-5 bottom-0" />
      </div>
    </motion.div>
  );
}

function AnswerBubble({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="flex justify-start md:justify-end w-full"
    >
      <div className="relative w-full md:w-auto">
        <div className="relative px-5 py-4 md:px-7 md:py-6 w-full md:max-w-[600px] bg-[#3980A5] border border-[#3980A5] rounded-2xl md:rounded-3xl">
          <p className="text-[15px] md:text-[17px] leading-6 md:leading-7 text-white">{children}</p>
        </div>
        <div className="absolute w-[12px] h-[12px] md:w-[14px] md:h-[14px] rounded-md bg-[#3980A5] border border-[#3980A5] -left-4 md:left-auto md:-right-5 -bottom-1" />
      </div>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className="relative z-10 py-16 md:py-32 px-4 md:px-8 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <p className="text-xs md:text-sm font-medium text-[#71717a] uppercase tracking-wider mb-3 md:mb-4">
            Frequently Asked Questions
          </p>
          <h2 className="font-serif text-[28px] md:text-[48px] leading-[1.15] tracking-tight text-[#18181b]">
            Your Questions, Answered
          </h2>
        </div>

        {/* Chat bubbles */}
        <div className="space-y-5 md:space-y-6 px-2 md:px-8">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-3 md:space-y-4">
              <QuestionBubble delay={0}>{faq.question}</QuestionBubble>
              <AnswerBubble delay={0.15}>{faq.answer}</AnswerBubble>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
