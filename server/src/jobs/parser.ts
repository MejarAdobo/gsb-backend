import * as cheerio from "cheerio";

export async function parseHTML(html: string) {
  const $ = cheerio.load(html);
  return $;
}
