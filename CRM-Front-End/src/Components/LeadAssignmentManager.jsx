// LeadAssignmentManager.jsx (Modern Dark Mode / Facebook Style)

import React, { useState } from "react";

const mockAgents = [
  { id: 101, name: "John Smith", available: true },
  { id: 102, name: "Lisa Jones", available: true },
  { id: 103, name: "Mike Chen (Busy)", available: false },
  { id: 104, name: "Maria Garcia", available: true },
];

const LeadAssignmentManager = ({ lead, assignments, onAssign }) => {
  const [selectedAgentId, setSelectedAgentId] = useState("");
  const [assignmentType, setAssignmentType] = useState("secondary");

  const assignAgent = () => {
    if (!selectedAgentId || !lead) return;
    const agent = mockAgents.find((a) => a.id === parseInt(selectedAgentId));
    if (assignments.some((a) => a.agent_id === agent.id)) {
      alert("Agent is already assigned to this lead.");
      return;
    }
    const newAssignment = {
      assignment_id: Date.now(),
      lead_id: lead.lead_id,
      agent_id: agent.id,
      agent_name: agent.name.split("(")[0].trim(),
      assignment_type: assignmentType,
      is_active: true,
    };
    onAssign(lead.lead_id, newAssignment);
    setSelectedAgentId("");
  };

  const unassignedAgents = mockAgents.filter(
    (agent) => !assignments.some((a) => a.agent_id === agent.id)
  );

  const inputClasses =
    "w-full p-3 border border-surface-bg bg-surface-bg rounded-lg focus:ring-primary-accent focus:border-primary-accent text-main-text text-sm appearance-none";

  return (
    <div className="bg-card-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-surface-bg">
      <h4 className="text-xl font-bold text-main-text mb-6 border-b border-surface-bg pb-3">
        Agent Assignments for:{" "}
        <span className="text-primary-accent">
          {lead ? lead.first_name + " " + lead.last_name : "Select a Lead"}
        </span>
      </h4>

      <ul className="assignment-list space-y-3 mb-6">
        {assignments.map((a) => (
          <li
            key={a.assignment_id}
            className="flex justify-between items-center bg-surface-bg p-4 rounded-xl border border-card-bg text-main-text font-medium"
          >
            <span>{a.agent_name}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold 
                            ${
                              a.assignment_type === "primary"
                                ? "bg-warning-accent text-black"
                                : "bg-secondary-accent text-white"
                            }`}
            >
              {a.assignment_type.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>

      <div className="add-area pt-4 border-t border-surface-bg">
        <p className="text-secondary-text font-semibold mb-4">
          Assign New Agent:
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={selectedAgentId}
            onChange={(e) => setSelectedAgentId(e.target.value)}
            className={`${inputClasses} flex-grow`}
            disabled={!lead}
          >
            <option value="">Select Agent</option>
            {unassignedAgents.map((agent) => (
              <option
                key={agent.id}
                value={agent.id}
                disabled={!agent.available}
                className="bg-card-bg text-main-text"
              >
                {agent.name} {agent.available ? "" : "(Unavailable)"}
              </option>
            ))}
          </select>
          <select
            value={assignmentType}
            onChange={(e) => setAssignmentType(e.target.value)}
            className={inputClasses}
            disabled={!lead}
          >
            <option value="primary" className="bg-card-bg">
              Primary
            </option>
            <option value="secondary" className="bg-card-bg">
              Secondary
            </option>
            <option value="collaborative" className="bg-card-bg">
              Collaborative
            </option>
          </select>
        </div>

        <button
          className={`w-full mt-6 p-4 rounded-xl text-xl font-bold transition shadow-xl 
                        ${
                          !selectedAgentId || !lead
                            ? "bg-secondary-accent opacity-50 cursor-not-allowed text-main-text"
                            : "bg-primary-accent hover:bg-blue-600 text-white"
                        }`}
          onClick={assignAgent}
          disabled={!selectedAgentId || !lead}
        >
          Assign Lead
        </button>
      </div>
    </div>
  );
};

export default LeadAssignmentManager;
