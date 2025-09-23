// Importar dependencias en ESM
import ytdl from "@distube/ytdl-core";
import { createWriteStream } from "fs";
const videoToDownload = "https://www.youtube.com/watch?v=fJ9rUzIMcZQ&list=RDtqrHS9nZp0k&index=2";
// Descargar un video
ytdl(videoToDownload)
  .pipe(createWriteStream("video.mp4"));

// Obtener información básica del video
const infoBasic = await ytdl.getBasicInfo(videoToDownload);
console.log(infoBasic.videoDetails.title);

// Obtener información completa con formatos
const info = await ytdl.getInfo(videoToDownload);
console.log(info.formats);
