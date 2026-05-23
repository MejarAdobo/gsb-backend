import { db } from "@db";
import { stations, goldStars, streaks } from "@db/schema";

const dialouge = () => {
  console.log("-- Adding a New Station --");
  let namePrompt: string | null = null;
  let wuIdPrompt: string | null = null;

  while (!namePrompt || namePrompt.trim() === "") {
    namePrompt = prompt("Enter the station name:");
  }

  while (!wuIdPrompt || wuIdPrompt.trim() === "") {
    wuIdPrompt = prompt("Enter the WU ID:");
  }

  return { namePrompt, wuIdPrompt };
};

const addStation = async () => {
  const { namePrompt, wuIdPrompt } = dialouge();

  const [station] = await db.insert(stations).values({ name: namePrompt, wuId: wuIdPrompt }).returning({ id: stations.id });

  console.log(`\nStation ${namePrompt} (WU ID: ${wuIdPrompt}) has been added successfully.`);

  // create streak and gold star row for this station
  await db.insert(goldStars).values({ stationId: station.id });

  console.log(`\nStation ${namePrompt}: streak row created`);

  await db.insert(streaks).values({ stationId: station.id });

  console.log(`\nStation ${namePrompt}: gold star row created`);
};

addStation();
