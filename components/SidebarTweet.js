import { useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { XIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
import dynamic from "next/dynamic";
const TweetInput = dynamic(() => import("./TweetInput"));

export default function SidebarTweet() {
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
  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <Dialog
            open={isOpen}
            as="div"
            className="relative z-40"
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
                <Dialog.Panel className="w-full mt-10 max-w-xl min-h-96 max-h-auto rounded-2xl bg-white shadow-xl">
                  <div className="relative h-12">
                    <button
                      aria-label="close modal"
                      type="button"
                      className="absolute top-2 left-2 p-2 items-center text-gray-900 justify-center xl:justify-start text-xl space-x-3 rounded-full hover:bg-gray-200 transition duration-500 ease-out"
                      onClick={closeModal}
                    >
                      <XIcon className="h-5" />
                    </button>
                  </div>
                  <div>
                    <div className="p-3">
                      <TweetInput
                        setIsOpen={setIsOpen}
                        placeholder="What's happening?"
                        type="Tweet"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </m.div>
            </div>
          </Dialog>
        ) : null}
      </AnimatePresence>
      <button
        onClick={openModal}
        aria-label="add tweet"
        className="bg-blue-400 text-white rounded-full  w-[52px] xl:w-56 h-[52px] font-bold shadow-md hover:brightness-95 text-lg"
      >
        T<span className="hidden xl:inline">weet</span>
      </button>
    </>
  );
}
