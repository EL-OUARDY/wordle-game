import React from "react";
import useStore from "@/hooks/useStore";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  Cell,
} from "recharts";
import useAuth from "@/hooks/useAuth";
import Login from "@/components/Login";
import Image from "next/image";
import LogoIcon from "@/components/ui/icons/logo";
import { APP_NAME } from "@/lib/constants";
import { getRank, wordlesToNextRank } from "@/lib/utils";

function UserStats() {
  const stats = useStore((s) => s.userStats);
  const { user } = useAuth();

  const wins = stats
    ? stats.guessDistribution.reduce((acc, cur) => acc + cur.count, 0)
    : 0;
  const winRatio = stats
    ? stats.played === 0
      ? 0
      : Math.floor((wins * 100) / stats.played)
    : 0;

  const rank = getRank(wins);
  const toNextRank = wordlesToNextRank(wins);

  const bgAbsentColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--absent");

  const bgCorrectColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--correct");

  const foregroundColor = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--foreground");

  return (
    <>
      {!user || !stats ? (
        <Login className="mx-auto max-w-xs sm:mt-2" />
      ) : (
        <div className="user-stats flex flex-col gap-4 px-4">
          <hr className="separator border-key-background" />

          <div className="user-info flex items-center gap-2">
            <div
              className="user-avatar border-key-background flex size-[46px] items-center justify-center rounded-full border p-[2px]"
              style={{
                borderColor: rank.color,
              }}
            >
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="User avatar"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : user.displayName ? (
                <span className="flex size-full items-center justify-center text-lg">
                  {user.displayName
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </span>
              ) : (
                <LogoIcon className="size-5" />
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div className="user-fullname text-lg font-semibold">
                {user.displayName || user.email || `${APP_NAME} Player`}
              </div>

              <div
                className="user-rank relative flex w-fit items-center justify-center gap-2 overflow-hidden rounded-lg px-2"
                style={{
                  borderColor: rank.color,
                }}
              >
                <span>Rank:</span>
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundColor: rank.color,
                  }}
                />
                <span
                  className="relative text-base font-normal"
                  style={{ color: rank.color }}
                >
                  {rank.name}
                </span>
                <span className="text-key-background">|</span>
                <span>
                  <span className="font-semibold">{toNextRank}</span> wins to
                  next rank
                </span>
              </div>
            </div>
          </div>

          <hr className="separator border-key-background" />

          <div className="numbers flex">
            <div className="box flex flex-1 text-center">
              <div className="flex w-full flex-col gap-1">
                <div className="number text-3xl font-semibold">
                  {stats.played}
                </div>
                <div>
                  Game <br /> Played
                </div>
              </div>
            </div>
            <div className="box flex flex-1 flex-col gap-1 text-center">
              <div className="number text-3xl font-semibold">
                {winRatio}
                <span className="text-base font-normal"> %</span>
              </div>
              <div>
                Win <br /> Ratio
              </div>
            </div>
            <div className="box flex flex-1 flex-col gap-1 text-center">
              <div className="number text-3xl font-semibold">
                {stats.streak}
              </div>
              <div>
                Current <br /> Streak
              </div>
            </div>
            <div className="box flex flex-1 justify-end text-center">
              <div className="flex w-full flex-col gap-1">
                <div className="number text-3xl font-semibold">
                  {stats.maxStreak}
                </div>
                <div>
                  Max <br /> Streak
                </div>
              </div>
            </div>
          </div>

          <hr className="separator border-key-background" />

          <div className="guess-distribution flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Guess Distribution</h3>
            <div className="chart">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={stats.guessDistribution}
                  layout="vertical"
                  margin={{ top: 0, right: 80, left: 0, bottom: 0 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="guess"
                    axisLine={false}
                    tickLine={false}
                    style={{
                      fontSize: "16px",
                      fill: foregroundColor,
                    }}
                    width={20}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 0, 0, 0]}
                    minPointSize={10}
                    barSize={20}
                  >
                    <LabelList
                      dataKey="count"
                      position="right"
                      style={{
                        fontSize: "14px",
                      }}
                    />
                    {stats.guessDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.guess === stats.lastSolvedTries
                            ? bgCorrectColor
                            : bgAbsentColor
                        }
                        stroke="none"
                        opacity={1}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <hr className="separator border-key-background" />

          <div className="text-muted-foreground ml-auto">
            Playing since{" "}
            {new Date(user.metadata.creationTime!).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "short",
                day: "numeric",
              },
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default UserStats;
