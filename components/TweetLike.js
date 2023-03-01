import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import { useAccount } from "../contexts/AccountContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function TweetLike({ id, likes, likes_count }) {
  const { user } = useAccount();
  const queryClient = useQueryClient();
  const { privateInstance } = useAccount();
  const is_liked = likes?.includes(user.id);
  const tweetLike = useMutation(
    (data) => privateInstance.post(`/tweets/${id}/like/`, data),
    {
      onSettled: () => {
        !is_liked && toast.success("Successfully liked.");
        queryClient.invalidateQueries("tweets");
      },
    }
  );

  function handleTweetLike() {
    tweetLike.mutate();
  }
  return (
    <>
      <div className="group flex items-center select-none">
        <button
          onClick={handleTweetLike}
          className={`${
            is_liked ? " text-red-600 hover:bg-red-100" : ""
          } h-9 w-9 hoverItem p-2 group-hover:text-red-600 group-hover:bg-red-100`}
        >
          {is_liked ? <HeartIconFilled /> : <HeartIcon />}
        </button>
        <span
          className={`${
            is_liked ? "text-red-600" : ""
          } text-sm ml-[2px] group-hover:text-red-600 w-10`}
        >
          {likes_count > 0 ? likes_count : null}
        </span>
      </div>
    </>
  );
}
