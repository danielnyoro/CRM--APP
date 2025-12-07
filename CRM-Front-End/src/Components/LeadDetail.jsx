// LeadDetail.jsx (Modern Dark Mode / Facebook Style)

import React from "react";
import LeadActivityLog from "./LeadActivityLog";

// Add this to each main component file
const containerClasses = "bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6 sm:p-8";
const headingClasses = "text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg";
const cardClasses = "bg-surface-bg rounded-xl border border-surface-bg p-6";

// Mock data (Normally in parent component)
const mockAllActivities = [
  {
    id: 1,
    lead_id: 45,
    type: "Communication",
    method: "email",
    date: "2025-12-04 14:30",
    summary: "Sent intro packet.",
    agent: "John Smith",
  },
  {
    id: 2,
    lead_id: 45,
    type: "Followup",
    followup_type: "call",
    date: "2025-12-04 10:00",
    summary: "Initial call.",
    agent: "John Smith",
  },
  {
    id: 3,
    lead_id: 46,
    type: "Communication",
    method: "phone",
    date: "2025-12-05 09:00",
    summary: "Follow-up on product specs.",
    agent: "Lisa Jones",
  },
  {
    id: 4,
    lead_id: 100,
    type: "Communication",
    method: "email",
    date: "2025-12-06 11:00",
    summary: "Sent follow-up email.",
    agent: "John Smith",
  },
];

const LeadDetail = ({ leads, assignments, onLeadDelete, onLeadSelect }) => {
  const getPrimaryAgent = (leadId) => {
    const leadAssignments = assignments.filter((a) => a.lead_id === leadId);
    const primaryAssignment = leadAssignments.find(
      (a) => a.assignment_type === "primary"
    );
    return primaryAssignment ? primaryAssignment.agent_name : "Unassigned";
  };

  const getLeadActivities = (leadId) => {
    return mockAllActivities.filter((a) => a.lead_id === leadId);
  };

  return (
    <div className="bg-card-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-surface-bg">
      <h2 className="text-2xl font-bold text-main-text mb-8 pb-4 border-b border-surface-bg">
        📝 Leads List ({leads.length})
      </h2>

      {leads.length === 0 ? (
        <p className="text-secondary-text">No leads currently in the system.</p>
      ) : (
        <div className="space-y-6">
          {leads.map((lead) => (
            <div
              key={lead.lead_id}
              className="p-5 rounded-xl bg-surface-bg shadow-lg border border-surface-bg transition hover:shadow-2xl"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-3 border-b border-card-bg">
                <h3 className="text-xl font-semibold text-main-text">
                  👤 {lead.first_name} {lead.last_name}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                  <button
                    className="px-4 py-1.5 text-sm font-semibold text-white bg-primary-accent rounded-full hover:bg-blue-600 transition"
                    onClick={() => onLeadSelect(lead.lead_id)}
                  >
                    Manage
                  </button>
                  <button
                    className="px-4 py-1.5 text-sm font-semibold text-main-text bg-card-bg rounded-full hover:bg-surface-bg transition"
                    onClick={() => onLeadDelete(lead.lead_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="text-sm text-secondary-text mb-4 grid grid-cols-2 md:flex md:space-x-8">
                <p>
                  <span className="font-medium">Agent:</span>{" "}
                  {getPrimaryAgent(lead.lead_id)}
                </p>
                <p>
                  <span className="font-medium">Company:</span>{" "}
                  {lead.company_name || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Status:</span>
                  <span className="capitalize bg-warning-accent text-black px-2 py-0.5 ml-2 rounded-full text-xs font-bold">
                    {lead.lead_status}
                  </span>
                </p>
              </div>

              <LeadActivityLog
                leadId={lead.lead_id}
                activities={getLeadActivities(lead.lead_id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadDetail;
