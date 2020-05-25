const axios = require("axios");
const cheerio = require("react-native-cheerio");

export default async function getLyrics(artist, songName) {
  if (artist == "" || songName == "") {
    return "";
  }
  songName = songName.replace(/ *\([^)]*\) */g, "");
  songName = songName.replace(/’/g, "");
  songName = songName.replace(/ü/g, "u");
  songName = songName.replace(/ -/g, "");
  songName = songName.replace(/\s+/g, "-").toLowerCase();
  artist = artist.replace(/\./g, "");
  artist = artist.replace(/ü/g, "u");
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
