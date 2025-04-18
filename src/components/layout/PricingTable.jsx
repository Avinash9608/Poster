import React from "react";
import "./PricingTable.css";
import Layout from "./Layout";

const PricingTable = () => {
  const plans = [
    {
      id: 1,
      name: "Bronze Package",
      price: 10,
      features: ["Unlimited Listing", "Edit Your Listing", "Approve Reviews"],
      popular: false,
    },
    {
      id: 2,
      name: "Gold Package",
      price: 19,
      features: [
        "Unlimited Listing",
        "Edit Your Listing",
        "Approve Reviews",
        "Take Booking Online",
        "24/7 Support Service",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Platinum Package",
      price: 49,
      features: ["Unlimited Listing", "Edit Your Listing", "Approve Reviews"],
      popular: false,
    },
  ];

  return (
    <Layout>
      <div className="pricingTable">
        <h2 className="pricingTable-title">
          Find a plan that's right for you.
        </h2>
        <h3 className="pricingTable-subtitle">
          Every plan comes with a 30-day free trial.
        </h3>

        <div className="pricingTable-firstTable">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricingTable-firstTable_table ${
                plan.popular ? "popular" : ""
              }`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}
              <h1 className="pricingTable-firstTable_table__header">
                {plan.name}
              </h1>
              <p className="pricingTable-firstTable_table__pricing">
                <span>$</span>
                <span>{plan.price}</span>
                <span>Month</span>
              </p>
              <ul className="pricingTable-firstTable_table__options">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              <button className="pricingTable-firstTable_table__getstart">
                Get Started Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PricingTable;
