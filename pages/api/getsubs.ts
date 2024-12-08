import { NextApiRequest, NextApiResponse } from "next";
import { exec } from 'child_process';
import { promisify } from 'util';
import { parseString } from "xml2js";
import path from "path";

const execAsync = promisify(exec);

export default async function getSubs(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
     // Read and process the VTT file
    const fs = require('fs').promises;
    const cookiesBase64 = process.env.COOKIES_BASE64;
    if (!cookiesBase64) {
      return res.status(500).json({ error: "Cookies not set" });
    }

    // Decode the base64 back to text and write to a temporary file
    const cookiesContent = Buffer.from(cookiesBase64, 'base64').toString('utf-8');
    const tempCookiesPath = path.join(__dirname, 'cookies.txt');
    await fs.writeFile(tempCookiesPath, cookiesContent);
    // Execute yt-dlp to fetch subtitles
    const { stdout, stderr } = await execAsync(`yt-dlp --cookies cookies.txt --skip-download --write-auto-sub --sub-lang en --restrict-filenames -o "subtitles/%(id)s"  '${url}'`);
    
    if (stderr) {
      console.error(`yt-dlp stderr: ${stderr}`);
    }




    // Assuming the subtitles are saved as 'video_id.en.vtt' after command execution
    const vttPath = `subtitles/${url.split('v=')[1]}.en.vtt`; // Adjust this path where the vtt file is saved

   
    const vttData = await fs.readFile(vttPath, 'utf8');

    // Convert VTT to JSON or plain text
    const simpleText = convertVTTtoSimpleText(vttData);

    
    res.status(200).json({
      transcript: vttData, // This would be the VTT content if you want to return it
      simpleText: simpleText
    });
    fs.promises.unlink(vttPath);
  } catch (error) {
    console.error("Error executing yt-dlp:", error);
    res.status(500).json({ error: "Failed to fetch subtitles" });
  }
}

function convertVTTtoSimpleText(vttContent: string): string {
  const lines = vttContent.split('\n');
  let text = '';
  
  for (let line of lines) {
    // Skip lines with timestamps or empty lines
    if (!line.match(/^\d{2}:\d{2}:\d{2}\.\d{3}/) && line.trim()) {
      text += line.replace(/<.*?>/g, ''); // Remove tags
      text += ' ';
    }
  }

  return text.trim();
}