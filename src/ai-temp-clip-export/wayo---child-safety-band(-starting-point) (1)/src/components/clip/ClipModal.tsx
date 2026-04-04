import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, type FormEvent } from 'react';

interface ClipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClipModal({ isOpen, onClose }: ClipModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1A1A2E]/80 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl w-full max-w-[480px] p-8 relative pointer-events-auto shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-extrabold text-wayo-dark mb-2 font-display">
                      Reserve Your Wayo Clip
                    </h3>
                    <p className="text-gray-500 font-medium">
                      We'll send you your pre-order link the moment we go live. No spam, ever.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="hidden" name="product" value="wayo-clip" />
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        className="w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number (+91 XXXXX XXXXX)"
                        className="w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        className="w-full px-4 py-4 rounded-lg bg-gray-50 border border-gray-200 focus:border-wayo-coral focus:ring-2 focus:ring-wayo-coral/20 outline-none transition-all font-medium"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#F5C842] text-[#1A1A2E] py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors mt-4 disabled:opacity-70"
                    >
                      {isSubmitting ? 'Reserving...' : 'Reserve My Wayo Clip →'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-wayo-dark mb-4 font-display">
                    You're on the list!
                  </h3>
                  <p className="text-gray-600 font-medium text-lg">
                    We'll reach out the moment Wayo Clip pre-orders open.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
