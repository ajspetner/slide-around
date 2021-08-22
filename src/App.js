import React from "react";
import "./tailwind.css";
import Carousel from "./Carousel";

export default function App() {
  const carouselContent = [
    {
      title: "Frame A",
      body: `Frame a is a nice frame. It has nice stuff. I want to be like frame
        A when I get older.`
    },
    {
      title: "Frame B",
      body: `Other people like frame B more. Some say it has more personality.
        It's definitely a more exciting frame, if you're into that sort of
        thing.`
    },
    {
      title: "Frame C",
      body: `Nobody likes frame C. Frame C is like the ugly cousin who doesn't
        get birthday presents because nobody is happy that they were born.
        You don't want to be frame C.`
    },
    {
      title: "Frame D",
      body: `Frame D is tough, but fair. Frame D allows frame C to celebrate its
        birthday as long as it does so in silence and nobody notices. While
        frame D might not be the most fun to have around, it's important to
        keep it nearby.`
    }
  ];
  const frames = carouselContent.map((i) => (
    <div className="text-center">
      <h2 className="m-10 text-center font-bold text-2xl">{i.title}</h2>
      <p>{i.body}</p>
    </div>
  ));
  return (
    <div className="App h-full">
      <h1 className="text-center text-blue-800 text-3xl my-4">
        SlideAround Carousel
      </h1>
      <h2 className="text-center text-2xl mb-10">
        Carousel for React + Tailwind CSS
      </h2>

      <Carousel style={{ aspectRatio: "16 /9" }}>{frames}</Carousel>
    </div>
  );
}
