import { cn } from "@/shared/utils/cn";
import { Link, useLocation } from "react-router-dom";

interface Tab {
  path: string;
  title: string;
}

const tabs: Tab[] = [
  {
    path: "/anime",
    title: "Anime",
  },
  {
    path: "/characters",
    title: "Characters",
  },
  {
    path: "/studios",
    title: "Studios",
  },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <div className="sticky top-0 flex h-screen w-64 flex-shrink-0 flex-col bg-zinc-100 p-6">
      {tabs.map((tab) => (
        <Link
          key={tab.path}
          to={tab.path}
          className={cn(
            "rounded-lg p-3 text-lg transition-all hover:bg-white hover:text-indigo-500",
            {
              "bg-white text-indigo-500": location.pathname === tab.path,
            },
          )}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
}
