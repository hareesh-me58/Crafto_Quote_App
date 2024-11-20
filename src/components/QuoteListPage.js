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
    fetchQuotes();
  }, [fetchQuotes]);

  const handleCreateQuote = () => {
    navigate("/create-quote");
  };

  return (
    <div className="quote-list-container">
      <h2>Quotes</h2>
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

      <button className="floating-action-button" onClick={handleCreateQuote}>
        +
      </button>
    </div>
  );
};

export default QuoteListPage;
