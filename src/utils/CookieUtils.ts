//Bookmark Store, Cookie 관련 중복 로직 분리
"use client";

import { getCookie, OptionsType, setCookie } from "cookies-next/client";
import { pre } from "framer-motion/client";

interface I_BookmarkNamesUpdate {
    newBookmarkname?: string;
}

const SetCookieOptions: OptionsType = {
    path: "/chartodos",
    maxAge: 60 * 60 * 24 * 30 //30일
}

export function BookmarkNamesUpdate({newBookmarkname}: I_BookmarkNamesUpdate){
    const CookieStore = getCookie("mapletodos_bookmarknames");
    const Bookmarknames: string[] = CookieStore ? JSON.parse(CookieStore) : [];

    console.log(newBookmarkname);

    