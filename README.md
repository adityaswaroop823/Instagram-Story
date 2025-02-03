# Insta Story App

- **Deployed Url**:-https://story-insta.netlify.app/

A React-based application that displays stories in a scrollable, expandable format, simulating a user-friendly Instagram-style story viewer.

## Features

- **Story List**: Display a list of stories that users can scroll horizontally.
- **Story Viewer**: Users can click on a story to expand and view the story content in full-screen mode.
- **Automatic Story Transition**: After viewing a story for a fixed duration, it transitions to the next story automatically.
- **Navigation**: Users can navigate between stories by either clicking or using the swipe action.
- **Responsive**: The app is fully responsive, making it suitable for different screen sizes.

## Tech Stack

- **Frontend**: React, TypeScript
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)
- **Styling**: Tailwind CSS
- **Icons**: React Icons (FaCamera, IoIosClose)
- **Fetching Data**: Custom `useFetch` hook to fetch story data from a local JSON file.
- **Unit Testing**: Cypress for end-to-end testing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adityaswaroop823/Instagram-Story
   ```

2. Navigate into the project directory:

   ```bash
   cd Instagram-Story
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

   The app will be available at `http://localhost:5173`.

## Usage

### 1. View Stories

- Upon loading the page, a list of stories will be displayed.
- Each story consists of a user's profile image, username, and a story thumbnail.

### 2. View Expanded Story

- Click on any story to open it in full-screen mode.
- The story will automatically transition after 5 seconds to the next one.

### 3. Navigation

- Right-click on the expanded story image to go to the next story.
- Left-click on the image or use a swipe gesture to move to the previous story.

### 4. Close Story

- Click the close (X) icon in the top right corner to exit the expanded story view.

## End-to-End Tests (Cypress)

The project includes Cypress tests to ensure functionality works as expected.

### Running the Tests

1. configure your base url in .env file for example
   CYPRESS_BASE_URL=http://localhost:5173

2. Open Cypress:

   ```bash
   npm run cypress:open
   ```

3. Select the `instagram-story.cy.js` file to run the tests.

### Example Test Case

- **Test Case**: Ensure that clicking on the first story opens the expanded view and the story image changes after a right-click action.

## Folder Structure

```
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Story.tsx
│   │   ├── StoryViewer.tsx
│   │   └── StoryExpanded.tsx
│   ├── hooks/
│   │   └── useFetch.ts
│   ├── types/
│   │   └── StoryInterface.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── stories.json  # Sample data for stories
└── package.json
```

- **`components/`**: Contains reusable React components for the app.

  - `Header.tsx`: Displays the app's header.
  - `Story.tsx`: Displays a single story in the list.
  - `StoryViewer.tsx`: The main viewer for expanded story content and The full-screen view for individual stories.

- **`hooks/`**: Contains the `useFetch` hook for fetching story data.
- **`types/`**: Contains the TypeScript interface for stories (`StoryInterface.ts`).
- **`public/`**: Contains the `stories.json` file with story data.

## Example Story Data (`stories.json`)

```json
[
  {
    "userName": "John Doe",
    "profileImage": "https://example.com/profile.jpg",
    "storyImage": "https://example.com/story1.jpg"
  },
  {
    "userName": "Jane Smith",
    "profileImage": "https://example.com/profile2.jpg",
    "storyImage": "https://example.com/story2.jpg"
  }
]
```

---

### Thank You

Thank you for checking out this project! If you have any suggestions or feedback, feel free to reach out.

🚀 Built with ❤️ by **Aditya Swaroop**

```

```
