import React from 'react';

interface TagProps {
  tagContent: string;
}

const Tag: React.FC<TagProps> = ({ tagContent }) => {
  return (
    <span className="py-1 px-2 bg-[#F2F4F7] text-[#344054] font-[500] rounded-xl mx-2 text-[8px] md:text-[12px]">
      {tagContent}
    </span>
  );
};

export default Tag;
