import React from 'react'
import ImagePicker from '../ImagePicker';
import { ChevronRight } from 'lucide-react';

function EncodeImageToImage() {
  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-md">
      <p>Select image </p>
      <ImagePicker />
      <div className="w-full flex flex-col gap-2">
        <p>Enter message</p>
        <input
          className="h-full w-full border px-5  py-3 rounded-md "
          id="roomId"
          type="text"
          required={true}
          placeholder="Message to encode"
          // value={title}
          // onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit ">
          Encode
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export default EncodeImageToImage