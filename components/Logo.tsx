
import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' | 'xl', variant?: 'default' | 'white' }> = ({ size = 'md', variant = 'default' }) => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-6xl'
  };

  const bubbleSizes = {
    sm: 'px-2 py-0.5 rounded-md',
    md: 'px-3 py-1 rounded-lg',
    lg: 'px-6 py-2 rounded-2xl',
    xl: 'px-10 py-4 rounded-[2rem]'
  };

  return (
    <div className={`flex items-center font-bold tracking-tight ${sizes[size]}`}>
      <span className={variant === 'default' ? 'text-brand-gradient' : 'text-white'}>B2U</span>
      <div className={`ml-1 bg-brand-gradient ${bubbleSizes[size]} flex items-center justify-center relative`}>
         {/* Tail of the bubble */}
         <div className="absolute -bottom-1 left-2 w-3 h-3 bg-brand-gradient transform rotate-45"></div>
         <span className="text-white relative z-10">App</span>
      </div>
    </div>
  );
};
