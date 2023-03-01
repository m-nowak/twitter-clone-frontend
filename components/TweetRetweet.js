import { useAccount } from "../contexts/AccountContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function TweetRetweet({ id, retweets, retweets_count }) {
  const queryClient = useQueryClient();
  const { privateInstance } = useAccount();
  const is_retweeted = retweets?.includes(id);
  const tweetRetweet = useMutation(
    (data) => privateInstance.post(`/tweets/${id}/retweet/`, data),
    {
      onSettled: () => {
        !is_retweeted && toast.success("Successfully retweeted.");
        queryClient.invalidateQueries("tweets");
      },
    }
  );

  function handleTweetRetweet() {
    tweetRetweet.mutate();
  }
  return (
    <>
      {" "}
      <div className="group flex items-center select-none">
        <button
          onClick={handleTweetRetweet}
          className={`${
            is_retweeted ? "text-green-600" : ""
          } h-9 w-9 hoverItem p-2 group-hover:text-green-600 group-hover:bg-green-100`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
            />
          </svg>
        </button>
        <span
          className={`${
            is_retweeted ? "text-green-600" : ""
          } text-sm ml-[2px] group-hover:text-green-600 w-10`}
        >
          {retweets_count > 0 ? retweets_count : null}
        </span>
      </div>
    </>
  );
}
