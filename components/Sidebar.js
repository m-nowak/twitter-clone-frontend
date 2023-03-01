import Image from "next/image";
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  BookmarkIcon,
  ClipboardIcon,
  InboxIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconSolid,
  HashtagIcon as HashtagIconSolid,
  BellIcon as BellIconSolid,
} from "@heroicons/react/solid";
import { useAccount } from "../contexts/AccountContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const SidebarItem = dynamic(() => import("./SidebarItem"));
const SidebarUser = dynamic(() => import("./SidebarUser"));
const SidebarTweet = dynamic(() => import("./SidebarTweet"));

export default function Sidebar() {
  const router = useRouter();
  return (
    <div className="hidden sm:flex flex-col p-1 xl:items-start fixed h-full z-40 ">
      {/* Logo */}
      <div className="hoverItem p-2 ml-1 xl:ml-1.5 flex items-center justify-center hover:bg-blue-100 cursor-default">
        <Image
          width="32"
          height="32"
          alt="logo"
          src="/twitter.svg"
          priority={42}
          objectFit="cover"
        ></Image>
      </div>
      {/* SidebarItems / Links */}
      <div className="ml-1 mt-0 mb-2 xl:items-start">
        <SidebarItem
          text="Home"
          Icon={router.pathname == "/" ? HomeIconSolid : HomeIcon}
          active={router.pathname == "/" ? true : false}
        />

        <SidebarItem
          text="Explore"
          Icon={router.pathname == "/explore" ? HashtagIconSolid : HashtagIcon}
          active={router.pathname == "/explore" ? true : false}
        />

        <SidebarItem
          text="Notification"
          Icon={router.pathname == "notifications" ? BellIconSolid : BellIcon}
          active={router.pathname == "notifications" ? true : false}
        />

        <SidebarItem text="Messages" Icon={InboxIcon} />
        <SidebarItem text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarItem text="Lists" Icon={ClipboardIcon} />
        <SidebarItem text="Profile" Icon={UserIcon} />
        <SidebarItem text="More" Icon={DotsCircleHorizontalIcon} />
      </div>
      {/* Tweet Button */}
      <div className="p-0 flex items-center justify-center ">
        <SidebarTweet />
      </div>
      {/* Account Menu */}
      <div className="relative mt-auto z-40">
        <SidebarUser />
      </div>
    </div>
  );
}
