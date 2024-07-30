"use client"
import DecodeImageFromImage from '@/components/Image-Image/DecodeImageFromImage';
import EncodeImageToImage from '@/components/Image-Image/EncodImageToImage';
import Tab from '@/components/Tab';
import React, { useState } from 'react'

function Page() {
  const [tab, setTab] = useState(0);
  return (
    <div className="px-[300px] py-4 flex flex-col gap-4 h-fit">
      <div className="flex gap-4">
        <Tab id={0} tab={tab} onClick={() => setTab(0)}>
          Encode image into image
        </Tab>
        <Tab id={1} tab={tab} onClick={() => setTab(1)}>
          Decode image from image
        </Tab>
      </div>

      {tab === 0 && <EncodeImageToImage />}
      {tab === 1 && <DecodeImageFromImage />}
    </div>
  );
}

export default Page;