import { React } from "react";
import Image from "next/image";
import { useAccount } from "../contexts/AccountContext.js";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Meta from "../components/Meta";
import Loader from "../components/Loader";
import PageMotion from "../components/PageMotion";
import { motion as m } from "framer-motion";

export default function Login() {
  const { isAuthenticated, loginUser, publicInstance } = useAccount();
  const { status, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await publicInstance.get("/accounts/users/");
      return data;
    },
    initialData: [],
    refetchOnWindowFocus: false,
  });
  const router = useRouter();
  const customMeta = {
    title: "Login",
  };

  if (typeof window !== "undefined" && isAuthenticated) {
    router.push("/");
    return null;
  }

  function handleLogin(u, p) {
    loginUser(u, p);
  }

  return (
    <>
      <Meta {...customMeta} />
      <PageMotion>
        <section className="min-h-screen max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex flex-col justify-center py-2 md:py-5 sm:px-6 lg:px-8">
            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white border-gray-300 shadow-lg sm:rounded-lg overflow-hidden">
                <div className="py-4 bg-gradient-to-b from-gray-100 to-transparent">
                  <div className="p-2 w-full flex items-center justify-center">
                    <Image
                      width="32"
                      height="32"
                      alt="logo"
                      src="/twitter.svg"
                      priority={42}
                    ></Image>
                  </div>
                  <h2 className="mt-6 text-center text-2xl sm:text-3xl  font-extrabold text-gray-900">
                    Log in to Twitter Clone
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600">
                    Select account from list below
                  </p>
                </div>
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
                    {data.map((user) => (
                      <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        key={user.id}
                        role="button"
                        tabIndex={0}
                        aria-label="user"
                        onClick={() =>
                          handleLogin(user.username, "twitterclone1")
                        }
                        className="focus:animate-pulse rounded-none w-full flex p-6 items-center hover:bg-gray-100 transition duration-500 ease-out"
                      >
                        <div className="flex">
                          <img
                            src={user.profile_photo}
                            alt="user-img"
                            className="h-12 w-12 rounded-full "
                          />
                        </div>
                        <div className="inline ml-2 flex-1 min-w-0">
                          <p className="font-bold text-left">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-gray-500 text-left lowercase">
                            @{user.username}
                          </p>
                        </div>
                      </m.div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </PageMotion>
    </>
  );
}
