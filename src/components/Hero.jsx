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

  const totalVideos = 4;

  const nextVdRef = useRef(null);
  const backgroundVdRef = useRef(null);
  const currentVdRef = useRef(null); // Added ref for current-video

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;
  const getPosterSrc = (index) => `/img/hero-${index}.png`;

  const handleVideoLoad = (e) => {
    console.log(`Video loaded: ${e.target.src}`);
    setLoadedVideos((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalVideos - 1) {
        setLoading(false);
      }
      return newCount;
    });
  };

  const handleVideoError = (e) => {
    console.error(`Video failed to load: ${e.target.src}`);
    setVideoError(true);
    setTimeout(() => {
      if (e.target && !videoError) {
        e.target.src = e.target.src;
        e.target.load();
      }
    }, 1000); // Reduced to 1s for faster retry
  };

  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isOlderDevice = navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency <= 2
      : false;
    setIsLowPerformance(isOlderDevice || isIOS);

    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Video loading timed out, hiding loading screen");
        setLoading(false);
        setVideoError(true);
      }
    }, 6000); // Reduced to 6s for faster fallback

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);

    // Ensure only one video plays at a time on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (isIOS) {
      if (backgroundVdRef.current) {
        backgroundVdRef.current.pause(); // Pause background to prioritize next video
      }
      if (currentVdRef.current) {
        currentVdRef.current.pause(); // Pause current to reduce resource strain
      }
    }

    // Update next video source and play with slight delay
    if (nextVdRef.current) {
      const nextSrc = getVideoSrc(currentIndex);
      const sourceElement = nextVdRef.current.querySelector("source");
      if (sourceElement) {
        sourceElement.src = nextSrc;
      }
      nextVdRef.current.load();
      setTimeout(() => {
        nextVdRef.current.play().catch((err) => console.error("Next video play error:", err));
      }, 100); // Slight delay for iOS stability
    }

    // Update background video source
    if (backgroundVdRef.current) {
      const bgSrc = getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex);
      const sourceElement = backgroundVdRef.current.querySelector("source");
      if (sourceElement) {
        sourceElement.src = bgSrc;
      }
      backgroundVdRef.current.load();
      setTimeout(() => {
        backgroundVdRef.current.play().catch((err) => console.error("Background video play error:", err));
      }, 200); // Slightly longer delay to avoid conflict
    }
  };

  // Ensure background video updates on index change
  useEffect(() => {
    if (backgroundVdRef.current) {
      const bgSrc = getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex);
      const sourceElement = backgroundVdRef.current.querySelector("source");
      if (sourceElement) {
        sourceElement.src = bgSrc;
      }
      backgroundVdRef.current.load();
      setTimeout(() => {
        backgroundVdRef.current.play().catch((err) => console.error("Background video playback error:", err));
      }, 100); // Slight delay for iOS
    }
  }, [currentIndex]);

  // Animate video on index change
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
            <div class="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-black will-change-transform"
      >
        {(loading || videoError) && (
          <img
            src={getPosterSrc(currentIndex)}
            alt="fallback background"
            className="absolute left-0 top-0 size-full object-cover z-0"
            decoding="async"
            loading="lazy"
          />
        )}

        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-56 cursor-pointer overflow-hidden rounded-lg will-change-transform">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-300 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  ref={currentVdRef} // Added ref
                  loop
                  muted
                  playsInline
                  preload={isLowPerformance ? "metadata" : "auto"}
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover"
                  onLoadedMetadata={handleVideoLoad}
                  onError={handleVideoError}
                  onCanPlay={(e) => e.target.play().catch(console.error)}
                  disablePictureInPicture
                  poster={getPosterSrc((currentIndex % totalVideos) + 1)}
                  src={getVideoSrc((currentIndex % totalVideos) + 1)}
                >
                  
                </video>
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            loop
            muted
            playsInline
            preload={isLowPerformance ? "metadata" : "auto"}
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover will-change-transform"
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={(e) => e.target.play().catch(console.error)}
            disablePictureInPicture
            poster={getPosterSrc(currentIndex)}
          >
            <source src={getVideoSrc(currentIndex)} type="video/mp4" />
          </video>

          <video
            ref={backgroundVdRef}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute left-0 top-0 size-full object-cover will-change-transform"
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={(e) => e.target.play().catch(console.error)}
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