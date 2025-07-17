import React from "react";

export const renderWordHtml = (str, delay, delayInBetween) => {
  return str.split(" ").map((s, sid) => (
    <span
      key={`word-${delay}`}
      data-aos="fadeSlowword"
      className={`word
      word${sid + 1}`}
      style={{
        display: "inline-block",
      }}
    >
      {s.split("").map((a, id) => {
        delay = delay + delayInBetween;
        return (
          <span
            key={delay}
            className={`char char${id + 1} ${a === "." ? "char-dot" : ""}`}
            style={{
              animationDelay: `${delay}s`,
            }}
          >
            {a}
          </span>
        );
      })}
    </span>
  ));
};
