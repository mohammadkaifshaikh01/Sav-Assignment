import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ReCaptchaComponent from "./Recaptcha";

const Stories = () => {
   const [stories, setStories] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [searchQuery, setSearchQuery] = useState("react");
   const [captchaValue, setCaptchaValue] = useState(null);
   const [isButtonEnabled, setIsButtonEnabled] = useState(false);
   const [error, setError] = useState("");
   const [currentPage, setCurrentPage] = useState(0);
   const [totalPages, setTotalPages] = useState(0);

   const API = "https://hn.algolia.com/api/v1/search";

   // Fetch stories from the API
   const fetchStories = async (query, page) => {
      try {
         setIsLoading(true);
         const response = await axios.get(`${API}?query=${query}&page=${page}`);
         const { hits, nbPages } = response.data;
         setStories(hits);
         setTotalPages(nbPages);
         setError("");
      } catch (error) {
         console.error("Something went wrong", error);
         setError("Failed to fetch stories. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (captchaValue) {
         fetchStories(searchQuery, currentPage);
      }
   }, [captchaValue, searchQuery, currentPage]);

   const handleSearch = (query) => {
      setSearchQuery(query);
      setCurrentPage(0); // Reset to the first page
   };

   const handleCaptchaChange = (value) => {
      if (value) {
         setCaptchaValue(value);
         setIsButtonEnabled(true);
         setError("");
      } else {
         setCaptchaValue(null);
         setIsButtonEnabled(false);
         setError("Please complete the reCAPTCHA.");
      }
   };

   const handleLoadData = () => {
      if (captchaValue) {
         fetchStories(searchQuery, currentPage);
      } else {
         setError("Please complete the reCAPTCHA first.");
      }
   };

   const handlePageChange = (page) => {
      if (page >= 0 && page < totalPages) {
         setCurrentPage(page);
      }
   };

   // Drag-and-Drop Handlers
   const handleDragStart = (e, index) => {
      e.dataTransfer.setData("storyIndex", index);
   };

   const handleDrop = (e) => {
      const draggedIndex = e.dataTransfer.getData("storyIndex");
      const droppedIndex = e.target.closest(".story-card").dataset.index;

      if (draggedIndex !== droppedIndex) {
         const updatedStories = [...stories];
         const [removed] = updatedStories.splice(draggedIndex, 1);
         updatedStories.splice(droppedIndex, 0, removed);
         setStories(updatedStories);
      }
   };

   const handleDragOver = (e) => {
      e.preventDefault();
   };

   return (
      <div className="stories-container">
         <h1 className="heading">Search Hacker News Stories</h1>

         <SearchBar onSearch={handleSearch} />
         <div className="recaptcha">
            <ReCaptchaComponent onCaptchaChange={handleCaptchaChange} />
         </div>

         {error && <p className="error-message">{error}</p>}

         <button
            onClick={handleLoadData}
            disabled={!isButtonEnabled}
            className={`load-button ${isButtonEnabled ? "" : "disabled"}`}
         >
            Load Data
         </button>

         {isLoading && <div className="loading">Loading...</div>}

         <div className="stories-list" onDragOver={handleDragOver} onDrop={handleDrop}>
            {stories.length > 0 ? (
               stories.map((story, index) => (
                  <div
                     key={story.objectID}
                     data-index={index}
                     className="story-card"
                     draggable
                     onDragStart={(e) => handleDragStart(e, index)}
                  >
                     <h2>{story.title || "No Title"}</h2>
                     <p>By {story.author || "Unknown"}</p>
                     <a
                        href={story.url}
                        target="_blank"
                        rel="noopener noreferrer"
                     >
                        Read Full Story
                     </a>
                  </div>
               ))
            ) : (
               !isLoading && <p>No stories available. Try searching for something.</p>
            )}
         </div>

         <div className="pagination">
            <button
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 0}
            >
               Previous
            </button>
            <span>
               Page {currentPage + 1} of {totalPages}
            </span>
            <button
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === totalPages - 1}
            >
               Next
            </button>
         </div>
      </div>
   );
};

export default Stories;
