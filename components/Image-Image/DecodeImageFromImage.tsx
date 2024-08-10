import React, { useState } from 'react'
import ImagePicker from '../ImagePicker';
import { ChevronRight, Download } from 'lucide-react';
import Loader from '../Loader';
import OutputImage from '../OutputImage';
import toast from 'react-hot-toast';
import axios from 'axios';
import { base64ToFile } from '@/functions/base64ToFile';

function DecodeImageFromImage() {
    const [file, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>(null); 

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

     const decode = () => {
       if (!file) {
         toast.error("Please select a image");
         return;
       }

       try {
         setLoading(true);
         if (process.env.NEXT_PUBLIC_BACKEND_URL) {
           const formData = new FormData();
           formData.append("image", file);
           axios
             .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/unmerge", formData)
             .then((response) => {
               const base64String = response.data.unmerged_image;

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
         setLoading(false);
         toast.error("Something went wrong!!");
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
      <button 
      onClick={decode}
      className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit ">
        Decode
        <ChevronRight />
      </button>
      <OutputImage file={outputFile} fileUrl={outputFileUrl} />
      {loading && <Loader />}
    </div>
  );
}

export default DecodeImageFromImage;