import { useState } from "react";
import Image from "next/image";
import { motion as m, AnimatePresence } from "framer-motion";
import { PhotographIcon, XIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
export default function TweetInputPhoto({ setSelectedFile }) {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  function addPhoto(photo) {
    setIsOpen(false);
    setSelectedFile(photo);
  }
  const photos = [
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667334381/twitter-clone/photos/brett-jordan-ElZ-r1QVHcE-unsplash_sg58bj.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667334381/twitter-clone/photos/massimo-virgilio-SGB6oQJQlcY-unsplash_xowduc.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667334380/twitter-clone/photos/limor-zellermayer-j5MCxwaP0R0-unsplash_j5edex.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333642/twitter-clone/photos/stefan-stefancik-G2ifDHnHZ6Y-unsplash_ufcppl.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333639/twitter-clone/photos/tk-qJDkJRTedNw-unsplash_irnvqb.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333638/twitter-clone/photos/yulia-matvienko-kgz9vsP5JCU-unsplash_omynke.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333638/twitter-clone/photos/gabriel-tovar-KeTyAQymnD4-unsplash_ed8oa7.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333637/twitter-clone/photos/kerwin-elias-7-ToFEHzMNw-unsplash_ouwoc5.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333635/twitter-clone/photos/janos-venczak-EmDe2QylecI-unsplash_zt49vj.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333632/twitter-clone/photos/mulyadi-Gwx7TvhIN1M-unsplash_tyif5o.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333631/twitter-clone/photos/mulyadi-5P190ENSblg-unsplash_vjcsws.jpg",
    "https://res.cloudinary.com/dn6v7ugmj/image/upload/c_scale,w_640/v1667333631/twitter-clone/photos/andrew-reshetov-XzEqlPQsLdI-unsplash_pooy0x.jpg",
  ];
  return (
    <>
      {" "}
      <div className="w-9 h-9">
        <AnimatePresence>
          {isOpen ? (
            <Dialog
              open={isOpen}
              as="div"
              className="relative z-50"
              key="dial"
              onClose={() => setIsOpen(false)}
            >
              <m.div
                key="dial"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.25 },
                }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-25"
              />
              <div className="fixed inset-0 overflow-y-auto">
                <m.div
                  key="panel"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3 },
                  }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center p-4 text-center"
                >
                  <Dialog.Panel className="w-full mt-10 max-w-xl min-h-96 max-h-auto rounded-2xl bg-white p-2 shadow-xl">
                    <button
                      aria-label="close modal"
                      type="button"
                      className=" flex p-2 items-center text-gray-900 justify-center xl:justify-start text-xl space-x-3 rounded-full hover:bg-gray-200 transition duration-500 ease-out"
                      onClick={closeModal}
                    >
                      <XIcon className="h-5" />
                    </button>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2 pb-4 ">
                      {photos.map((photo, index) => (
                        <div
                          key={photo}
                          onClick={() => addPhoto(photo)}
                          className="relative object-none p-2 h-28 sm:h-36 bg-slate-500 hover:bg-blue-100 hover:opacity-70 cursor-pointer transition duration-500 ease-out"
                        >
                          <Image
                            layout="fill"
                            objectFit="cover"
                            alt="photo"
                            src={photo}
                            priority={index + 73}
                          ></Image>
                        </div>
                      ))}
                    </div>
                  </Dialog.Panel>
                </m.div>
              </div>
            </Dialog>
          ) : null}
        </AnimatePresence>
        <button
          aria-label="add photo"
          className="h-9 w-9 hoverItem p-2 text-sky-500 hover:bg-sky-100"
          onClick={openModal}
        >
          <PhotographIcon />
        </button>
      </div>
    </>
  );
}
