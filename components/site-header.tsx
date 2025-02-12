"use client";
import Link from "next/link";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import { User } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useStore } from "@/app/store/store";

const SiteHeader = ({ className = "" }: { className?: string }) => {
  const { isAdmin, setAdmin } = useStore();
  const router = useRouter();

  const handleLogin = () => {
    if (isAdmin) {
      toast({ title: "You are already logged in as an admin" });
    } else {
      router.push("/login");
    }
  };

  const handleLogOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      setAdmin(false);
    }
  };

  return (
    <div
      className={`px-[2rem] md:px-6 fixed w-full md:w-[calc(100%-4rem)] max-w-7xl top-0 md:top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-opacity-80 backdrop-blur-lg py-4 md:rounded-xl border border-gray-700 shadow-2xl text-white ${className}`}
    >
      <div className="flex justify-between items-center">
        <Link
          className=" font-extrabold text-2xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 hover:opacity-90"
          href="/"
        >
          maktab 230
        </Link>

        <Menubar className="border-none focus:border-none bg-transparent">
          <MenubarMenu>
            <MenubarTrigger>
              <User className="transition-all hover:text-purple-400 hover:scale-110" />
            </MenubarTrigger>
            <MenubarContent>
              {!isAdmin ? (
                <MenubarItem role="button" onClick={handleLogin}>
                  Login
                </MenubarItem>
              ) : (
                <MenubarItem role="button" onClick={handleLogOut}>
                  LogOut
                </MenubarItem>
              )}
              <MenubarSeparator />
              <MenubarItem role="button" onClick={() => router.push("/videos")}>
                Videos
              </MenubarItem>
              <MenubarItem role="button" onClick={() => router.push("/books")}>
                Books
              </MenubarItem>
              <MenubarItem role="button" onClick={() => router.push("/blog")}>
                Blog
              </MenubarItem>
              <MenubarSeparator />
              {isAdmin && (
                <MenubarSub>
                  <MenubarSubTrigger className="transition-all hover:text-purple-400 hover:scale-110">
                    Add
                  </MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem
                      role="button"
                      onClick={() => router.push("/add/video")}
                    >
                      Video
                    </MenubarItem>
                    <MenubarItem
                      role="button"
                      onClick={() => router.push("/add/book")}
                    >
                      Book
                    </MenubarItem>
                    <MenubarItem
                      role="button"
                      onClick={() => router.push("/add/blog")}
                    >
                      Blog
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
              )}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>
    </div>
  );
};

export default SiteHeader;
