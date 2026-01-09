import Image from "next/image";
import ClientAbout from "../element/ClientAbout";
import { handleImgResponse } from "@/utils/utility";

export default function ClientProfile(props) {
  const { client } = props;
  const fullWidth = true;

  return (
    <>
      <section className="breadcumb-section pt-0">
        <div
          className={`mx-auto ${
            fullWidth ? "w100 maxw100" : "maxw1700"
          } pt120 pb120 bdrs16 position-relative overflow-hidden d-flex align-items-center mx20-lg px30-lg`}
        >
          <div className="container">
            <div className="row wow fadeInUp">
              <div className="col-xl-5">
                <div
                  className="list-meta d-sm-flex align-items-center"
                  style={{ paddingLeft: "50px" }}
                >
                  <a className="position-relative freelancer-single-style">
                    {handleImgResponse(client?.logo) ? (
                      <Image
                        width={90}
                        height={90}
                        className="rounded-circle w-100 wa-sm mb15-sm"
                        src={handleImgResponse(client?.logo)}
                        alt="Client Logo"
                      />
                    ) : (
                      <div
                        className="rounded-circle  wa-sm mb15-sm"
                        style={{
                          width: "90px",
                          height: "90px",
                          backgroundColor: "#F6CD79",
                        }}
                      >
                        <h3
                          style={{
                            color: "#FAE8E4",
                            textAlign: "center",
                            fontSize: "30px",
                            paddingTop: "25px",
                          }}
                        >
                          {client?.name
                            ?.split(" ", 2)
                            ?.map((word) => word[0]?.toUpperCase())
                            ?.join("")}
                        </h3>
                      </div>
                    )}
                  </a>
                  <div className="ml20 ml0-xs">
                    <h3 className="title mb-1">{client?.name}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
