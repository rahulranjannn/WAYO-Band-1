export function Footer() {
  return (
    <footer className="bg-wayo-dark text-white pt-16 pb-24 md:pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <div className="text-3xl font-extrabold tracking-tighter text-white mb-2">
              wayo<span className="text-wayo-coral">.</span>
            </div>
            <p className="text-gray-400">The invisible safety thread.</p>
          </div>
          
          <div className="grid grid-cols-2 sm:flex gap-x-8 gap-y-4 text-sm font-medium text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Shipping & Delivery Policy</a>
            <a href="#" className="hover:text-white transition-colors">Return & Refund Policy</a>
            <a href="#" className="hover:text-white transition-colors">Contact / WhatsApp Support</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Wayo Band is a safety companion — not a substitute for adult supervision. Always keep children safe with a responsible adult present.
            <br className="hidden sm:block" />
            &copy; 2026 Wayo Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
