// curl https://api.openai.com/v1/chat/completions \
//  -H "Authorization: Bearer $OPENAI_API_KEY" \
//  -H "Content-Type: application/json" \
//  -d '{
//  "model": "gpt-3.5-turbo",
//  "messages": [{"role": "user", "content": "What is the OpenAI mission?"}]
//  }'

import { getApiKey } from "./getApiKey";

export const getGptResponse = async (
  text: string,
  contentType: string
): Promise<string | undefined> => {
  if (!text) return;

  return new Promise((resolve, reject) => {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getApiKey()}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: contentType,
          },
          {
            role: "assistant",
            content:
              "Supported Markdown: #, ##, ###, ####, #####, ######, ![](url), >, *, 1. , ```code```,",
          },
          {
            role: "user",
            content: text,
          },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        console.log(json.choices[0].message.content);
        resolve(json.choices[0].message.content);
      })
      .catch((error) => {
        console.log(error);
        reject(new Error("GPT-3 failed"));
      });
  });
};
