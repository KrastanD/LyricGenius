const axios = require("axios");
const cheerio = require("react-native-cheerio");

export default async function getLyrics(artist, songName) {
  if (artist == "" || songName == "") {
    return "";
  }

  //delete everything in parenthesis from the title including the parens
  songName = songName.replace(/ *\([^)]*\) */g, "");

  //normalize songName to get rid of special characters and replace them with normal ones
  songName = songName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  //if there are dashes in the title, delete them but leave a single space
  songName = songName.replace(/ -/g, "");

  //replace ampersand with and
  songName = songName.replace(/&/g, "and");

  songName = songName.replace(/\./g, "");

  //delete quotes
  songName = songName.replace(/’/g, "");
  songName = songName.replace(/'/g, "");

  //replace spaces with dashes
  songName = songName.replace(/\s+/g, "-").toLowerCase();

  artist = artist.replace(/\./g, "");

  //normalize songName to get rid of special characters and replace them with normal ones
  artist = artist.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  //replace spaces with dashes
  artist = artist.replace(/\s+/g, "-").toLowerCase();

  const siteUrl = "https://genius.com/" + artist + "-" + songName + "-lyrics";
  console.log(siteUrl);
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
