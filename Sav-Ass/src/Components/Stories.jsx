import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import ReCAPTCHA from "react-google-recaptcha";

const Stories = () => {
   const [stories, setStories] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [currentPage, setCurrentPage] = useState(0);
   const [totalPages, setTotalPages] = useState(0);
   const [searchQuery, setSearchQuery] = useState("react");
   const [captchaValue, setCaptchaValue] = useState(null);

   const API = "https://hn.algolia.com/api/v1/search";

   const fetchStories = async (query, page) => {
      try {
         setIsLoading(true);
         const response = await axios.get(`${API}?query=${query}&page=${page}`);
         const { hits, nbPages } = response.data;
         setStories(hits);
         setTotalPages(nbPages);
         setIsLoading(false);
      } catch (error) {
         console.error("Something went wrong", error);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchStories(searchQuery, currentPage);
   }, [searchQuery, currentPage]);

   const handleSearch = (query) => {
      setSearchQuery(query);
      setCurrentPage(0);
   };

   const handlePageChange = (page) => {
      if (page >= 0 && page < totalPages) {
         setCurrentPage(page);
      }
   };

   const handleCaptchaChange = (value) => {
      setCaptchaValue(value);
   };

   const handleLoadItems = () => {
      if (captchaValue) {
         fetchStories(searchQuery, currentPage);
      } else {
         alert("Please complete the reCAPTCHA");
      }
   };

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (stories.length === 0) {
      return <div>No stories found</div>;
   }

   return (
      <div className="stories-container">
         <SearchBar onSearch={handleSearch} />

         <div className="recaptcha-container">
            <ReCAPTCHA
               sitekey="6LcN1IoqAAAAAJ5fmpQ7kYLUafzVc8GSyXqqbG6i"
               onChange={handleCaptchaChange}
            />
         </div>

         <button
            onClick={handleLoadItems}
            disabled={!captchaValue}
         >
            Load Items
         </button>

         <div className="stories-list">
            {stories.map((story) => {
               const { title, author, objectID, url } = story;

               return (
                  <div className="story-card" key={objectID}>
                     <h2>{title}</h2>
                     <p>By {author}</p>
                     <a href={url} target="_blank" >
                        Read Full Story
                     </a>
                  </div>
               );
            })}
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
