import axios from "axios";
import youtubeParser from "../utils/youtubeParser";

export default function getYoutubeVideoInfo(data) {
  let videoIdQueryParam;
  if (Array.isArray(data)) {
    const videoIds = data.map((link) => {
      return youtubeParser(link);
    });
    const videoIdsText = videoIds.toString();
    videoIdQueryParam = videoIdsText;
  } else {
    videoIdQueryParam = youtubeParser(data);
  }
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoIdQueryParam}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`;
  return axios.get(url, {
    headers: {
      Authorization: null,
    },
  });
}
