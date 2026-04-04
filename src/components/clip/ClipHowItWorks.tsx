export function ClipHowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Clip It On",
      description: "Snap the Wayo Clip onto any zipper, strap, or handle on your bag. Takes three seconds."
    },
    {
      number: "2",
      title: "Wear Your Band",
      description: "Slip on the wrist band. No pairing, no app, no setup. It's already connected."
    },
    {
      number: "3",
      title: "Wayo Watches",
      description: "The moment anyone lifts or moves your bag by even a metre — your wrist band vibrates and sounds an alert. Instantly. You don't need to be asleep to miss it."
    }
  ];

  return (
    <section className="py-24 bg-wayo-yellow/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-wayo-mint/20 text-teal-800 font-bold px-4 py-1.5 rounded-full text-sm mb-6">
            Simple by Design
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-wayo-dark font-display">
            Clip it. Wear it. Sleep.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-0.5 bg-wayo-dark/10" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-extrabold text-wayo-dark shadow-sm border-4 border-white z-10 mb-6">
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-wayo-dark mb-4">{step.title}</h3>
              <p className="text-gray-700 font-medium text-lg leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
