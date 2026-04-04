import { motion } from 'motion/react';

export function ClipFeatures() {
  const features = [
    {
      emoji: "🔔",
      title: "It moves. You know.",
      description: "The moment your bag is lifted, dragged, or carried away even a short distance your wrist buzzes and sounds an alarm. You're awake before they're gone."
    },
    {
      emoji: "📡",
      title: "Works across the compartment.",
      description: "Whether your bag is on the floor below your berth, in the overhead rack, or at the other end of the platform the Clip and Band stay connected across a wide range. No blind spots."
    },
    {
      emoji: "🔋",
      title: "Pack it. Forget it.",
      description: "Charges once via USB-C and lasts for days. Long enough for any journey — Ranchi to Mumbai, or Mumbai to Delhi and back."
    }
  ];

  return (
    <section className="py-24 bg-wayo-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-wayo-dark/5 text-wayo-dark font-bold px-4 py-1.5 rounded-full text-sm mb-6">
            What It Does
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-wayo-dark font-display">
            Three things. All that matter.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            >
              <div className="text-5xl mb-6">{feature.emoji}</div>
              <h3 className="text-2xl font-bold text-wayo-dark mb-4">{feature.title}</h3>
              <p className="text-gray-600 font-medium text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
