"use client";

import { handleImgResponse } from "@/utils/utility";
import { useEffect, useState } from "react";

export default function UploadAttachment(props) {
  const { onChange, attachment, title } = props;
  const [uploadedFiles, setUploadedFiles] = useState(
    attachment && Array.isArray(attachment)
      ? attachment
      : attachment && !Array.isArray(attachment)
      ? [attachment]
      : []
  );
  const isEmptyObject = (obj) =>
    obj && Object.keys(obj).length === 0 && obj.constructor === Object;

  // upload handler
  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);

    const isFileDuplicate = (file, fileList) => {
      return fileList.some((existingFile) => existingFile.name === file.name);
    };

    const uniqueNewFiles = newFiles?.filter(
      (file) => !isFileDuplicate(file, uploadedFiles)
    );

    setUploadedFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
  };

  useEffect(() => {
    onChange({ attachment: uploadedFiles });
  }, [uploadedFiles]);

  // delete handler
  const handleFileDelete = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles?.filter((file) => file.name !== fileName)
    );
  };

  let content = uploadedFiles?.map((item, i) => (
    <>
      {!isEmptyObject(item) && (
        <div key={i} className="col-6 col-xl-3 position-relative">
          {item?.url ? (
            <>
              <a href={handleImgResponse(item)} target="_blank">
                <div className="project-attach">
                  <h6 className="title">
                    {item.name?.split(".")[0].substring(0, 15)}
                  </h6>
                  <p className="text-uppercase">
                    {item.name?.split(".").pop()}
                  </p>
                  <span className="icon flaticon-page" />
                </div>
              </a>
              <button
                className="position-absolute ui-delete-btn"
                onClick={() => handleFileDelete(item.name)}
              >
                x
              </button>
            </>
          ) : (
            <>
              <div className="project-attach">
                <h6 className="title">
                  {item.name?.split(".")[0].substring(0, 15)}
                </h6>
                <p className="text-uppercase">{item.name?.split(".").pop()}</p>
                <span className="icon flaticon-page" />
              </div>
              <button
                className="position-absolute ui-delete-btn"
                onClick={() => handleFileDelete(item.name)}
              >
                x
              </button>
            </>
          )}
        </div>
      )}
    </>
  ));

  return (
    <>
      <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h4 className="list-title fw900">{title || "Upload Resume"}</h4>
        </div>
        <div className="row">
          {content}
          <div className="col-6 col-xl-3">
            <label>
              <a className="upload-img">
                Upload Files
                <input
                  type="file"
                  accept="application/pdf"
                  className="d-none"
                  onChange={handleFileUpload}
                  multiple
                />
              </a>
            </label>
          </div>
        </div>
        <p className="text">Maximum file size: 10 MB (accepts .docx .pdf)</p>
      </div>
    </>
  );
}
