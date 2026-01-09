"use client";

import { postMessage } from "@/data/contactus";
import { isEmailValid, isRequired } from "@/utils/formValidators";
import { useState } from "react";
import FailModal from "../modals/FailModal";
import SuccessModal from "../modals/SuccessModal";

export default function ContactInfo() {
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostData = async () => {
    const response = await postMessage(formData);
    if (response?.error?.message) {
      setFailModalVisible(true);
    } else {
      setSucModalVisible(true);
    }
  };

  const handleSubmit = () => {
    if (!formData?.name || !formData?.email || !formData?.message) {
      validateFields();
    } else {
      handlePostData();
    }
  };

  const validateField = (fieldName, value) => {
    let error;
    switch (fieldName) {
      case "name":
        error = isRequired(value, fieldName);
        break;
      case "email":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isEmailValid(value);
        break;
      default:
        error = isRequired(value, fieldName);
        break;
    }
    setValidationErrors((prev) => ({ ...prev, [fieldName]: error.message }));
  };

  const validateFields = () => {
    validateField("name", formData?.name);
    validateField("email", formData?.email);
    validateField("message", formData?.message);
  };

  return (
    <>
      <section className="pt-0 " style={{ padding: "120px" }}>
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">
            <div className="col-lg-6">
              <div className="position-relative mt40">
                <div className="main-title">
                  <h4 className="form-title mb25">Keep In Touch With Us.</h4>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-tracking" />
                  </div>
                  <div className="details">
                    <h5 className="title">Address</h5>
                    <p className="mb-0 text">
                      {" "}
                      Grand Rue 43c <br />
                      1432 Belmont-sur-Yverdon, Vaud, Switzerland <br />
                    </p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-call" />
                  </div>
                  <div className="details">
                    <h5 className="title">Phone</h5>
                    <p className="mb-0 text">+(41) 76 325 28 36</p>
                  </div>
                </div>
                <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                  <div className="icon flex-shrink-0">
                    <span className="flaticon-mail" />
                  </div>
                  <div className="details">
                    <h5 className="title">Email</h5>
                    <p className="mb-0 text">
                      <a href="mailto:info@sconsulting.ch">
                        info@sconsulting.ch
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-page-form default-box-shadow1 bdrs8 bdr1 p50 mb30-md bgc-white">
                <h4 className="form-title mb25">Tell us about yourself</h4>
                <p className="text mb30">
                  Whether you have questions or you would just like to say
                  hello, contact us.
                </p>
                <div className="form-style1">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={formData?.name}
                          onChange={handleOnChange}
                          onBlur={() => validateField("name", formData?.name)}
                        />
                        {validationErrors.name && (
                          <div className="text-danger">
                            {validationErrors.name}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email"
                          name="email"
                          value={formData?.email}
                          onChange={handleOnChange}
                          onBlur={() => validateField("email", formData?.email)}
                        />
                        {validationErrors.email && (
                          <div className="text-danger">
                            {validationErrors.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Messages
                        </label>
                        <textarea
                          cols={30}
                          rows={6}
                          placeholder="Description"
                          value={formData?.message}
                          onChange={handleOnChange}
                          name="message"
                          onBlur={() =>
                            validateField("message", formData?.message)
                          }
                        />
                        {validationErrors.message && (
                          <div className="text-danger">
                            {validationErrors.message}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div>
                        <button
                          type="button"
                          className="btn-prm"
                          onClick={handleSubmit}
                        >
                          Send Messages
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={"Something went wrong. Please try again."}
        onclose={() => setFailModalVisible(false)}
      />
      <SuccessModal
        isVisible={sucModalVisible}
        title={"Message Sent Successfully!"}
        message={"We have received your message. We will get back to you soon."}
        onclose={() => setSucModalVisible(false)}
      />
    </>
  );
}
