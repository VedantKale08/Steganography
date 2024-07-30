import React, { useState } from "react";
import ImagePicker from "../ImagePicker";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader";

function DecodeTextFromImage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
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
          .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/decode", formData)
          .then((response) => {
            const decoded_message = response.data.message;
            setMessage(decoded_message);
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
        className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit "
      >
        Decode
        <ChevronRight />
      </button>

      {message && (
        <>
          <p>Message</p>
          <div className="border px-4 py-3 rounded-md flex gap-3 text-sm">
            {message}
          </div>
        </>
      )}

      {loading && <Loader />}
    </div>
  );
}

export default DecodeTextFromImage;
