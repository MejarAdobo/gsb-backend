import * as cheerio from "cheerio";

export async function parseHTML(html: string) {
  const $ = cheerio.load(html);
  // get all the current condition
  // temp
  const tempSpan = $("span.wu-unit-temperature");
  const tempText = tempSpan.find("span.wu-value").text();

  // wind
  const windDiv = $("div.wind-gust");
  const windText = windDiv.find("span.test-false").text();
  const gustText = windDiv.find("span.wu-unit-speed").text();
  const winDirText = $("div.wind-dial__container").text();

  const weatherSummary = $("div.weather__summary");

  // dewpoint
  const dewSpan = weatherSummary.find("span.wu-unit-temperature");
  const dewText = dewSpan.find("span.wu-value").text();

  // precip rate
  const precipRateSpan = weatherSummary.find("span.wu-unit-rainRate");
  const precipRateText = precipRateSpan.find("span.wu-value").text();

  // precip accum
  const precipAccumSpan = weatherSummary.find("span.wu-unit-rain");
  const precipAccumText = precipAccumSpan.find("span.wu-value").text();

  // pressure
  const pressureSpan = weatherSummary.find("span.wu-unit-pressure");
  const pressureText = pressureSpan.find("span.wu-value").text();

  // humidity
  const humiditySpan = weatherSummary.find("span.wu-unit-humidity");
  const humidityText = humiditySpan.find("span.wu-value").text();

  // gold star
  let haveGoldStar = false;

  if ($("img.goldstar-station").length > 0) {
    haveGoldStar = true;
  }
  console.log(
    `temp: ${tempText}, wind: ${windText}, gust: ${gustText}, windDir: ${winDirText}, dew: ${dewText}, precipRate: ${precipRateText}, precipAccum: ${precipAccumText}, pressure: ${pressureText}, humidity: ${humidityText}, hasGoldStar: ${haveGoldStar}`,
  );

  return {
    temp: tempText,
    wind: windText,
    gust: gustText,
    windDir: winDirText,
    dew: dewText,
    precipRate: precipRateText,
    precipAccum: precipAccumText,
    pressure: pressureText,
    humidity: humidityText,
    hasGoldStar: haveGoldStar,
  };
}
