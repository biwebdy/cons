"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FailModal from "../../modals/FailModal";
import { postClientRegistrationForm } from "../../../data/clientregform";

export default function ClientRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    message: "",
  });
  const [failModalVisible, setFailModalVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postClientRegistrationForm(formData);

      if (!response || response.error) {
        throw new Error(response?.error?.message || "Registration failed");
      }

      router.push("/thank-you-client");
    } catch (error) {
      console.error("Error registering client:", error);

      setFailModalVisible(true);
    }
  };

  return (
    <>
      <div className="tailwind">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="col-span-1 md:col-span-2">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="form-style1">
                <form>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Your Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Company Name*
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter company name"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter phone number"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw500 mb10">
                          Message (optional)
                        </label>
                        <textarea
                          type="text"
                          className="form-control"
                          placeholder="Enter message"
                          name="message"
                          rows={10}
                          style={{ minHeight: "150px" }}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-span-12 md:col-span-12">
                      <div className="text-end">
                        <button
                          type="submit"
                          className="btn-prm"
                          onClick={handleSubmit}
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fail Modal */}
      <FailModal
        isVisible={failModalVisible}
        title="Registration Failed"
        message={
          <>
            <p>
              There was an error while registering the client. Please try again.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Please check the information and try again. If the problem
              persists, contact support.
            </p>
          </>
        }
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
