import React, { useEffect, useState, useCallback } from "react";
import { getQuotes } from "../api.js";
import { useNavigate } from "react-router-dom";
import "../assets/QuoteListPage.css";

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchQuotes = useCallback(async () => {
    try {
      const response = await getQuotes(20, offset);
      const quoteData = response.data.data;
      if (quoteData.length === 0) {
        setHasMore(false);
      }
      setQuotes((prev) => [...prev, ...quoteData]);
    } catch (error) {
      console.error("Error fetching quotes");
    }
  }, [offset]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      fetchQuotes();
    }
  }, [fetchQuotes, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="quote-list-container">
      <h2>Quotes</h2>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div>
        {quotes.map((quote) => (
          <div className="quote-item" key={quote.id}>
            <img className="quote-image" src={quote.mediaUrl} alt="Quote" />
            <div className="quote-text">{quote.text}</div>
            <div className="quote-meta">
              <p>
                <strong>{quote.username}</strong>
              </p>
              <p>{new Date(quote.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          className="load-more"
          onClick={() => setOffset((prev) => prev + 20)}
        >
          Load More
        </button>
      )}

      <button
        className="floating-action-button"
        onClick={() => {
          navigate("/create-quote");
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuoteListPage;
