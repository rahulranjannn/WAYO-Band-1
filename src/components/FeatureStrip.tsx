import { motion } from 'motion/react';
import { Wifi, Droplet, WifiOff, UserCheck } from 'lucide-react';

export function FeatureStrip() {
    const features = [
        {
            icon: <Wifi className="w-8 h-8 text-wayo-coral" />,
            title: "Always in Range",
            body: "The moment they wander too far, both bands vibrate at once — alerting you and stopping them."
        },
        {
            icon: <Droplet className="w-8 h-8 text-[#2D9C8F]" />,
            title: "Water Alert",
            body: "If the band gets submerged in water, you're instantly alerted. No splash false alarms — only real danger."
        },
        {
            icon: <WifiOff className="w-8 h-8 text-wayo-coral" />,
            title: "No Phone Needed",
            body: "No app, no internet, no SIM. Wayo works completely on its own, right out of the box."
        },
        {
            icon: <UserCheck className="w-8 h-8 text-[#2D9C8F]" />,
            title: "Anyone Can Use It",
            body: "Simple enough for grandparents, comfortable enough for toddlers. Just put it on and go."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-gray-50 rounded-[20px] p-8 border border-gray-100 shadow-sm flex flex-col items-start hover:-translate-y-1 transition-transform"
                        >
                            <div className="bg-white p-3 rounded-2xl shadow-sm mb-6 inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{feature.title}</h3>
                            <p className="text-[#4B5563] leading-relaxed flex-grow">{feature.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
