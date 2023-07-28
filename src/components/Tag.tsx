import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ children, className }) => {
  return (
    <span className={`rounded-xl whitespace-nowrap ${className}`}>
      {children}
    </span>
  );
};

export default Tag;
