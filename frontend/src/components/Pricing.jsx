import React, { useState } from "react";
import { Check } from "lucide-react";


function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      description: "For individual developers and non-tech founders.",
      price: 0,
      perPerson: "Basic",
      features: [
        "Basic Code Snippets",
        "1 Project Limit",
        "Shared Cloud Hosting",
        "Community Support",
      ],
      buttonText: "Active",
      primary: false,
    },
    {
      name: "Starter",
      description: "For small startups & indie developers.",
      price: isAnnual ? 340 : 29,
      perPerson: "Recommended",
      features: [
        "AI Code Generation",
        "Multi-Language Support",
        "Manage 5 Projects",
        "Performance Optimization",
        "Better Cloud Hosting",
      ],
      buttonText: "Get Started",
      primary: true,
    },
    {
      name: "Business",
      description: "For growing startups & small businesses.",
      price: isAnnual ? 1150 : 99,
      perPerson: "Best Pack",
      features: [
        "Full-Stack Development",
        "Manage 20 Projects",
        "Optimization & Bug Fixes",
        "Dedicated Cloud Hosting",
        "Team Collaboration",
        "AI Security & Compliance",
        "24/7 Support",
      ],
      buttonText: "Upgrade to Business",
      primary: false,
    },
    {
      name: "Enterprise",
      description: "For large businesses needing AI & security.",
      price: "Custom",
      perPerson: "According to the Project",
      features: [
        "Custom AI Models",
        "Unlimited Projects",
        "Enterprise-Grade Security",
        "Flexible Cloud Options",
        "Advanced Team Management",
        "Dedicated Support",
      ],
      buttonText: "Upgrade to Enterprise",
      primary: false,
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#0A0B14] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Build Smarter,
              <br /> Pay Your Way – The AI Website <br /> Builder for Every Need
            </h1>
            <p className="text-gray-400 mb-8">
              Consolidate your projects into a uniformed and centralised
              <br />
              control center. No credit card required.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`${!isAnnual ? "text-white" : "text-gray-400"}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-16 h-8 rounded-full bg-gray-700 relative"
              >
                <div
                  className={`w-6 h-6 rounded-full bg-blue-600 absolute top-1 transition-transform duration-200 ease-in-out ${
                    isAnnual ? "translate-x-9" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`${isAnnual ? "text-white" : "text-gray-400"}`}>
                Annually <span className="text-sm text-blue-600">20% off</span>
              </span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 ${
                  plan.primary
                    ? "bg-gradient-to-b from-blue-600/20 to-blue-600/5 border border-blue-500/20"
                    : "bg-[#12141F]"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-8">{plan.description}</p>

                <div className="mb-8">
                  <div className="flex items-start">
                    {plan.price === "Custom" ? (
                      <span className="text-4xl font-bold">Custom Price</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">
                          ${plan.price}
                        </span>
                        {isAnnual ? (
                          <span className="text-gray-400 ml-2">/ year</span>
                        ) : (
                          <span className="text-gray-400 ml-2">/ month</span>
                        )}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {plan.name === "Enterprise"
                      ? "Custom Pricing Available"
                      : `${plan.perPerson}`}
                  </div>
                </div>

                <button
                  className={`w-full py-3 rounded-lg mb-8 ${
                    plan.primary
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border border-gray-600 hover:border-gray-500"
                  }`}
                >
                  {plan.buttonText}
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <Check className="w-5 h-5 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
