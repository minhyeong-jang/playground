"use client";

import { useState, useEffect } from "react";

// 프로그레스 바 컴포넌트
const ProgressBar = ({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) => {
  const clampedPercentage = Math.max(0, Math.min(percentage, 100));
  const hasMinimumProgress = clampedPercentage > 0 && clampedPercentage < 3;
  const displayWidth = hasMinimumProgress
    ? Math.max(clampedPercentage, 3)
    : clampedPercentage;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-white text-sm font-bold">{label}:</span>
        <span className="text-white text-sm font-bold">
          {percentage.toFixed(1)}%
        </span>
      </div>
      <div className="w-full h-6 bg-white/20 rounded-full p-0.5">
        <div
          className={`h-full bg-white transition-all duration-1000 ease-out ${
            displayWidth >= 3 ? "rounded-full" : "rounded-l-full"
          }`}
          style={{
            width: `${displayWidth}%`,
            minWidth: clampedPercentage > 0 ? "4%" : "0px",
          }}
        />
      </div>
    </div>
  );
};

export default function LifeProgressPage() {
  const [progressData, setProgressData] = useState({
    year: 0,
    month: 0,
    week: 0,
    day: 0,
    quarter: 0,
    target: 0,
  });

  useEffect(() => {
    const calculateProgress = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();

      // 목표 날짜: 2030년 12월 31일
      const targetDate = new Date(2030, 11, 31, 23, 59, 59);

      // 시작 날짜: 2025년 8월 1일
      const startDate = new Date(2025, 7, 1); // 월은 0부터 시작하므로 7은 8월

      // Year Progress (현재 연도 진행률)
      const yearStart = new Date(currentYear, 0, 1);
      const yearEnd = new Date(currentYear + 1, 0, 1);
      const yearProgress =
        ((now.getTime() - yearStart.getTime()) /
          (yearEnd.getTime() - yearStart.getTime())) *
        100;

      // Month Progress (현재 월 진행률)
      const monthStart = new Date(currentYear, currentMonth, 1);
      const monthEnd = new Date(currentYear, currentMonth + 1, 1);
      const monthProgress =
        ((now.getTime() - monthStart.getTime()) /
          (monthEnd.getTime() - monthStart.getTime())) *
        100;

      // Week Progress (현재 주 진행률)
      const dayOfWeek = now.getDay();
      const weekStart = new Date(now);
      weekStart.setDate(currentDate - dayOfWeek);
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 7);
      const weekProgress =
        ((now.getTime() - weekStart.getTime()) /
          (weekEnd.getTime() - weekStart.getTime())) *
        100;

      // Day Progress (오늘 진행률)
      const dayStart = new Date(
        currentYear,
        currentMonth,
        currentDate,
        0,
        0,
        0
      );
      const dayEnd = new Date(
        currentYear,
        currentMonth,
        currentDate + 1,
        0,
        0,
        0
      );
      const dayProgress =
        ((now.getTime() - dayStart.getTime()) /
          (dayEnd.getTime() - dayStart.getTime())) *
        100;

      // Quarter Progress (분기 진행률)
      const currentQuarter = Math.floor(currentMonth / 3);
      const quarterStart = new Date(currentYear, currentQuarter * 3, 1);
      const quarterEnd = new Date(currentYear, (currentQuarter + 1) * 3, 1);
      const quarterProgress =
        ((now.getTime() - quarterStart.getTime()) /
          (quarterEnd.getTime() - quarterStart.getTime())) *
        100;

      // Target Progress (시작일부터 목표일까지의 진행률)
      const targetProgress =
        ((now.getTime() - startDate.getTime()) /
          (targetDate.getTime() - startDate.getTime())) *
        100;

      setProgressData({
        year: yearProgress,
        month: monthProgress,
        week: weekProgress,
        day: dayProgress,
        quarter: quarterProgress,
        target: targetProgress,
      });
    };

    calculateProgress();
    const interval = setInterval(calculateProgress, 60000); // 1분마다 업데이트

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-[#7fb686]/90 rounded-xl p-6 shadow-lg backdrop-blur-sm">
          <h2 className="text-white text-xl font-bold mb-4 text-center">
            Life Progress
          </h2>

          <div className="space-y-4">
            <ProgressBar label="Ocean View" percentage={progressData.target} />
            <ProgressBar label="Year" percentage={progressData.year} />
            <ProgressBar label="Month" percentage={progressData.month} />
            <ProgressBar label="Quarter" percentage={progressData.quarter} />
          </div>

          {/* 기간 정보 표시 */}
          <div className="mt-6 text-center">
            <p className="text-white/80 text-xs">Target Date</p>
            <p className="text-white text-sm font-bold">December 31, 2030</p>
          </div>
        </div>
      </div>
    </div>
  );
}
