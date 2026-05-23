import * as cheerio from "cheerio";

// Have DeepSeek V4 refactor the parsing to work since I do not like parsing weather underground website due to whatever Angular do with their framework

type ApiEntry = {
  b?: Record<string, unknown>;
};

type Observation = {
  stationID?: string;
  winddirAvg?: number;
  humidityAvg?: number;
  imperial?: Record<string, number | null>;
};

function isApiEntry(v: unknown): v is ApiEntry {
  return !!v && typeof v === "object";
}

function isObservation(v: unknown): v is Observation {
  return !!v && typeof v === "object";
}

export async function parseHTML(html: string) {
  const $ = cheerio.load(html);
  const scriptTag = $("#app-root-state").html();

  if (!scriptTag) {
    console.log("app-root-state script tag not found");
    return {
      temp: "",
      wind: "",
      gust: "",
      windDir: "",
      dew: "",
      precipRate: "",
      precipAccum: "",
      pressure: "",
      humidity: "",
      hasGoldStar: false,
    };
  }

  let state: Record<string, unknown>;
  try {
    state = JSON.parse(scriptTag);
  } catch {
    console.log("failed to parse app-root-state JSON");
    return {
      temp: "",
      wind: "",
      gust: "",
      windDir: "",
      dew: "",
      precipRate: "",
      precipAccum: "",
      pressure: "",
      humidity: "",
      hasGoldStar: false,
    };
  }

  let haveGoldStar = false;
  for (const key of Object.keys(state)) {
    const entry = state[key];
    if (isApiEntry(entry) && entry.b && "goldStar" in entry.b) {
      haveGoldStar = entry.b.goldStar === true;
      break;
    }
  }

  let temp = "";
  let wind = "";
  let gust = "";
  let windDir = "";
  let dew = "";
  let precipRate = "";
  let precipAccum = "";
  let pressure = "";
  let humidity = "";

  for (const key of Object.keys(state)) {
    const entry = state[key];
    if (isApiEntry(entry)) {
      const observations = entry.b?.observations;
      if (Array.isArray(observations) && observations.length > 0) {
        const obs = observations[observations.length - 1];
        if (isObservation(obs)) {
          const imp = obs.imperial ?? {};
          temp = imp.tempAvg !== null ? String(imp.tempAvg) : "";
          wind = imp.windspeedAvg !== null ? String(imp.windspeedAvg) : "";
          gust = imp.windgustAvg !== null ? String(imp.windgustAvg) : "";
          windDir = obs.winddirAvg !== null ? String(obs.winddirAvg) : "";
          dew = imp.dewptAvg !== null ? String(imp.dewptAvg) : "";
          precipRate = imp.precipRate !== null ? String(imp.precipRate) : "";
          precipAccum = imp.precipTotal !== null ? String(imp.precipTotal) : "";
          pressure = imp.pressureMax !== null ? String(imp.pressureMax) : "";
          humidity = obs.humidityAvg !== null ? String(obs.humidityAvg) : "";
          break;
        }
      }
    }
  }

  return {
    temp,
    wind,
    gust,
    windDir,
    dew,
    precipRate,
    precipAccum,
    pressure,
    humidity,
    hasGoldStar: haveGoldStar,
  };
}
