import express from "express"
import YoutubeMp3Downloader from "youtube-mp3-downloader";
import RNFS from "react-native-fs"
import YTDL from "yt-get"
import base64TOFile from "base64-to-file"

const app = express.Router();

app.post("/download", (req, res, next) => {
    const videoID = req.body.videoID;
    const videoURL = req.body.videoURL;
    const file_name = `${req.body.file_name}.mp3`;

    YTDL.getVideoMP3Base64(videoURL).then((data => {
        const { base64, title } = data;
        base64TOFile.convert(base64, "./src", ['mp3', 'mp4', 'WAV', 'WMA'], (file_path: any) => {
            console.log(file_path)
        })
        res.send(base64);
    })).catch((error) => {
        console.error(error);
        res.send(error)
    })


})

export default app;