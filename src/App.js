import React from "react";
import "./styles.css";
import Carousel from "./Carousel";

export default function App() {
  const carouselContent = [
    {
      title: "Frame A",
      body: `Frame A is a nice frame. It has nice stuff. I want to be like frame
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
  const frames = carouselContent.map((i, key) => (
    <div key={key} className="frame">
      <h2>{i.title}</h2>
      <p>{i.body}</p>
    </div>
  ));
  return (
    <div className="App">
      <h1>SlideAround Carousel</h1>
      <h2>Fast and lightweight React Carousel.</h2>

      <Carousel
        className="carousel"
        options={{
          buttons: {
            style: { stroke: "#fff" }
          }
        }}
      >
        {frames}
      </Carousel>
    </div>
  );
}
