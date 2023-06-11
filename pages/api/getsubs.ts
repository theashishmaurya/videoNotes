import ytdl from "ytdl-core";
import { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

const lang = "en";
const format = "xml";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;
  ytdl.getInfo(url as string).then((info: any) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      console.log(
        "Found captions for",
        tracks
          .map((t: { name: { simpleText: any } }) => t.name.simpleText)
          .join(", ")
      );
      const track = tracks.find(
        (t: { languageCode: string }) => t.languageCode === lang
      );
      if (track) {
        console.log("Retrieving captions:", track.name.simpleText);
        console.log("URL", track.baseUrl);

        fetch(`${track.baseUrl}&fmt=${format !== "xml" ? format : ""}`)
          .then((response) => response.text())
          .then((xmlData) => {
            // Parse XML to JSON
            parseString(xmlData, (err, result) => {
              if (err) {
                console.error("Error parsing XML:", err);
                res.status(500).send("Error parsing XML");
                return;
              }

              // Convert JSON to plain text
              const plainText = result.transcript.text;
              const response = {
                transcript: plainText,
                simpleTax: convertToSimpletText(plainText),
              };

              res.send(response);
            });
          })
          .catch((error) => {
            console.error("Error fetching captions:", error);
            res.status(500).send("Error fetching captions");
          });
      } else {
        console.log("Could not find captions for", lang);
        res.status(400).send("Could not find captions for " + lang);
      }
    } else {
      console.log("No captions found for this video");
      res.status(400).send("No captions found for this video");
    }
  });
};
function convertToSimpletText(transcriptData: any) {
  let text = "";
  for (const { _: line } of transcriptData) {
    // Remove unnecessary data (e.g., speaker names)
    const cleanedLine = line.replace(/\[[^\]]+\]/g, "").trim();
    text += cleanedLine + " ";
  }

  console.log("Simple text:", text.trim());
  return text.trim();
}

/**
 * Notes : Result 
 * Transcript: [
  {
    _: '[Herb, YouTuber]\nThis video demonstrates closed captions.',
    '$': { start: '6.5', dur: '1.7' }
  },
  {
    _: 'To turn on captions, click on the icon over here.',  
    '$': { start: '8.3', dur: '2.7' }
  },
  {
    _: '[Greg, Deaf Singer]\n' +
      'Back when the Internet was first established, deaf people had a\n' +
      'great time with it.',
    '$': { start: '12.5', dur: '3.9' }
  },
  {
    _: 'Everything was readable.\nThen ...',
    '$': { start: '16.5', dur: '2' }
  },
  {
    _: '[Ken, Deaf Listener]\n' +
      'Movies started showing up.\n' +
      'We couldn&#39;t understand them...',
    '$': { start: '19', dur: '3.2' }
  },
  { _: 'there were no captions!', '$': { start: '22.5', dur: '1.5' } },
  {
    _: 'Fortunately, Google Video added support for captions.',
    '$': { start: '24.5', dur: '2.5' }
  },
  { _: 'Thank you, Ken!', '$': { start: '27.5', dur: '1' } },
  {
    _: 'Now, we&#39;ve added that to YouTube.',
    '$': { start: '28.5', dur: '3' }
  },
  {
    _: 'But the first thing he did with\nthat was RickRoll me!',
    '$': { start: '32', dur: '3' }
  },
  {
    _: '♪ Never gonna give you up, ♪\n♪ never gonna let you down...',
    '$': { start: '35.5', dur: '3.5' }
  },
  {
    _: '[Franck, Icone de Mode]\nCaptions and subtitles are also helpful',
    '$': { start: '41.3', dur: '2.7' }
  },
  {
    _: 'for people who speak other languages, like myself.', 
    '$': { start: '44.2', dur: '2' }
  },
  {
    _: 'With subtitles, I can enjoy US Comedy, or news stories from Russia,',
    '$': { start: '46.8', dur: '3.2' }
  },
  { _: 'in my own language. ', '$': { start: '50.1', dur: '1.4' } },
  {
    _: 'As a video uploader, this means you can reach\n' +   
      'to people all over the world, ',
    '$': { start: '52', dur: '4' }
  },
  {
    _: 'irrespective of language.',
    '$': { start: '56.8', dur: '1.7' }
  },
  {
    _: '[Hiroto, Bedhead]\n' +
      'You can upload multiple tracks like English and French, ',
    '$': { start: '59.5', dur: '2.5' }
  },
  {
    _: 'and viewers can choose the track they like.',        
    '$': { start: '62.5', dur: '3.5' }
  },
  {
    _: '[Toliver, Japanese Learner]\n' +
      'For example, if you enjoy using YouTube in French,',  
    '$': { start: '67.5', dur: '4' }
  },
  {
    _: 'French captions will automatically appear.',
    '$': { start: '72', dur: '5' }
  },
  { _: 'With just a single video,', '$': { start: '77.5', dur: '3' } },
  {
    _: 'you can now reach people all around the globe!',     
    '$': { start: '81', dur: '5' }
  },
  {
    _: 'The captioning capability at YouTube was just launched this summer,',
    '$': { start: '88', dur: '3' }
  },
  {
    _: 'and we&#39;re planning to add more features to this.',
    '$': { start: '91.3', dur: '2.7' }
  },
  {
    _: 'If you have any feedback, please let us know!',      
    '$': { start: '94.2', dur: '2.3' }
  }
]
 * 
 */
