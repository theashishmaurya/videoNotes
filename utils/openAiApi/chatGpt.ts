// curl https://api.openai.com/v1/chat/completions \
//  -H "Authorization: Bearer $OPENAI_API_KEY" \
//  -H "Content-Type: application/json" \
//  -d '{
//  "model": "gpt-3.5-turbo",
//  "messages": [{"role": "user", "content": "What is the OpenAI mission?"}]
//  }'

export const getGptResponse = async (
  text: string,
  contentType: string,
): Promise<string | undefined> => {
  if (!text) return;

  //TODO: FIX this .... make it to backend as this can be used a lot.
  const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

  return new Promise((resolve, reject) => {
    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-16k-0613",
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

export async function fetchChatCompletion(prompt: string, contentType: string) {
  const response = await fetch(`/api/chat-completion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3",
      prompt: `${contentType}, using only these elements: headings (# to ####), images (![](url)), blockquotes (>), italics (*), ordered lists (1. ), and code blocks, also no suffix and prefix is required just the markdown content content is: ${prompt}`,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.result;
}
