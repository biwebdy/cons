"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "@/utils/formContext";
import { strapiLOV } from "@/data/loaders";
import CantonSelect from "../../option/CantonSelect";

export default function BankingInfo(props) {
  const { updateFormData, errors } = useFormContext();
  const { bankInfo } = props;
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
    strapiLOV().then((data) => {
      if (data && data.cantons) {
        const transformedCantons = data.cantons.map((canton) => ({
          value: canton.value,
          option: canton.title,
        }));
        setCantonData(transformedCantons);
      }
    });
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
        className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative"
        style={{ paddingTop: "80px" }}
      >
        <div className="bdrb1 pb15 mb25">
          <h4 className="list-title fw900">
            Banking Info (for salary payment purposes)
          </h4>
        </div>
        <div className="col-lg-7">
          <div className="row">
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Account holder First Name
                </label>
                <input
                  type="text"
                  name="holderFirstName"
                  className="form-control"
                  placeholder="Account Holder First Name"
                  value={bankingInfo?.holderFirstName}
                  onChange={handleOnChange}
                  onBlur={(e) =>
                    updateFormData("holderFirstName", e.target.value)
                  }
                />
                {errors.holderFirstName && (
                  <div className="text-danger">
                    {" "}
                    Account {errors.holderFirstName}
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
                  className="form-control"
                  placeholder="Account Holder Last Name"
                  value={bankingInfo?.holderLastName}
                  onChange={handleOnChange}
                  onBlur={(e) =>
                    updateFormData("holderLastName", e.target.value)
                  }
                />
                {errors.holderLastName && (
                  <div className="text-danger">
                    Account {errors.holderLastName}
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
                  className="form-control"
                  placeholder="Bank Name"
                  value={bankingInfo?.bankName}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankName", e.target.value)}
                />
                {errors.bankName && (
                  <div className="text-danger">{errors.bankName}</div>
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
                  className="form-control"
                  placeholder="IBAN"
                  value={bankingInfo?.iban}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("iban", e.target.value)}
                />
                {errors.iban && (
                  <div className="text-danger">{errors.iban}</div>
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
                  className="form-control"
                  placeholder="Street"
                  value={bankingInfo?.street}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankStreet", e.target.value)}
                />
                {errors.bankstreet && (
                  <div className="text-danger">{errors.bankstreet}</div>
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
                  className="form-control"
                  placeholder="Door Number"
                  value={bankingInfo?.number}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankNumber", e.target.value)}
                />
                {errors.bankNumber && (
                  <div className="text-danger">{errors.bankNumber}</div>
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
                  className="form-control"
                  placeholder="Postal Code"
                  value={bankingInfo.areaPostalCodes}
                  onChange={handleOnChange}
                  onBlur={(e) =>
                    updateFormData("bankAreaPostalCodes", e.target.value)
                  }
                />
                {errors.bankAreaPostalCodes && (
                  <div className="text-danger">
                    {errors.bankAreaPostalCodes}
                  </div>
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
                  className="form-control"
                  placeholder="City"
                  value={bankingInfo?.commune}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankCommune", e.target.value)}
                />
                {errors.bankCommune && (
                  <div className="text-danger">{errors.bankCommune}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                {cantonData?.length > 0 && (
                  <CantonSelect
                    label="Canton"
                    defaultSelect={
                      bankingInfo?.canton?.id ? bankingInfo?.canton?.id : ""
                    }
                    data={cantonData}
                    handler={selectHandler}
                    name="canton"
                    isSearchable={true}
                  />
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
                  className="form-control"
                  placeholder="Country"
                  value={bankingInfo?.country}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("bankCountry", e.target.value)}
                />
                {errors.bankCountry && (
                  <div className="text-danger">{errors.bankCountry}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
