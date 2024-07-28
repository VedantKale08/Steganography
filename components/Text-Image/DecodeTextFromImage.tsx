import React from 'react'
import ImagePicker from '../ImagePicker';
import { ChevronRight } from 'lucide-react';

function DecodeTextFromImage() {
  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-md">
      <p>Select encrypted image</p>
      <ImagePicker />

      <button className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit ">
        Decode
        <ChevronRight />
      </button>

      <p>Message</p>
      <div className="border px-4 py-3 rounded-md flex gap-3 text-sm">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
        necessitatibus impedit totam iusto, veniam repellat.
      </div>
    </div>
  );
}

export default DecodeTextFromImage