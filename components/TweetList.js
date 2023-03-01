import { useAccount } from "../contexts/AccountContext.js";
import { useInfiniteQuery } from "@tanstack/react-query";
import { motion as m } from "framer-motion";
import dynamic from "next/dynamic";
const Tweet = dynamic(() => import("./Tweet"));
const Loader = dynamic(() => import("./Loader"));

export default function TweetList() {
  const { privateInstance } = useAccount();

  const fetchTweets = async ({ pageParam = 1 }) => {
    const { data } = await privateInstance.get(
      "/tweets/list/?page=" + pageParam
    );
    const { results, next } = data;
    return { results, nextPage: next };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweets,
    getNextPageParam: (lastPage, pages) => lastPage.nextPage,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      {status === "loading" ? (
        <div className="flex h-28 h justify-center items-center">
          <Loader />
        </div>
      ) : status === "error" ? (
        <div className="flex h-28 justify-center items-center">
          Error: {error.message}
        </div>
      ) : (
        <>
          {data.pages.map((group, i) => (
            <div key={i}>
              {group.results.length < 1 ? (
                <div className="flex h-28 justify-center items-center">
                  0 results
                </div>
              ) : null}
              {group?.results?.map((tweet, index) => (
                <Tweet
                  key={tweet.id}
                  tweet={tweet}
                  index={index}
                  reply={false}
                />
              ))}
            </div>
          ))}
          <div>
            {status === "success" ? (
              <m.div
                className="flex h-28 justify-center items-center"
                key="dial"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, delay: 0.5 },
                }}
              >
                <button
                  aria-label="load-more"
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                  className="bg-gray-100 disabled:bg-white rounded-xl w-48 py-2 text-gray-700"
                >
                  {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                    ? "Load More"
                    : null}
                </button>
              </m.div>
            ) : null}
          </div>
        </>
      )}
    </>
  );
}
