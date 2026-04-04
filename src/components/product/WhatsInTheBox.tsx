import { Package, Cable, FileText } from 'lucide-react';
import { motion } from 'motion/react';

export function WhatsInTheBox() {
  const items = [
    { icon: <Package className="w-6 h-6 text-wayo-coral" />, label: "1× Parent Band" },
    { icon: <Package className="w-6 h-6 text-wayo-mint" />, label: "1× Child Band" },
    { icon: <Cable className="w-6 h-6 text-gray-600" />, label: "1× USB-C Charging Cables" },
    { icon: <FileText className="w-6 h-6 text-wayo-yellow" />, label: "1× Quick Start Card" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark mb-12 font-display">Everything you need. Nothing extra.</h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-wayo-cream rounded-[2rem] p-8 sm:p-12 shadow-sm mb-12"
        >
          <img
            src="/mid.webp"
            alt="Wayo Box Contents"
            className="w-full h-auto rounded-xl shadow-md mb-12 object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  {item.icon}
                </div>
                <span className="font-bold text-gray-800">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="text-lg text-gray-600 font-medium">
          Both bands are pre-paired. Open the box, charge, wear, done.
        </p>
      </div>
    </section>
  );
}
