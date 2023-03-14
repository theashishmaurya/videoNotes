// Payment Plan Information

import { Card, Space, Typography } from "antd";
import { Key } from "react";

const paymentPlanInfo = [
  {
    title: "Free",
    price: "0",
    description: "Free forever",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "Unlimited tasks",
      "Unlimited subtasks",
      "Unlimited comments",
      "Unlimited attachments",
    ],
  },
  {
    title: "Pro",
    price: "9.99",
    description: "Monthly",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "Unlimited tasks",
      "Unlimited subtasks",
      "Unlimited comments",
      "Unlimited attachments",
    ],
  },
  {
    title: "Pro",
    price: "99.99",
    description: "Yearly",
    features: [
      "Unlimited users",
      "Unlimited projects",
      "Unlimited tasks",
      "Unlimited subtasks",
      "Unlimited comments",
      "Unlimited attachments",
    ],
  },
];

interface PaymentCardProps {
  title: string;
  price: string;
  description: string;
  features: any[];
}

const { Title } = Typography;

const PaymentCard = ({
  title,
  price,
  description,
  features,
}: PaymentCardProps) => {
  return (
    <Card
      title={title}
      bordered={false}
      style={{
        width: 300,
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
        padding: "20px",
        textAlign: "start",
      }}
    >
      <p>
        <span>Price</span>: ${price}
      </p>
      <p>{description}</p>
      <ul>
        {features.map((feature: any, index: Key | null | undefined) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </Card>
  );
};

export function PaymentPlan() {
  return (
    <>
      <Title
        level={2}
        style={{
          textAlign: "center",
          margin: "5rem 0",
        }}
      >
        Payment Plans
      </Title>
      <Space
        direction="horizontal"
        size={25}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {paymentPlanInfo.map((paymentPlan) => (
          <PaymentCard
            key={paymentPlan.title}
            title={paymentPlan.title}
            price={paymentPlan.price}
            description={paymentPlan.description}
            features={paymentPlan.features}
          />
        ))}
      </Space>
    </>
  );
}
