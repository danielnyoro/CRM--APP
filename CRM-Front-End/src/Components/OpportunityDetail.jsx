// OpportunityDetail.jsx (Modern Dark Mode / Facebook Style)

import React, { useState } from "react";

// Add this to each main component file
const containerClasses = "bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6 sm:p-8";
const headingClasses = "text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg";
const cardClasses = "bg-surface-bg rounded-xl border border-surface-bg p-6";


const mockOpportunities = [
  {
    id: 201,
    name: "Q4 Software Licensing",
    account: "Global Solutions Inc.",
    stage: "Proposal",
    amount: 85000,
    close_date: "2026-01-15",
  },
  {
    id: 202,
    name: "Consulting Expansion",
    account: "Future Corp.",
    stage: "Negotiation",
    amount: 150000,
    close_date: "2025-12-30",
  },
  {
    id: 203,
    name: "Legacy System Upgrade",
    account: "Data Inc.",
    stage: "Closed Won",
    amount: 45000,
    close_date: "2025-11-01",
  },
];

const OpportunityDetail = () => {
  const [opportunities] = useState(mockOpportunities);
  const [filterStage, setFilterStage] = useState("All");

  const stages = [
    "All",
    "New",
    "Proposal",
    "Negotiation",
    "Closed Won",
    "Closed Lost",
  ];

  const filteredOpportunities = opportunities.filter(
    (opp) => filterStage === "All" || opp.stage === filterStage
  );

  const getStageColor = (stage) => {
    if (stage === "Closed Won") return "bg-primary-accent text-white";
    if (stage === "Closed Lost") return "bg-red-800 text-red-300";
    if (stage === "Negotiation") return "bg-warning-accent text-black";
    return "bg-secondary-accent text-main-text";
  };

  return (
    <div className="bg-card-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-surface-bg">
      <h2 className="text-2xl font-bold text-main-text mb-8 pb-4 border-b border-surface-bg">
        💰 Opportunity Pipeline
      </h2>

      <div className="mb-6 flex flex-wrap gap-2 p-3 bg-surface-bg rounded-xl">
        {stages.map((stage) => (
          <button
            key={stage}
            onClick={() => setFilterStage(stage)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition 
                            ${
                              filterStage === stage
                                ? "bg-primary-accent text-white shadow-md"
                                : "bg-card-bg text-secondary-text hover:bg-card-bg/50"
                            }`}
          >
            {stage}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-surface-bg p-5 rounded-xl shadow-lg border border-card-bg"
          >
            <div className="flex justify-between items-start mb-3 pb-3 border-b border-card-bg">
              <h3 className="text-xl font-semibold text-main-text">
                {opp.name}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-bold ${getStageColor(
                  opp.stage
                )}`}
              >
                {opp.stage}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-secondary-text">
                <p className="font-semibold text-main-text">Account</p>
                <p>{opp.account}</p>
              </div>
              <div className="text-secondary-text">
                <p className="font-semibold text-main-text">Amount</p>
                <p className="text-lg font-bold text-warning-accent">
                  ${opp.amount.toLocaleString()}
                </p>
              </div>
              <div className="text-secondary-text">
                <p className="font-semibold text-main-text">Close Date</p>
                <p>{opp.close_date}</p>
              </div>
              <div className="text-secondary-text self-center">
                <button className="p-2 text-xs font-semibold bg-primary-accent text-white rounded-lg hover:bg-blue-600 transition">
                  Update Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredOpportunities.length === 0 && (
        <p className="text-secondary-text p-4">
          No opportunities found for the selected stage.
        </p>
      )}
    </div>
  );
};

export default OpportunityDetail;
