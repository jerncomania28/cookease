import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

const ImageFileUpload: React.FC = () => {
  return (
    <div className="w-full relative">
      <label
        htmlFor="#image_url"
        className="w-full border-[1px] border-solid border-[#EAECF0] rounded-md flex flex-col items-center justify-center py-4"
      >
        <div className="w-[40px] h-[40px] rounded-full bg-[#F2F4F7] relative">
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className="w-[20px] h-[20px]"
          />
        </div>
        <p className="text-[#13A456] font-[600]">click to upload</p>
      </label>
      <input type="file" name="image_url" id="image_url" className="hidden" />
      <small className="font-[400] text-[#667085] text-[14px] my-3">
        This will be set as the thumbnail{' '}
      </small>
    </div>
  );
};

export default ImageFileUpload;
