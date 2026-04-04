import { motion } from 'motion/react';

export function ClipUseCases() {
  const cases = [
    { emoji: "🚂", title: "Train Travel", desc: "Sleep on the upper berth. Your luggage below is protected." },
    { emoji: "✈️", title: "Airport", desc: "Step away from your bag at the charging point. You'll know if it moves." },
    { emoji: "🚌", title: "Bus Journey", desc: "Bag in the overhead rack? Wayo's watching it while you nap." },
    { emoji: "🏨", title: "Hotel Room", desc: "Clip it on before housekeeping enters. Peace of mind included." },
    { emoji: "🎪", title: "Markets & Melas", desc: "Put your bag down while you shop. You'll feel it the second someone touches it." },
    { emoji: "🏋️", title: "Gym / Office", desc: "Leave your bag at your locker or desk. Know immediately if it's touched." }
  ];

  return (
    <section className="py-24 bg-wayo-mint/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-wayo-dark font-display">
            Wherever you go. Whatever you carry.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{item.emoji}</div>
                <div>
                  <h3 className="text-xl font-bold text-wayo-dark mb-1">{item.title}</h3>
                  <p className="text-gray-700 font-medium">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
