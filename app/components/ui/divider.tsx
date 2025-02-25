import React from 'react';
import { DividerProps } from '@/components/ui/divider.types';

const Divider: React.FC<DividerProps> = ({
  width = "w-full",
  height = "h-4",
  color = "bg-[var(--color-primary)]",
  margin = "my-6",
  paddingX = "px-xsmall md:px-medium lg:px-xlarge xl:px-xxlarge",
  className = "",
}) => {
  return (
    <div className={`w-full ${paddingX} ${margin} flex justify-center`}>
      <div className={`${width} ${height} ${color} ${className}`} />
    </div>
  );
};

export default Divider;
