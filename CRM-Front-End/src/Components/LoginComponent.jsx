// LoginComponent.jsx (Super Clean Minimalist Dark Theme)

import React, { useState } from "react";

const LoginComponent = ({ onLoginSuccess }) => {
  // ... (state and handlers omitted for brevity)

  const handleSubmit = async (e) => {
    // ... (submission logic remains the same)
    // ...
  };

  const inputClasses =
    "w-full p-3 border border-[#30363D] bg-[#0D1117] rounded-md focus:ring-[#4d4df7] focus:border-[#4d4df7] text-[#C9D1D9] placeholder-[#8B949E]";
  const labelClasses = "block text-sm font-medium text-[#8B949E] mb-2";

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0D1117] text-[#C9D1D9]">
      <div className="w-full max-w-sm mx-4 bg-[#161B22] p-8 rounded-xl shadow-2xl border border-[#30363D]">
        <h2 className="text-3xl font-bold text-center text-[#4d4df7] mb-8">
          Sign In
        </h2>

        {/* Error handling (simplified) */}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className={labelClasses}>
              Email / Username
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClasses}
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClasses}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-md text-base font-semibold transition-all shadow-lg 
                        ${
                          isLoading
                            ? "bg-[#30363D] cursor-not-allowed text-[#8B949E]"
                            : "bg-[#4d4df7] hover:bg-blue-600 text-white"
                        }`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
