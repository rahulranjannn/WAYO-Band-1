import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote: "My son is 4 and loves running ahead. The first time the band buzzed in a mall I nearly cried I found him in 10 seconds flat.",
      name: "Priya M.",
      location: "Pune"
    },
    {
      quote: "I was skeptical it would be this simple. There's literally nothing to do except wear it. Even my mother figured it out.",
      name: "Rahul S.",
      location: "Delhi"
    },
    {
      quote: "The talk button is our favourite feature. She calls me on her 'Wayo phone' all day.",
      name: "Anita K.",
      location: "Bengaluru"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark font-display">Parents who've tried it</h2>
        </div>

        {/* Mobile: Horizontal Scroll, Desktop: Grid */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-wayo-cream rounded-[2rem] p-8 shadow-sm flex-shrink-0 w-[85vw] md:w-auto snap-center flex flex-col"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-wayo-yellow text-wayo-yellow" />
                ))}
              </div>
              <p className="text-lg text-gray-700 font-medium leading-relaxed italic mb-8 flex-grow">
                "{t.quote}"
              </p>
              <div>
                <p className="font-bold text-wayo-dark">{t.name}</p>
                <p className="text-sm text-gray-500">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
