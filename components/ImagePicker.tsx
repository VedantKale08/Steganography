import { Upload } from 'lucide-react'
import Image from 'next/image';
import React from 'react'

function ImagePicker() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center h-[250px] border-2 rounded-md border-dashed gap-2 relative cursor-pointer border-slate-400">
        <div className='bg-coral-red rounded-full p-4'>
          <Upload size={30} className="bg-coral-red text-white" />
        </div>
        <p className="text-lg">Drag and drop image</p>
        <p>or</p>
        <p className="bg-coral-red text-white px-6 py-1 rounded-full">Browse</p>
        <p className="text-slate-500">Supported formats: .png, .jpg, .jpeg</p>
        <input
          type="file"
          accept="image/*"
          className="opacity-0 absolute w-full h-full cursor-pointer"
        />
      </div>

      <div className="border px-4 py-3 rounded-md flex gap-3">
        <img
          src="/images/image.png"
          alt=""
          className="w-10 object-cover"
          width={10}
          height={10}
        ></img>
        <div>
          <p>abcd.png</p>
          <p className="text-gray-400">
            80.0 MB
            {/* {file?.size ? (file?.size / 1048576).toFixed(2) + "MB" : ""} */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ImagePicker