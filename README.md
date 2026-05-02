# 🤖 Integra.AI

**Integra.AI** is an intelligent video calling platform powered by AI agents.
These agents assist users during meetings with real-time responses, generate post-meeting summaries, and provide insights — automating the entire meeting lifecycle using **OpenAI Realtime API**, **Stream SDK**, and **Inngest** for workflow automation.

## 📸 Screenshots

![Integra.AI Dashboard](/public/image.png)  

## 🚀 Features

- 🤖 AI-powered video calls with custom agents
- 📞 Real-time video & chat using Stream SDK
- 📝 Automatic meeting summaries & transcripts
- 🔍 Smart transcript search & video playback
- 🔐 Authentication with Better Auth
- 📱 Mobile responsive design
- ⚙️ Background jobs with Inngest

## 🏗️ Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, ShadCN/UI
- **Backend:** Inngest (serverless event orchestration)
- **AI:** OpenAI Realtime API (Voice + Text Intelligence)
- **Video SDK:** Stream SDK
- **Database:** Neon / PostgreSQL
- **Authentication:** Better Auth
- **Deployment:** Vercel

## 📁 Project Structure (Short)

```
components.json
drizzle.config.ts
eslint.config.mjs
next-env.d.ts
next.config.ts
package.json
postcss.config.mjs
tsconfig.json
public/
src/
  app/          # Next.js app router pages
  components/   # Reusable UI components
  db/           # Database configuration and schema
  hooks/        # Custom React hooks
  inngest/      # Background job functions
  lib/          # Utility libraries
  modules/      # Feature-specific modules (agents, auth, etc.)
  trpc/         # tRPC API routes and client
```

## ⚙️ Environment Variables

Create a `.env.local` file in the project root and add:

```
DATABASE_URL=your_database_url
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=your_better_auth_url
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
OPENAI_API_KEY=your_openai_api_key
INNGEST_SIGNING_KEY=your_inngest_signing_key
```

## 🚀 Development Flow

### Install dependencies (use --legacy-peer-deps for React 19 compatibility)
```bash
npm install --legacy-peer-deps
```

### Start development servers
```bash
npm run dev          # Start Next.js development server
npm run dev:webhook  # Start webhook server (requires ngrok static domain in package.json)
npx inngest-cli@latest dev  # Start Inngest development server
```

### Additional Commands
```bash
# Database
npm run db:push      # Push database changes
npm run db:studio    # Open database studio

# Production
npm run build        # Build for production
npm run start        # Start production server
```

**Note:** For `dev:webhook` to work, you need to add your ngrok static domain to the script in package.json:

```json
"dev:webhook": "ngrok http --url=[YOUR_NGROK_STATIC_DOMAIN] 3000"
```

## 📦 Installation

Clone the repository and install dependencies.

```bash
git clone https://github.com/srnsksyp/integra-ai.git
cd integra-ai
npm install --legacy-peer-deps
```
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