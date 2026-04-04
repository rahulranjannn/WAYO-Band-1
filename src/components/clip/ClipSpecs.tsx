export function ClipSpecs() {
  const specs = [
    { emoji: "🔋", label: "Battery", value: "Multiple days per charge" },
    { emoji: "⚡", label: "Charging", value: "USB-C" },
    { emoji: "📏", label: "Size", value: "Small enough to forget it's there" },
    { emoji: "📶", label: "Range", value: "Up to 30 metres" },
    { emoji: "🔔", label: "Alert Type", value: "Vibration + audible buzz on wrist band" },
    { emoji: "📦", label: "In the Box", value: "1 Wayo Clip + 1 Wrist Band + 1 USB-C cable" }
  ];

  return (
    <section className="py-24 bg-wayo-mint/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-wayo-dark font-display">
            The details, simply.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
          {specs.map((spec, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="text-3xl">{spec.emoji}</div>
              <div>
                <div className="font-bold text-wayo-dark text-lg">{spec.label}</div>
                <div className="text-gray-700 font-medium">{spec.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
