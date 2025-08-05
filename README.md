# Personal AI Voice Bot

This is a web-based voice bot designed to act as a personal AI avatar for Ritesh Kumar Gupta, a Computer Science student. Users can ask questions about his skills, projects, and experiences using their voice, and the bot will respond with synthesized speech. 
The project leverages Google's Gemini API for natural language understanding and generation.

---

## Features

-   **Voice-to-Text Input:** Uses the browser's SpeechRecognition API to capture user questions.
-   **Text-to-Speech Output:** Uses the SpeechSynthesis API to speak the AI's answers aloud.
-   **AI-Powered Conversation:** Leverages the `gemini-1.5-flash` model via the Google Gemini API for intelligent, context-aware responses.
-   **In-Context Learning:** The AI's persona and knowledge are provided at runtime through a detailed system prompt and few-shot examples.
-   **Responsive UI:** A clean and simple chat interface built with React and Tailwind CSS.

## Tech Stack

-   **Frontend:** React, TypeScript, Tailwind CSS
-   **Backend (Local):** Node.js / Express
-   **Backend (Production):** Vercel Serverless Functions
-   **AI API:** Google Gemini

## Local Setup and Installation

To run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ritesh-gupta19/voice-bot.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd voice-bot
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Create an environment file:**
    Create a file named `.env.local` in the root of the project folder.

5.  **Add your API Key:**
    Add your Google Gemini API key to the `.env.local` file.
    ```
    GOOGLE_API_KEY=your_actual_google_api_key_here
    ```

6.  **Run the development server:**
    This command will start both the React frontend and the local Node.js backend concurrently.
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Deployment

This project is configured for seamless deployment on **Vercel**.

-   Connect your GitHub repository to Vercel.
-   Add `GOOGLE_API_KEY` as an environment variable in the Vercel project settings.
-   Vercel will automatically build and deploy the application.