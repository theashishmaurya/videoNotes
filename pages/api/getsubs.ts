import ytdl from "@distube/ytdl-core";
import { NextApiRequest, NextApiResponse } from "next";
import { parseString } from "xml2js";

const lang = "en";
const format = "xml";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query;
  const cookie = [
    {
        "domain": ".youtube.com",
        "expirationDate": 1767086091.710905,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000qghVevezGp13nsLMGDpiH0CRGPNxGvkcYITeMjkmvkeWm-RnHSBZrEypPi4cmyd6STzUmAACgYKAb4SARISFQHGX2Mi0Wwrrb9LJC9Qaq_dzVl_0xoVAUF8yKpNNcr6Eczg0QBBGnF45sgj0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765182499.614305,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDTS",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjEBQT4rX-tmBl9RA3kenexYRrC2ythU0E3uRTWiUiG4oADvzvYffffSnuX_SNLXOoH6EAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767086091.710075,
        "hostOnly": false,
        "httpOnly": false,
        "name": "SAPISID",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "bXDS1xzKZCk1UJ_X/Ab0wV81_SZopLyYgL"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765182560.873074,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSIDCC",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzX0bCU8WCahjoQB0YIiytdtveMdVqH7ufMzBVCF8eCnFWTnMLo1AlPGFoXynZNqkjUDuEI"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767086091.709992,
        "hostOnly": false,
        "httpOnly": true,
        "name": "SSID",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "A1j0NOeKjo_yREhrH"
    },
    {
        "domain": "www.youtube.com",
        "expirationDate": 1735136533,
        "hostOnly": true,
        "httpOnly": false,
        "name": "OTZ",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "7837342_34_34__34_"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767086091.710112,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-1PAPISID",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "bXDS1xzKZCk1UJ_X/Ab0wV81_SZopLyYgL"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767086091.71088,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-1PSID",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "g.a000qghVevezGp13nsLMGDpiH0CRGPNxGvkcYITeMjkmvkeWm-RngxJP9QGDN3XNm5j3_SDT3wACgYKAYYSARISFQHGX2MiGoyWv-p_rKDMnPo5SvATKBoVAUF8yKq4PUKmpQGmcJ-YYJGSVnku0076"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1767086091.710181,
        "hostOnly": false,
        "httpOnly": false,
        "name": "__Secure-3PAPISID",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "bXDS1xzKZCk1UJ_X/Ab0wV81_SZopLyYgL"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765182560.873561,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDCC",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AKEyXzU4JzSUUcoCQ1oGantk4fTLvvvFDPZlHHfJ26MT7T_u2x8EZ2EQ6aly76GyWNhtqjfJejht"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1765182499.614907,
        "hostOnly": false,
        "httpOnly": true,
        "name": "__Secure-3PSIDTS",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "sidts-CjEBQT4rX-tmBl9RA3kenexYRrC2ythU0E3uRTWiUiG4oADvzvYffffSnuX_SNLXOoH6EAA"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768206528.406151,
        "hostOnly": false,
        "httpOnly": true,
        "name": "LOGIN_INFO",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "AFmmF2swRgIhAMiZaOCSxIJtgAv5WYZn3xV2v26tK0BlryGtpMIvU_-YAiEA9HpUw7dN6a-58axjWcjg5qjqtFrZpfj_2z66KYC-GMA:QUQ3MjNmek9FelZSZV9hN0kzNUI3YnY3UGJ2UWsyNlRvMHVMZkVXVnRWdWNKSWtKdm5PcDBLMWNjMGtZTkZMU09yWmVSOWtRc2FnQlp4VE1RS2Vpdk05RDdoTWViWHVvRUlUa0ZGZlB0a0M5dnozb1ptU1QzazBaWXFqaFdqN0xtRTBPMmpoNTFVNXpEZlg3ZzZGZzBCelZiUFZ5Yzh0Tndn"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1748365966.144929,
        "hostOnly": false,
        "httpOnly": true,
        "name": "NID",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "519=2WH15zWQeCojhyNKKsba4FbSNVlvl9Q1nvD0NNfVybXEt3rNndTfpGDAPNJL3uIVRTfAR_YjQ1ZVe7e-bu3diS-CCmDTnQSE_xUMMfi6Y9quioGbXkeGb8tKgRGBh8b_r6ja26lez9srWBpK_sOxcAt13tW7yZBNuzINHRGQesyNSZ2JetrFIPzJW1sbaABM9U46ZGkWsL7JEClo_7JE03qkonyBSC1aOOoXr6vwNsmQpB9VBLT_yBAorw"
    },
    {
        "domain": ".youtube.com",
        "expirationDate": 1768206539.923596,
        "hostOnly": false,
        "httpOnly": false,
        "name": "PREF",
        "path": "/",
        "secure": true,
        "session": false,
        "storeId": null,
        "value": "f6=40000000&f7=4100&tz=Asia.Calcutta&f4=4000000&f5=20000"
    }
]

const agentOptions = {
  pipelining: 5,
  maxRedirections: 0,
  localAddress: "127.0.0.1",
};

// agent should be created once if you don't want to change your cookie
const agent = ytdl.createAgent(cookie, agentOptions);
  ytdl.getInfo(url as string,{agent:agent}).then((info: any) => {
    const tracks =
      info.player_response.captions.playerCaptionsTracklistRenderer
        .captionTracks;
    if (tracks && tracks.length) {
      const track = tracks.find(
        (t: { languageCode: string }) => t.languageCode === lang
      );
      if (track) {
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
                simpleText: convertToSimpletText(plainText),
              };

              res.send(response);
            });
          })
          .catch((error) => {
            res.status(500).send("Error fetching captions");
          });
      } else {
        res.status(400).send("Could not find captions for " + lang);
      }
    } else {
      res.status(400).send("No captions found for this video");
    }
  }).catch((err)=>{
    console.log(err)
    res.status(err.status).send(`Error Getting Info, ${err}`)
  });
};
function convertToSimpletText(transcriptData: any) {
  let text = "";
  for (const { _: line } of transcriptData) {
    // Remove unnecessary data (e.g., speaker names)
    const cleanedLine = line.replace(/\[[^\]]+\]/g, "").trim();
    text += cleanedLine + " ";
  }
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
