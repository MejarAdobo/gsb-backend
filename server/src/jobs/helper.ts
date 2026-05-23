import { fetchHTML } from "./scraper";
import { parseHTML } from "./parser";
import type { GoldStarStatus } from "./sendData";
import { db } from "@db";

// types
export type StreakRow = {
  stationId: number;
  currentStreak: number;
  longestHotStreak: number;
  longestHotYearlyStreak: number;
  longestColdStreak: number;
  longestColdYearlyStreak: number;
  createdAt: Date;
};

export type GoldStarRow = {
  stationId: number;
  totalGoldStars: number;
  totalYearlyGoldStars: number;
  lastDaySinceGoldStar: Date;
  createdAt: Date;
};

// get the html
const getParsedData = async (id: string) => {
  const url = `https://www.wunderground.com/dashboard/pws/${id}`;
  const html = await fetchHTML(url);
  return await parseHTML(html);
};

// grant daily status
const grantStatus = async (id: number, hasGoldStar: boolean) => {
  //  get today to be use for less than
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  //  get 2 days ago to be used for greater than
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  // get the yesterday's daily data
  const yesterdayData = await db.query.dailyData.findFirst({
    where: {
      stationId: id,
      recordedAt: { lt: today, gt: twoDaysAgo },
    },
  });

  //  grant today's status
  let todayStatus: GoldStarStatus = "none";

  if (yesterdayData) {
    const yesterdayStatus = yesterdayData.goldStarStatus;

    if (hasGoldStar) {
      if (yesterdayStatus === "gain" || yesterdayStatus === "maintain") {
        todayStatus = "maintain";
      } else if (yesterdayStatus === "lose" || yesterdayStatus === "none") {
        todayStatus = "gain";
      }
    } else {
      if (yesterdayStatus === "gain" || yesterdayStatus === "maintain") {
        todayStatus = "lose";
      } else if (yesterdayStatus === "lose" || yesterdayStatus === "none") {
        todayStatus = "none";
      }
    }
  }

  return todayStatus;
};

// it changes the streak
const changeStreak = (hasGoldStar: boolean, streakRow: StreakRow) => {
  let currentStreak = streakRow?.currentStreak ?? 0;
  let longestHotStreak = streakRow?.longestHotStreak ?? 0;
  let longestHotYearlyStreak = streakRow?.longestHotYearlyStreak ?? 0;
  let longestColdStreak = streakRow?.longestColdStreak ?? 0;
  let longestColdYearlyStreak = streakRow?.longestColdYearlyStreak ?? 0;

  if (hasGoldStar) {
    // if streak is on negative it will turn it into 1 instead of -3 if the streak was -4 beforehand
    if (currentStreak < 0) {
      currentStreak = 1;
    } else {
      currentStreak += 1;
    }

    //  if current streak is higher than the longest hot streak this year, it assigned the current streak as the new longest streak
    if (currentStreak > longestHotYearlyStreak) {
      longestHotYearlyStreak = currentStreak;
      // do the same thing just with longestHotStreak which is the all time record
      if (longestHotYearlyStreak > longestHotStreak) {
        longestHotStreak = longestHotYearlyStreak;
      }
    }
  } else {
    // assigned back to 0 if station lost the streak
    if (currentStreak > 0) {
      currentStreak = 0;
    } else {
      currentStreak -= 1;
    }

    // do the same thing as the longest hot streak section
    if (currentStreak > longestColdYearlyStreak) {
      longestColdYearlyStreak = currentStreak;
      if (longestColdYearlyStreak > longestColdStreak) {
        longestColdStreak = longestColdYearlyStreak;
      }
    }
  }

  return { currentStreak, longestHotStreak, longestHotYearlyStreak, longestColdStreak, longestColdYearlyStreak };
};

// get today status
const getTodayStatus = async (id: number) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayData = await db.query.dailyData.findFirst({
    where: {
      stationId: id,
      recordedAt: { gt: today },
    },
  });

  return todayData?.goldStarStatus ?? "none";
};

// update the gold star row
const changeGoldStar = async (hasGoldStar: boolean, goldStarRow: GoldStarRow, id: number) => {
  let totalGoldStars = goldStarRow?.totalGoldStars ?? 0;
  let totalYearlyGoldStars = goldStarRow?.totalYearlyGoldStars ?? 0;
  let lastDaySinceGoldStar = goldStarRow?.lastDaySinceGoldStar;
  const todayStatus = await getTodayStatus(id);

  if (hasGoldStar) {
    totalGoldStars += 1;
    totalYearlyGoldStars += 1;
  }

  if (todayStatus === "lose") {
    lastDaySinceGoldStar = new Date();
  } else if (todayStatus === "gain" || todayStatus === "maintain") {
    lastDaySinceGoldStar = new Date();
  }

  return { totalGoldStars, totalYearlyGoldStars, lastDaySinceGoldStar };
};

export { getParsedData, grantStatus, changeStreak, changeGoldStar };
