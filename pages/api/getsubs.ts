import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

const execAsync = util.promisify(exec);
// Function to normalize URL
function normalizeYouTubeURL(inputUrl:string) {
  let urlObj = new URL(inputUrl);
  let videoId;

  // Match different URL formats
  if (urlObj.hostname === 'youtu.be') {
    videoId = urlObj.pathname.slice(1);
  } else if (urlObj.hostname.includes('youtube.com')) {
    let params = new URLSearchParams(urlObj.search);
    videoId = params.get('v') || urlObj.pathname.split('/').find(segment => segment.length === 11);
  }

  if (videoId) {
    return `https://www.youtube.com/watch?v=${videoId}`;
  } else {
    throw new Error('Invalid YouTube URL');
  }
}


export default async function getSubs(req: NextApiRequest, res: NextApiResponse) {
  const { url: inputUrl } = req.query;

  if (!inputUrl || typeof inputUrl !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {

    let normalizedUrl;
    try {
      normalizedUrl = normalizeYouTubeURL(inputUrl);
    } catch (error) {
      return res.status(400).json({ error: (error as {message:string}).message });
    }
    // Assuming COOKIES_BASE64 holds the base64 encoded cookie file content
    const cookiesBase64 = process.env.COOKIES_BASE64;
    if (!cookiesBase64) {
      return res.status(500).json({ error: "Cookies not set" });
    }

    // Use /tmp for temporary files
    const tempCookiesPath = path.join("/tmp","cookies.txt");
    const tempVttPath = path.join('/tmp','subtitle');

    // Decode the base64 back to text and write to a temporary file in /tmp
    const cookiesContent = Buffer.from(cookiesBase64, 'base64').toString('utf-8');
    await fs.promises.writeFile(tempCookiesPath, cookiesContent);

    // Use yt-dlp to fetch subtitles, writing to /tmp directory
    const command = `yt-dlp --cookies "${tempCookiesPath}" --skip-download --write-auto-sub --sub-lang en --restrict-filenames -o "${tempVttPath}" '${normalizedUrl}'`;
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error(`yt-dlp stderr: ${stderr}`);
      
      // If there's an error (like an IP ban), try a fallback method
      const fallbackResult = await fetchSubtitlesDirectly(normalizedUrl);
      if (fallbackResult) {
        return res.status(200).json(fallbackResult);
      } else {
        return res.status(500).json({ error: "Failed to fetch subtitles using fallback method" });
      }
    }

    console.log('yt-dlp execution complete');

    console.log(`Checking if subtitle file exists at ${tempVttPath}`)
    const subPath = `${tempVttPath}.en.vtt`

    if (await fs.promises.stat(subPath)) {
      console.log('Subtitle file found');

      const vttData = await fs.promises.readFile(subPath, 'utf8');
      const simpleText = convertVTTtoSimpleText(vttData);
      
      res.status(200).json({
        transcript: vttData,
        simpleText: simpleText
      });

      // Clean up: delete the temporary files
      await Promise.all([
        fs.promises.unlink(tempCookiesPath),
        fs.promises.unlink(tempVttPath)
      ]);
    } else {
      console.log('Subtitle file not found');

      res.status(404).json({ error: "Subtitle file not found" });
    }
  } catch (error) {
    console.error("Error executing yt-dlp or processing subtitles:", error);
    res.status(500).json({ error: "Failed to fetch or process subtitles" });
  }
}

// Helper function to directly fetch subtitles if yt-dlp fails
async function fetchSubtitlesDirectly(url:string) {
  // Implement actual fetching of subtitles via YouTube API or similar
  // Here's a simplistic example:
  const videoId = url.split('v=')[1];
  const response = await fetch(`https://www.youtube.com/api/timedtext?v=${videoId}&lang=en&fmt=vtt`);
  if (response.ok) {
    const vttData = await response.text();
    return {
      transcript: vttData,
      simpleText: convertVTTtoSimpleText(vttData)
    };
  }
  return null;
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