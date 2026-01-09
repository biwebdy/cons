import Link from "next/link";
import { LinkedinIcon } from "lucide-react";
export default function FooterSocial() {
  return (
    <>
      <div className="social-widget text-center text-md-end">
        <div className="social-style1">
          <Link className="text-white me-2 fw500 fz17" href="/">
            Follow us
          </Link>

          <a
            href="https://www.linkedin.com/company/lifesciconsulting/"
            target="_blank"
          >
            <LinkedinIcon size={24} style={{ color: "#fff" }} />
          </a>
        </div>
      </div>
    </>
  );
}
