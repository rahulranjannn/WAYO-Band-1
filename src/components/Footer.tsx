import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
interface FooterProps {
  onOpenWaitlist: () => void;
}

export function Footer({ onOpenWaitlist }: FooterProps) {
  return (
    <footer className="bg-wayo-dark text-white py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Ready to let them roam?
        </h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Wayo launches in April. Don't miss out on the first batch.
        </p>

        <button
          onClick={onOpenWaitlist}
          className="bg-wayo-mint text-wayo-dark px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-wayo-mint/20 inline-flex items-center gap-3"
        >
          Notify Me <ArrowRight className="w-6 h-6" />
        </button>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p className="text-center md:text-left text-gray-500">
            &copy; 2026 Wayo Band by PSU Pro Enterprises.<br className="hidden sm:block" /> All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-wayo-coral rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wayo-mint rounded-full filter blur-[100px]"></div>
      </div>
    </footer>
  );
}
