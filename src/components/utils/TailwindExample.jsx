"use client";

import React from "react";

/**
 * TailwindExample component
 *
 * This component demonstrates how to use Tailwind CSS alongside Bootstrap.
 * Notice the 'tw-' prefix for all Tailwind classes to avoid conflicts with Bootstrap.
 */
const TailwindExample = () => {
  return (
    <div className="container my-5">
      {/* Bootstrap styling */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0">Bootstrap Card</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                This card is styled using Bootstrap classes.
              </p>
              <button className="btn btn-primary">Bootstrap Button</button>
            </div>
          </div>
        </div>

        {/* Tailwind CSS styling (with tw- prefix) */}
        <div className="col-md-6 mb-4">
          <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-overflow-hidden">
            <div className="tw-bg-blue-600 tw-text-white tw-p-4">
              <h5 className="tw-text-xl tw-font-bold">Tailwind Card</h5>
            </div>
            <div className="tw-p-4">
              <p className="tw-mb-4">
                This card is styled using Tailwind CSS classes.
              </p>
              <button className="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-medium tw-transition-colors tw-duration-300 tw-hover:bg-blue-700">
                Tailwind Button
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mixed styling example */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Using Both Together</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                This example shows how you can use Bootstrap for layout and some
                components, then enhance with Tailwind CSS for specific styling
                needs.
              </p>
              <div className="d-flex align-items-center tw-space-x-4">
                <button className="btn btn-primary">Bootstrap Button</button>
                <button className="tw-bg-green-500 tw-text-white tw-px-4 tw-py-2 tw-rounded-md tw-font-medium tw-hover:bg-green-600">
                  Tailwind Button
                </button>
                <span className="badge bg-secondary tw-animate-pulse">
                  Combined styling
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindExample;
