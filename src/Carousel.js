import * as React from "react";
import styles from "./Carousel.module.css";

const TRANSITIONS = {
  enteringFromLeft: {},
  enteringFromRight: {},
  exitingLeft: {},
  exitingRight: {},
  exitedLeft: {}
};

const merge = (objFrom, objTo) =>
  Object.keys(objFrom).reduce(
    (merged, key) => {
      merged[key] =
        objFrom[key] instanceof Object && !Array.isArray(objFrom[key])
          ? merge(objFrom[key], merged[key] ?? {})
          : objFrom[key];
      return merged;
    },
    { ...objTo }
  );

export default function Carousel({
  style,
  className,
  children,
  buttonLeftContent,
  buttonRightContent,
  options
}) {
  const [curFrame, setCurFrame] = React.useState("");
  const [transitions, setTransitions] = React.useState(TRANSITIONS);
  const mergedOptions = merge(options || {}, {
    buttons: {
      left: {
        content: null,
        style: {},
        svgStyle: {}
      },
      right: {
        content: null,
        style: {},
        svgStyle: {}
      },
      style: {},
      svgStyle: {}
    }
  });

  mergedOptions.buttons.left.content = mergedOptions.buttons.left.content || (
    <svg
      className={styles.chevron}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 131.46 228.97"
      style={{
        ...mergedOptions.buttons.svgStyle,
        ...mergedOptions.buttons.left.svgStyle
      }}
    >
      <polyline
        points="122.97 8.48 16.97 114.48 122.97 220.49"
        style={{
          fill: "none",
          strokeMiterlimit: 10
        }}
      />
    </svg>
  );
  mergedOptions.buttons.right.content = mergedOptions.buttons.right.content || (
    <svg
      className={styles.chevron}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 131.46 228.97"
      style={{
        ...mergedOptions.buttons.svgStyle,
        ...mergedOptions.buttons.right.svgStyle
      }}
    >
      <polyline
        points="8.48 8.48 114.48 114.48 8.48 220.49"
        style={{
          fill: "none",
          strokeMiterlimit: 10
        }}
      />
    </svg>
  );

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
        }`}
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
      style={style || {}}
      className={`${className || ""} ${styles.carousel}`}
    >
      <div className={`${styles.frames} `}>{frames}</div>

      <button
        onClick={scroll.bind(this, 1)}
        className={`${styles.nav} ${styles.left}`}
        style={{
          ...mergedOptions.buttons.style,
          ...mergedOptions.buttons.left.style
        }}
      >
        {mergedOptions.buttons.left.content}
      </button>
      <button
        onClick={scroll.bind(this, -1)}
        className={`${styles.nav} ${styles.right}`}
        style={{
          ...mergedOptions.buttons.style,
          ...mergedOptions.buttons.right.style
        }}
      >
        {mergedOptions.buttons.right.content}
      </button>
    </div>
  );
}
