# 🤖 Integra.AI  

**Integra.AI** is an intelligent video calling platform powered by AI agents.  
These agents assist users during meetings with real-time responses, generate post-meeting summaries, and provide insights — automating the entire meeting lifecycle using **OpenAI Realtime API**, **Stream SDK**, and **Inngest** for workflow automation.  

---

## 🚀 Features  

- 🎥 **AI-Powered Video Meetings** – Host real-time calls with AI participants.  
- 🧠 **AI Agents** – Create and customize intelligent agents for specific tasks.  
- 📝 **Automatic Summaries** – Receive AI-generated meeting notes, transcripts, and insights instantly after every session.  
- ⚡ **Event-Driven Backend** – Powered by Inngest for async workflows and background processing.  
- 🧩 **Modern UI** – Built using Next.js 14 (App Router) and Tailwind CSS for a clean, responsive design.  

---

## 🏗️ Tech Stack  

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, ShadCN/UI  
- **Backend:** Inngest (serverless event orchestration)  
- **AI:** OpenAI Realtime API (Voice + Text Intelligence)  
- **Video SDK:** Stream SDK  
- **Database:** Neon / PostgreSQL  
- **Deployment:** Vercel  

---

## 📦 Installation  

Clone the repository and install dependencies.

```bash
git clone https://github.com/yourusername/integra-ai.git
cd integra-ai
npm install
```

---

## ⚙️ Environment Variables

Create a .env.local file in the project root and add:

DATABASE_URL=your_database_url
BETTER_AUTH_SECRET=your_stream_api_key
BETTER_AUTH_URL=your_better_auth_url
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret_code
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_APP_URL=your_next_public_app_url
NEXT_PUBLIC_STREAM_VIDEO_API_KEY=your_next_public_stream_video_api
STREAM_VIDEO_SECRET_KEY=your_stream_video_secret_key
NEXT_PUBLIC_STREAM_CHAT_API_KEY=your_next_public_stream_chat_api
STREAM_CHAT_SECRET_KEY=your_stream_chat_secret_key
OPENAI_API_KEY=your_open_api_key

## ▶️ Running the App

Start the development server:
```bash 
npm run dev
```

Open your browser at http://localhost:3000

## 🧠 How It Works

- AI Agent Creation: User creates an AI agent and defines its role.
- Video Meeting: Stream SDK handles real-time video/audio.
- Realtime AI: OpenAI Realtime API processes conversation live.
- Automation: Inngest triggers post-meeting tasks (summaries, insights, etc.).
- Storage: All data and transcripts are saved securely in the database.