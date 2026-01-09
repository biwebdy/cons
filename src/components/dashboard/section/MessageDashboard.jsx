"use client";
export default function MessageDashboard({ message }) {
  return (
    <>
      <div className={`pb20`}>
        <div className="mbp_first position-relative d-sm-flex align-items-center justify-content-start mb30-sm mt30">
          <div className="ml0-xs mt20-xs">
            <h6 className="mt-0 mb-1">{message?.name}</h6>
            <div className="d-flex align-items-center">
              <div>
                <span className="fz15 fw500">{message?.email}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text mt20 mb20">{message?.message}</p>
        <button
          onClick={() => (window.location = `mailto:${message?.email}`)}
          className="btn-prm"
        >
          Respond
        </button>
      </div>
    </>
  );
}
