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

function UserStats() {
  const stats = useStore((s) => s.userStats);

  const wins = stats.guessDistribution.reduce((acc, cur) => acc + cur.count, 0);
  const winRatio =
    stats.played === 0 ? 0 : Math.floor((wins * 100) / stats.played);

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
    <div className="user-stats flex flex-col gap-4 px-4">
      <div className="numbers flex">
        <div className="box flex flex-1 text-center">
          <div className="flex w-full flex-col gap-1">
            <div className="number text-3xl font-semibold">{stats.played}</div>
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
          <div className="number text-3xl font-semibold">{stats.streak}</div>
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
    </div>
  );
}

export default UserStats;
