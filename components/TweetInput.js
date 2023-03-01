import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useAccount } from "../contexts/AccountContext";
import { motion as m } from "framer-motion";
import { XIcon } from "@heroicons/react/outline";
import { useQueryClient, useMutation } from "@tanstack/react-query";
const TweetInputPhoto = dynamic(() => import("./TweetInputPhoto"));
const TweetInputEmoji = dynamic(() => import("./TweetInputEmoji"));

export default function TweetInput({ setIsOpen, placeholder, type, tweet }) {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const textAreaRef = useRef(null);
  // useEffect(() => textAreaRef.current?.focus());

  const { user } = useAccount();

  // Textarea
  const useAutosizeTextArea = (textAreaRef, input) => {
    useEffect(() => {
      if (textAreaRef) {
        textAreaRef.style.height = "auto";
        const scrollHeight = textAreaRef.scrollHeight;
        textAreaRef.style.height = scrollHeight + "px";
      }
    }, [textAreaRef, input]);
  };

  useAutosizeTextArea(textAreaRef.current, input);

  const handleInputChange = (e) => {
    const val = e.target?.value;
    setInput(val);
  };

  const removePhoto = () => {
    setSelectedFile(null);
  };

  // Post Tweet
  const queryClient = useQueryClient();
  const { privateInstance } = useAccount();
  const createTweet = useMutation(
    (data) => privateInstance.post("/tweets/create/", data),
    {
      onSettled: () => {
        queryClient.invalidateQueries("tweets");
        setInput("");
        setSelectedFile(null);
        if (setIsOpen) setIsOpen(false);
      },
      onError: (error) => {
        toast.error(error.response.data.text[0]);
      },
    }
  );

  function handleTweetSubmit() {
    let parent = null;
    if (type === "Reply") {
      parent = tweet?.id;
    }
    if (input.length > 200) {
      toast.error("You can write only 200 characters.");
      return;
    }
    createTweet.mutate({
      text: input,
      photo: selectedFile,
      parent: parent,
    });
  }

  return (
    <>
      {createTweet.isLoading ? (
        <m.div
          id="progress-bar"
          className="h-1 bg-blue-400 top-9 sticky"
          initial={{ width: 0 }}
          animate={{
            width: "100%",
            transition: { duration: 2 },
          }}
        ></m.div>
      ) : null}

      <div
        id="input-area"
        className={`${
          createTweet.isLoading ? "opacity-40" : ""
        } flex space-x-2`}
      >
        {/* User-img */}
        <img
          src={user?.profile_photo}
          alt="user-img"
          className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
        />
        <div className="w-full divide-y divide-gray-200">
          {/* Textarea */}
          <textarea
            className="w-full border-none outline-0 resize-none h-auto text-xl placeholder-gray-800 tracking-wide min-h-[50px] text-gray-900"
            rows="2"
            placeholder={placeholder}
            value={input}
            onChange={handleInputChange}
            ref={textAreaRef}
            id="text-area"
          ></textarea>

          {/* Post Image Preview */}
          {selectedFile ? (
            <m.div
              className="relative py-2"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.5 },
              }}
            >
              <button
                aria-label="remove photo"
                onClick={removePhoto}
                className="absolute z-10 top-3 left-1 p-2 bg-gray-700 rounded-full cursor-pointer shadow-md hover:opacity-70"
              >
                <XIcon className="h-5 text-white " />
              </button>
              <div className="mb-2 mr-2 relative w-auto h-[400px]">
                <Image
                  priority={42}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl "
                  src={selectedFile}
                  alt="tweet_photo"
                />
              </div>
            </m.div>
          ) : null}
          {/* Buttons */}

          <div
            id="buttons"
            className={`${
              createTweet.isLoading ? "hidden" : ""
            } flex justify-between pt-2.5 `}
          >
            <>
              <div className="flex items-center ">
                <TweetInputPhoto setSelectedFile={setSelectedFile} />
                <TweetInputEmoji setInput={setInput} />
              </div>
              <button
                aria-label="post tweet"
                onClick={handleTweetSubmit}
                disabled={!input && !selectedFile}
                className={`bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md ${
                  input || selectedFile ? "hover:brightness-95" : ""
                }  disabled:opacity-50  disabled:cursor-default`}
              >
                {type}
              </button>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
