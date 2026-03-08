import { motion } from 'motion/react';
import { WifiOff, MapPin, Heart } from 'lucide-react';

export function Benefits() {
  const benefits = [
    {
      icon: <WifiOff className="w-8 h-8 text-white" />,
      title: "Zero Setup",
      description: "No smartphones, no apps, no internet, and no pairing required. It works right out of the box.",
      color: "bg-wayo-coral"
    },
    {
      icon: <MapPin className="w-8 h-8 text-white" />,
      title: "Works Everywhere",
      description: "Perfectly reliable in crowded malls, beaches, underground subways, and remote parks.",
      color: "bg-wayo-yellow"
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Grandparent-Friendly",
      description: "So simple, anyone can use it. Just put it on and go. No tech support needed.",
      color: "bg-wayo-mint"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-wayo-dark mb-6">
              Peace of mind, <br />
              <span className="text-wayo-mint">simplified.</span>
            </h2>
            <p className="text-xl text-[#4B5563] mb-12">
              We stripped away the complexity to build something that actually works when you need it most.
            </p>

            <div className="space-y-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-6">
                  <div className={`w-16 h-16 rounded-2xl ${benefit.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-wayo-dark mb-2">{benefit.title}</h3>
                    <p className="text-[#4B5563] leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-wayo-cream rounded-[3rem] p-8 relative z-10">
              <img
                src="/childband.webp"
                alt="WAYO - Peace of mind, simplified"
                width="800"
                height="800"
                loading="lazy"
                className="rounded-[2rem] w-full shadow-2xl object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-wayo-yellow/20 rounded-[3rem] transform rotate-3 scale-105 -z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
