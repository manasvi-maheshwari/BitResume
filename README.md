🟢 BitResume
A minimalist AI tool that converts messy resume text into structured JSON data using Gemini 2.5.

Features
AI Parsing: Powered by Gemini 2.5 Flash for high accuracy.

Structured Output: Clean, schema-ready JSON.

Sleek UI: Professional Green-on-Black "Spatial" design.

Setup

1. Server (The Brain)
Bash
cd server
npm install
# Add your GEMINI_API_KEY to .env
node index.js

2. Client (The Face)
Bash
cd client
npm install
npm run dev

Structure
/server: Node.js/Express API to handle AI logic.

/client: Vite-powered frontend for a smooth user experience.

How it works
Paste raw resume text.

Hit Parse.

Copy the structured JSON.