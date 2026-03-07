import { motion } from 'motion/react';

export function AhaSection() {
  return (
    <section className="pt-12 pb-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-wayo-dark mb-6 md:mb-8 leading-tight">
            It happens in a split second. <br />
            <span className="text-gray-400">You turn around, and they're gone.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 md:mb-12">
            Life is unpredictable. Whether it's a child darting into a crowd at a market or taking one step too close to the pool — Wayo gives your whole family a silent safety net. Two alerts, one band, zero monthly fees.
          </p>

          <div className="bg-wayo-cream p-8 rounded-3xl border border-gray-100 inline-block">
            <p className="text-2xl font-bold text-wayo-dark">
              Wayo is the <span className="text-wayo-coral underline decoration-wavy decoration-2 underline-offset-4">invisible safety thread</span> connecting you to your child.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
