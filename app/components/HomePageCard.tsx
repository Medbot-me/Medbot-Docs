"use client";

import { LucideIcon } from "lucide-react";

type HomePageCardProps = {
  title: string;
  href: string;
  imageSource?: string;
  icon?: LucideIcon;
  description?: string;
};

export default function HomePageCard({
  title,
  href,
  imageSource,
  icon,
  description,
}: HomePageCardProps) {
  return (
    <a
      type="button"
      className="group flex flex-col border border-gray-300 dark:border-gray-500 p-5 items-center justify-center gap-4 w-56 h-56 hover:bg-white/2 hover:border-gray-400 rounded-lg cursor-pointer"
      href={href}
    >
      {imageSource && (
        <img
          src={imageSource}
          className="w-12 h-12 flex items-center justify-center"
        />
      )}
      {!imageSource && icon && (
        <div className="w-12 h-12 flex items-center justify-center">
          {(() => {
            const Icon = icon;
            return (
              <Icon className="w-12 h-12 text-gray-300 dark:text-gray-500 group-hover:text-gray-300" />
            );
          })()}
        </div>
      )}
      <p className="font-bold text-2xl">{title}</p>
      <p className="text-center text-slate-400">{description}</p>
    </a>
  );
}
