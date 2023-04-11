import { message } from "antd";

export const getApiKey = () => {
  let key = localStorage.getItem("OpenAPIKey");
  if (!key) {
    message.error("Please enter your OpenAI API Key in settings");
  }

  return key;
};
