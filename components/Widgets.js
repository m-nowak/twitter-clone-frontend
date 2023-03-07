import { SearchIcon } from "@heroicons/react/outline";
import { motion as m } from "framer-motion";
import { useAccount } from "../contexts/AccountContext.js";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
const Loader = dynamic(() => import("./Loader"));

export default function Widgets({ newsResults, randomUsersResults }) {
  const { privateInstance } = useAccount();
  const { status, data, error } = useQuery({
    queryKey: ["tweets-count"],
    queryFn: async () => {
      const { data } = await privateInstance.get("/tweets/count/");
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: true,
  });
  return (
    <div className="w-[320px] hidden lg:inline ml-8 space-y-5">
      <div className=" sticky top-0 bg-white py-1.5 z-10">
        <div className="flex items-center p-3 rounded-full  relative">
          <SearchIcon className="h-5 z-20 text-gray-600" />
          <input
            className="absolute z-10 inset-0 rounded-full pl-11 border-gray-500 text-gray-800 focus:shadow-lg focus:bg-white bg-gray-100 "
            type="text"
            placeholder="Search Twitter"
          />
        </div>
      </div>

      <div className="text-gray-800 space-y-3 bg-gray-100 rounded-xl py-3">
        <h4 className="font-bold text-xl px-4">Whats happening</h4>{" "}
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
            {data.length < 1 ? (
              <div className="flex h-28 text-ld font-bold justify-center items-center">
                Nothing happened — yet
              </div>
            ) : null}
            {data.map((result) => (
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                key={result.user}
                className="pt-2 px-3"
              >
                <div className="ml-2 flex-1 min-w-0">
                  <p className="font-bold text-left text-md">{result.user}</p>
                  <p className="text-gray-500 text-left text-sm">
                    {result.count} Tweet{result.count > 1 ? "s" : null}
                  </p>
                </div>
              </m.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
