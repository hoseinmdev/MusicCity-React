import { FC, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
const Main: FC<MainProps> = ({ children }) => {
  return (
    <div className="h-full w-full flex flex-col overflow-auto bg-neutral-900 ">
      <div className="fadeShow h-full w-full text-white">{children}</div>
    </div>
  );
};

export default Main;
