import CreateNote from "@/components/Notes/createNote";
import useSaveUserInfo from "@/hooks/authHooks/useSaveUserInfo";
import Link from "next/link";

interface NotesProps {
  isAuthorized: boolean;
  username: string;
}
const Notes = (props: NotesProps) => {
  const { isAuthorized, username } = props;
  useSaveUserInfo({ isAuthorized, username });

  if (!isAuthorized) {
    return (
      <div>
        Not Authorized Please <Link href="/login">login again</Link>
      </div>
    );
  }

  return (
    <div>
      <CreateNote />
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  // getServerSideProps runs server-side only and will never execute on the client browser

  // this allows the safe use of a private Passage API Key
  const Passage = require("@passageidentity/passage-node");

  const passage = new Passage({
    appID: process.env.PASSAGE_APP_ID as string,
    apiKey: process.env.PASSAGE_API_KEY,
    authStrategy: "COOKIE",
  });

  try {
    const authToken = context.req.cookies["psg_auth_token"];

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
