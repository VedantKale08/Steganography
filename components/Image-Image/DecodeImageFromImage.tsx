import React, { useState } from 'react'
import ImagePicker from '../ImagePicker';
import { ChevronRight, Download } from 'lucide-react';

function DecodeImageFromImage() {
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
      <p>Select encrypted image</p>
      <ImagePicker
        handleFileChange={handleFileChange}
        file={file}
        fileUrl={fileUrl}
      />
      <button className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit ">
        Decode
        <ChevronRight />
      </button>
      {/* <p>Here it is</p>
      <div>
        <img src="/images/image.png" className="w-1/2 " />
        <button className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit ">
          Download
          <Download />
        </button>
      </div> */}
    </div>
  );
}

export default DecodeImageFromImage;