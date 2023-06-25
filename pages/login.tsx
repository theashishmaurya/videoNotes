import { useEffect } from "react";

const LogIn = ({ appID }: { appID: string }) => {
  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
  }, []);

  return (
    <div
      style={{
        height: "100%",
      }}
    >
      <passage-auth app-id={appID}></passage-auth>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      appID: process.env.PASSAGE_APP_ID,
    },
  };
}

export default LogIn;
