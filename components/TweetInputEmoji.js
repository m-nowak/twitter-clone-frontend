import { Menu } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { EmojiHappyIcon } from "@heroicons/react/outline";

export default function TweetInputEmoji({ setInput }) {
  const emojis = [128522, 128513, 128514, 128523, 128525, 128077, 128079];

  const onEmojiClick = (em) => {
    const emoji = String.fromCodePoint(em);

    setInput((prev) => prev + emoji);
  };
  return (
    <>
      <div className="w-9 h-9 relative">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                aria-label="add emoji"
                className="h-9 w-9 hoverItem p-2 text-sky-500 hover:bg-sky-100"
              >
                <EmojiHappyIcon />
              </Menu.Button>
              {open ? (
                <Menu.Items
                  as={m.div}
                  static
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                  className="absolute flex items-center justify-center top-12 w-60 p-2 z-10 left-[-94px] bg-white border rounded-xl shadow-md focus:outline-none border-gray-300 "
                >
                  <div className="absolute z-20 h-3 w-3 top-1.5 left-[50%] ml-[-12px] mt-[-12px] border-[1px] border-gray-300 border-r-transparent border-b-transparent  rotate-45 bg-white"></div>
                  {emojis.map((emoji) => (
                    <div
                      className=" hoverItem flex text-xl items-center justify-center w-8 h-8 p-3 cursor-pointer"
                      onClick={() => onEmojiClick(emoji)}
                      key={emoji}
                    >
                      {String.fromCodePoint(emoji)}
                    </div>
                  ))}
                </Menu.Items>
              ) : null}
            </>
          )}
        </Menu>
      </div>
    </>
  );
}
