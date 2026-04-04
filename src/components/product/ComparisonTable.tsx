import { Check, Minus } from 'lucide-react';

export function ComparisonTable() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark text-center mb-10 sm:mb-16 font-display max-w-xs sm:max-w-none mx-auto">
          Choose your level of connection.
        </h2>
        
        <div className="relative">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-3 sm:p-6 w-[40%] sm:w-1/2"></th>
                <th className="p-3 sm:p-6 w-[30%] sm:w-1/4 text-center text-base sm:text-xl font-bold text-wayo-dark leading-tight">
                  Wayo <br className="sm:hidden" />Standard
                </th>
                <th className="p-3 sm:p-6 w-[30%] sm:w-1/4 text-center text-base sm:text-xl font-bold text-wayo-coral bg-wayo-cream rounded-t-2xl sm:rounded-t-3xl leading-tight">
                  Wayo <br className="sm:hidden" />Plus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 sm:p-6 text-gray-700 font-medium text-sm sm:text-lg pr-2">Instant Distance Alerts</td>
                <td className="p-3 sm:p-6 text-center"><Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" strokeWidth={3} /></td>
                <td className="p-3 sm:p-6 text-center bg-wayo-cream"><Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" strokeWidth={3} /></td>
              </tr>
              <tr>
                <td className="p-3 sm:p-6 text-gray-700 font-medium text-sm sm:text-lg pr-2">Instant Water Immersion Alerts</td>
                <td className="p-3 sm:p-6 text-center"><Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" strokeWidth={3} /></td>
                <td className="p-3 sm:p-6 text-center bg-wayo-cream"><Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" strokeWidth={3} /></td>
              </tr>
              <tr>
                <td className="p-3 sm:p-6 text-gray-700 font-medium text-sm sm:text-lg pr-2">No App, Phone, or Internet Required</td>
                <td className="p-3 sm:p-6 text-center"><Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" strokeWidth={3} /></td>
                <td className="p-3 sm:p-6 text-center bg-wayo-cream"><Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" strokeWidth={3} /></td>
              </tr>
              <tr>
                <td className="p-3 sm:p-6 text-gray-700 font-medium text-sm sm:text-lg pr-2">Two-Way Voice Calling (Walkie-Talkie)</td>
                <td className="p-3 sm:p-6 text-center"><Minus className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto" strokeWidth={3} /></td>
                <td className="p-3 sm:p-6 text-center bg-wayo-cream"><Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 mx-auto" strokeWidth={3} /></td>
              </tr>
              <tr>
                <td className="p-3 sm:p-6 text-wayo-dark font-bold text-base sm:text-xl border-b-0">Pre-Order Price</td>
                <td className="p-3 sm:p-6 text-center text-wayo-dark font-bold text-base sm:text-xl border-b-0">₹999</td>
                <td className="p-3 sm:p-6 text-center text-wayo-coral font-bold text-lg sm:text-2xl bg-wayo-cream rounded-b-2xl sm:rounded-b-3xl border-b-0">₹1,499</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
