// TeamAssignmentManager.jsx (Modern Dark Mode / Facebook Style)

import React, { useState } from "react";

// Add this to each main component file
const containerClasses = "bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6 sm:p-8";
const headingClasses = "text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg";
const cardClasses = "bg-surface-bg rounded-xl border border-surface-bg p-6";


const mockTeams = [
  {
    id: 1,
    name: "Enterprise Sales",
    manager: "Mike Chen",
    members: 4,
    open_leads: 8,
    priority: "High",
  },
  {
    id: 2,
    name: "SMB Growth",
    manager: "Maria Garcia",
    members: 6,
    open_leads: 15,
    priority: "Medium",
  },
  {
    id: 3,
    name: "Consulting Division",
    manager: "John Smith",
    members: 3,
    open_leads: 3,
    priority: "Low",
  },
];

const TeamAssignmentManager = () => {
  const [teams] = useState(mockTeams);

  return (
    <div className="bg-card-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-surface-bg">
      <h2 className="text-2xl font-bold text-main-text mb-8 pb-4 border-b border-surface-bg">
        🤝 Team Management Overview
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-surface-bg rounded-lg">
          <thead className="bg-surface-bg">
            <tr>
              {[
                "Team Name",
                "Manager",
                "Members",
                "Open Leads",
                "Priority",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-6 py-3 text-left text-xs font-medium text-secondary-text uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-bg">
            {teams.map((team) => (
              <tr
                key={team.id}
                className="bg-card-bg hover:bg-surface-bg transition"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-primary-accent">
                  {team.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-main-text">
                  {team.manager}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-main-text">
                  {team.members}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-warning-accent">
                  {team.open_leads}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${
                                          team.priority === "High"
                                            ? "bg-red-800 text-red-300"
                                            : team.priority === "Medium"
                                            ? "bg-primary-accent text-white"
                                            : "bg-secondary-accent text-main-text"
                                        }`}
                  >
                    {team.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-accent hover:text-blue-600 transition">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-8 p-3 rounded-xl text-lg font-bold transition bg-primary-accent text-white hover:bg-blue-600 shadow-lg">
        + Create New Team
      </button>
    </div>
  );
};

export default TeamAssignmentManager;
