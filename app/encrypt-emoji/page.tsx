"use client"
import DecodeTextFromEmoji from '@/components/Emoji-Text/DecodeTextFromEmoji';
import EncodeTextToEmoji from '@/components/Emoji-Text/EncodeTextToEmoji';
import Tab from '@/components/Tab';
import React, { useState } from 'react'

function Page() {
  const [tab, setTab] = useState(0);
  return (
    <div className="px-[300px] py-4 flex flex-col gap-4 h-fit">
      <div className="flex gap-4">
        <Tab id={0} tab={tab} onClick={() => setTab(0)}>
          Encode text into emojis
        </Tab>
        <Tab id={1} tab={tab} onClick={() => setTab(1)}>
          Decode image from emojis
        </Tab>
      </div>

      {tab === 0 && <EncodeTextToEmoji />}
      {tab === 1 && <DecodeTextFromEmoji />}
    </div>
  );
}

export default Page