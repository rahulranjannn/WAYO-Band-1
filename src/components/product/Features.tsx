import { motion } from 'motion/react';

export function Features() {
  const features = [
    {
      tag: "SAFETY",
      tagColor: "bg-wayo-coral/10 text-wayo-coral",
      title: "The moment they wander — you know.",
      description: "Most parents don't notice their child has drifted until they're already out of sight. Wayo Band doesn't wait. The instant your child moves beyond a safe distance, your band vibrates and beeps — and so does theirs. It stops them in their tracks and tells you exactly what's happening. No guessing. No searching. No panic.",
      note: "Alert range works up to approximately 30 metres in open spaces. Range may be shorter in buildings with thick walls.",
      image: "/festival1-1080.webp",
      imageAlt: "Child walking away in a market",
      reverse: false
    },
    {
      tag: "PROTECTION",
      tagColor: "bg-wayo-mint/10 text-teal-700",
      title: "Falls in water? You'll know in an instant.",
      description: "Whether it's a swimming pool, a water tank, a flooded street, or even a bucket — the moment the child's band touches water, both bands alarm immediately. Not after a delay. Not when you check your phone. Right now. Because some moments cannot wait.",
      note: "Water detection is on the child's band. Both bands are fully waterproof and safe to wear while swimming.",
      image: "/pool1-1080.webp",
      imageAlt: "Child's wristband near water",
      reverse: true
    },
    {
      tag: "CONNECTION",
      tagColor: "bg-wayo-yellow/20 text-yellow-800",
      title: "Talk to your child — right from your wrist.",
      description: "Press and hold the button on your band. Your voice comes out of their band, wherever they are. They press theirs to reply. It works like a walkie-talkie — but on your wrist. No dialling. No unlocking a phone. Just press, talk, and hear them say \"I'm here, Maa.\"",
      note: "Available exclusively on the Wayo Plus model. Works within the connection range. Half-duplex — one person speaks at a time, like a walkie-talkie.",
      image: "/her-1080.webp",
      imageAlt: "Parent and child talking via wristbands",
      reverse: false
    },
    {
      tag: "SIMPLICITY",
      tagColor: "bg-gray-100 text-gray-700",
      title: "Works even when your phone is dead.",
      description: "Wayo Band doesn't need your phone to be on. It doesn't need WiFi. It doesn't need mobile data. It doesn't have a monthly subscription. The two bands talk directly to each other — always. Charge them, wear them, and they just work. That's it.",
      note: null,
      image: "/three-1080.webp",
      imageAlt: "No phone needed illustration",
      reverse: true
    }
  ];

  return (
    <section className="py-24 bg-wayo-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark font-display">Everything it does. Nothing it doesn't.</h2>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col ${feature.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2"
              >
                <div className="rounded-[2rem] overflow-hidden shadow-xl bg-white aspect-[4/3]">
                  <img 
                    src={feature.image} 
                    alt={feature.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:w-1/2"
              >
                <div className={`inline-block px-4 py-1.5 rounded-full font-bold text-xs tracking-wider uppercase mb-6 ${feature.tagColor}`}>
                  {feature.tag}
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-wayo-dark mb-6 font-display leading-tight">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 font-medium">
                  {feature.description}
                </p>
                {feature.note && (
                  <p className="text-sm text-gray-500 italic">
                    {feature.note}
                  </p>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
