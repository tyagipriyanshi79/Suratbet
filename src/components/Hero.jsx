import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState } from "react";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;

  const nextVdRef = useRef(null);
  const backgroundVdRef = useRef(null);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleVideoError = (e) => {
    console.error("Video failed to load", e);
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos >= totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
  };

  // Animate video on index change
  useGSAP(() => {
    const tl = gsap.timeline();

    if (hasClicked) {
      tl.set("#next-video", { visibility: "visible" })
        .to("#next-video", {
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 0.6, // Shorter duration for snappier iOS response
          ease: "power1.inOut", // Smoother easing for iOS
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.play().catch(console.error);
            }
          },
        })
        .from("#current-video", {
          scale: 0,
          duration: 0.6,
          ease: "power1.inOut",
        });
    }
  }, {
    dependencies: [currentIndex],
    revertOnUpdate: true,
  });

  // Scroll animation for video frame
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
      willChange: "clip-path, border-radius", // Optimize rendering
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: 0.1, // Reduced scrub for smoother iOS scrolling
      },
    });
  }, []);

  return (
    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {/* Loading screen */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Main video container */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75 will-change-transform"
      >
        {/* Fallback image */}
        {loading && (
          <img
            src="/img/stones.webp"
            alt="fallback background"
            className="absolute left-0 top-0 size-full object-cover z-0"
            decoding="async" // Optimize for iOS
            loading="lazy"
          />
        )}

        <div>
          {/* Clickable video preview */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg will-change-transform">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover"
                  onLoadedMetadata={handleVideoLoad}
                  onError={handleVideoError}
                  disablePictureInPicture
                >
                  <source
                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                    type="video/mp4; codecs=avc1.42E01E,mp4a.40.2"
                  />
                </video>
              </div>
            </VideoPreview>
          </div>

          {/* Full-size video after clicking */}
          <video
            ref={nextVdRef}
            loop
            muted
            playsInline
            preload="metadata"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover will-change-transform"
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
            disablePictureInPicture
          >
            <source
              src={getVideoSrc(currentIndex)}
              type="video/mp4; codecs=avc1.42E01E,mp4a.40.2"
            />
          </video>

          {/* Background looping video */}
          <video
            ref={backgroundVdRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute left-0 top-0 size-full object-cover will-change-transform"
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
            disablePictureInPicture
          >
            <source
              src={getVideoSrc(
                currentIndex === totalVideos - 1 ? 1 : currentIndex
              )}
              type="video/mp4; codecs=avc1.42E01E,mp4a.40.2"
            />
          </video>
        </div>

        {/* Overlay heading and CTA button */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              sur<b>a</b>tb<b>e</b>t
            </h1>

            <Button
              id="watch-trailer"
              title="hemen oyna"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
              onClick={() =>
                window.open("https://www.suratbet234.com/tr/", "_blank")
              }
            />
          </div>
        </div>

        {/* Bottom right title */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>
      </div>

      {/* Duplicate heading for fallback contrast */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;