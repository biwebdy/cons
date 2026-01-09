import Link from "next/link";

export default function ClientAbout({ client }) {
  return (
    <>
      <div className="price-widget pt25 bdrs8">
        <h3 className="widget-title">About Client</h3>
        <div className="category-list mt20">
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-badge text-thm2 pe-2 vam" />
              Account Owner
            </span>
            <span>
              {client?.accountOwnerFirstName} {client?.accountOwnerLastName}{" "}
            </span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-menu text-thm2 pe-2 vam" />
              Position
            </span>
            <span>{client?.details}</span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-mail text-thm2 pe-2 vam" />
              Email
            </span>
            <span>{client?.email}</span>
          </a>
        </div>
        <div className="d-grid">
          <Link href={`/client-edit-profile`} className="btn-prm">
            Modify Info
          </Link>
        </div>
      </div>
    </>
  );
}
