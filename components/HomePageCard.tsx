"use client";

import { LucideIcon } from "lucide-react";

type HomePageCardProps = {
  title: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
};

export default function HomePageCard({
  title,
  href,
  icon,
  description,
}: HomePageCardProps) {
  return (
    <div>
      <a
        type="button"
        className="group h-full flex flex-col border border-slate-300 dark:border-slate-500 p-5 items-center justify-center gap-4 hover:bg-white/2 hover:border-slate-400 rounded-lg cursor-pointer"
        href={href}
      >
        {icon && (
          <div className="w-12 h-12 flex items-center justify-center">
            {(() => {
              const Icon = icon;
              return (
                <Icon className="w-12 h-12 text-slate-500 dark:text-slate-700 group-hover:text-slate-700 dark:group-hover:text-slate-500" />
              );
            })()}
          </div>
        )}
        <p className="font-bold text-2xl text-center">{title}</p>
        <p className="text-center text-slate-400">{description}</p>
      </a>
    </div>
  );
}
