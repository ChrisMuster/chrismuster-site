import React from 'react';
import { DividerProps } from '@/components/ui/divider.types';

const Divider: React.FC<DividerProps> = ({
  width = "w-full",
  height = "h-4",
  color = "bg-[var(--color-primary)]",
  margin = "my-6",
  paddingX = "px-6 md:px-12 lg:px-24 xl:px-32",
  className = "",
}) => {
  return (
    <div className={`w-full ${paddingX} ${margin} flex justify-center`}>
      <div className={`${width} ${height} ${color} ${className}`} />
    </div>
  );
};

export default Divider;
