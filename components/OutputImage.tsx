import { Download } from 'lucide-react';
import React from 'react'

interface OutputImageType{
    file: File | null;
    fileUrl: string | null;
}

function OutputImage({ file, fileUrl }: OutputImageType) {

    const handleDownload = () => {
        if(fileUrl){
            const link = document.createElement("a");
            link.href = fileUrl;
            link.download = file?.name || "image.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); 
        }
    };

    return (
      <div className="flex flex-col gap-4 mt-5">
        {file && fileUrl && (
          <>
            <p>Here it is</p>
            <div className="flex gap-4">
              <img src={fileUrl} className="w-1/2 flex-1" />
              <div className="flex-1">
                <p>Image Name : {file.name}</p>
                <p>Extension : .png</p>
                <p>
                  Size :{" "}
                  {file?.size ? (file?.size / 1048576).toFixed(2) + "MB" : ""}
                </p>

                <button
                  onClick={handleDownload}
                  className="bg-coral-red text-white rounded-md px-4 py-2 mt-3 flex gap-2 transition duration-200 w-fit "
                >
                  Download
                  <Download />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
}

export default OutputImage