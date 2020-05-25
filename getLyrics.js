const axios = require("axios");
const cheerio = require("react-native-cheerio");

export default async function getLyrics(artist, songName) {
  if (artist == "" || songName == "") {
    return "";
  }
  songName = songName.replace(/ *\([^)]*\) */g, "");
  songName = songName.replace(/’/g, "");
  songName = songName.replace(/'/g, "");
  songName = songName.replace(/ü/g, "u");
  songName = songName.replace(/ -/g, "");
  songName = songName.replace(/\s+/g, "-").toLowerCase();
  artist = artist.replace(/\./g, "");
  artist = artist.replace(/ü/g, "u");
  artist = artist.replace(/\s+/g, "-").toLowerCase();

  const siteUrl = "https://genius.com/" + artist + "-" + songName + "-lyrics";
  const fetchLyrics = async () => {
    var result;
    try {
      result = await axios.get(siteUrl);
    } catch (err) {
      return "Lyrics for this song were not found";
    }
    return cheerio.load(result.data);
  };

  const $ = await fetchLyrics();
  if ($ == "Lyrics for this song were not found") {
    return "Lyrics for this song were not found";
  }
  var lyrics = $("div.lyrics").text();
  lyrics = lyrics.trim();
  return lyrics;
}
