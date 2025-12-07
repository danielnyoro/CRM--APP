import React, { useState } from "react";
import AccountDetail from "./Components/AccountDetail";
import AgentCreationForm from "./Components/AgentCreationForm";
import AgentProfile from "./Components/AgentProfile";
import LeadManagementDashboard from "./Components/LeadManagementDashboard";
import LoginComponent from "./Components/LoginComponent";
import OpportunityDetail from "./Components/OpportunityDetail";
import TeamAssignmentManager from "./Components/TeamAssignmentManager";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agents, setAgents] = useState([]);

  // Mock function for login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Handle new agent creation
  const handleAgentAdded = (newAgent) => {
    setAgents((prev) => [...prev, newAgent]);
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <LoginComponent onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-6">
      {/* Header */}
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary-accent">
              🏢 CRM Dashboard
            </h1>
            <p className="text-secondary-text">
              Customer Relationship Management System
            </p>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="bg-surface-bg hover:bg-card-bg text-white px-4 py-2 rounded-lg border border-surface-bg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column - Accounts & Opportunities */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg">
              📊 Account Overview
            </h2>
            <AccountDetail />
          </div>

          <div className="bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg">
              💼 Opportunity Management
            </h2>
            <OpportunityDetail />
          </div>
        </div>

        {/* Right Column - Agent Management */}
        <div className="space-y-6">
          <div className="bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg">
              👥 Agent Profiles
            </h2>
            <AgentProfile />
          </div>

          <div className="bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6">
            <AgentCreationForm onAgentAdded={handleAgentAdded} />
          </div>
        </div>
      </div>

      {/* Lead Management Section */}
      <div className="mb-6">
        <div className="bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg">
            🎯 Lead Management
          </h2>
          <LeadManagementDashboard />
        </div>
      </div>

      {/* Team Management Section */}
      <div className="mb-6">
        <div className="bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg">
            🤝 Team Assignment
          </h2>
          <TeamAssignmentManager />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-6 border-t border-surface-bg text-center text-secondary-text">
        <p>
          CRM System v1.0 • {new Date().getFullYear()} • All rights reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
