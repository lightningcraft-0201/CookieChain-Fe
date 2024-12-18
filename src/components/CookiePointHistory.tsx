"use client";

import Image from "next/image";
import React from "react";

interface T_PointData {
  _id: string;
  userId: number;
  text: string;
  point: number;
  __v: number;
}

interface CookiePointHistoryProps {
  pointData: T_PointData[];
}

const CookiePointHistory: React.FC<CookiePointHistoryProps> = ({ pointData }) => {
  return (
    <div className="w-full bg-[url('/images/history_background.png')] bg-[length:contain] bg-no-repeat">
      <p className="text-black text-[20px] font-medium pt-10 px-4 font-rubik leading-7">Cookie Points</p>
      <div className="w-full bg-white min-h-[320px] relative rounded-t-2xl top-2 p-4 pt-2 pb-24 font-rubik">
        <div className="grid w-full gap-[14px]">
          {pointData.length > 0 ? (
            pointData
              .slice(-10)
              .reverse()
              .map((point, index) => (
                <div
                  key={index}
                  className="flex w-full justify-between items-center rounded-lg border-solid border-2 border-[#b7e6d4] text-black text-[16px] font-medium font-rubik p-[5px] pr-4 gap-[10px]"
                >
                  <Image
                    className="rounded-lg border-solid border-2 border-[#b7e6d4]"
                    src={
                      point.point > 0
                        ? "/images/smile_cookie.png"
                        : "/images/sad_cookie.png"
                    }
                    alt="Smile Cookie"
                    width={46}
                    height={46}
                  />
                  <p className="flex-1">{point.text}</p>
                  <p className="text-[20px] font-rubik text-[#1EB17B]">
                    {point.point > 0 ? "+" : ""}
                    {point.point}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-black font-rubik font-medium text-lg text-center mt-4">No Cookie point</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookiePointHistory;
