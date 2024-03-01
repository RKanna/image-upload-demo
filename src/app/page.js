"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import ExitAnimation from "./ExitAnimation";
import { imageDb, appDB } from "../app/Firebase/FirebaseConfig.jsx";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Modal from "./ModalWindow.jsx";
import Link from "next/link";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileKey, setFileKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
    setFileKey((prevKey) => prevKey + 1);
  };

  let storageRef;

  const handleUploadImage = async () => {
    if (selectedImage) {
      setUploading(true);
      storageRef = ref(imageDb, `images/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // showing upload Progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Error Handling
          console.error("Upload error:", error);
        },
        async () => {
          try {
            // After upload operation
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            // For storing the image to db as URL
            const imageDocRef = doc(appDB, "images", selectedImage.name);
            await setDoc(imageDocRef, { url: downloadURL });
            console.log("Image URL stored in Firestore successfully.");
            handleCloseImage();
            setShowModal(true);
          } catch (error) {
            console.error("Error storing image URL:", error);
          }
          setUploading(false);
        }
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="flex min-h-screen justify-center items-center">
      <div className="w-2/4 min-h-[25rem] bg-green-300 p-5 rounded-2xl">
        <h1 className="text-center font-bold text-2xl">
          Image Upload Feature Demo
        </h1>
        <div className="w-3/4 border border-black mt-2 mx-auto"></div>
        <div className="flex flex-col justify-center items-center h-full">
          {selectedImage ? (
            <div className="relative">
              <motion.div
                className="mt-5 max-w-[100%] max-h-[100%]"
                initial={{ opacity: 0, x: -150 }}
                animate={{ opacity: 1, x: "0%" }}
                exit={{ opacity: 0, x: 150 }}
                transition={{ duration: "1" }}
              >
                <div className="absolute top-[2.5%] left-[2%] flex justify-center items-center ">
                  <IoIosClose
                    className="text-xl cursor-pointer bg-red-600 rounded-full"
                    onClick={handleCloseImage}
                  />
                </div>
                <div>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="rounded-xl p-7 border border-gray-400 transition-opacity ease-in-out duration-500 hover:border-black"
                    style={{ maxWidth: "100%", maxHeight: "100%", opacity: 1 }}
                  />
                </div>
                {uploading && (
                  <div className="absolute rounded-xl top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </motion.div>
              <div className="mt-5 flex justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <button
                    className="rounded-xl bg-purple-500 text-white px-4 py-2"
                    onClick={handleUploadImage}
                  >
                    Upload Image
                  </button>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              className=""
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ padding: "10px" }}
            >
              <button
                onClick={handleButtonClick}
                className="rounded-xl bg-blue-500 text-white px-4 py-2"
              >
                Select Image
              </button>
            </motion.div>
          )}
          <input
            key={fileKey}
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="text-center mt-3 ">
          <Link
            className="text-xs bg-green-700 p-2 rounded-xl "
            href={"/ViewImages"}
          >
            View Uploaded Images
          </Link>
        </div>
      </div>
      {showModal && <Modal closeModal={closeModal} />}
    </main>
  );
}
