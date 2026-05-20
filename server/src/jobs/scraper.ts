import axios from "axios";

export async function fetchHTML(url: string) {
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (error) {
    console.error(error);
  }
}
