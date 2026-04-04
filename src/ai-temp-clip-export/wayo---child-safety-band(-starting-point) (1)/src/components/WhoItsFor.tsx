import { motion } from 'motion/react';

export function WhoItsFor() {
  const personas = [
    {
      title: "The mall trip",
      description: "For when you need them to stay close but you can't hold their hand every second.",
      image: "https://picsum.photos/seed/malltrip/400/300",
      color: "bg-blue-50"
    },
    {
      title: "With grandparents",
      description: "So simple a grandparent can use it. No smartphone needed. Just wear it.",
      image: "https://picsum.photos/seed/grandparentpark/400/300",
      color: "bg-green-50"
    },
    {
      title: "At big gatherings",
      description: "Weddings, fairs, beaches, melas — the places where kids disappear in seconds.",
      image: "https://picsum.photos/seed/weddingkids/400/300",
      color: "bg-orange-50"
    }
  ];

  return (
    <section className="py-24 bg-wayo-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark font-display">Made for every kind of family moment</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`aspect-[4/3] ${persona.color}`}>
                <img 
                  src={persona.image} 
                  alt={persona.title} 
                  className="w-full h-full object-cover mix-blend-multiply opacity-90"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-wayo-dark mb-3 font-display">{persona.title}</h3>
                <p className="text-gray-600 font-medium leading-relaxed">{persona.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
