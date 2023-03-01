import { useState } from "react";
import { motion as m, AnimatePresence } from "framer-motion";
import { ChatIcon, XIcon } from "@heroicons/react/outline";
import { Dialog } from "@headlessui/react";
import { useAccount } from "../contexts/AccountContext";
import dynamic from "next/dynamic";
const TweetInput = dynamic(() => import("./TweetInput"));
const Tweet = dynamic(() => import("./Tweet"));

export default function TweetReply({ tweet }) {
  const { user } = useAccount();
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const placeholder =
    tweet?.user["username"] === user.username
      ? "Add another Tweet"
      : "Tweet your reply";

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
                  <div className="relative pb-0">
                    <Tweet tweet={tweet} reply={true} />
                    <div className="px-3 pt-1 pb-3">
                      <TweetInput
                        setIsOpen={setIsOpen}
                        placeholder={placeholder}
                        type="Reply"
                        tweet={tweet}
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </m.div>
            </div>
          </Dialog>
        ) : null}
      </AnimatePresence>
      <div className="flex group w-20 h-9 items-center justify-start">
        <button
          className="group flex hoverItem h-9 w-9 p-2 group-hover:text-sky-500 group-hover:bg-sky-100 select-none"
          onClick={openModal}
        >
          <ChatIcon />
        </button>
        <span className="text-sm ml-[2px] group-hover:text-sky-500 w-9 text-start">
          {tweet?.replies_count > 0 ? tweet?.replies_count : null}
        </span>
      </div>
    </>
  );
}
