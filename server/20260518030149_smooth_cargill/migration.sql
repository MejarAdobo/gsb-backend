CREATE TYPE "award_type" AS ENUM('hot_streak', 'cold_streak', 'most_gold_star', 'least_gold_star');--> statement-breakpoint
CREATE TYPE "weather_status" AS ENUM('gain', 'lose', 'maintain', 'none');--> statement-breakpoint
CREATE TABLE "awards" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "awards_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar NOT NULL,
	"year" integer NOT NULL,
	"award_type" "award_type" NOT NULL,
	"stationId" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_data" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "daily_data_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stationId" integer NOT NULL,
	"recordedAt" timestamp NOT NULL,
	"weather_status" "weather_status" DEFAULT 'none'::"weather_status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "goldstars" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "goldstars_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stationId" integer NOT NULL UNIQUE,
	"totalGoldStars" integer DEFAULT 0 NOT NULL,
	"totalYearlyGoldStars" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hourly_data" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "hourly_data_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stationId" integer NOT NULL UNIQUE,
	"recordedAt" timestamp NOT NULL,
	"weatherData" jsonb NOT NULL,
	"hasGoldStar" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "stations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"wuId" varchar(255) NOT NULL UNIQUE,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "streaks" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "streaks_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"stationId" integer NOT NULL UNIQUE,
	"lastDaySinceGoldStar" timestamp,
	"longestHotStreak" integer DEFAULT 0 NOT NULL,
	"longestHotYearlyStreak" integer DEFAULT 0 NOT NULL,
	"currentStreak" integer DEFAULT 0 NOT NULL,
	"longestColdStreak" integer DEFAULT 0 NOT NULL,
	"longestColdYearlyStreak" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "awards" ADD CONSTRAINT "awards_stationId_stations_id_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id");--> statement-breakpoint
ALTER TABLE "daily_data" ADD CONSTRAINT "daily_data_stationId_stations_id_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id");--> statement-breakpoint
ALTER TABLE "goldstars" ADD CONSTRAINT "goldstars_stationId_stations_id_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id");--> statement-breakpoint
ALTER TABLE "hourly_data" ADD CONSTRAINT "hourly_data_stationId_stations_id_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id");--> statement-breakpoint
ALTER TABLE "streaks" ADD CONSTRAINT "streaks_stationId_stations_id_fkey" FOREIGN KEY ("stationId") REFERENCES "stations"("id");