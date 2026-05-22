import { fetchHTML } from "./scraper";
import { parseHTML } from "./parser";
import type { GoldStarStatus } from "./sendData";
import { db } from "@db";

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

export { getParsedData, grantStatus };
