import { GoogleOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import firebase, { db } from "@/firebase/firebaseClient";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

interface SingInWithGoogleButtonProps {
  title?: string;
  icon?: boolean;
}

const auth = getAuth();
export default function SingInWithGoogleButton(
  props: SingInWithGoogleButtonProps
) {
  const { title, icon } = props;
  const handleGoogleSignIn = () => {
    async function signInWithGoogle(): Promise<UserCredential> {
      const provider = new GoogleAuthProvider();
      let result = await signInWithPopup(auth, provider);
      return result;
    }
    signInWithGoogle()
      .then(async (result) => {
        message.success("Signed in with Google");
        const user = result.user;

        // Authenticated user information is stored in the user database in the firestore database.

        try {
          const docRef = doc(db, "users", user.uid);
          await setDoc(docRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
          });
        } catch (error) {
          throw error; // Throw error to catch block
        }
      })
      .catch((error) => {
        message.error(
          error && error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      });
  };
  return (
    <>
      <Button
        type="primary"
        icon={icon ? <GoogleOutlined /> : null}
        size="large"
        onClick={handleGoogleSignIn}
      >
        {title ? title : "Sign in with Google"}
      </Button>
    </>
  );
}
