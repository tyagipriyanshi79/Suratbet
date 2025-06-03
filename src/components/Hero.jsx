import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import Button from "./Button";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);

  const totalVideos = 4;
  const videoRef = useRef(null); // Single video element
  const preloadVideoRef = useRef(null); // Hidden video for preloading
  const containerRef = useRef(null);

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`; // Ensure leading slash for public folder
  const getPosterSrc = (index) => `/img/hero-${index}.png`;

  // Preload next video to ensure smooth transitions
  const preloadNextVideo = (index) => {
    if (preloadVideoRef.current) {
      preloadVideoRef.current.src = getVideoSrc(index);
      preloadVideoRef.current.load();
      preloadVideoRef.current.onloadedmetadata = () => {
        setIsBuffering(false);
        console.log(`Preloaded video: ${getVideoSrc(index)}`);
      };
      preloadVideoRef.current.onerror = () => {
        setVideoError(true);
        setIsBuffering(false);
        console.error(`Preload error: ${getVideoSrc(index)}`);
      };
    }
  };

  // Handle video load completion
  const handleVideoLoad = () => {
    setLoading(false);
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.error("Video play error:", err));
    }
  };

  // Handle video errors with fallback
  const handleVideoError = (e) => {
    console.error(`Video failed to load: ${e.target.src}`);
    setVideoError(true);
    setLoading(false);
  };

  // Switch to next video
  const handleMiniVdClick = () => {
    setIsBuffering(true);
    const nextIndex = (currentIndex % totalVideos) + 1;
    setCurrentIndex(nextIndex);
    preloadNextVideo((nextIndex % totalVideos) + 1); // Preload the next video
  };

  // Initial setup and cleanup
  useEffect(() => {
    // Preload first video
    preloadNextVideo((currentIndex % totalVideos) + 1);

    // Fallback timeout for loading screen
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Video loading timed out, showing fallback");
        setLoading(false);
        setVideoError(true);
      }
    }, 5000); // Reduced to 5s for faster fallback

    return () => clearTimeout(timeout);
  }, []);

  // Update video source on index change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = getVideoSrc(currentIndex);
      videoRef.current.load();
      videoRef.current.play().catch((err) => console.error("Video play error:", err));
    }
  }, [currentIndex]);

  // Scroll animation for video frame
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
        scrub: 0.1,
      },
    });
  }, []);

  return (
    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden" ref={containerRef}>
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
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-800 will-change-transform"
      >
        {/* Fallback image */}
        {(loading || videoError || isBuffering) && (
          <img
            src={getPosterSrc(currentIndex)}
            alt="fallback background"
            className="absolute left-0 top-0 size-full object-cover z-0"
            decoding="async"
            loading="lazy"
          />
        )}

        {/* Main video */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="absolute left-0 top-0 size-full object-cover will-change-transform"
          onLoadedMetadata={handleVideoLoad}
          onError={handleVideoError}
          onCanPlay={(e) => e.target.play().catch(console.error)}
          disablePictureInPicture
          poster={getPosterSrc(currentIndex)}
          style={{ opacity: isBuffering ? 0 : 1, transition: "opacity 0.3s ease-in-out" }}
        >
          <source src={getVideoSrc(currentIndex)} type="video/mp4" />
        </video>

        {/* Hidden video for preloading */}
        <video
          ref={preloadVideoRef}
          style={{ display: "none" }}
          muted
          playsInline
          preload="auto"
        />

        {/* Clickable video preview */}
        <div className="mask-clip-path absolute-center absolute z-50 size-56 cursor-pointer overflow-hidden rounded-lg will-change-transform">
          <VideoPreview>
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in hover:scale-100 hover:opacity-100"
            >
              <img
                src={getPosterSrc((currentIndex % totalVideos) + 1)}
                alt="video preview"
                className="size-64 origin-center scale-150 object-cover"
              />
            </div>
          </VideoPreview>
        </div>

        {/* Overlay heading and CTA button */}
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