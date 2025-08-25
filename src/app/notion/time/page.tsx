"use client";

import { useState, useEffect } from "react";

// 깔끔한 세로 플립 카드 컴포넌트
const FlipCard = ({ value, label }: { value: string; label: string }) => {
  const [topValue, setTopValue] = useState(value); // 상단 패널 값
  const [bottomValue, setBottomValue] = useState(value); // 하단 패널 값
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== topValue) {
      // 2. 플립 애니메이션 시작
      setIsFlipping(true);

      // 3. 플립이 완료되면 상단 값도 업데이트 (600ms 후)
      setTimeout(() => {
        setTopValue(value);
      }, 200);
      setTimeout(() => {
        setBottomValue(value);
      }, 300);
      setTimeout(() => {
        setIsFlipping(false);
      }, 400);
    }
  }, [value, topValue]);

  return (
    <div className="bg-[#7fb686] rounded-3xl p-4 w-36 h-56 flex flex-col shadow-2xl relative">
      <div className="text-white text-md font-bold opacity-100 text-left">
        {label}
      </div>

      {/* 플립 컨테이너 - 심플하게 구현 */}
      <div
        className="relative flex-1 flex items-center justify-center"
        style={{ perspective: "400px" }}
      >
        <div className="relative w-full h-32">
          {/* 상단 고정 패널 (현재 상단 값) */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-[#7fb686] overflow-hidden z-10">
            <div className="flex items-start justify-center h-full pt-8">
              <span className="text-white text-7xl font-bold">{topValue}</span>
            </div>
          </div>

          {/* 하단 고정 패널 (새로운 값 즉시 표시) */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#7fb686] overflow-hidden z-10">
            <div className="flex items-start justify-center h-full pt-2">
              <span
                className="text-white text-7xl font-bold"
                style={{ marginTop: "-2.5rem" }}
              >
                {bottomValue}
              </span>
            </div>
          </div>

          {/* 플립 애니메이션 - 상단이 아래로, 하단이 위로 */}
          {isFlipping && (
            <>
              {/* 상단 패널이 아래로 떨어짐 */}
              <div
                className="flip-top absolute inset-x-0 top-0 h-1/2 bg-[#7fb686] overflow-hidden z-20"
                style={{
                  animation: "flipTopDown 0.5s ease-in-out forwards",
                  transformOrigin: "bottom",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="flex items-start justify-center h-full pt-8">
                  <span className="text-white text-7xl font-bold">
                    {topValue} {/* 이전 상단 값 */}
                  </span>
                </div>
              </div>

              {/* 새로운 하단 패널이 뒤에서 나타남 */}
              <div
                className="flip-bottom absolute inset-x-0 bottom-0 h-1/2 bg-[#7fb686] overflow-hidden z-15"
                style={{
                  animation: "flipBottomUp 0.4s ease-in-out forwards",
                  transformOrigin: "top",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="flex items-start justify-center h-full pt-2">
                  <span
                    className="text-white text-7xl font-bold"
                    style={{ marginTop: "-2.5rem" }}
                  >
                    {value} {/* 새로운 값 */}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* 중앙 구분선 */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-zinc-700 opacity-40 z-30"></div>
        </div>
      </div>
    </div>
  );
};

export default function TimePage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const isAM = date.getHours() < 12;
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();

    return {
      hours,
      minutes,
      seconds,
      period: isAM ? "AM" : "PM",
      dayOfWeek,
    };
  };

  const { hours, minutes, period, dayOfWeek } = formatTime(time);

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-8">
      <div className="flex gap-4">
        {/* Hours Card with Flip Animation */}
        <FlipCard value={hours} label={period} />

        {/* Minutes Card with Flip Animation */}
        <FlipCard value={minutes} label={dayOfWeek} />

        {/* <FlipCard value={seconds} label="Seconds" /> */}
      </div>
    </div>
  );
}
