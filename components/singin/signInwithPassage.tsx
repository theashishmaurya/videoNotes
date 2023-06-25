import { Button } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";

interface SingInWithPassageButtonProps {
  title?: string;
  icon?: boolean;
  type?:
    | "link"
    | "text"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
}

/**
 *
 * @param title The title of the button
 * @param icon Whether to show the 1password logo or not
 * @returns
 *
 */
const SingInWithPassage: React.FC<SingInWithPassageButtonProps> = (props) => {
  const { title, icon, type } = props;

  const router = useRouter();

  const navigateToPassage = () => {
    router.push("/login");
  };

  return (
    <Button
      type={type ? type : "default"}
      onClick={navigateToPassage}
      size="large"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      {icon && (
        <Image
          src="/assets/icon/1password-logo.png"
          alt="1password logo"
          width={24}
          height={24}
        />
      )}
      {title ? title : "Sign in with Google"}
    </Button>
  );
};

export default SingInWithPassage;
