import { Check } from 'lucide-react';

export function ClipComparison() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark text-center mb-16 font-display">
          The smart way to protect what you carry.
        </h2>
        
        <div className="relative overflow-x-auto pb-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-4 sm:p-6 w-[28%]"></th>
                <th className="p-4 sm:p-6 w-[18%] text-center text-lg font-bold text-gray-500">Padlock</th>
                <th className="p-4 sm:p-6 w-[18%] text-center text-lg font-bold text-gray-500">GPS Tracker</th>
                <th className="p-4 sm:p-6 w-[18%] text-center text-lg font-bold text-gray-500">Just Hope</th>
                <th className="p-4 sm:p-6 w-[18%] text-center text-xl font-bold text-wayo-dark bg-[#FFF9F5] rounded-t-2xl">Wayo Clip <Check className="inline w-5 h-5 text-green-500" strokeWidth={3}/></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4 sm:p-6 text-gray-700 font-medium text-base sm:text-lg">Alerts you instantly</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center text-gray-600 font-medium">⚠️ Delayed</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center bg-[#FFF9F5] text-green-600 font-bold">✅ Instant</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 text-gray-700 font-medium text-base sm:text-lg">Works without phone</td>
                <td className="p-4 sm:p-6 text-center text-xl">✅</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center text-xl">✅</td>
                <td className="p-4 sm:p-6 text-center bg-[#FFF9F5] text-xl">✅</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 text-gray-700 font-medium text-base sm:text-lg">Monthly fee</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center text-gray-600 font-medium">₹200–400/mo</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center bg-[#FFF9F5] text-wayo-dark font-bold">Zero. Forever.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 text-gray-700 font-medium text-base sm:text-lg">Wakes you if you're asleep</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center bg-[#FFF9F5] text-xl">✅</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 text-gray-700 font-medium text-base sm:text-lg">Works anywhere (no network)</td>
                <td className="p-4 sm:p-6 text-center text-xl">✅</td>
                <td className="p-4 sm:p-6 text-center text-xl">❌</td>
                <td className="p-4 sm:p-6 text-center text-xl">✅</td>
                <td className="p-4 sm:p-6 text-center bg-[#FFF9F5] text-xl">✅</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-6 text-wayo-dark font-bold text-lg sm:text-xl border-b-0">Price</td>
                <td className="p-4 sm:p-6 text-center text-gray-600 font-medium border-b-0">₹100–500</td>
                <td className="p-4 sm:p-6 text-center text-gray-600 font-medium border-b-0">₹1,500+</td>
                <td className="p-4 sm:p-6 text-center text-gray-600 font-medium border-b-0">₹0</td>
                <td className="p-4 sm:p-6 text-center text-wayo-dark font-bold text-xl bg-[#FFF9F5] rounded-b-2xl border-b-0">₹799 once</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-center text-gray-500 font-medium mt-8 text-lg">
          A padlock stops the bag from opening. Wayo Clip stops the bag from leaving.
        </p>
      </div>
    </section>
  );
}
