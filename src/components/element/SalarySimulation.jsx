"use client";
import {
  calculateEmployeeContributionPercent,
  calculateEmployerContributionPercent,
  calculateGrossHourlyRate,
  calculateTotalGrossHourlyRate,
} from "@/utils/salarySimulation";
import Modal from "../modals/Modal";
import Table from "react-bootstrap/Table";
import { Col, Row } from "react-bootstrap";

export default function SalarySimulation({ onclose, isVisible, age, rate }) {
  const rateAfterFees = rate - (rate * 0.03).toFixed(2);
  const employerContributionPercent = calculateEmployerContributionPercent(age);
  const totalGrossHourlyRate = calculateTotalGrossHourlyRate(
    rateAfterFees,
    employerContributionPercent?.totalPercent
  );
  const grossHourlyRate = calculateGrossHourlyRate(totalGrossHourlyRate);
  const employeeContributionPercent = calculateEmployeeContributionPercent(age);
  const nhr = grossHourlyRate * (1 - employeeContributionPercent?.totalPercent);

  return (
    <>
      <Modal
        isVisible={isVisible}
        onClose={onclose}
        width={"80%"}
        height={"80%"}
        scrollable={true}
      >
        <div style={{ width: "70%", margin: "auto" }}>
          <Row style={{ padding: "30px 0px" }}>
            <Col sm={5} style={{ textAlign: "left" }}>
              <h3>Projected Monthly Salary:</h3>
            </Col>

            <Col sm={5} style={{ textAlign: "right" }}>
              <h3>
                {" "}
                {(
                  (totalGrossHourlyRate * 168)?.toFixed(2) *
                  (1 - employeeContributionPercent?.totalPercent)
                )?.toFixed(2)}{" "}
                CHF
              </h3>
            </Col>
          </Row>
          <Row style={{ padding: "10px" }}>
            Disclaimer: This simulation is a projection based on 168 hours of
            work per month and includes estimated amounts for vacation and bank
            holidays. It is intended for illustrative purposes only and does not
            guarantee actual earnings. The final monthly salary may vary based
            on actual hours worked and other factors. A 3% platform fee will be
            deducted from the initial desired rate. LifeSci Consulting SA is not
            liable for any discrepancies between projected and actual earnings.
          </Row>
        </div>
        <div style={{ width: "70%", margin: "auto" }}>
          <Table responsive bordered striped>
            <tbody>
              {/* Caculation of employer contributions section */}

              <tr>
                <td
                  rowSpan={14}
                  style={{
                    width: "33%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h4>Caculation of employer contributions</h4>
                </td>
                <td
                  style={{
                    width: "10%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h5>Contribution type</h5>
                </td>
                <td
                  style={{
                    width: "10%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h5>Employer</h5>
                </td>
              </tr>
              {Object.keys(
                employerContributionPercent?.employerContribution
              )?.map((key, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>
                    <b>{key}</b>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      employerContributionPercent?.employerContribution[key]
                        ?.percentageDisplay
                    }{" "}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ textAlign: "center" }}>
                  <b>Total</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>
                    {(employerContributionPercent?.totalPercent * 100)?.toFixed(
                      2
                    )}
                    %{" "}
                  </b>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    textAlign: "left",
                  }}
                >
                  Calculation of <b>Total Gross Hourly Rate (TGHR)</b>,
                  including holidays and vacation
                  <br />
                  Rate / 100% + employer contribution{" "}
                  {(employerContributionPercent?.totalPercent * 100)?.toFixed(
                    2
                  )}
                  %
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>Total gross hourly rate</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>{totalGrossHourlyRate} CHF </b>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    textAlign: "left",
                  }}
                >
                  Calculation of gross hourly rate that excludes hollidays and
                  vacations (10.6%) -{" "}
                  <b>this amount will figure on the contract</b>
                  <br />
                  TGHR/ (100%+10,6%)
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>Gross hourly rate</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>{grossHourlyRate} CHF </b>
                </td>
              </tr>
              <tr>
                <td
                  rowSpan={14}
                  style={{
                    width: "33%",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  <h4>Caculation of employee contributions</h4>
                </td>
                <td style={{ textAlign: "center" }}>
                  <h5>Contribution type</h5>
                </td>
                <td style={{ textAlign: "center" }}>
                  <h5>Employee</h5>
                </td>
              </tr>
              {Object.keys(
                employeeContributionPercent?.employeeContribution
              )?.map((key, i) => (
                <tr key={i}>
                  <td style={{ textAlign: "center" }}>
                    <b>{key}</b>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {
                      employeeContributionPercent?.employeeContribution[key]
                        ?.percentageDisplay
                    }{" "}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ textAlign: "center" }}>
                  <b>Total</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>
                    {(employeeContributionPercent?.totalPercent * 100).toFixed(
                      4
                    )}
                    %{" "}
                  </b>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    textAlign: "left",
                  }}
                >
                  Calculation of <b>Net Hourly Rate (NHR)</b>
                  <br />
                  Gross hourly rate * (1- total employee contribution (
                  {(employeeContributionPercent?.totalPercent * 100).toFixed(4)}
                  %))
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>Net hourly rate</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>{nhr.toFixed(2)} CHF </b>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    textAlign: "left",
                  }}
                >
                  Calculation of projected Gross Monthly Salary (PGMS), assuming
                  168h / month This is the projected gross amount on your
                  monhtly pay slip Gross hourly rate *168h
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>Projected gross monthly salary</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>{(totalGrossHourlyRate * 168).toFixed(2)} CHF </b>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "33%",
                    textAlign: "left",
                  }}
                >
                  Calculation of Projected Net Monthly Salary (PNMS) This is the
                  projected amount transfered by LSC to your account every month
                  (before tax) PGMS * (1-employee contribution)
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>Projected monthly salary</b>
                </td>
                <td style={{ textAlign: "center" }}>
                  <b>
                    {(
                      (totalGrossHourlyRate * 168).toFixed(2) *
                      (1 - employeeContributionPercent?.totalPercent)
                    ).toFixed(2)}{" "}
                    CHF
                  </b>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal>
    </>
  );
}
