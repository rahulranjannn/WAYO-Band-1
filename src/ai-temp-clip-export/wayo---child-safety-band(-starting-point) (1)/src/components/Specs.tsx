export function Specs() {
  const details = [
    { label: "Range", value: "Up to 30 metres in open areas." },
    { label: "Phone/Internet needed?", value: "No. Never." },
    { label: "Monthly fee?", value: "No. Use forever." },
    { label: "Battery", value: "2-3 days on a full charge." },
    { label: "Age", value: "Designed for ages 2 to 10." },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark mb-8 sm:mb-12 font-display">
          The Details
        </h2>

        <div className="bg-[#FFFAF5] border-2 border-[#FFF0E5] rounded-[2rem] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col">
            {details.map((detail, index) => (
              <div 
                key={index} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-2 sm:gap-4 ${
                  index !== details.length - 1 ? 'border-b border-[#FCE8D8]' : ''
                }`}
              >
                <div className="font-bold text-wayo-dark text-lg sm:text-xl">
                  {detail.label}
                </div>
                <div className="text-gray-700 text-lg sm:text-xl font-medium sm:text-right">
                  {detail.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
