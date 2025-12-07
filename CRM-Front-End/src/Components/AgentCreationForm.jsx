// AgentCreationForm.jsx

import React, { useState } from "react";

// Add this to each main component file
const containerClasses = "bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-6 sm:p-8";
const headingClasses = "text-2xl font-bold text-main-text mb-6 pb-4 border-b border-surface-bg";
const cardClasses = "bg-surface-bg rounded-xl border border-surface-bg p-6";

const generatePassword = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const AgentCreationForm = ({ onAgentAdded }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    department: "Commercial Sales",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const departments = [
    "Commercial Sales",
    "Technical Support",
    "Operations",
    "Marketing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!formData.first_name || !formData.last_name || !formData.username) {
      setMessage({ type: "error", text: "Please fill out required fields." });
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    const newPassword = generatePassword();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newAgent = {
        agent_id: Math.floor(Math.random() * 1000) + 200,
        employee_id: `SA-${Math.floor(Math.random() * 9000) + 1000}`,
        hire_date: new Date().toISOString().split("T")[0],
        is_active: true,
        last_login: null,
        ...formData,
      };

      console.log("Agent data inserted into DB:", newAgent);

      const emailContent = {
        to: `${newAgent.username}@company.com`,
        subject: "Welcome to the CRM System!",
        body: `Dear ${newAgent.first_name}, Your account has been created. Username: ${newAgent.username} Temporary Password: ${newPassword}`,
      };

      console.log("--- MOCK EMAIL SENT ---", emailContent);

      if (onAgentAdded) {
        onAgentAdded(newAgent);
      }

      setMessage({
        type: "success",
        text: `Agent ${newAgent.first_name} added. Email with credentials sent to ${newAgent.username}@company.com.`,
      });

      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        department: "Commercial Sales",
      });
    } catch (error) {
      console.error("Failed to create agent:", error);
      setMessage({
        type: "error",
        text: "Failed to create agent. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card mx-auto max-w-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-[#090088] mb-4 pb-2 border-b border-[#02006c]">
        👤 Add New Sales Agent
      </h3>

      {message.text && (
        <div
          className={`p-3 mb-4 rounded font-medium ${
            message.type === "success" ? "bg-green-700" : "bg-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              First Name *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Username *
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Department
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full ${
            isSubmitting
              ? "bg-[#02006c] cursor-not-allowed text-gray-400"
              : "bg-[#090088] hover:bg-[#02006c] text-white"
          }`}
        >
          {isSubmitting ? "Adding Agent..." : "Create Agent & Send Credentials"}
        </button>
      </form>
    </div>
  );
};

export default AgentCreationForm;
