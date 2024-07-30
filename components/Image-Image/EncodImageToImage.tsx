import React, { useState } from 'react'
import ImagePicker from '../ImagePicker';
import { ChevronRight } from 'lucide-react';

function EncodeImageToImage() {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);
      }
    };
  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-md">
      <p>Select image </p>
      <ImagePicker
        handleFileChange={handleFileChange}
        file={file}
        fileUrl={fileUrl}
      />
      <div className="w-full flex flex-col gap-2 mt-4">
        <p>Select image to encrypt</p>
        <ImagePicker
          handleFileChange={handleFileChange}
          file={file}
          fileUrl={fileUrl}
        />
        <button className="bg-coral-red text-white rounded-md px-4 py-2 mt-7 flex gap-2 transition duration-200 w-fit ">
          Encode
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default EncodeImageToImage