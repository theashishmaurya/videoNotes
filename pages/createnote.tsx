import React from "react"
import CreateNote from "@/components/Notes/createNote";
import useSaveUserInfo from "@/hooks/authHooks/useSaveUserInfo";
import Link from "next/link";

interface NotesProps {
  isAuthorized: boolean;
  username: string;
}
const Notes = (props: NotesProps) => {
  const { isAuthorized, username } = props;
  console.log(props,"Props from server")
  // useSaveUserInfo({ isAuthorized, username });

  // if (!isAuthorized) {
  //   return (
  //     <div>
  //       Not Authorized Please <Link href="/login">login again</Link>
  //     </div>
  //   );
  // }

  return (
    <div>
      <CreateNote />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  // getServerSideProps runs server-side only and will never execute on the client browser

  console.log("Server is getting logged",context)
  // this allows the safe use of a private Passage API Key
  const Passage = require("@passageidentity/passage-node").Passage;

  const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID as string,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "COOKIE",
  });

  try {
    const authToken = context.req.cookies["psg_auth_token"];
    console.log(authToken,"Auth token from the 1Pass")

    const req = {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    };

    const userID = await passage.authenticateRequestWithHeader(req);

    console.log(userID, "User ID");

    if (userID) {
      const { email, phone } = await passage.user.get(userID);

      const identifier = email ? email : phone;

      return { props: { isAuthorized: true, username: identifier } };
    } else {
      return { props: { isAuthorized: false, username: "" } };
    }
  } catch (error) {
    return { props: { isAuthorized: false, username: "" } };
  }
};
export default Notes;
