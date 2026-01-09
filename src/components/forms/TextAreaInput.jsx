"use client";
import React, { useState } from "react";

export default function TextAreaInput({
  name,
  value,
  onChange,
  onBlur,
  maxWords,
  label,
  placeholder,
}) {
  const [text, setText] = useState(value);

  const countWords = (str) => {
    return str?.trim()?.split(/\s+/)?.length;
  };

  const handleOnChange = (event) => {
    const { value } = event.target;
    const wordCount = countWords(value);
    if (wordCount > maxWords) {
      return;
    }
    setText(value);
    onChange(event);
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text");
    const pasteWordCount = countWords(pasteData);
    const currentWordCount = countWords(text);

    if (currentWordCount + pasteWordCount > maxWords) {
      event.preventDefault();
      const allowedWords = maxWords - currentWordCount;
      const words = pasteData.trim().split(/\s+/).slice(0, allowedWords);
      event.target.value = text + " " + words.join(" ");
      setText(event.target.value);
      onChange(event);
    }
  };

  return (
    <div className="mb10">
      <label className="heading-color ff-heading fw700 mb10">{label}</label>
      <textarea
        cols={30}
        rows={2}
        placeholder={placeholder}
        style={{ resize: "none" }}
        name={name}
        value={text}
        onChange={handleOnChange}
        onPaste={handlePaste}
        onBlur={onBlur}
      />
      <small>
        {countWords(text)} / {maxWords} words
      </small>
    </div>
  );
}
