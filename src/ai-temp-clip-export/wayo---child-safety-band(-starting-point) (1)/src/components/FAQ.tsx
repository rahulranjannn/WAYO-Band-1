import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function FAQ() {
  const faqs = [
    {
      q: "What exactly happens when my child wanders too far?",
      a: "Both bands vibrate and beep at the same time — yours and your child's. Your band tells you they've gone too far. Their band stops them and makes them aware. You both know instantly."
    },
    {
      q: "What if my child falls into water?",
      a: "The child's band detects water contact immediately and both bands alarm. It doesn't wait. It doesn't need you to check anything."
    },
    {
      q: "Can we talk to each other through the bands?",
      a: "Yes, if you choose the Wayo Plus model. Press and hold the button on your band to speak — your voice plays on their band. They press theirs to reply. Like a walkie-talkie, but on your wrist."
    },
    {
      q: "My mother-in-law will be watching the kids. Will she be able to use it?",
      a: "Absolutely. There is nothing to set up or operate. Just wear it. The band does everything on its own."
    },
    {
      q: "What if the bands lose connection in a crowded place?",
      a: "That's the whole point — both bands alarm the moment they lose connection. Being in a crowd doesn't prevent the alert, it triggers it."
    },
    {
      q: "How do I charge it?",
      a: "Plug in the included USB-C cable to any phone charger. Full charge in about 90 minutes. Lasts 2–3 days."
    },
    {
      q: "What is your return policy?",
      a: "7-day no-questions return. If your bands are defective on arrival, we replace them free within 30 days."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-wayo-cream">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark font-display">Questions parents ask</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none min-h-[48px]"
              >
                <span className="font-bold text-wayo-dark pr-8">{faq.q}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-gray-600 font-medium leading-relaxed border-t border-gray-50 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
