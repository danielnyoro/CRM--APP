// AccountDetail.jsx (Modern Dark Mode / Facebook Style)

import React, { useState } from "react";

// Add this to each main component file
const containerClasses = "bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6 sm:p-8";
const headingClasses = "text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg";
const cardClasses = "bg-surface-bg rounded-xl border border-surface-bg p-6";

const mockAccounts = [
  {
    id: 1,
    name: "Global Solutions Inc.",
    industry: "Tech",
    annual_revenue: 5000000,
    last_contact: "2025-11-20",
    primary_contact: "Sara Connor",
  },
  {
    id: 2,
    name: "Future Corp.",
    industry: "Finance",
    annual_revenue: 12000000,
    last_contact: "2025-12-01",
    primary_contact: "Bob Williams",
  },
];

const AccountDetail = () => {
  const [accounts] = useState(mockAccounts);
  const [selectedAccountId, setSelectedAccountId] = useState(1);
  const selectedAccount = accounts.find((a) => a.id === selectedAccountId);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Account List (Left Panel) */}
      <div className="w-full lg:w-1/3 bg-card-bg p-6 rounded-2xl shadow-xl border border-surface-bg">
        <h3 className="text-xl font-bold text-main-text mb-6 pb-3 border-b border-surface-bg">
          Active Accounts
        </h3>
        <div className="space-y-3">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => setSelectedAccountId(account.id)}
              className={`w-full text-left p-3 rounded-lg transition border 
                                ${
                                  account.id === selectedAccountId
                                    ? "bg-primary-accent border-primary-accent text-white shadow-lg"
                                    : "bg-surface-bg border-card-bg text-main-text hover:bg-surface-bg/80"
                                }`}
            >
              <p className="font-semibold">{account.name}</p>
              <p className="text-xs mt-1 text-secondary-text">
                Contact: {account.primary_contact}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Account Detail (Right Panel) */}
      <div className="w-full lg:w-2/3 bg-card-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-surface-bg">
        {selectedAccount ? (
          <>
            <h2 className="text-3xl font-extrabold text-primary-accent mb-4">
              {selectedAccount.name}
            </h2>
            <p className="text-secondary-text mb-6">
              {selectedAccount.industry} Industry
            </p>

            <div className="grid grid-cols-2 gap-6 bg-surface-bg p-6 rounded-xl border border-card-bg">
              <div>
                <p className="text-secondary-text text-sm">Annual Revenue</p>
                <p className="text-2xl font-bold text-main-text mt-1">
                  ${(selectedAccount.annual_revenue / 1000000).toFixed(1)}M
                </p>
              </div>
              <div>
                <p className="text-secondary-text text-sm">Last Contact Date</p>
                <p className="text-2xl font-bold text-main-text mt-1">
                  {selectedAccount.last_contact}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-main-text">
              <p>
                <span className="font-semibold text-secondary-accent">
                  Primary Contact:
                </span>{" "}
                {selectedAccount.primary_contact}
              </p>
              <p>
                <span className="font-semibold text-secondary-accent">
                  Total Opportunities:
                </span>{" "}
                4 Open
              </p>
            </div>
          </>
        ) : (
          <p className="text-secondary-text">
            Please select an account to view details.
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountDetail;
