import React, { useState } from 'react';
import { Star, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WriteReviewModal({ isOpen, onClose }: WriteReviewModalProps) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('product_reviews').insert([
        { reviewer_name: name, rating, review_text: reviewText }
      ]);

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setName('');
        setRating(5);
        setReviewText('');
        setIsSuccess(false);
      }, 3500);
    } catch (error) {
      console.error(error);
      alert('There was an error submitting your review. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-wayo-dark/40 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-lg p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-wayo-dark transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-wayo-mint/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-teal-600 fill-teal-600" />
            </div>
            <h3 className="text-2xl font-bold text-wayo-dark mb-2 font-display">Thank you!</h3>
            <p className="text-gray-600 font-medium">Your review has been submitted and is pending moderation.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-wayo-dark mb-6 font-display">Write a Review</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">Your Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Priya M."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-wayo-coral focus:bg-white focus:outline-none transition-all font-medium text-wayo-dark"
                />
              </div>

              <div>
                <label className="block text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star 
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating) 
                            ? 'fill-wayo-yellow text-wayo-yellow' 
                            : 'text-gray-200'
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold tracking-wider text-gray-500 uppercase mb-2">Your Review</label>
                <textarea 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  required
                  rows={4}
                  placeholder="Tell us what you think about the Wayo Band..."
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-wayo-coral focus:bg-white focus:outline-none transition-all font-medium text-wayo-dark resize-none"
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading || !name || !reviewText.trim()}
                className="w-full bg-wayo-dark text-white rounded-full font-bold text-lg py-4 mt-2 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all transform active:scale-95 flex justify-center items-center h-[56px]"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
