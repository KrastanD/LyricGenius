const axios = require("axios");
const cheerio = require("cheerio");

async function getLyrics(artist, songName) {
  songName = songName.replace(/\s+/g, "-").toLowerCase();
  artist = artist.replace(/\s+/g, "-").toLowerCase();

  const siteUrl = "https://genius.com/" + artist + "-" + songName + "-lyrics";
  console.log(siteUrl);
  const fetchLyrics = async () => {
    const result = await axios.get(siteUrl);
    return cheerio.load(result.data);
  };

  const main = async () => {
    const $ = await fetchLyrics();
    lyrics = $("div.lyrics").text();
    lyrics = lyrics.trim();
    console.log(lyrics);
  };

  await main();
}

getLyrics("louis the child", "every color");
