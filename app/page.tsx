"use client";

import HomePageCard from "@/components/HomePageCard";
import { 
  BackpackIcon, 
  BotIcon, 
  BinocularsIcon,
  NotebookTextIcon, 
  MicroscopeIcon, 
  MonitorPlayIcon,
  PencilLineIcon,
  SliceIcon, 
  TabletsIcon 
} from "lucide-react";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-medium mt-4">Medbot Documentation</h1>
      <div className="mt-4">
        Medbot is an AI agent platform built to automate manual, 
        labor intensive and time consuming clinical tasks and healthcare 
        administrative processes for healthcare professionals and 
        healthcare administrators.
      </div>
      <h1 className="text-3xl font-medium mt-4">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
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
      <h1 className="text-3xl font-medium mt-4">Use Cases</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
        <HomePageCard
          icon={SliceIcon}
          title="Surgical Site Infection"
          description="Automate the detection and reporting of surgical site infections"
          href="/docs/use-cases/ssi"
        />
        <HomePageCard
          icon={BinocularsIcon}
          title="Syndromic Surveillance"
          description="Utilize agents for effective syndromic surveillance in healthcare settings"
          href="/docs/use-cases/syndromic-surveillance"
        />
        <HomePageCard
          icon={BackpackIcon}
          title="Sepsis Bundle"
          description="Implement sepsis bundles efficiently using Medbot agents"
          href="/docs/use-cases/sepsis"
        />
        <HomePageCard
          icon={TabletsIcon}
          title="Antimicrobial Stewardship Program"
          description="Enhance antimicrobial stewardship programs with AI-driven agents"
          href="/docs/use-cases/asp"
        />
        <HomePageCard
          icon={PencilLineIcon}
          title="Medical Report Writing"
          description="Streamline medical report writing using Medbot's AI capabilities"
          href="/docs/use-cases/medical-report"
        />
      </div>
    </div>
  );
}
