"use client";

export default function LocalPagination({
  currentPage,
  totalPages,
  onPaginate,
}) {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPaginate(page);
  };

  return (
    <div className={`mbp_pagination text-center`}>
      <ul className="page_navigation">
        <li
          className="page-item"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <a
            className="page-link"
            style={{ background: "transparent", paddingTop: "3px" }}
          >
            <span className="flaticon-left-arrow" />
          </a>
        </li>
        {totalPages > 0 && (
          <>
            {[...Array(totalPages)]?.map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => handlePageChange(i + 1)}
              >
                <a className="page-link">{i + 1}</a>
              </li>
            ))}
          </>
        )}

        <li
          className="page-item"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <a
            className="page-link"
            style={{
              background: "transparent",
              paddingTop: "3px",
              transform: "rotate(180deg)",
            }}
          >
            <span className="flaticon-left-arrow" />
          </a>
        </li>
      </ul>
      <p className="mt10 mb-0 pagination_page_count text-center">
        {currentPage} – {totalPages} pages available
      </p>
    </div>
  );
}
