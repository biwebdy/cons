"use client";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import ConsultantAcceptProposal from "../modals/ConsultantAcceptProposal";
import ConsultantRejectProposal from "../modals/ConsultantRejectProppsal";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { displayProposalStatus } from "@/utils/displayStatus";
export default function ProposalCard1({ data, isOld }) {
  const [acceptProposalModalVisible, setAcceptProposalModalVisible] =
    useState(false);
  const [rejectProposalModalVisible, setRejectProposalModalVisible] =
    useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const u = await getUserMeLoader();
    setUser(u);
  };

  const handleViewProposal = () => {
    router.push(`proposal/${data?.id}`);
  };
  return (
    <>
      <tr>
        {isOld && (
          <th className="ps-0" scope="row">
            <div className=" p-0 mb-0 box-shadow-none">
              <div className="d-lg-flex align-items-lg-center">
                <div className="thumb w60 position-relative rounded-circle mb15-md">
                  <Image
                    height={60}
                    width={60}
                    className="rounded-circle mx-auto"
                    src={
                      handleImgResponse(data?.client?.logo)
                        ? handleImgResponse(data?.client?.logo)
                        : "/images/user.png"
                    }
                    alt="thumb"
                  />
                </div>
                <div className="details ml15 ml0-md mb15-md">
                  <h5 className="title mb-2">{data?.client?.name}</h5>
                </div>
              </div>
            </div>
          </th>
        )}

        <td className="vam">
          <h5 className="mb-0">{formatDateWithDaysDisplay(data?.startDate)}</h5>
        </td>
        <td className="vam">
          <h5 className="mb-0">{formatDateWithDaysDisplay(data?.endDate)}</h5>
        </td>

        <td className="vam">
          <h5 className="mb-0">{displayProposalStatus(data?.status)}</h5>
        </td>
        {isOld && (
          <>
            {data?.missionContract?.url ? (
              <td className="vam">
                <h5 className="mb-0">
                  <a
                    target="_blank"
                    href={handleImgResponse(data?.missionContract)}
                    style={{ color: "#1f4b3f" }}
                  >
                    {" "}
                    <i
                      className="flaticon-contract text-thm2 pe-2 vam"
                      style={{ fontSize: "35px" }}
                    />{" "}
                    Click to Download{" "}
                  </a>
                </h5>
              </td>
            ) : (
              <td className="vam">
                <h5 className="mb-0">N/A</h5>
              </td>
            )}
          </>
        )}

        {!isOld && (
          <>
            <td className="py-4 pr-4">
              <button
                onClick={handleViewProposal}
                className="bg-[#02153d] hover:bg-[#032a6f] text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center"
              >
                <Eye size={18} className="mr-2" />
                View Proposal
              </button>
            </td>
          </>
        )}
      </tr>

      {acceptProposalModalVisible && user?.ok && (
        <ConsultantAcceptProposal
          isVisible={acceptProposalModalVisible}
          onclose={() => setAcceptProposalModalVisible(false)}
          proposal={data}
          user={user}
        />
      )}
      {rejectProposalModalVisible && (
        <ConsultantRejectProposal
          isVisible={rejectProposalModalVisible}
          onclose={() => setRejectProposalModalVisible(false)}
          proposal={data}
        />
      )}
    </>
  );
}
