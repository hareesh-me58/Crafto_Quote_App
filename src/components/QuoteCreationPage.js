import React, { useState, useEffect } from "react";
import { uploadMedia, createQuote } from "../api.js";
import { useNavigate } from "react-router-dom";
import "../assets/QuoteCreationPage.css";

const QuoteCreationPage = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      const { data: mediaData } = await uploadMedia(file);
      const mediaUrl = mediaData.url;
      await createQuote(text, mediaUrl);
      alert("Quote created successfully!");
      navigate("/quotes");
    } catch (error) {
      alert("Failed to create quote.");
    }
  };

  return (
    <div className="container">
      <div className="quote-creation-container">
        <h2>Create Quote</h2>
        <textarea
          placeholder="Enter quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <button
        className="back-button"
        onClick={() => {
          navigate("/quotes");
        }}
      >
        Go to Quotes Page
      </button>
    </div>
  );
};

export default QuoteCreationPage;
