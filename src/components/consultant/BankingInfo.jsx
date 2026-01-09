"use client";

import { useFormContext } from "@/utils/formContext";
import { useEffect, useState } from "react";
import CantonSelect from "../dashboard/option/CantonSelect";

export default function BankingInfo(props) {
  const { updateFormData, errors } = useFormContext();
  const { bankInfo, lov, isAdmin, validationErrors } = props;

  // Use validation errors from props if available, otherwise use form context errors
  const bankingErrors = validationErrors || errors || {};

  const [bankingInfo, setBankingInfo] = useState({
    holderFirstName: bankInfo?.holderFirstName || "",
    holderLastName: bankInfo?.holderLastName || "",
    bankName: bankInfo?.bankName || "",
    iban: bankInfo?.iban || "",
    country: bankInfo?.country || null,
    street: bankInfo?.street || null,
    areaPostalCodes: bankInfo?.areaPostalCodes || null,
    number: bankInfo?.number || null,
    commune: bankInfo?.commune || null,
    canton: bankInfo?.canton || null,
  });

  const [cantonData, setCantonData] = useState(null);
  useEffect(() => {
    const data = lov;
    if (data && data?.cantons) {
      const transformedCantons = data?.cantons?.map((canton) => ({
        value: canton?.value,
        option: canton?.title,
      }));
      setCantonData(transformedCantons);
    }
  }, []);

  const handleOnChange = (event) => {
    setBankingInfo({
      ...bankingInfo,
      [event.target.name]: event.target.value,
    });
  };

  const selectHandler = (name, value) => {
    setBankingInfo({
      ...bankingInfo,
      [name]: value,
    });
    updateFormData(name, value);
  };

  useEffect(() => {
    props?.onChange({ bankingInfo: bankingInfo });
  }, [bankingInfo]);

  return (
    <>
      <div
        className={`ps-widget bdrs4  mb30 overflow-hidden position-relative ${
          !isAdmin ? "bgc-white" : ""
        }`}
      >
        <div className="col-lg-12" style={{ paddingBottom: "60px" }}>
          <div className="row " style={{ paddingBottom: "60px" }}>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Account holder First Name
                </label>
                <input
                  type="text"
                  name="holderFirstName"
                  className={`form-control ${
                    bankingErrors?.holderFirstName ? "is-invalid" : ""
                  }`}
                  placeholder="Account Holder First Name"
                  value={bankingInfo?.holderFirstName}
                  onChange={handleOnChange}
                  onBlur={(e) =>
                    updateFormData("holderFirstName", e.target.value)
                  }
                />
                {bankingErrors?.holderFirstName && (
                  <div className="text-danger">
                    {" "}
                    Account {bankingErrors?.holderFirstName}
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Account holder Last Name
                </label>
                <input
                  type="text"
                  name="holderLastName"
                  className={`form-control ${
                    bankingErrors?.holderLastName ? "is-invalid" : ""
                  }`}
                  placeholder="Account Holder Last Name"
                  value={bankingInfo?.holderLastName}
                  onChange={handleOnChange}
                  onBlur={(e) =>
                    updateFormData("holderLastName", e.target.value)
                  }
                />
                {bankingErrors.holderLastName && (
                  <div className="text-danger">
                    Account {bankingErrors.holderLastName}
                  </div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  className={`form-control ${
                    bankingErrors?.bankName ? "is-invalid" : ""
                  }`}
                  placeholder="Bank Name"
                  value={bankingInfo?.bankName}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankName", e.target.value)}
                />
                {bankingErrors.bankName && (
                  <div className="text-danger">{bankingErrors.bankName}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  IBAN
                </label>
                <input
                  type="text"
                  name="iban"
                  className={`form-control ${
                    bankingErrors?.iban ? "is-invalid" : ""
                  }`}
                  placeholder="IBAN"
                  value={bankingInfo?.iban}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("iban", e.target.value)}
                />
                {bankingErrors.iban && (
                  <div className="text-danger">{bankingErrors.iban}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                {cantonData?.length > 0 && (
                  <CantonSelect
                    label="Canton"
                    defaultSelect={bankingInfo?.canton}
                    data={cantonData}
                    handler={selectHandler}
                    name="canton"
                    isSearchable={true}
                  />
                )}
                {bankingErrors?.bankCanton && (
                  <div className="text-danger">{bankingErrors.bankCanton}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  className={`form-control ${
                    bankingErrors?.bankStreet ? "is-invalid" : ""
                  }`}
                  placeholder="Street"
                  value={bankingInfo?.street}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankStreet", e.target.value)}
                />
                {bankingErrors.bankStreet && (
                  <div className="text-danger">{bankingErrors.bankStreet}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Number
                </label>
                <input
                  type="text"
                  name="number"
                  className={`form-control ${
                    bankingErrors?.bankNumber ? "is-invalid" : ""
                  }`}
                  placeholder="Door Number"
                  value={bankingInfo?.number}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankNumber", e.target.value)}
                />
                {bankingErrors.bankNumber && (
                  <div className="text-danger">{bankingErrors.bankNumber}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  City / Commune
                </label>
                <input
                  type="text"
                  name="commune"
                  className={`form-control ${
                    bankingErrors?.bankCommune ? "is-invalid" : ""
                  }`}
                  placeholder="City"
                  value={bankingInfo?.commune}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankCommune", e.target.value)}
                />
                {bankingErrors.bankCommune && (
                  <div className="text-danger">{bankingErrors.bankCommune}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className={`form-control ${
                    bankingErrors?.bankCountry ? "is-invalid" : ""
                  }`}
                  placeholder="Country"
                  value={bankingInfo?.country}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankCountry", e.target.value)}
                />
                {bankingErrors.bankCountry && (
                  <div className="text-danger">{bankingErrors.bankCountry}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="areaPostalCodes"
                  className={`form-control ${
                    bankingErrors?.bankAreaPostalCodes ? "is-invalid" : ""
                  }`}
                  placeholder="Postal Code"
                  value={bankingInfo.areaPostalCodes}
                  onChange={handleOnChange}
                  onBlur={(e) =>
                    updateFormData("bankAreaPostalCodes", e.target.value)
                  }
                />
                {bankingErrors.bankAreaPostalCodes && (
                  <div className="text-danger">
                    {bankingErrors.bankAreaPostalCodes}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
