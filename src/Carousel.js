import * as React from "react";
import styles from "./Carousel.module.css";

export default function Carousel({ style, className, children }) {
  let scrollDir = 0;

  const scroll = (dir) => {
    const container = refContainer.current;

    if (frames.length < 2) return;

    container.classList.add(styles.scrolled);
    if (dir < 0) {
      scrollDir = -1;
    } else if (dir > 0) {
      scrollDir = 1;

      container.insertBefore(
        container.lastElementChild,
        container.firstElementChild
      );

      setTimeout(() => {
        container.classList.remove(styles.scrolled);
      }, 0);
    }
  };
  const transitionEnd = () => {
    const container = refContainer.current;
    container.classList.remove(styles.scrolled);
    if (scrollDir < 0) {
      container.appendChild(container.firstElementChild);
    }
    scrollDir = 0;
  };
  const refContainer = React.useRef(null);

  const frames = children.map((elem, key) => (
    <div
      className={`${styles.frame} absolute left-full h-full w-1/2`}
      key={key}
    >
      {elem}
    </div>
  ));

  return (
    <div
      style={style || ""}
      className={`w-1/2 mx-auto border border-black border-solid relative ${
        className || ""
      }`}
    >
      <div className="w-full h-full relative overflow-hidden">
        <div
          ref={refContainer}
          onTransitionEnd={transitionEnd}
          className={`${styles.container} h-full w-full relative`}
        >
          {frames}
        </div>
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
