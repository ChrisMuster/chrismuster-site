import React from 'react';
import { DividerProps } from '@/components/ui/divider.types';

const Divider: React.FC<DividerProps> = ({
  width = "w-full",
  height = "h-4",
  color = "bg-gray-500",
  margin = "my-6",
  paddingX = "px-xsmall md:px-medium lg:px-xlarge xl:px-xxlarge",
  className = "",
}) => {
  return (
    <div className={`${paddingX} ${margin}`}>
      <div className={`${width} ${height} ${color} ${className}`} />
    </div>
  );
};

export default Divider;
