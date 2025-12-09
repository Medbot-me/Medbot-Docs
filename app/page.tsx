"use client";

import HomePageCard from "@/components/HomePageCard";
import { MonitorPlayIcon, NotebookTextIcon, BotIcon, MicroscopeIcon } from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-medium mt-4">Medbot Documentation</h1>
      <div className="mt-4">
        Medbot is an AI agent platform built to automate manual, 
        labor intensive and time consuming clinical tasks and healthcare 
        administrative processes for healthcare professionals and 
        healthcare administrators.
      </div>
      <h1 className="text-3xl font-medium mt-4">Features</h1>
      <div className="grid grid-cols-4 gap-4 my-4">
        <HomePageCard
          icon={MonitorPlayIcon}
          title="Getting Started"
          description="Get a quick guide to the most basic features of Medbot"
          href="/docs/getting-started"
        />
        <HomePageCard
          icon={NotebookTextIcon}
          title="Workspace"
          description="Learn how to use the Medbot workspace"
          href="/docs/workspace"
        />
        <HomePageCard
          icon={BotIcon}
          title="Agents"
          description="Create and use agents to streamline clinical note taking with Medbot"
          href="/docs/agents"
        />
        <HomePageCard
          icon={MicroscopeIcon}
          title="DeepResearch"
          description="Leverage the power of agents for comprehensive medical research"
          href="/docs/deep-research"
        />
      </div>
    </div>
  );
}
