import { Col, Row, Space } from "antd";
import Image from "next/image";

const features = [
  {
    title: "Create Notes from Youtube Videos",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, veniam laudantium ad nihil provident quisquam. Natus, facilis quaerat? Necessitatibus est voluptas velit ipsam porro iste, quis sapiente labore non deserunt!",
    img: "https://img.icons8.com/3d-fluency/750/null/youtube-play.png",
  },
  {
    title: "AI Powered Notes/Blogs",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, veniam laudantium ad nihil provident quisquam. Natus, facilis quaerat? Necessitatibus est voluptas velit ipsam porro iste, quis sapiente labore non deserunt!",

    img: "https://img.icons8.com/3d-fluency/750/null/chatbot.png",
  },
  {
    title: "Unlimited Folders to Organize Notes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, veniam laudantium ad nihil provident quisquam. Natus, facilis quaerat? Necessitatibus est voluptas velit ipsam porro iste, quis sapiente labore non deserunt!",
    img: "https://img.icons8.com/3d-fluency/750/null/opened-folder.png",
  },
  {
    title: "Completely Free Forever",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, veniam laudantium ad nihil provident quisquam. Natus, facilis quaerat? Necessitatibus est voluptas velit ipsam porro iste, quis sapiente labore non deserunt!",
    img: "https://img.icons8.com/3d-fluency/750/null/money.png",
  },
];

const Feature = ({ title, description, img, index }: any) => {
  return (
    <Row
      id="features"
      style={{
        flexDirection: index % 2 === 0 ? "row" : "row-reverse",
        alignItems: "center",
        justifyContent: "center",
      }}
      //   gutter={0}
    >
      <Col
        span={10}
        style={{
          display: "flex",
          justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
        }}
      >
        <Image src={img} width={400} height={400} alt={""} />
      </Col>
      <Col span={10} style={{ color: "#000000" }}>
        <h1>{title}</h1>
        <p>{description}</p>
      </Col>
    </Row>
  );
};

export default function Features() {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {features.map((feature, index) => (
        <Feature
          key={feature.title}
          index={index}
          title={feature.title}
          description={feature.description}
          img={feature.img}
        />
      ))}
    </Space>
  );
}
