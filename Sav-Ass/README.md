# **Stories App - README**

This is a React application that fetches and displays stories from the Hacker News API. The app allows users to search for stories, navigate through paginated results, and utilize Google reCAPTCHA for form validation before loading new items. Additionally, the app includes a drag-and-drop feature for better user interaction.

---

## **Project Structure**

```
/src
  /components
    SearchBar.jsx
    Stories.jsx
    Recaptcha.jsx
  App.js
  index.js
  styles.css
```

---

## **Components Overview**

### **1. SearchBar.jsx**

The `SearchBar` component provides an input field where users can enter a search query. It passes the query to the parent `Stories` component to update the search term and fetch the relevant data from the API.

#### **Props**
- `onSearch(query: string)`: A function passed down from the parent component (`Stories`) that updates the `searchQuery` state in the parent component when the user submits the search query.

#### **Functionality**
- Displays an input field for the search term.
- Triggers the `onSearch` function when the user submits a query.
  
#### **Usage Example**
```jsx
<SearchBar onSearch={handleSearch} />
```

### **2. Stories.jsx**

The `Stories` component fetches and displays a list of stories from the Hacker News API. It also implements pagination to allow users to navigate through the results and integrates Google reCAPTCHA to ensure human interaction before data can be loaded. Additionally, it includes drag-and-drop functionality for user-friendly interaction.

#### **State Variables**
- `stories`: An array that holds the fetched stories.
- `isLoading`: A boolean that tracks whether the data is still being fetched.
- `currentPage`: The current page of stories being displayed.
- `totalPages`: The total number of pages available from the API.
- `searchQuery`: The current search term used to filter the stories.
- `captchaValue`: The value returned by the Google reCAPTCHA widget.
- `isButtonEnabled`: A boolean that enables/disables the "Load Data" button based on the completion of the reCAPTCHA.

#### **Functions**
- `fetchStories(query, page)`: Makes an API request to fetch stories based on the search query and page number. It updates the state with the fetched stories and the total number of pages.
- `handleSearch(query)`: Updates the `searchQuery` state with a new search query and resets the current page to the first page.
- `handlePageChange(page)`: Changes the current page when the user clicks the "Next" or "Previous" buttons for pagination.
- `handleCaptchaChange(value)`: Updates the `captchaValue` state when the user interacts with the Google reCAPTCHA widget.
- `handleLoadItems()`: Triggers the data fetch only if the user has completed the reCAPTCHA. If not, an alert is shown.
- `handleDragStart()`: Enables drag functionality for each story item.
- `handleDrop()`: Handles the drop event when users drag and drop items in the list.

#### **Usage Example**
```jsx
<Stories />
```

### **Google reCAPTCHA Integration**
- **Google reCAPTCHA** is used to prevent bots from interacting with the app. The `Stories` component checks if the user has solved the reCAPTCHA before allowing them to load stories.
- **Important**: Replace the `sitekey` in the `ReCAPTCHA` component with your own Google reCAPTCHA site key.

```jsx
<ReCAPTCHA
  sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
  onChange={handleCaptchaChange}
/>
```

### **Pagination**
- The `Stories` component implements pagination to navigate through search results. It uses the `currentPage` state to track the current page and `totalPages` to determine how many pages are available from the API.
- **Navigation**: Pagination controls allow users to move between pages of results.

```jsx
<div className="pagination">
  <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
  <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
</div>
```

### **Drag-and-Drop**
- **Drag-and-Drop** functionality is included to rearrange stories.
- The app uses the native HTML5 drag-and-drop API to enable this feature.

```jsx
<div
  draggable
  onDragStart={(e) => handleDragStart(e, story)}
  onDrop={(e) => handleDrop(e, story)}
>
  {story.title}
</div>
```

---

## **Installation**

1. **Clone the repository**:

   ```bash
   git clone <repo-url>
   ```

2. **Navigate into the project folder**:

   ```bash
   cd <project-folder>
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

4. **Start the development server**:

   ```bash
   npm start
   ```

   This will start the app at `http://localhost:3000` in your browser.

---

## **Dependencies**

- **React**: A JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **react-google-recaptcha**: React wrapper for Google reCAPTCHA.
- **React-dnd** (optional for drag and drop): Drag-and-drop library for React.

---

## **Notes**

- Make sure to replace the `sitekey` for reCAPTCHA with your own key, which you can obtain from [Google's reCAPTCHA page](https://www.google.com/recaptcha).
- This project uses the **Hacker News API** (`https://hn.algolia.com/api/v1/search`) to fetch stories based on the search query.
- The drag-and-drop feature allows users to reorder the displayed stories for a more interactive experience.

---

## **Live Demo**

You can access the live version of the app hosted on Netlify:

- [Live Demo on Netlify](https://exquisite-torrone-a39589.netlify.app)

---

## **GitHub Link**

You can find the complete source code for this project on GitHub:

- [GitHub Repository](https://github.com/mohammadkaifshaikh01/Sav-Assignment/tree/main/Sav-Ass)

---

**Happy Coding!** 😊

