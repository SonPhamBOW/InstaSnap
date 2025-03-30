import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { Button } from "../../../@/components/ui/button";
import { FaTimes } from "react-icons/fa";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

function FileUploader({ fieldChange, mediaUrl }: FileUploaderProps) {
  const [fileUrl, setFileUrl] = useState("");
  const [file, setFile] = useState<File[]>([]);
  console.log(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });
  return (
    <div className="mt-2 ">
      <div
        // {...getRootProps()}
        className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer h-auto py-3"
      >
        <input {...getInputProps()} className="cursor-pointer" />
        {fileUrl ? (
          <>
            <div className="flex flex-1 justify-center w-auto h-full p-5 lg:p-10 relative">
              <img src={fileUrl} alt="" className="file_uploader-img" />

              {/* Nút đóng (X) */}
              <button onClick={() => setFileUrl('')} className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-gray-600 hover:bg-rose-800">
                <FaTimes className="text-white text-lg" />
              </button>
            </div>
            <p className="file_uploader-label" {...getRootProps()}>
              Click or drag photo to replace
            </p>
          </>
        ) : (
          <div  {...getRootProps()} className="file-uploader_box flex flex-col items-center gap-1">
            <img
              src="/assets/icons/file-upload.svg"
              alt="fileUpload"
              width={96}
              height={77}
            />

            <h3 className="base-medium text-light-2 mb-2 mt-3">
              Drag photo here
            </h3>
            <p className="text-light-4 small-regular mb-3">SVG, PNG, JPG</p>

            <Button className="shad-button_dark_4">Select from computer</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
