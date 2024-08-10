import React, { useState } from 'react'
import ImagePicker from '../ImagePicker';
import { ChevronRight } from 'lucide-react';
import OutputImage from '../OutputImage';
import toast from 'react-hot-toast';
import axios from 'axios';
import { base64ToFile } from '@/functions/base64ToFile';
import Loader from '../Loader';

function EncodeImageToImage() {
    const [file, setFile] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [file2Url, setFile2Url] = useState<string | null>(null);

    const [outputFile, setOutputFile] = useState<File | null>(null);
    const [outputFileUrl, setOutputFileUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        const url = URL.createObjectURL(selectedFile);
        setFileUrl(url);
      }
    };

    const handleFile2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        const selectedFile = event.target.files[0];
        setFile2(selectedFile);

        const url = URL.createObjectURL(selectedFile);
        setFile2Url(url);
      }
    };

    const encode = async () => {
      if (!file) {
        toast.error("Please select a image");
        return;
      }
      if (!file2) {
        toast.error("Please select a image");
        return;
      }

      try {
        setLoading(true);
        if (process.env.NEXT_PUBLIC_BACKEND_URL) {
          const formData = new FormData();
          formData.append("image1", file);
          formData.append("image2", file2);
          axios
            .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/merge", formData)
            .then((response) => {
              setLoading(false);
              const base64String = response.data.encrypted_image;              
              const convertedFile = base64ToFile(
                base64String,
                file.name.substring(0, file.name.indexOf(".")) + "_encrypted"
              );
              setOutputFile(convertedFile);
              convertedFile &&
                setOutputFileUrl(URL.createObjectURL(convertedFile));
              setLoading(false);
            });
        }
      } catch (error) {
        toast.error("Something went wrong!!");
        setLoading(false);
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
          handleFileChange={handleFile2Change}
          file={file2}
          fileUrl={file2Url}
        />
        <button 
      onClick={encode}
        className="bg-coral-red text-white rounded-md px-4 py-2 mt-7 flex gap-2 transition duration-200 w-fit ">
          Encode
          <ChevronRight />
        </button>
        <OutputImage file={outputFile} fileUrl={outputFileUrl} />
      </div>
    {loading && <Loader />}
    </div>
  );
}

export default EncodeImageToImage