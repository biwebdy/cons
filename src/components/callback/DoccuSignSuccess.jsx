export default function DoccuSignSuccess() {
  return (
    <div className="verification-container bg-light">
      <div className="verification-content">
        <div className="text-center ">
          <div className="text-success mb-3">
            <i
              className="bi bi-check-circle-fill"
              style={{ fontSize: "4rem" }}
            ></i>
          </div>
          <h2 className="text-success">Success!</h2>
          <p className="text-muted">
            Your document has been successfully signed.
          </p>
        </div>
      </div>
    </div>
  );
}
