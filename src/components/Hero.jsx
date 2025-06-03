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
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState({ current: false, next: false, background: false });

  const totalVideos = 4;

  const currentVdRef = useRef(null);
  const nextVdRef = useRef(null);
  const backgroundVdRef = useRef(null);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  const getPosterSrc = (index) => `/img/hero-${index}.png`;

  const handleVideoLoad = (e, videoType) => {
    console.log(`Video loaded (${videoType}): ${e.target.src}`);
    setLoadedVideos((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalVideos - 1) {
        setLoading(false);
      }
      return newCount;
    });
    setIsVideoReady((prev) => ({ ...prev, [videoType]: true }));
  };

  const handleVideoError = (e, videoType) => {
    console.error(`Video failed to load (${videoType}): ${e.target.src}`);
    setVideoError(true);
    setTimeout(() => {
      if (e.target && !videoError) {
        e.target.load();
      }
    }, 2000);
  };

  useEffect(() => {
    const isOlderDevice = navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency <= 2
      : false;
    setIsLowPerformance(isOlderDevice);

    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Video loading timed out, hiding loading screen");
        setLoading(false);
        setVideoError(true);
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setIsVideoReady({ current: false, next: false, background: false });
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
    setTimeout(() => {
      if (currentVdRef.current) {
        currentVdRef.current.load();
        currentVdRef.current.play().catch((err) => console.error("Current video play error:", err));
      }
      if (nextVdRef.current) {
        nextVdRef.current.load();
        nextVdRef.current.play().catch((err) => console.error("Next video play error:", err));
      }
      if (backgroundVdRef.current) {
        backgroundVdRef.current.load();
        backgroundVdRef.current.play().catch((err) => console.error("Background video play error:", err));
      }
    }, 100);
  };

  useEffect(() => {
    if (backgroundVdRef.current) {
      setIsVideoReady((prev) => ({ ...prev, background: false }));
      setTimeout(() => {
        backgroundVdRef.current.load();
        backgroundVdRef.current.play().catch((err) => console.error("Background video playback error:", err));
      }, 100);
    }
    if (currentVdRef.current) {
      setIsVideoReady((prev) => ({ ...prev, current: false }));
      setTimeout(() => {
        currentVdRef.current.load();
        currentVdRef.current.play().catch((err) => console.error("Current video playback error:", err));
      }, 100);
    }
  }, [currentIndex]);

  useGSAP(
    () => {
      if (hasClicked && nextVdRef.current) {
        const tl = gsap.timeline();
        tl.set("#next-video", { visibility: "visible", opacity: 1 })
          .to("#next-video", {
            scale: 1,
            width: "100%",
            height: "100%",
            duration: isLowPerformance ? 0.4 : 0.6,
            ease: "power1.inOut",
            onStart: () => {
              if (nextVdRef.current) {
                nextVdRef.current.play().catch((err) => console.error("Next video play error:", err));
              }
            },
          })
          .from("#current-video", {
            scale: 0,
            duration: isLowPerformance ? 0.4 : 0.6,
            ease: "power1.inOut",
          });
      }
    },
    { dependencies: [currentIndex, hasClicked], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
      willChange: "clip-path, border-radius",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: isLowPerformance ? 0.05 : 0.1,
      },
    });
  }, []);

  return (
    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-800 will-change-transform"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-56 cursor-pointer overflow-hidden rounded-lg will-change-transform">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={currentVdRef}
                  loop
                  muted
                  playsInline
                  preload={isLowPerformance ? "metadata" : "auto"}
                  id="current-video"
                  className={`size-64 origin-center scale-150 object-cover will-change-opacity ${
                    isVideoReady.current ? "opacity-100" : "opacity-0"
                  }`}
                  onCanPlay={(e) => {
                    setIsVideoReady((prev) => ({ ...prev, current: true }));
                    e.target.play().catch((err) => console.error("Current video play error:", err));
                  }}
                  onError={(e) => handleVideoError(e, "current")}
                  disablePictureInPicture
                  poster={getPosterSrc((currentIndex % totalVideos) + 1)}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                />
              </div>
            </VideoPreview>
          </div>

          <img
            src={getPosterSrc(currentIndex)}
            alt="next video fallback"
            className={`absolute left-0 top-0 size-full object-cover z-5 transition-opacity duration-300 ${
              isVideoReady.next && !loading && !videoError ? "opacity-0" : "opacity-100"
            }`}
            decoding="async"
            loading="lazy"
          />

          <video
            ref={nextVdRef}
            loop
            muted
            playsInline
            preload={isLowPerformance ? "none" : "metadata"}
            id="next-video"
            className={`absolute-center absolute z-20 size-64 object-cover will-change-transform,opacity ${
              isVideoReady.next ? "visible opacity-100" : "invisible opacity-0"
            }`}
            onLoadedMetadata={(e) => handleVideoLoad(e, "next")}
            onError={(e) => handleVideoError(e, "next")}
            onCanPlayThrough={(e) => handleVideoLoad(e, "next")}
            disablePictureInPicture
            poster={getPosterSrc(currentIndex)}
            src={getVideoSrc(currentIndex)}
          />

          <img
            src={getPosterSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            alt="background video fallback"
            className={`absolute left-0 top-0 size-full object-cover z-5 transition-opacity duration-300 ${
              isVideoReady.background && !loading && !videoError ? "opacity-0" : "opacity-100"
            }`}
            decoding="async"
            loading="lazy"
          />

          <video
            ref={backgroundVdRef}
            loop
            muted
            playsInline
            preload="auto"
            className={`absolute left-0 top-0 size-full object-cover will-change-transform,opacity ${
              isVideoReady.background ? "opacity-100" : "opacity-0"
            }`}
            onLoadedMetadata={(e) => handleVideoLoad(e, "background")}
            onError={(e) => handleVideoError(e, "background")}
            onCanPlayThrough={(e) => handleVideoLoad(e, "background")}
            disablePictureInPicture
            poster={getPosterSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
          >
            <source
              src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
              type="video/mp4"
            />
          </video>
        </div>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 text-12xl sm:text-12xl md:text-12xl">
              sur<b>a</b>tb<b>e</b>t
            </h1>

            <h1 className="special-font hero-heading text-blue-100 mt-2 md:absolute md:bottom-5 md:right-5 text-12xl sm:text-12xl md:text-12xl">
              G<b>A</b>MING
            </h1>

            <Button
              id="watch-trailer"
              title="hemen oyna"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1 mt-4 md:mt-0"
              onClick={() => window.open("https://www.suratbet234.com/tr/", "_blank")}
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black hidden md:block">
        G<b>A</b>MING
      </h1>
    </div>
  );
};

export default Hero;