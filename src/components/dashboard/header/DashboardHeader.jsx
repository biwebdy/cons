"use client";
import BannerLogo from "@/components/banner-elements/BannerLogo";
import { dasboardNavigation } from "@/data/dashboard";
import { logoutAction } from "@/data/services/auth-service";
import toggleStore from "@/store/toggleStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const toggle = toggleStore((state) => state.dashboardSlidebarToggleHandler);
  const path = usePathname();

  const logout = async () => {
    await logoutAction();
  };
  return (
    <>
      <header className="header-nav nav-innerpage-style menu-home4 dashboard_header main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative  ">
                    <Link href="/" className="logo">
                      <BannerLogo color="blue" />
                    </Link>
                  </div>
                  <div className="fz20" style={{ marginLeft: "15px" }}>
                    <a
                      onClick={toggle}
                      className="dashboard_sidebar_toggle_icon vam"
                    >
                      <Image
                        height={18}
                        width={20}
                        src="/images/dashboard-navicon.svg"
                        alt="navicon"
                      />
                    </a>
                  </div>
                  <a
                    className="login-info d-block d-xl-none ml40 vam"
                    data-bs-toggle="modal"
                    href="#exampleModalToggle"
                  >
                    <span className="flaticon-loupe" />
                  </a>
                </div>
              </div>
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="dashboard_dd_menu_list d-flex align-items-center justify-content-center justify-content-sm-end mb-0 p-0">
                    <li>
                      <a style={{ paddingTop: "8px" }} onClick={logout}>
                        <i
                          className="flaticon-logout"
                          style={{ margin: "10px", fontSize: "30px" }}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
