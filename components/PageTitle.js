import { useRouter } from "next/router";
import { useAccount } from "../contexts/AccountContext";
import { LogoutIcon } from "@heroicons/react/outline";
export default function PageTitle({ text, Icon }) {
  const router = useRouter();
  const { logoutUser } = useAccount();
  return (
    <div className="flex items-center py-2 px-3 sticky top-0 z-20 bg-white/90 ">
      {text === "Tweet" ? (
        <>
          <div className="hoverItem flex items-center justify-center px-0 w-9 h-9 cursor-pointer">
            <Icon
              className="h-5"
              onClick={() => router.back({ shallow: true })}
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold ml-3">{text}</h2>
        </>
      ) : (
        <>
          <h2 className="text-lg sm:text-xl font-bold">{text}</h2>
          <div className="hoverItem flex items-center justify-center px-0 ml-auto w-9 h-9 cursor-default">
            <Icon className="h-5 hidden sm:inline" />
            <LogoutIcon
              className="h-6 inline sm:hidden"
              title="Log Out"
              onClick={logoutUser}
            />
          </div>
        </>
      )}
    </div>
  );
}
