"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SparklesIcon, VideoIcon, BrainIcon } from "lucide-react";

export const HomeView = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-5xl sm:text-hidden font-bold tracking-tight text-gray-900">
          <span className="text-sidebar-accent bg-clip-text ">
            Integra.AI
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          A video calling app powered entirely by AI agents — from real-time coaching to automatic summaries and insights after every call.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/meetings/new">
            <Button size="lg" className="flex items-center gap-x-2 bg-primary text-white">
              <VideoIcon className="h-5 w-5" />
              Start New Meeting
            </Button>
          </Link>
          <Link href="/agents">
            <Button size="lg" variant="outline" className="flex items-center gap-x-2">
              <BrainIcon className="h-5 w-5 text-primary" />
              Create AI Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-20 grid sm:grid-cols-3 gap-8 max-w-5xl w-full">
        <FeatureCard
          icon={<VideoIcon className="text-primary h-8 w-8" />}
          title="Real-time AI Calls"
          desc="Host live calls with AI-powered participants trained for your specific use case."
        />
        <FeatureCard
          icon={<SparklesIcon className="text-primary h-8 w-8" />}
          title="Automatic Summaries"
          desc="Get instant AI-generated summaries, transcripts, and action points after every meeting."
        />
        <FeatureCard
          icon={<BrainIcon className="text-primary h-8 w-8" />}
          title="Smart Insights"
          desc="Chat with your meeting — ask questions, find key topics, and get actionable insights instantly."
        />
      </div>
    </div>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) => {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all flex flex-col items-center text-center gap-y-3">
      {icon}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
};
