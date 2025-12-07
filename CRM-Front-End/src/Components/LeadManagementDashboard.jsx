// LeadManagementDashboard.jsx (LinkedIn Style)

import React, { useState } from "react";
import LeadCreationForm from "./LeadCreationForm.jsx";
import LeadAssignmentManager from "./LeadAssignmentManager.jsx";
import LeadDetail from "./LeadDetail.jsx";

// Add this to each main component file
const containerClasses = "bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6 sm:p-8";
const headingClasses = "text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg";
const cardClasses = "bg-surface-bg rounded-xl border border-surface-bg p-6";

// Mock Data (Unchanged)
const initialLeads = [
  {
    lead_id: 45,
    first_name: "Alice",
    last_name: "Johnson",
    name: "Alice Johnson",
    company_name: "Innovate Co.",
    lead_source: "referral",
    lead_status: "new",
  },
  {
    lead_id: 46,
    first_name: "Bob",
    last_name: "Williams",
    name: "Bob Williams",
    company_name: "Future Corp.",
    lead_source: "website",
    lead_status: "qualified",
  },
  {
    lead_id: 100,
    first_name: "Carol",
    last_name: "Davis",
    name: "Carol Davis",
    company_name: "Data Inc.",
    lead_source: "cold_call",
    lead_status: "new",
  },
];

const initialAssignments = [
  {
    assignment_id: 1,
    lead_id: 45,
    agent_id: 101,
    agent_name: "John Smith",
    assignment_type: "primary",
    is_active: true,
  },
  {
    assignment_id: 2,
    lead_id: 46,
    agent_id: 102,
    agent_name: "Lisa Jones",
    assignment_type: "primary",
    is_active: true,
  },
];
// ... (omitted handleLeadCreated, handleLeadDelete, handleAssignAgent for brevity, they remain as is)

const LeadManagementDashboard = () => {
  const [leads, setLeads] = useState(initialLeads);
  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedLeadId, setSelectedLeadId] = useState(
    initialLeads[0]?.lead_id || null
  );

  const handleLeadCreated = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
    setSelectedLeadId(newLead.lead_id);
  };

  const handleLeadDelete = (leadIdToDelete) => {
    if (
      window.confirm(`Are you sure you want to delete Lead #${leadIdToDelete}?`)
    ) {
      setLeads((prevLeads) =>
        prevLeads.filter((l) => l.lead_id !== leadIdToDelete)
      );
      setAssignments((prevAssignments) =>
        prevAssignments.filter((a) => a.lead_id !== leadIdToDelete)
      );
      if (selectedLeadId === leadIdToDelete) {
        setSelectedLeadId(
          leads.find((l) => l.lead_id !== leadIdToDelete)?.lead_id || null
        );
      }
    }
  };

  const handleAssignAgent = (leadId, newAssignment) => {
    setAssignments((prevAssignments) => {
      if (newAssignment.assignment_type === "primary") {
        const updatedAssignments = prevAssignments.map((a) =>
          a.lead_id === leadId && a.assignment_type === "primary"
            ? { ...a, assignment_type: "secondary" }
            : a
        );
        return [...updatedAssignments, newAssignment];
      }
      return [...prevAssignments, newAssignment];
    });
  };

  const selectedLead = leads.find((l) => l.lead_id === selectedLeadId);
  const selectedLeadAssignments = assignments.filter(
    (a) => a.lead_id === selectedLeadId
  );

  return (
    // Responsive Layout: Stacks vertically on mobile, splits horizontally on large screens
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-2/5 space-y-6">
        <LeadCreationForm onLeadCreated={handleLeadCreated} />

        <LeadAssignmentManager
          lead={selectedLead}
          assignments={selectedLeadAssignments}
          onAssign={handleAssignAgent}
        />
      </div>

      <div className="w-full lg:w-3/5">
        <LeadDetail
          leads={leads}
          assignments={assignments}
          onLeadDelete={handleLeadDelete}
          onLeadSelect={setSelectedLeadId}
        />
      </div>
    </div>
  );
};

export default LeadManagementDashboard;
