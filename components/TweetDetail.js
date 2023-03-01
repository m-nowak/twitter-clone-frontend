import Image from "next/image";
import { getDate, getTime } from "../utils/date";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const TweetReply = dynamic(() => import("./TweetReply"));
const TweetRetweet = dynamic(() => import("./TweetRetweet"));
const TweetLike = dynamic(() => import("./TweetLike"));
const TweetShare = dynamic(() => import("./TweetShare"));
const TweetInput = dynamic(() => import("./TweetInput"));
const ReplyList = dynamic(() => import("./ReplyList"));
const Loader = dynamic(() => import("./Loader"));

import { useAccount } from "../contexts/AccountContext";
import { useQuery } from "@tanstack/react-query";

export default function TweetDetail({ id }) {
  const { user, privateInstance } = useAccount();

  const getTweetById = async (tweetId) => {
    const { data } = await privateInstance.get("/tweets/" + tweetId);
    return data;
  };

  const {
    status,
    data: tweet,
    error,
  } = useQuery({
    queryKey: ["tweet", id],
    queryFn: () => getTweetById(id),
    enabled: !!id,
  });

  const placeholder =
    tweet?.user["username"] === user.username
      ? "Add another Tweet"
      : "Tweet your reply";

  return (
    <>
      {" "}
      {!id || status === "loading" ? (
        <div className="flex h-28 h justify-center items-center">
          <Loader />
        </div>
      ) : status === "error" ? (
        <div className="flex h-28 h justify-center items-center">
          Error: {error.message}
        </div>
      ) : (
        <>
          <div className="flex px-3">
            <div className="relative w-11">
              <div className="absolute z-[5]">
                <img
                  className="h-11 w-11 rounded-full"
                  src={tweet?.user["profile_photo"]}
                  alt="user-img"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="pl-2">
                <div className="font-bold text-[16px] leading-[1em]">
                  {tweet?.user["first_name"]} {tweet?.user["last_name"]}
                </div>
                <div className="text-[16px] text-gray-600 lowercase leading-[1.25em]">
                  @{tweet?.user["username"]}
                </div>
              </div>
            </div>
          </div>
          <div className="px-3">
            {tweet?.parent ? (
              <div className="pt-2 text-left text-gray-500">
                Replying to{" "}
                <span className="text-blue-500 lowercase">
                  @{tweet?.parent["user"]["username"]}
                </span>
              </div>
            ) : null}
            <p className="text-gray-800 text-left text-[22px] sm:text-[24px] py-2">
              {tweet?.text}
            </p>

            {tweet?.photo ? (
              <div className=" mb-2 relative w-min-[240px] w-max-[420px] h-[400px]">
                <Image
                  priority={tweet?.id}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-2xl"
                  src={`${tweet?.photo}`}
                  alt="tweet_photo"
                />
              </div>
            ) : null}
            <div className="text-[16px]  text-gray-500 pb-2 ">
              {getTime(tweet?.created_at)} &#8729; {getDate(tweet?.created_at)}
            </div>
            <div className="flex justify-between text-gray-500 w-full border-y border-gray-200 py-2">
              <TweetReply tweet={tweet} />
              <TweetRetweet
                id={tweet?.id}
                retweets={tweet?.retweets}
                retweets_count={tweet?.retweets_count}
              />
              <TweetLike
                id={tweet?.id}
                likes={tweet?.likes}
                likes_count={tweet?.likes_count}
              />
              <TweetShare tweet={tweet} />
            </div>
          </div>
          <div className="border-b border-gray-200 p-3">
            <TweetInput placeholder={placeholder} type="Reply" tweet={tweet} />
          </div>
          <ReplyList id={tweet?.id} />
        </>
      )}
    </>
  );
}
