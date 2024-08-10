"use client";
import axios from "axios";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader";
import { copyToClipboard } from "@/functions/copyToClipboard";

function EncodeTextToEmoji() {
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [encryptedMsg, setEncryptedMsg] = useState<string>("");

  const encode = () => {
    if(!message){
        return;
    }
    try {
        setLoading(true);
         if (process.env.NEXT_PUBLIC_BACKEND_URL) {
           const formData = new FormData();
           formData.append("msg", message);
           axios
             .post(
               process.env.NEXT_PUBLIC_BACKEND_URL + "/emoji-encode",
               formData
             )
             .then((response) => {
               const encoded_text = response.data.encoded_text;
                setEncryptedMsg(encoded_text);
               setLoading(false);
             });
         }
    } catch (error) {
         setLoading(false);
         toast.error("Something went wrong!!");
    }
  }

  return (
    <div className="bg-white flex flex-col gap-4 p-6 rounded-md">
      <p>Enter message</p>
      <input
        className="h-full w-full border px-5  py-3 rounded-md "
        id="roomId"
        type="text"
        required={true}
        placeholder="Message to encode"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
          onClick={encode}
        className="bg-coral-red text-white rounded-md px-4 py-2  flex gap-2 transition duration-200 w-fit "
      >
        Encode
        <ChevronRight />
      </button>
      {encryptedMsg && (
        <>
          <p>Here is your encrypted Text</p>
          <div 
          onClick={copyToClipboard}
          className="border px-4 py-3 rounded-md flex gap-3 text-sm cursor-pointer" id="copy-text">
            {encryptedMsg}
          </div>
        </>
      )}
      {loading && <Loader />}
    </div>
  );
}

export default EncodeTextToEmoji;
