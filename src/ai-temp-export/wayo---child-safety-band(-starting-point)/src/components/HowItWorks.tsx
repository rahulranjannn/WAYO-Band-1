import { motion } from 'motion/react';
import { Heart, Activity, BellRing } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      icon: <Heart className="w-10 h-10 text-wayo-coral" />,
      title: "Wear it",
      description: "One band for you. One for your child. Slip them on and forget about them. They connect to each other automatically — no buttons, no tapping, no waiting.",
      color: "bg-red-50"
    },
    {
      icon: <Activity className="w-10 h-10 text-wayo-mint" />,
      title: "Let them roam",
      description: "As long as your child is within a safe distance, the bands are completely silent. No beeping, no buzzing. Just freedom — for them and for you.",
      color: "bg-teal-50"
    },
    {
      icon: <BellRing className="w-10 h-10 text-wayo-yellow" />,
      title: "Get the instant alert",
      description: "The moment they wander too far, both bands vibrate and beep at the same time. You feel it. They feel it. You find each other in seconds.",
      color: "bg-yellow-50"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark mb-4 font-display">How Wayo Works</h2>
          <p className="text-lg sm:text-xl text-gray-600 font-medium">Three steps. That's it. No setup. No instructions manual. No learning curve.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-wayo-cream rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mb-6 shadow-sm`}>
                {step.icon}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-wayo-dark text-white flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <h3 className="text-2xl font-bold text-wayo-dark font-display">{step.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <p className="text-center text-sm sm:text-base text-gray-500 font-medium max-w-2xl mx-auto">
          Works in crowded malls, busy markets, beaches, parks, railway stations, weddings — anywhere you take your child.
        </p>
      </div>
    </section>
  );
}
