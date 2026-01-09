export const displayProposalStatus = (status) => {

    switch (status) {
        case "Pending":
            return "Pending Consultant Acceptance";
        case "PendingConsultantSigning":
            return "Pending Consultant Signing";
        case "AcceptedByConsultant":
            return "Accepted by Consultant";
        case "ApprovedByAdmin":
            return "Approved by Admin";
        case "RejectedByConsultant":
            return "Rejected by Consultant";
        case "RejectedByAdmin":
            return "Rejected by Admin";
        case "SigningStartedByConsultant":
            return "Pending Consultant Signing";
        case "SigningCompletedByConsultant":
            return "Signing Completed by Consultant";
        case "OfferCreated":
            return "Offer Created";
        case "ProposalCompleted":
            return "Proposal Completed";
        case "PendingL3Approval":
            return "Pending Approval";
        case "PendingL1Approval":
            return "Pending Admin Approval";
        case "RejectedByL3":
            return "Rejected by Client Account";
        case "RejectedByL1":
            return "Rejected by Admin";
        case "ApprovedByL3":
            return "Approved by Client Account";
        case "ApprovedByL1":
            return "Approved by Admin";

        default:
            return status;
    }
}

export const blurByStatus = (status) => {
    switch (status) {
        case "Pending":
            return true;
        case "PendingConsultantSigning":
            return true;
        case "AcceptedByConsultant":
            return false;
        case "ApprovedByAdmin":
            return false;
        case "RejectedByConsultant":
            return true;
        case "RejectedByAdmin":
            return true;
        case "SigningStartedByConsultant":
            return true;
        case "SigningCompletedByConsultant":
            return false;
        case "OfferCreated":
            return false;
        case "ProposalCompleted":
            return false;
        case "PendingL3Approval":
            return true;
        case "PendingL1Approval":
            return true;
        case "RejectedByL3":
            return true;
        case "RejectedByL1":
            return true;
        case "ApprovedByL3":
            return true;
        case "ApprovedByL1":
            return false;

        default:
            return status;
    }
}