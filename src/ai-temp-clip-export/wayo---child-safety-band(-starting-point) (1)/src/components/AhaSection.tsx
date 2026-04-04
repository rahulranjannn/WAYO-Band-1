import { motion } from 'motion/react';

export function AhaSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#FFF9F0]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-wayo-dark mb-8 leading-snug font-display">
            You know that feeling. It happens to every parent. In malls. At weddings. On beaches. Wayo Band is the invisible safety thread between you and your child so that moment of panic never has to last more than a second.
          </p>
          <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed mb-8 font-medium">
            It happens to every parent. In malls. At weddings. On beaches. Wayo Band is the invisible safety thread between you and your child so that moment of panic never has to last more than a second.
          </p>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12">
            Two bands. Always connected. Always silent until the moment they need to speak.
          </p>
          <p className="text-xl sm:text-2xl font-bold text-wayo-dark leading-relaxed mb-12">

          </p>

          <p className="text-sm sm:text-base text-gray-500 font-medium">
            Two bands. Always connected. Always silent until the moment they need to speak.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
