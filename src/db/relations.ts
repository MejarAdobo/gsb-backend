import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  goldStars: {
    station: r.one.stations({
      from: r.goldStars.stationId,
      to: r.stations.id,
    }),
  },
  streaks: {
    station: r.one.stations({
      from: r.streaks.stationId,
      to: r.stations.id,
    }),
  },
  hourlyData: {
    station: r.one.stations({
      from: r.hourlyData.stationId,
      to: r.stations.id,
    }),
  },
  dailyData: {
    station: r.one.stations({
      from: r.dailyData.stationId,
      to: r.stations.id,
    }),
  },
  awards: {
    station: r.one.stations({
      from: r.awards.stationId,
      to: r.stations.id,
    }),
  },
  stations: {
    hourlyData: r.many.hourlyData(),
    dailyData: r.many.dailyData(),
    awards: r.many.awards(),
  },
}));
