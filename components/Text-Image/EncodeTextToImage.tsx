import React, { useState } from "react";
import ImagePicker from "../ImagePicker";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import OutputImage from "../OutputImage";
import { base64ToFile } from "@/functions/base64ToFile";
import Loader from "../Loader";

function EncodeTextToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newFileUrl, setNewFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
  };

  const encode = async () => {
    if (!file) {
      toast.error("Please select a image");
      return;
    }
    if (!message) {
      toast.error("Please enter a message");
      return;
    }

    try {
      setLoading(true);
      if (process.env.NEXT_PUBLIC_BACKEND_URL) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("msg", message);
        axios
          .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/encode", formData)
          .then((response) => {
            const base64String = response.data.encrypted_image;
            
            const convertedFile = base64ToFile(
              base64String,
              file.name.substring(0, file.name.indexOf(".")) + "_encrypted"
            );
            setNewFile(convertedFile);
            convertedFile && setNewFileUrl(URL.createObjectURL(convertedFile));
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
      <div className="w-full flex flex-col gap-2">
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
          className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit "
        >
          Encode
          <ChevronRight />
        </button>
        <OutputImage file={newFile} fileUrl={newFileUrl} />
      </div>

      {loading && <Loader/>}
    </div>
  );
}

export default EncodeTextToImage;
