import Image from "next/image";
import { getDateFromNow } from "../utils/date";
import { motion as m } from "framer-motion";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const TweetReply = dynamic(() => import("./TweetReply"));
const TweetRetweet = dynamic(() => import("./TweetRetweet"));
const TweetLike = dynamic(() => import("./TweetLike"));
const TweetShare = dynamic(() => import("./TweetShare"));
const TweetMore = dynamic(() => import("./TweetMore"));

import { useAccount } from "../contexts/AccountContext";

export default function Tweet({ tweet, index, reply }) {
  const router = useRouter();
  const { user } = useAccount();
  const handleClick = (e) => {
    if (e.target === e.currentTarget && !reply) {
      router.push(`/tweets/${tweet.id}`, undefined, { shallow: false });
    }
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div
        className={`flex px-3 ${
          !reply
            ? "py-3 cursor-pointer border-b border-gray-200 hover:bg-gray-100"
            : ""
        } `}
        id={`"tweet"${tweet?.id}`}
        tabIndex="0"
        role="button"
        aria-pressed="false"
        onClick={handleClick}
        onKeyDown={(e) => (e.key === "Enter" ? handleClick(e) : null)}
      >
        <div className="relative w-11" onClick={handleClick}>
          <div className={`absolute z-[5] ${reply ? "bg-white py-1" : ""} `}>
            <img
              className="h-11 w-11 rounded-full"
              src={tweet.user["profile_photo"]}
              alt="user-img"
            />
          </div>
          {reply ? (
            <div className=" z-[3] absolute top-0 left-5 w-0.5 h-full bg-gray-200"></div>
          ) : null}
        </div>
        {/* right side */}
        <div className="flex-1">
          <div
            className="flex items-center justify-between"
            onClick={handleClick}
          >
            {/* tweet user info */}
            <div className="flex items-center space-x-1 whitespace-nowrap pl-2">
              <p className="font-bold text-[16px]">
                {tweet.user["first_name"]} {tweet.user["last_name"]}
              </p>
              <span className="text-[16px] text-gray-600 lowercase">
                @{tweet.user["username"]} &#8729;{" "}
              </span>
              <span className="text-[16px]  text-gray-500 ">
                {getDateFromNow(tweet?.created_at)}
              </span>
            </div>
            {!reply ? <TweetMore id={tweet.id} userId={tweet.user.id} /> : null}
          </div>
          {tweet?.parent ? (
            <div className="ml-2 text-left text-gray-500">
              Replying to{" "}
              <span className="text-blue-500 lowercase">
                @{tweet?.parent["user"]["username"]}
              </span>
            </div>
          ) : null}
          {/* tweet text */}

          <p
            onClick={handleClick}
            className="text-gray-800 text-left text-[15px] sm:text-[16px] mb-2 pl-2"
          >
            {tweet.text}
          </p>

          {/* tweet image */}
          {!reply ? (
            <>
              {tweet?.photo ? (
                <div className="ml-2 mb-2 mr-2 relative  w-min-[240px] w-max-[420px] h-[400px]">
                  <Image
                    priority={index + 42}
                    layout="fill"
                    objectFit="cover"
                    onClick={handleClick}
                    className="rounded-2xl"
                    src={`${tweet?.photo}`}
                    alt="tweet_photo"
                  />
                </div>
              ) : null}
              {/* buttons */}

              <div className="flex justify-between text-gray-500  sm:w-[400px] w-full">
                <TweetReply tweet={tweet} />
                <TweetRetweet
                  id={tweet.id}
                  retweets={tweet.retweets}
                  retweets_count={tweet.retweets_count}
                />
                <TweetLike
                  id={tweet.id}
                  likes={tweet.likes}
                  likes_count={tweet.likes_count}
                />
                <TweetShare tweet={tweet} />
              </div>
            </>
          ) : (
            <>
              {tweet?.photo ? (
                <div className="py-3 text-left ml-2">Photo added</div>
              ) : null}
              {tweet.user["username"] !== user.username ? (
                <div className="py-4 text-left ml-2 text-gray-500">
                  Replying to{" "}
                  <span className="text-blue-500">
                    @{tweet.user["username"]}
                  </span>
                </div>
              ) : (
                <div className="py-4 ml-2"> </div>
              )}
            </>
          )}
        </div>
      </div>
    </m.div>
  );
}
