"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ListingOption from "../element/ListingOption";
import ListingSidebar from "../sidebar/ListingSidebar";
import ConsultantCard from "./ConsultantCard";
import MobileListingSidebar from "../sidebar/MobileListingSidebar";

import { getConsultantByID, getconsultantsData } from "@/data/consultants";
import { strapiLOV } from "@/data/loaders";
import { Search } from "lucide-react";

const ITEMS_PER_PAGE = 3;
const INITIAL_PAGE = 1;

const CenteredContainer = ({ children, width = "70%" }) => (
  <div
    className="grey-bg"
    style={{ width, margin: "auto", padding: "50px", marginTop: "50px" }}
  >
    {children}
  </div>
);

const ConsultantResults = ({ content }) => (
  <div style={{ width: "90%", padding: "0px", margin: "auto" }}>{content}</div>
);

const NoResultsMessage = () => (
  <CenteredContainer>
    <h2 className="text-blue proxima text-center">
      THERE ARE NO MORE RESULTS THAT MATCH THE FILTER APPLIED
      <br /> <br />
      <span className="text-yellow" style={{ marginTop: "30px" }}>
        PLEASE TRY DIFFERENT FILTERS.
      </span>
      <br />
      <img
        src="/images/noresults.png"
        style={{ marginTop: "30px" }}
        alt="No Results"
      />
    </h2>
  </CenteredContainer>
);

const InitialViewMessage = () => (
  <CenteredContainer>
    <h2
      className="text-blue proxima"
      style={{ textAlign: "center", color: "#F3A95B" }}
    >
      USE OUR FILTERS TO VIEW OUR TOP CONSULTANTS!
    </h2>
    <div style={{ textAlign: "center", margin: "auto", marginTop: "35px" }}>
      <Image
        src="/images/filter.png"
        width={250}
        height={200}
        alt="Initial Filter Icons"
      />
    </div>
  </CenteredContainer>
);

export default function ConsultantsListing() {
  const [preferences, setPreferences] = useState({});
  const [consultants, setConsultants] = useState([]);
  const [page, setPage] = useState(INITIAL_PAGE);
  const [lovData, setLovData] = useState(null);
  const [initialView, setInitialView] = useState(true);
  const [searchedId, setSearchedId] = useState("");
  const [idConsultant, setIdConsultant] = useState(null);
  useEffect(() => {
    const fetchLovData = async () => {
      const data = await strapiLOV();
      setLovData(data);
    };
    fetchLovData();
  }, []);

  const handleOnChangePreferences = (newPreferences) => {
    setPreferences(newPreferences);
    setPage(INITIAL_PAGE);
  };

  const handleSearchById = async () => {
    setInitialView(false);
    if (searchedId) {
      const response = await getConsultantByID(searchedId);
      setIdConsultant(response?.data[0]);
      setConsultants([]);
    }
  };

  const handleFilter = async () => {
    const response = await getconsultantsData(
      page,
      ITEMS_PER_PAGE,
      preferences,
      {},
      true
    );

    setIdConsultant(null);
    setInitialView(false);

    if (response?.data?.length) {
      setConsultants(response.data);
      if (response.data.length >= ITEMS_PER_PAGE) {
        setPage((prevPage) => prevPage + 1);
      }
    } else {
      setConsultants([]);
      setPage(INITIAL_PAGE);
    }
  };

  const consultantCards = consultants
    ?.slice(0, ITEMS_PER_PAGE)
    .map((item, index) => (
      <div key={index} className="col-md-6 col-lg-12">
        <ConsultantCard data={item} index={index} hideData={true} />
      </div>
    ));

  const idConsCard = (
    <div className="col-md-6 col-lg-12">
      <ConsultantCard data={idConsultant} hideData={false} />
    </div>
  );

  const renderContent = () => {
    if (initialView) return <InitialViewMessage />;
    if (idConsultant) return <ConsultantResults content={idConsCard} />;
    if (consultantCards?.length)
      return <ConsultantResults content={consultantCards} />;
    return <NoResultsMessage />;
  };

  return (
    <>
      <section className="tailwind">
        <div className="container">
          <div className="grid grid-cols-12">
            <div className="col-span-12 lg:col-span-4 py-6">
              <h4 className="heading-color ff-heading fw700 mb10 proxima text-blue">
                Search by Consultant ID
              </h4>
              <div className="flex items-center">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Consultant ID"
                  value={searchedId}
                  name="searchedId"
                  onChange={(e) => {
                    setSearchedId(e.target.value);
                  }}
                />

                <button
                  className="bg-blue-brand text-white px-4 py-2 rounded-lg ml-3 h-[52px]"
                  onClick={handleSearchById}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <hr className="my-4 border-gray-300" />

              {lovData?.skills?.length && (
                <ListingSidebar
                  data={lovData}
                  onChange={handleOnChangePreferences}
                  onFilter={handleFilter}
                  initialView={initialView}
                  noContent={consultants?.length === 0}
                />
              )}
            </div>
            <div className="col-span-12 lg:col-span-8">
              {/* <ListingOption itemLength={consultantCards?.length} /> */}
              <div className="row">{renderContent()}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
