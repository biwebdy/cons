"use client";

import { handleImgResponse } from "@/utils/utility";
import { useEffect, useState } from "react";

export default function UploadAttachment(props) {
  const { onChange, attachment, isCenter, isMultiple = true, onDelete } = props;

  const [uploadedFiles, setUploadedFiles] = useState(
    attachment && Array.isArray(attachment)
      ? attachment
      : attachment && !Array.isArray(attachment)
      ? [attachment]
      : []
  );

  useEffect(() => {
    setUploadedFiles(
      attachment && Array.isArray(attachment)
        ? attachment
        : attachment && !Array.isArray(attachment)
        ? [attachment]
        : []
    );
  }, [attachment]);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);

    const isFileDuplicate = (file, fileList) => {
      return fileList.some((existingFile) => existingFile.name === file.name);
    };

    const uniqueNewFiles = newFiles?.filter(
      (file) => !isFileDuplicate(file, uploadedFiles)
    );
    if (!isMultiple) {
      setUploadedFiles(uniqueNewFiles);
      return;
    }

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
    !isMultiple ? onDelete() : null;
  };

  let content = uploadedFiles?.map((item, i) => (
    <div key={i} className="col-6 position-relative">
      {item?.url ? (
        <>
          <a href={handleImgResponse(item)} target="_blank" rel="noreferrer">
            <div className="project-attach">
              <h6 className="title">
                {item.name?.split(".")[0].substring(0, 15)}
              </h6>
              <p className="text-uppercase">{item.name?.split(".").pop()}</p>
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
          {item.name ? (
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
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  ));

  return (
    <>
      <div className="row">
        {content}
        <div
          style={{
            margin: isCenter ? "auto" : "",
            textAlign: isCenter ? "center" : "",
          }}
        >
          <label>
            <a className="upload-img">
              Upload Files
              <input
                type="file"
                accept="application/pdf"
                className="d-none"
                onChange={handleFileUpload}
                multiple={isMultiple}
              />
            </a>
          </label>
          <p className="text">Maximum file size: 10 MB (accepts .docx .pdf)</p>
        </div>
      </div>
    </>
  );
}
