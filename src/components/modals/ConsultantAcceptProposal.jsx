import {
  calculateEmployerContributionPercent,
  calculateGrossHourlyRate,
  calculateTotalGrossHourlyRate,
} from "@/utils/salarySimulation";
import { formatDateWithDaysDisplay } from "@/utils/utility";
import Modal from "./Modal";

import FailModal from "./FailModal";

import { acceptRejectProposal } from "@/data/proposals";
import { useState } from "react";

import SuccessModal from "./SuccessModal";
export default function ConsultantAcceptProposal({
  isVisible,
  onclose,
  proposal,
  user,
}) {
  const [sucModalVisible, setSucModalVisible] = useState(false);

  const rate = user?.data?.consultant?.preferences?.rate;
  const rateAfterFees = rate - (rate * 0.03).toFixed(2);
  const dateOfBirth = user?.data?.consultant?.dob;

  const [failModalVisible, setfailModalVisible] = useState(false);
  const calculateAge = () => {
    const dob = dateOfBirth;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const employerContributionPercent = calculateEmployerContributionPercent(
    calculateAge()
  );
  const totalGrossHourlyRate = calculateTotalGrossHourlyRate(
    rateAfterFees,
    employerContributionPercent?.totalPercent
  );

  const grossHourlyRate = calculateGrossHourlyRate(totalGrossHourlyRate);

  const handleOnAccept = async () => {
    const b = {
      status: "AcceptedByConsultant",
    };
    const response = await acceptRejectProposal(proposal?.id, b);

    if (Object.keys(response?.data)?.length > 0) {
      setSucModalVisible(true);
    } else {
      setfailModalVisible(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSucModalVisible(false);
    onclose();
    location?.reload();
  };

  const handleCloseFailModal = () => {
    setfailModalVisible(false);
    onclose();
  };

  const loc = proposal?.missionLocation
    ? proposal?.missionLocation
    : `${proposal?.client?.commune} ${proposal?.client?.street}`;

  return (
    <>
      {rate && dateOfBirth && (
        <Modal
          isVisible={isVisible}
          onClose={onclose}
          scrollable={true}
          height={"95%"}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content position-relative">
              <div className="modal-body px-4 pt-5">
                <div className="pb20">
                  <p className="text-center" style={{ color: "black" }}>
                    Below are the details of the proposal. Once accepted, an
                    offer will be sent to the client.
                  </p>
                  <p>
                    Mission Company:{" "}
                    <b style={{ color: "black" }}>{proposal?.client?.name}</b>
                  </p>
                  <p>
                    {" "}
                    Mission Location: <b style={{ color: "black" }}>{loc}</b>
                  </p>
                  <p>
                    Job Title:{" "}
                    <b style={{ color: "black" }}>{proposal?.typeOfWork} </b>
                  </p>
                  <p>
                    Start of the Mission:{" "}
                    <b style={{ color: "black" }}>
                      {formatDateWithDaysDisplay(proposal?.startDate)}{" "}
                    </b>
                  </p>
                  <p>
                    End of the Mission:{" "}
                    <b style={{ color: "black" }}>
                      {formatDateWithDaysDisplay(proposal?.endDate)}{" "}
                    </b>
                  </p>
                  <p>
                    Working hours:{" "}
                    <b style={{ color: "black" }}>
                      Maximum standard hours 45 hours/week{" "}
                    </b>
                  </p>
                  <p>
                    Base Salary:{" "}
                    <b style={{ color: "black" }}>
                      {grossHourlyRate} CHF/hour{" "}
                    </b>
                  </p>
                  <p>
                    Vacation and public holiday Allowance:{" "}
                    <b style={{ color: "black" }}>
                      {(totalGrossHourlyRate - grossHourlyRate).toFixed(2)}{" "}
                      CHF/hour{" "}
                    </b>
                  </p>
                  <p>
                    Total Hourly Wage:{" "}
                    <b style={{ color: "black" }}>
                      {totalGrossHourlyRate} CHF/hour{" "}
                    </b>
                  </p>
                  <p>
                    Job Description:{" "}
                    <b style={{ color: "black" }}>{proposal?.details}</b>
                  </p>
                </div>
                <div className="d-flex justify-content-center gap-3 ">
                  <a className="btn-scn mb25" onClick={onclose}>
                    Cancel
                  </a>

                  <button className="btn-prm mb25" onClick={handleOnAccept}>
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <SuccessModal
        isVisible={sucModalVisible}
        title={"Proposal Accepted Successfully!"}
        message={"The proposal has been accepted successfully."}
        onclose={handleCloseSuccessModal}
      />

      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={"Something went wrong. Please try again."}
        onclose={handleCloseFailModal}
      />
    </>
  );
}
