const axios = require("axios");
const cheerio = require("react-native-cheerio");

export default async function getLyrics(artist, songName) {
  songName = songName.replace(/ *\([^)]*\) */g, "");
  songName = songName.replace(/’/g, "");
  songName = songName.replace(/\s+/g, "-").toLowerCase();
  artist = artist.replace(/\s+/g, "-").toLowerCase();

  const siteUrl = "https://genius.com/" + artist + "-" + songName + "-lyrics";
  console.log(siteUrl);
  const fetchLyrics = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
  };

  const $ = await fetchLyrics();
  var lyrics = $("div.lyrics").text();
  lyrics = lyrics.trim();
  return lyrics;
}
