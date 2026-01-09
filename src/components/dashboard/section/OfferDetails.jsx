"use client";
import FailModal from "@/components/modals/FailModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { getOfferById, updateOfferByAdmin } from "@/data/offers";
import { handleImgResponse } from "@/utils/utility";
import { useState, useEffect } from "react";

export default function OfferDetails({ id }) {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [rejectionModal, setRejectionModal] = useState(false);
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await getOfferById(id);

        setOffer(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffer();
  }, [id]);

  const handleApproveClick = async () => {
    try {
      const response = await updateOfferByAdmin(id, {
        status: "POApprovedByAdmin",
      });
      if (response?.status === 200) {
        setSuccessModalVisible(true);
      } else {
        setFailModalVisible(true);
      }
    } catch (error) {
      console.error("Error approving PO:", error);
      setFailModalVisible(true);
    }
  };
  const handleRejectClick = async () => {
    try {
      const response = await updateOfferByAdmin(id, {
        status: "RejectedByAdmin",
      });
      if (response?.status === 200) {
        setRejectionModal(true);
      } else {
        setFailModalVisible(true);
      }
    } catch (error) {
      console.error("Error approving PO:", error);
      setFailModalVisible(true);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    setRejectionModal(false);
    // Refresh the page to show updated status
    window.location.reload();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading offer details.</div>;
  if (!offer) return <div>No offer found.</div>;

  return (
    <>
      <div className="tailwind">
        <div className="p-4">
          {offer?.status === "POSubmitted" && (
            <div className="flex justify-end gap-4">
              <button className="btn-prm my-2" onClick={handleApproveClick}>
                Approve
              </button>
              <button className="btn-danger my-2" onClick={handleRejectClick}>
                Reject
              </button>
            </div>
          )}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    ID
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{offer.id}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    Title
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{offer.title}</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    Status
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {offer.status}
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    Contract
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      target="_blank"
                      href={handleImgResponse(offer.offerContract)}
                      className="flex items-center text-[#1f4b3f] hover:underline"
                    >
                      <span className="text-3xl mr-2">
                        <i className="flaticon-contract text-[#1f4b3f]" />
                      </span>
                      Click to View Offer Contract
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    Purchase Order
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <a
                      target="_blank"
                      href={handleImgResponse(offer.purchaseOrder)}
                      className="flex items-center text-[#1f4b3f] hover:underline"
                    >
                      <span className="text-3xl mr-2">
                        <i className="flaticon-contract text-[#1f4b3f]" />
                      </span>
                      Click to View Purchase Order
                    </a>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    Consultant
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {offer.proposal?.consultant
                      ? `${offer.proposal.consultant.firstName} ${offer.proposal.consultant.lastName} `
                      : "Not specified"}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-500">
                    Client
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {offer.proposal?.client?.name || "Not specified"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isVisible={successModalVisible}
        title="Purchase Order Approved"
        message="The purchase order has been successfully approved. The project is now active."
        onclose={handleSuccessModalClose}
      />

      <SuccessModal
        isVisible={rejectionModal}
        title="Purchase Order Rejected"
        message="The purchase order has been successfully rejected. The project is now active."
        onclose={handleSuccessModalClose}
      />

      {/* Fail Modal */}
      <FailModal
        isVisible={failModalVisible}
        title="Approval Failed"
        message="There was an error while approving the purchase order. Please try again."
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
