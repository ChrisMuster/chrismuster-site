// components/Loading.tsx  

import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-4 h-4 mx-1 my-8 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="w-4 h-4 mx-1 my-8 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      <div className="w-4 h-4 mx-1 my-8 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '600ms' }} />
    </div>
  );
};

export default Loading; 
