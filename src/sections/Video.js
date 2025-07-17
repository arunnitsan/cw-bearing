import React from "react";
import styled from "styled-components";
import ReactPlayer from "react-player/lazy";

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Video = ({ id, data }) => {
  const { controls, image, loop, media, mute, play } = data;
  const isControlsDisabled = !parseInt(controls) ? true : false;
  const isLoop = parseInt(loop) ? true : false;
  const isMute = parseInt(mute) ? true : false;
  const isAutoplay = parseInt(play) ? true : false;

  return (
    <PlayerWrapper id={`c${id}`} className="player-wrapper" data-aos="fade-up">
      <ReactPlayer
        className="react-player"
        playing={true}
        // url={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_TYPO3_MEDIA}${media[0]}`}
        url={`${process.env.NEXT_PUBLIC_API_URL}${media[0]?.properties?.originalUrl}`}
        loop={isLoop}
        muted={isMute}
        controls={isControlsDisabled}
        playIcon={
          isAutoplay ? null : (
            <div style={{ maxWidth: "75px" }}>
              <img src="/images/svg/play-button-arrowhead.svg" />
            </div>
          )
        }
        light={
          isAutoplay
            ? false
            : `${process.env.NEXT_PUBLIC_API_URL}${image[0]?.properties?.originalUrl}`
        }
        width="100%"
        height="100%"
      />
    </PlayerWrapper>
  );
};

export default Video;
