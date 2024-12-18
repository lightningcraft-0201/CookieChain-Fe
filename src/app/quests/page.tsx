"use client";

import useUserStore from "@/store/useStore";
import useInfoStore from "@/store/useInfo";
import { Navbar } from "@/components/Navbar";
import { Progress } from "@/components/ui/process";
import TaskStatusView from "@/components/TaskStatusView";
import DailyCheckCard from "@/components/DailyCheckCard";
import TwitterFollowCard from "@/components/TwitterFollowCard";
import WalletConnectCard from "@/components/WalletConnectCard";
import TelegramFollowCard from "@/components/TelegramFollowCard";
import ReTweetFollowCard from "@/components/ReTweetFollowCard";
import TwitterPostFollowCard from "@/components/TwitterPostFollowCard";
import { useState } from "react";

export default function Home() {
  const { userId } = useUserStore((state: any) => ({
    userId: state.userId,
  }));

  const {
    user_name,
    point,
    tg_follow,
    rt_follow,
    tpost_follow,
    wallet_address,
    twitter_follow,
  } = useInfoStore((state: any) => ({
    user_name: state.user_name,
    point: state.point,
    tg_follow: state.tg_follow,
    rt_follow: state.rt_follow,
    tpost_follow: state.tpost_follow,
    wallet_address: state.wallet_address,
    twitter_follow: state.twitter_follow,
  }));

  const [dailyTask, setDailyTask] = useState<number>(0);

  const twitterTask = twitter_follow ? 1 : 0;
  const telegramTask = tg_follow ? 1 : 0;
  const rtTask = rt_follow ? 1 : 0;
  const tpostTask = tpost_follow ? 1 : 0;
  const walletTask = wallet_address.length > 0 ? 1 : 0;

  return (
    <>
      <div className="bg-[#1CA774] bg-[url('/images/sky_effect.png')] bg-[length:contain] flex flex-col min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full">
          <h2 className="text-[24px] text-white py-10 font-rubik font-medium text-center">Quests</h2>
          <div className="pt-4 px-5 flex items-center justify-center flex-col w-full text-white">
            <img
              alt=""
              loading="lazy"
              width="80"
              height="80"
              decoding="async"
              data-nimg="1"
              className="rounded-full"
              src="/images/cookie_quests.png"
              style={{ color: "transparent" }}
            />
            <div className="flex flex-col items-center gap-2 bg-[#57C59D] rounded-md p-3 mt-4 text-[12px] font-rubik font-medium">
              <span>{user_name}{" "}</span>
              <span>+50 COOKIE POINTS</span>
            </div>
            <div className="w-full relative mt-8">
              <div className="flex justify-between mb-3">
                <span className="text-[16px] font-rubik">Points</span>
                <p className="text-white font-rubik text-[16px]">
                  {point} / {point > 3000 ? 10000 : 3000}
                </p>
              </div>
              <Progress
                className="relative"
                value={
                  point > 3000 ? (100 / 10000) * point : (100 / 3000) * point
                }
              />
            </div>
          </div>
          <div className="px-2 w-full bg-[#1CA774] py-[50px]">
            <div className="bg-[url('/images/history_background.png')] bg-[length:contain] bg-no-repeat pt-10 z-20 flex-grow overflow-hidden">
              <TaskStatusView
                currentTask={
                  point > 3000
                    ? rtTask + tpostTask + dailyTask
                    : walletTask + twitterTask + telegramTask + dailyTask
                }
                totalTask={point > 3000 ? 3 : 4}
              />
              <div className="bg-white rounded-t-2xl relative top-2 p-4 pb-24 pt-2">
                <div className="relative">
                  {point > 3000 ? (
                    <div className="grid gap-6">
                      <DailyCheckCard setDailyTask={setDailyTask} />
                      <ReTweetFollowCard userId={userId} followed={rt_follow} />
                      <TwitterPostFollowCard
                        userId={userId}
                        followed={tpost_follow}
                      />
                    </div>
                  ) : (
                    <div className="grid gap-6">
                      <DailyCheckCard setDailyTask={setDailyTask} />
                      <TwitterFollowCard
                        userId={userId}
                        followed={twitter_follow}
                      />
                      <TelegramFollowCard userId={userId} followed={tg_follow} />
                      <WalletConnectCard
                        userId={userId}
                        wallet_address={wallet_address.length > 0 ? true : false}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Navbar />;
    </>
  );
}
