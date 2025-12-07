// LeadCreationForm.jsx (Modern Dark Mode / Facebook Style)

import React, { useState } from "react";

const LeadCreationForm = ({ onLeadCreated }) => {
  // ... (state and handlers omitted for brevity)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    lead_source: "website",
    budget: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const leadSources = [
    "website",
    "referral",
    "social_media",
    "cold_call",
    "event",
    "other",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... submission logic
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newLead = {
      lead_id: Math.floor(Math.random() * 1000) + 100,
      ...formData,
      name: `${formData.first_name} ${formData.last_name}`,
      lead_status: "new",
      created_at: new Date().toISOString(),
    };
    if (onLeadCreated) {
      onLeadCreated(newLead);
    }
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      company_name: "",
      lead_source: "website",
      budget: "",
      description: "",
    });
    setIsSubmitting(false);
  };

  const inputClasses =
    "w-full p-3 border border-surface-bg bg-surface-bg rounded-lg focus:ring-primary-accent focus:border-primary-accent text-main-text placeholder-secondary-text";
  const labelClasses = "block text-sm font-semibold text-secondary-text mb-2";

  return (
    <div className="bg-card-bg p-6 sm:p-8 rounded-2xl shadow-xl border border-surface-bg">
      <h3 className="text-2xl font-bold text-main-text mb-8 pb-4 border-b border-surface-bg">
        ➕ Create New Lead
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label htmlFor="first_name" className={labelClasses}>
              First Name *
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name" className={labelClasses}>
              Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className={labelClasses}>
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div className="form-group">
            <label htmlFor="company_name" className={labelClasses}>
              Company Name
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lead_source" className={labelClasses}>
              Lead Source *
            </label>
            <select
              id="lead_source"
              name="lead_source"
              value={formData.lead_source}
              onChange={handleChange}
              required
              className={`${inputClasses} appearance-none`}
            >
              {leadSources.map((source) => (
                <option key={source} value={source} className="bg-card-bg">
                  {source.replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 form-group">
            <label htmlFor="budget" className={labelClasses}>
              Estimated Budget ($)
            </label>
            <input
              type="number"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              step="0.01"
              min="0"
              className={inputClasses}
            />
          </div>

          <div className="md:col-span-2 form-group">
            <label htmlFor="description" className={labelClasses}>
              Description/Notes
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className={inputClasses}
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-8 p-4 rounded-xl text-xl font-bold transition shadow-xl 
                ${
                  isSubmitting
                    ? "bg-secondary-accent cursor-not-allowed text-main-text"
                    : "bg-primary-accent hover:bg-blue-600 text-white"
                }`}
        >
          {isSubmitting ? "Creating..." : "Create Lead"}
        </button>
      </form>
    </div>
  );
};

export default LeadCreationForm;
