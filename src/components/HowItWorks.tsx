import { motion } from 'motion/react';

export function HowItWorks() {
  const steps = [
    {
      title: "Wear It",
      description: "One band for you, one for them. Soft, comfortable, and fun to wear.",
      image: "https://picsum.photos/seed/wristband/400/400",
      color: "bg-wayo-yellow"
    },
    {
      title: "Roam Free",
      description: "The bands stay completely silent as long as your child is within a safe 10-meter radius.",
      image: "https://picsum.photos/seed/runningkid/400/400",
      color: "bg-wayo-mint"
    },
    {
      title: "Instant Alert",
      description: "If they wander too far, BOTH bands instantly vibrate—stopping them and alerting you.",
      image: "https://picsum.photos/seed/alert/400/400",
      color: "bg-wayo-coral"
    }
  ];

  return (
    <section className="py-24 bg-wayo-cream relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-wayo-dark mb-4">Brilliantly Simple</h2>
          <p className="text-xl text-gray-600">No screens. No confusing maps. Just safety.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="bg-white rounded-[2rem] p-4 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
                <div className={`aspect-square rounded-[1.5rem] overflow-hidden mb-6 relative ${step.color} bg-opacity-20`}>
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                    {index + 1}
                  </div>
                </div>
                <div className="px-4 pb-4 flex-grow">
                  <h3 className="text-2xl font-bold text-wayo-dark mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
