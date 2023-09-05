import React from "react";

type SkeletonProps = {
  className: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={`animate-pulse bg-neutral-400/70 dark:bg-gray-100/30 ${className}`}></div>;
};
export default Skeleton;
