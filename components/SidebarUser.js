import { useAccount } from "../contexts/AccountContext";
import { Menu } from "@headlessui/react";
import { motion as m } from "framer-motion";
import { DotsHorizontalIcon, LogoutIcon } from "@heroicons/react/outline";
export default function SidebarUser() {
  const { user, logoutUser } = useAccount();
  return (
    <>
      <div className="relative">
        <Menu>
          {({ open }) => (
            <>
              {" "}
              <Menu.Button
                aria-label="user account"
                className="hoverItem ml-0.5 h-14 w-14 text-gray-900 flex items-center justify-center xl:justify-start xl:w-64"
              >
                <div className="flex-shrink-0">
                  <img
                    src={user?.profile_photo}
                    alt="user-img"
                    className="h-10 w-10 rounded-full xl:mr-2"
                  />
                </div>
                <div className="hidden xl:inline flex-1 items-center justify-center">
                  <div className="font-semibold text-left leading-[1.25em]  ">
                    {user?.first_name} {user?.last_name}
                  </div>
                  <div className="text-gray-500 text-left leading-[1.25em] lowercase">
                    @{user?.username}
                  </div>
                </div>
                <div className="inline-flex items-center justify-center">
                  <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
                </div>
              </Menu.Button>
              {open ? (
                <Menu.Items
                  as={m.div}
                  static
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  className="absolute z-10 bottom-20 w-64 py-2 bg-white border rounded-xl shadow-md focus:outline-none border-gray-300"
                >
                  <Menu.Item
                    as="div"
                    className="hover:bg-gray-100 p-4 cursor-pointer flex text-sm"
                    onClick={logoutUser}
                  >
                    <LogoutIcon className="h-6 mr-2" />{" "}
                    <span>Log out of {user?.username}</span>
                  </Menu.Item>
                  <div className="absolute z-20 h-3 w-3 bottom-1.5 left-9 xl:left-[50%] ml-[-12px] mb-[-12px] border-[1px] border-gray-300 border-l-transparent border-t-transparent rotate-45 bg-white"></div>
                </Menu.Items>
              ) : null}
            </>
          )}
        </Menu>
      </div>
    </>
  );
}
