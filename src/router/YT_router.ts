import express from "express"
import YoutubeMp3Downloader from "youtube-mp3-downloader";
import fs from "fs"
import YTDL from "yt-get"
import decode from "decode-base64";
import path from "path";
import { error } from "console";

const app = express.Router();

app.post("/download", async (req, res, next) => {
    const videoID = req.body.videoID;
    const videoURL = req.body.videoURL;
    const file_name = `${req.body.file_name}.mp3`;

    YTDL.getVideoMP3Base64(videoURL).then((data => {
        const { base64, title } = data;
        // base64TOFile.convert(base64, "./src", ['mp3', 'mp4', 'WAV', 'WMA', 'webm'], (file_path: any) => {
        //     console.log(file_path)
        // })

        // const binary = atob(base64);
        // const u8 = new Uint8Array(binary.length);

        // for (let i = 0, l = binary.length; i < l; i++) {

        //     u8[i] = binary.charCodeAt(i);

        // }
        // const base64String = u8.reduce((data, byte) => data + String.fromCharCode(byte), '');

        const binaryData = Buffer.from(base64, 'base64');

        fs.writeFileSync("./src/audio.mp3", binaryData);
        console.log(videoID + videoURL + file_name)
        //res.send({ binaryData });
        const audioFilePath = path.resolve(__dirname, '../audio.mp3');
        res.sendFile(audioFilePath)
        fs.rm(audioFilePath, () => {
            console.log("remove file success")
        })
    })).catch((error) => {
        console.error(error);
        res.send(error)
    })


})

app.get('/get_KEY', (req, res, next) => {
    //const dataKEY = process.env.YT_KEY;
    const dataKEY = fs.readFileSync("./src/api.txt").toString()

    res.send({ dataKEY });
    console.log("had send KEY")
})

app.put('/changeAPI_KEY', (req, res, next) => {
    try {
        const apikey: string = req.body.API_KEY;
        fs.writeFileSync("./src/api.txt", apikey);
        res.send({ statust: "change API success!", code: "200" });
    } catch (error) {
        res.send(error);
    }


})

export default app;