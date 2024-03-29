"use client";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { appDB } from "../Firebase/FirebaseConfig";
import Link from "next/link";
import { motion } from "framer-motion";

const ViewImages = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesCollection = await getDocs(collection(appDB, "images"));

        const imagesData = imagesCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("imagesData:", imagesData);
        setImages(imagesData);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, []);
  return (
    <main className="flex flex-col min-h-screen justify-center items-center">
      <div className="w-3/4 min-h-[25rem] bg-green-300 p-5 rounded-2xl mt-10 mb-10">
        <h1 className="text-center text-2xl font-bold mb-4">Older Images</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image) => (
            <div key={image.id} className="flex justify-center items-center">
              <img
                src={image.url}
                alt={image.id}
                className="w-[10rem] h-[10rem] rounded-full border border-2 border-white"
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ padding: "10px" }}
          >
            <Link
              href={"/"}
              className="bg-red-500 p-2 text-xs hover:font-bold hover:text-white rounded-2xl hover:border hover:border-white hover:border-2"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ViewImages;
