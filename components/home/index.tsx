import { Space } from "antd";
import Features from "./feature";
import HeroArea from "./Hero";
import { PaymentPlan } from "./payment";

export default function Home() {
  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <HeroArea />
        <Features />
        {/* <PaymentPlan /> */}
      </Space>
    </div>
  );
}
