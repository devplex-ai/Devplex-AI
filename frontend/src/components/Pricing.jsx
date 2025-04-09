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
      price:  2470,
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
      price:  8462,
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
      <div className="min-h-screen pt-8 md:pt-16 h-full bg-[#0A0B14] text-white py-6 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4 md:mb-16">
            <h1 className=" text-3xl sm:text-3xl md:text-4xl lg:text-5xl  font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Build Smarter,
              <br /> Pay Your Way – The AI Website <br /> Builder for Every Need
            </h1>
            <p className="text-gray-400 md:mb-8 text-sm md:text-base">
              Consolidate your projects into a uniformed and centralised
              <br />
              control center. No credit card required.
            </p>

            {/* Toggle */}
          </div>

          {/* Pricing Cards */}
          <div className="grid px-4 grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-xl md:rounded-3xl p-4 md:p-8 ${
                  plan.primary
                    ? "bg-gradient-to-b from-blue-600/20 to-blue-600/5 border border-blue-500/20"
                    : "bg-[#12141F]"
                }`}
              >
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4 md:mb-8">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <div className="flex items-start">
                    {plan.price === "Custom" ? (
                      <span className="text-4xl font-bold">Custom Price</span>
                    ) : (
                      <>
                        <span className="text-4xl font-bold">
                          ₹{plan.price}
                        </span>

                        <span className="text-gray-400 ml-2">/ month</span>
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
                  className={`w-full py-3 rounded-lg mb-4 md:mb-8 ${
                    plan.primary
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border border-gray-600 hover:border-gray-500"
                  } ${plan.buttonText === "Active" ? "cursor-not-allowed":"cursor-pointer"}`}
                >
                  {plan.buttonText}
                </button>

                <ul className="space-y-2 md:space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex text-sm  md:text-base items-center gap-3 text-gray-300"
                    >
                      <Check className="w-3 h-3 md:w-5 md:h-5 text-blue-500" />
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
