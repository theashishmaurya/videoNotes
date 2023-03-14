import React from "react";
import SingInWithGoogleButton from "../singin";
import heroStyle from "./Hero.module.css";

const Info = {
  title: "Convert YouTube Videos to Notes - Boost Your Productivity",
  metaDesciption:
    "Turn any YouTube video into notes in seconds with our powerful SaaS. Save time, improve retention, and boost your productivity",
};

//TODO: Use Typography component for title and description
export default function HeroArea() {
  return (
    <div className={heroStyle["hero-area"]}>
      <h1 className={heroStyle["hero-title"]}>{Info.title}</h1>
      <p className={heroStyle["hero-description"]}>{Info.metaDesciption}</p>
      <div className={heroStyle["hero-buttons"]}>
        <SingInWithGoogleButton title="Sign in with Google" icon={true} />
      </div>
    </div>
  );
}
