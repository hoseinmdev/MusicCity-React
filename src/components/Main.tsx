import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  const hasTrack = useSelector((state: RootState) => !!state.player.currentTrack);

  return (
    // When MiniPlayer is active, push content up:
    //   mobile  → extra 8.5rem (navbar ~56px + mini-player ~60px + gap)
    //   desktop → extra 5rem   (mini-player ~72px + gap)
    <div
      className={`h-full w-full flex flex-col overflow-auto bg-zinc-300/50 dark:bg-neutral-900 transition-[padding] duration-300 ${
        hasTrack ? "pb-[8.5rem] lg:pb-20" : ""
      }`}
    >
      <div className="fadeShow h-full w-full text-gray-950 dark:text-white">
        {children}
      </div>
    </div>
  );
};

export default Main;
