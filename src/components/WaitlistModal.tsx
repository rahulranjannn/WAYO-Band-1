import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, type FormEvent } from 'react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              {!submitted ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-wayo-dark mb-2">You're early. That's exciting. 🎉</h3>
                    <p className="text-gray-600">
                      Leave your details — we'll reach out the moment Wayo is ready to ship.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all"
                        placeholder="Rahul Sharma"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div>
                      <select required defaultValue="" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all bg-white text-gray-700">
                        <option value="" disabled>Wayo is for my…</option>
                        <option value="Young Child">Young Child</option>
                        <option value="Elderly Parent">Elderly Parent</option>
                        <option value="Both">Both</option>
                        <option value="Myself">Myself</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-wayo-coral hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-wayo-coral/30"
                    >
                      Reserve My Spot →
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                      No payment. No spam. Just an early heads-up.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h3 className="text-2xl font-bold text-wayo-dark mb-2">You're on the list!</h3>
                  <p className="text-gray-600 mb-6">
                    Thanks, {name}. We'll be in touch soon with your early access invite.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-xl transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
