// AgentProfile.jsx (Modern Dark Mode / Facebook Style)

import React, { useState } from "react";

// Add this to each main component file
const containerClasses = "bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6 sm:p-8";
const headingClasses = "text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg";
const cardClasses = "bg-surface-bg rounded-xl border border-surface-bg p-6";

const mockAgents = [
  {
    id: 101,
    name: "John Smith",
    role: "Sales Lead",
    leads_managed: 12,
    performance_score: 92,
    status: "Active",
  },
  {
    id: 102,
    name: "Lisa Jones",
    role: "Junior Sales",
    leads_managed: 8,
    performance_score: 85,
    status: "Active",
  },
  {
    id: 103,
    name: "Mike Chen",
    role: "Team Manager",
    leads_managed: 5,
    performance_score: 95,
    status: "Away",
  },
];

const AgentProfile = () => {
  const [agents] = useState(mockAgents);

  return (
    <div className="bg-card-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-surface-bg">
      <h2 className="text-2xl font-bold text-main-text mb-8 pb-4 border-b border-surface-bg">
        👥 Agent Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="bg-surface-bg p-6 rounded-xl shadow-lg border border-card-bg transition hover:ring-2 hover:ring-primary-accent"
          >
            <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-card-bg">
              <span className="text-3xl text-primary-accent">⭐</span>
              <div>
                <h3 className="text-xl font-semibold text-main-text">
                  {agent.name}
                </h3>
                <p className="text-secondary-text text-sm">{agent.role}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-secondary-text">
              <p>
                <span className="font-semibold text-main-text">
                  Managed Leads:
                </span>{" "}
                {agent.leads_managed}
              </p>
              <p>
                <span className="font-semibold text-main-text">Score:</span>
                <span
                  className={`ml-2 font-bold ${
                    agent.performance_score > 90
                      ? "text-primary-accent"
                      : "text-warning-accent"
                  }`}
                >
                  {agent.performance_score}%
                </span>
              </p>
              <p>
                <span className="font-semibold text-main-text">Status:</span>
                <span
                  className={`ml-2 capitalize px-2 py-0.5 rounded-full text-xs font-bold 
                                    ${
                                      agent.status === "Active"
                                        ? "bg-primary-accent text-white"
                                        : "bg-secondary-accent text-main-text"
                                    }`}
                >
                  {agent.status}
                </span>
              </p>
            </div>

            <button className="w-full mt-6 p-2 rounded-lg text-sm font-semibold bg-primary-accent text-white hover:bg-blue-600 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentProfile;
