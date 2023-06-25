import { NextApiRequest, NextApiResponse } from "next";
import Passage from "@passageidentity/passage-node";

const passage = new Passage({
  appID: process.env.PASSAGE_APP_ID as string,
  apiKey: process.env.PASSAGE_API_KEY,
  authStrategy: "COOKIE",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const authToken = req.cookies["psg_auth_token"];
    //TODO: Fix any
    const request: any = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };

    const userID = await passage.authenticateRequestWithHeader(request);

    if (userID) {
      const { email, phone } = await passage.user.get(userID);

      const identifier = email ? email : phone;

      res.status(200).json({ isAuthorized: true, username: identifier });
    } else {
      res.status(200).json({ isAuthorized: false, username: "" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error occurred" });
  }
}
