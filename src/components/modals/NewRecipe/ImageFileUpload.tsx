/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction } from 'react';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';

//firebase
import { storage } from '../../../utils/firebase';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

import { NewRecipeProps } from '.';

interface ImageFileUploadProps {
  error?: string;
  setNewRecipe: React.Dispatch<SetStateAction<NewRecipeProps>>;
  newRecipe: NewRecipeProps;
  value?: {
    image_url: string;
    image_ref: string;
  };
}

const ImageFileUpload: React.FC<ImageFileUploadProps> = ({
  error,
  setNewRecipe,
  newRecipe,
  value,
}) => {
  const [progress, setProgress] = React.useState<boolean>(false);
  const [imageURL, setImageURL] = React.useState<string>('');
  const [imageRef, setImageRef] = React.useState<any>('');
  const [isRemoving, setIsRemoving] = React.useState<boolean>(false);

  // handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      const storageRef = ref(storage, 'images/' + selectedFile.name);

      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          setImageRef(snapshot?.ref);

          setProgress(true);
        },
        (error) => {
          switch (error.code) {
            case 'storage/unauthorized':
              toast.error('🦄 user not authorize to use storage!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
              break;
            case 'storage/canceled':
              toast.error('🦄 image upload canceled!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
              break;

            default:
              toast.error('🦄 An error occured!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
              });
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          setProgress(false);
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            setNewRecipe({
              ...newRecipe,
              image: {
                image_url: downloadURL,
                image_ref: uploadTask.snapshot.ref.fullPath,
              },
            });
          });
        },
      );
    }
  };

  const handleRemoveImage = () => {
    const deleteRef = ref(storage, value?.image_ref || imageRef?.fullPath);
    setIsRemoving(true);
    deleteObject(deleteRef)
      .then(() => {
        setImageURL('');
        setImageRef('');
        setNewRecipe({
          ...newRecipe,
          image: {
            image_url: '',
            image_ref: '',
          },
        });

        setIsRemoving(false);
      })
      .catch((err) => {
        console.log('error , Information', err);
        toast.error('🦄 An error occurred', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };
  return (
    <>
      <div className="w-full relative py-4 border-[1px] border-solid border-[#EAECF0] flex justify-center items-center ">
        {progress ? (
          <span>uploading...</span>
        ) : value?.image_url || imageURL ? (
          <div className="w-full h-[250px] md:h-[150px] relative flex flex-col md:flex-row justify-around md:justify-center item-center">
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <img
                src={value?.image_url || imageURL}
                alt="image-url"
                className="w-[200px] h-[150px]"
              />
            </div>
            <button
              className={` w-[130px] h-[40px] text-white bg-[#13A456] rounded mx-3 self-center cursor-pointer ${
                isRemoving ? 'opacity-50' : ''
              }`}
              disabled={isRemoving}
              onClick={handleRemoveImage}
            >
              {isRemoving ? 'removing ...' : ' remove image'}
            </button>
          </div>
        ) : (
          <label
            htmlFor="image_url"
            className="w-full rounded-md flex flex-col items-center justify-center py-4 cursor-pointer my-2"
          >
            <div className="w-[40px] h-[40px] rounded-full bg-[#F2F4F7] relative flex justify-center items-center">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                className="w-[20px] h-[20px]"
              />
            </div>
            <p className="text-[#13A456] font-[600]">click to upload</p>
          </label>
        )}

        <input
          type="file"
          name="image_url"
          id="image_url"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {error ? (
        <small className="text-red-600 font-[500]">{error}</small>
      ) : (
        <small className="font-[400] text-[#667085] text-[14px] my-3">
          This will be set as the thumbnail{' '}
        </small>
      )}
    </>
  );
};

export default ImageFileUpload;
