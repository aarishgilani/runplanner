import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Welcome() {
  // TODO: Build a helpers file for stuff like this
  const FeatureIcon = ({ children, className }) => (
    <div className="mb-4 flex justify-center">
      <svg className={`w-10 h-10 text-secondary ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </div>
  );

  return (
    <main>

      {/* hero section */}
      <section id="hero" className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight mb-4">
            The Science of <span className="text-secondary">Sustainable Speed.</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Stop guessing. Start training smarter. runplanner.fit provides **free**, research-backed weekly run plans designed to **minimize overuse injuries** and maximize your long-term efficiency.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#tool" id="tool" className="cta-button inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-bold rounded-full text-white bg-secondary hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-secondary focus:ring-opacity-50">
              START YOUR FREE PLAN NOW
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            100% Free. No credit card required.
          </p>
        </div>
      </section>

      {/* features section */}
      <section id="features" className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Built on Principles, Backed by Data</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Feature 1: Science & Research */}
            <div className="text-center p-6 rounded-xl bg-primary/70 border border-secondary/50 shadow-lg">
              <FeatureIcon>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-2">Scientific Strategy</h3>
              <p className="text-gray-300">
                Our plans integrate gold-standard training concepts—like **progressive overload** and the **10% Rule**—but customized based on recent sports science literature.
              </p>
            </div>

            {/* Feature 2: Injury Prevention */}
            <div className="text-center p-6 rounded-xl bg-primary/70 border border-secondary/50 shadow-lg">
              <FeatureIcon>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-2">Injury Minimization</h3>
              <p className="text-gray-300">
                We prioritize **long-term health** by carefully managing load and recovery, significantly reducing the risk of common overuse injuries for all runner levels.
              </p>
            </div>

            {/* Feature 3: Efficiency & Convenience */}
            <div className="text-center p-6 rounded-xl bg-primary/70 border border-secondary/50 shadow-lg">
              <FeatureIcon>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h8M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-2">Seamless Planning</h3>
              <p className="text-gray-300">
                Get your plan and immediately sync it to your **Google Calendar**. Focus on execution, not data entry. Your plan, automatically where you need it.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* authority section */}
      <section id="authority" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Algorithm Explanation */}
          <div className="lg:order-1">
            <span className="text-sm font-semibold text-secondary uppercase tracking-wider">How We Plan</span>
            <h2 className="text-3xl font-bold text-primary mt-1 mb-6">The Engine Behind Your Success</h2>
            <p className="text-gray-600 mb-6">
              Our proprietary algorithm, **The Sustainable Performance Model (SPM)**, dynamically adjusts your weekly load based on three core inputs: your current fitness level, your goal, and your reported fatigue.
            </p>

            <ul className="space-y-5 text-gray-700">
              <li className="flex items-start space-x-3">
                <svg className="flex-shrink-0 w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.007 3.238 1.487 5.925 3.528 7.373a11.97 11.97 0 01.76-1.554 12.003 12.003 0 01-1.226-6.819c-.067-1.12.28-2.222.955-3.195z" /></svg>
                <p><strong>Calculated Progression:</strong> Volume is managed week-to-week using principles derived from the **Acute-to-Chronic Workload Ratio (ACWR)** to avoid sudden spikes in stress.</p>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="flex-shrink-0 w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.007 3.238 1.487 5.925 3.528 7.373a11.97 11.97 0 01.76-1.554 12.003 12.003 0 01-1.226-6.819c-.067-1.12.28-2.222.955-3.195z" /></svg>
                <p><strong>Mandatory Rest:</strong> Automatically incorporates scheduled rest weeks and recovery days, recognizing that fitness is built during **rest**, not just work.</p>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="flex-shrink-0 w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.007 12.007 0 002.944 12c.007 3.238 1.487 5.925 3.528 7.373a11.97 11.97 0 01.76-1.554 12.003 12.003 0 01-1.226-6.819c-.067-1.12.28-2.222.955-3.195z" /></svg>
                <p><strong>Individualized Load:</strong> Moves beyond generic plans by recommending specific paces and efforts based on proven physiological markers.</p>
              </li>
            </ul>
          </div>

          {/* Citation/Proof Panel */}
          <div className="lg:order-2 p-8 bg-white border border-gray-200 rounded-xl shadow-xl">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Research Focus</span>
            <h3 className="text-2xl font-bold text-primary mt-1 mb-4">Our Commitment to Evidence</h3>
            <p className="text-gray-600 mb-6 border-l-4 border-secondary pl-3 italic">
              All plans are generated with direct reference to clinical and sports science journals to ensure best practices in training load management.
            </p>
            <div className="space-y-4 text-sm text-gray-700">
              <p className="font-medium">Key Research Pillars:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Gabbett, T. J. (2016). *The training—injury prevention paradox: should athletes be training smarter and harder?*</li>
                <li>Impellizzeri, F. M. (2020). *ACWR and the risk of injuries: an important controversy.*</li>
                <li>Foster, C. (1998). *Monitoring training in athletes with reference to overtraining syndrome.*</li>
              </ul>
              <a href="#" className="text-sm text-secondary hover:underline font-semibold block mt-4">View Full Research Citations (Coming Soon) →</a>
            </div>
          </div>
        </div>
      </section>

      {/* above footer call to action */}
      <section id="final-cta" className="py-16 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Run Smarter, Not Harder?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Generate your personalized, injury-proof running plan in minutes and sync it directly to your digital calendar.
          </p>
          <a href="#tool" className="cta-button inline-flex items-center justify-center px-12 py-5 border border-transparent text-xl font-bold rounded-full text-secondary bg-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 transition duration-300">
            GET MY FREE WEEKLY PLAN
          </a>
        </div>
      </section>


    </main>
  );
}

const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995ZM16.6074 10.7755L16.6074 10.7756C16.5934 11.6409 16.0212 12.1444 15.4783 12.1444C14.9297 12.1444 14.3493 11.6173 14.3493 10.7877C14.3493 9.94885 14.9378 9.41192 15.4783 9.41192C16.0471 9.41192 16.6209 9.93851 16.6074 10.7755ZM8.49373 12.1444C7.94513 12.1444 7.36471 11.6173 7.36471 10.7877C7.36471 9.94885 7.95323 9.41192 8.49373 9.41192C9.06038 9.41192 9.63892 9.93712 9.6417 10.7815C9.62517 11.6239 9.05462 12.1444 8.49373 12.1444Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];
