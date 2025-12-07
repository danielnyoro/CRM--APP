// src/Components/TestComponent.jsx
import React from "react";

const TestComponent = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Test card with new colors */}
        <div className="bg-card-bg rounded-2xl border border-surface-bg shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-primary-accent mb-4">
            🎨 Color Palette Test
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-base-bg p-4 rounded-lg text-center">
              <div className="w-full h-20 rounded mb-2 bg-black"></div>
              <p className="text-white">Base BG</p>
              <p className="text-secondary-text text-sm">#000000</p>
            </div>

            <div className="bg-surface-bg p-4 rounded-lg text-center">
              <div className="w-full h-20 rounded mb-2 bg-surface-bg"></div>
              <p className="text-white">Surface BG</p>
              <p className="text-secondary-text text-sm">#1a1a1a</p>
            </div>

            <div className="bg-primary-accent p-4 rounded-lg text-center">
              <div className="w-full h-20 rounded mb-2 bg-primary-accent"></div>
              <p className="text-white">Primary</p>
              <p className="text-secondary-text text-sm">#4d4df7</p>
            </div>

            <div className="bg-warning-accent p-4 rounded-lg text-center">
              <div className="w-full h-20 rounded mb-2 bg-warning-accent"></div>
              <p className="text-black">Warning</p>
              <p className="text-secondary-text text-sm">#e6d80e</p>
            </div>
          </div>

          <button className="btn-primary mr-4">Primary Button</button>

          <button className="btn-secondary">Secondary Button</button>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
