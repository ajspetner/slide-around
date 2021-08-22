import * as React from "react";
import styles from "./Carousel.module.css";

const TRANSITIONS = {
  enteringFromLeft: {},
  enteringFromRight: {},
  exitingLeft: {},
  exitingRight: {},
  exitedLeft: {}
};

export default function Carousel({ style, className, children }) {
  const [curFrame, setCurFrame] = React.useState("");
  const [transitions, setTransitions] = React.useState(TRANSITIONS);

  const setTransition = (o) => {
    setTransitions({ ...TRANSITIONS, ...o });
  };

  const frames = children.map((elem, key) => {
    return (
      <div
        className={`${styles.frame} ${
          curFrame.key === key.toString() ? styles.current : ""
        } ${
          transitions.enteringFromLeft.key === key.toString()
            ? styles.enteringFromLeft
            : ""
        } ${
          transitions.enteringFromRight.key === key.toString()
            ? styles.enteringFromRight
            : ""
        } ${
          transitions.exitingLeft.key === key.toString()
            ? styles.exitingLeft
            : ""
        } ${
          transitions.exitingRight.key === key.toString()
            ? styles.exitingRight
            : ""
        } ${
          transitions.exitedLeft.key === key.toString() ? styles.exitedLeft : ""
        } absolute left-full w-full h-full p-10`}
        key={key}
      >
        {elem}
      </div>
    );
  });

  if (curFrame === "") {
    setCurFrame(frames[0]);
  }

  const scroll = (dir) => {
    if (frames.length < 2) return;

    let frameIndex = frames.findIndex((o) => o.key === curFrame.key) + dir * -1;

    if (frameIndex < 0) {
      frameIndex = frames.length - 1;
    } else if (frameIndex >= frames.length) {
      frameIndex = 0;
    }

    setTransition({
      enteringFromRight: dir < 0 ? frames[frameIndex] : {},
      exitingLeft: dir < 0 ? curFrame : {},
      enteringFromLeft: dir > 0 ? frames[frameIndex] : {},
      exitingRight: dir > 0 ? curFrame : {}
    });
    setCurFrame(frames[frameIndex]);
    const prevFrame = curFrame;
    setTimeout(() => {
      setTransition({
        exitedLeft: dir < 0 ? prevFrame : {}
      });
    }, 0);
  };

  return (
    <div
      style={style || ""}
      className={`w-1/2 mx-auto border border-black border-solid relative ${
        className || ""
      }`}
    >
      <div className="w-full h-full relative overflow-hidden">
        <div className="h-full w-full relative">{frames}</div>
      </div>
      <button
        onClick={scroll.bind(this, 1)}
        className="focus:outline-none absolute bg-red-700 text-white left-0 -ml-5 top-0 bottom-0 my-auto rounded-full w-10 h-10"
      >
        &lt;
      </button>
      <button
        onClick={scroll.bind(this, -1)}
        className="focus:outline-none absolute bg-red-700 text-white right-0 -mr-5 top-0 bottom-0 my-auto rounded-full w-10 h-10"
      >
        &gt;
      </button>
    </div>
  );
}
