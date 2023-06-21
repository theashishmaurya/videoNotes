import { useEffect } from "react";

const LogIn = ({ appID }: { appID: string }) => {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  return <passage-auth app-id={appID}></passage-auth>;
};

export async function getStaticProps() {
  return {
    props: {
      appID: process.env.PASSAGE_APP_ID,
    },
  };
}

export default LogIn;
