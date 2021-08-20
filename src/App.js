import React from "react";
import "./styles.css";
import Carousel from "./Carousel";

export default function App() {
  return (
    <div className="App h-full">
      <h1 className="text-blue-800 text-3xl my-4">React + Tailwind Carousel</h1>
      <h2 className="text-2xl mb-10">It's a carousel.</h2>

      <Carousel style={{ aspectRatio: "16 /9" }}>
        <div>
          <h2 className="m-10 font-bold text-2xl">Frame A</h2>
          <p>
            Frame a is a nice frame. It has nice stuff. I want to be like frame
            A when I get older.
          </p>
        </div>
        <div>
          <h2 className="m-10 font-bold text-2xl">Frame B</h2>
          <p>
            Other people like frame B more. Some say it has more personality.
            It's definitely a more exciting frame, if you're into that sort of
            thing.
          </p>
        </div>
        <div>
          <h2 className="m-10 font-bold text-2xl">Frame C</h2>
          <p>
            Nobody likes frame C. Frame C is like the ugly cousin who doesn't
            get birthday presents because nobody is happy that they were born.
            You don't want to be frame C.
          </p>
        </div>
        <div>
          <h2 className="m-10 font-bold text-2xl">Frame D</h2>
          <p>
            Frame D is tough, but fair. Frame D allows frame C to celebrate its
            birthday as long as it does so in silence and nobody notices. While
            frame D might not be the most fun to have around, it's important to
            keep it nearby.
          </p>
        </div>
      </Carousel>
    </div>
  );
}
