import { Col, Row, Space, Typography } from "antd";
import Image from "next/image";

const features = [
  {
    title: "An out of the box solution for your notes",
    description:
      "Revolutionize your note-taking experience with VideoNotes, the cutting-edge SaaS tool that harnesses the prowess of artificial intelligence. Gone are the days of painstakingly transcribing video content—simply provide the YouTube video link, and let VideoNotes work its magic.",
    img: "/assets/illustrations/outofbox.svg",
  },
  {
    title: "Effortless Conversions",
    description:
      "With VideoNotesby your side, experience a streamlined workflow that optimizes your productivity. Effortlessly navigate through your notes, review essential concepts, and bolster your understanding—all in a fraction of the time it would traditionally take.",

    img: "/assets/illustrations/ai.svg",
  },
  {
    title: "Unlimited Space to Organize Your Notes",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, veniam laudantium ad nihil provident quisquam. Natus, facilis quaerat? Necessitatibus est voluptas velit ipsam porro iste, quis sapiente labore non deserunt!",
    img: "/assets/illustrations/folder.svg",
  },
  {
    title: "Just in Price of a Cup of Coffee ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, veniam laudantium ad nihil provident quisquam. Natus, facilis quaerat? Necessitatibus est voluptas velit ipsam porro iste, quis sapiente labore non deserunt!",
    img: "/assets/illustrations/price.svg",
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
      gutter={60}
    >
      <Col
        span={12}
        style={{
          display: "flex",
          justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
        }}
      >
        <Image src={img} width={600} height={600} alt={""} />
      </Col>
      <Col span={9} style={{ color: "#000000" }}>
        <h1>{title}</h1>
        <p>{description}</p>
      </Col>
    </Row>
  );
};

export default function Features() {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Space
        size="large"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Typography.Title level={1}>Features</Typography.Title>
      </Space>
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
