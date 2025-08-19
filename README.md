# MockTest AI 📝

MockTest AI is a modern web application that leverages the power of Google's Gemini API to generate dynamic, multiple-choice quizzes on any topic. Users can specify the topic, difficulty, and other details to create tailored tests, attempt them, and review their scores and answers. The application features a sleek, responsive interface with a dark mode and saves test history to the user's local storage.

---

## ✨ Features

* **Dynamic Quiz Generation**: Creates 50 multiple-choice questions on any user-provided topic.
* **Customizable Quizzes**: Fine-tune tests by specifying difficulty, a specific branch of the topic, and other details.
* **Interactive Test Experience**: Users can take the test, select answers, and submit for instant evaluation.
* **Score and Review**: View the final score and review each question with the correct answer and explanation highlighted.
* **Test History**: Automatically saves completed tests (including scores and answers) to local storage for 30 days.
* **Modern UI**: A clean, professional, and fully responsive interface.
* **Dark Mode**: A sleek, glassmorphism-inspired dark theme that respects the user's system preference.

---

## 🛠️ Tech Stack

* **Frontend**:
    * **Framework**: React with TypeScript
    * **Bundler**: Vite
    * **Styling**: Tailwind CSS
* **Backend**:
    * **Framework**: Node.js with Express
    * **AI**: Google Gemini API (`@google/generative-ai`)

---

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

* **Node.js**: Version 18.x or higher.
* **npm**: Included with Node.js.
* **Google Gemini API Key**: You must have a valid API key from the [Google AI for Developers](https://ai.google.dev/) platform.

### Setup and Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repository-url>
    cd <your-project-directory>
    ```

2.  **Set up the Backend**:
    * Navigate to the backend directory:
        ```bash
        cd code/backend
        ```
    * Install the dependencies:
        ```bash
        npm install
        ```
    * Create a `.env` file in the `code/backend` directory and add your Gemini API key:
        ```env
        GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
        ```

3.  **Set up the Frontend**:
    * Navigate to the frontend directory from the root:
        ```bash
        cd code/mock-box
        ```
    * Install the dependencies:
        ```bash
        npm install
        ```

### Running the Application

You need to run both the backend and frontend servers simultaneously in separate terminals.

1.  **Start the Backend Server**:
    * In the `code/backend` directory, run:
        ```bash
        node server.js
        ```
    * The backend will be running at `http://localhost:5000`.

2.  **Start the Frontend Server**:
    * In the `code/mock-box` directory, run:
        ```bash
        npm run dev
        ```
    * The frontend will be available at `http://localhost:5173`.

Open your browser and navigate to `http://localhost:5173` to use the application.

---

## 📁 Project Structure

```
.
├── code/
│   ├── backend/
│   │   ├── node_modules/
│   │   ├── .env            # Backend environment variables
│   │   ├── package.json
│   │   └── server.js       # Express server and API logic
│   │
│   └── mock-box/
│       ├── public/
│       ├── src/
│       │   ├── components/ # Reusable React components
│       │   ├── lib/        # Helper functions (e.g., local storage)
│       │   ├── App.tsx     # Main application root
│       │   ├── index.css   # Global styles
│       │   ├── main.tsx    # Application entry point
│       │   └── types.ts    # TypeScript type definitions
│       │
│       ├── .env            # Frontend environment variables (if any)
│       ├── package.json
│       └── vite.config.ts  # Vite configuration
│
└── README.md
