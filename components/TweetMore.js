import { useAccount } from "../contexts/AccountContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Menu } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/outline";

export default function TweetMore({ id, userId }) {
  const { user } = useAccount();

  const queryClient = useQueryClient();
  const { privateInstance } = useAccount();

  const tweetDelete = useMutation(
    (data) => privateInstance.delete(`/tweets/${id}/delete/`, data),
    {
      onSettled: () => {
        queryClient.invalidateQueries("tweets");
      },
    }
  );

  function handleTweetDelete() {
    tweetDelete.mutate();
  }

  return (
    <>
      {" "}
      <div className="w-7 h-7 relative">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button
                aria-label="more"
                className="hoverItem h-7 w-7 hover:bg-sky-100 text-gray-500 hover:text-sky-500 p-1 "
              >
                <DotsHorizontalIcon />
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
                  className="absolute overflow-hidden top-0 right-0 w-60 z-10 bg-white border rounded-xl shadow-md focus:outline-none border-gray-300 "
                >
                  {userId === user.id ? (
                    <Menu.Item
                      as="div"
                      className="
                       hover:bg-gray-100  text-red-700  flex justify-start items-center p-4 cursor-pointer w-full space-x-2 "
                      onClick={handleTweetDelete}
                    >
                      <TrashIcon className="h-7 w-7" />
                      <span className="text-md">Delete</span>
                    </Menu.Item>
                  ) : (
                    <Menu.Item
                      as="div"
                      className="flex text-grey-500 justify-start items-center cursor-not-allowed p-4 w-full space-x-2"
                      disabled
                    >
                      <TrashIcon className="h-7 w-7" />
                      <span className="text-md">Delete</span>
                    </Menu.Item>
                  )}
                </Menu.Items>
              ) : null}
            </>
          )}
        </Menu>
      </div>
    </>
  );
}
