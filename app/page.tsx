"use client";

import HomePageCard from "../components/HomePageCard";
import { NotebookText } from "lucide-react";
import { RobotIcon } from "@phosphor-icons/react";

export default function Page() {
  return (
    <div className="flex flex-col p-6 justify-center items-center">
      <div className="flex flex-row gap-4">
        <HomePageCard
          imageSource="/images/logo.webp"
          title="Getting Started"
          description="Get a quick guide to the most basic features of Medbot"
          href="/docs/getting-started"
        />
        <HomePageCard
          icon={NotebookText}
          title="Workspace"
          description="Learn how to use the Medbot workspace"
          href="/docs/workspace"
        />
        <HomePageCard
          icon={RobotIcon}
          title="Agents"
          description="Create and use agents to streamline clinical note taking with Medbot"
          href="/docs/agents"
        />
      </div>
    </div>
  );
}
