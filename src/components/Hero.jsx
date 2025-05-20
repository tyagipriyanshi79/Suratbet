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

  const totalVideos = 4;

  const nextVdRef = useRef(null);
  const backgroundVdRef = useRef(null);

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalVideos - 1) {
        setLoading(false);
      }
      return newCount;
    });
  };

  const handleVideoError = (e) => {
    console.error("Video failed to load:", e);
    // Retry loading after a delay
    setTimeout(() => {
      if (e.target) {
        e.target.load();
      }
    }, 2000);
  };

  useEffect(() => {
    // Detect low-performance devices
    const isOlderDevice = navigator.hardwareConcurrency
      ? navigator.hardwareConcurrency <= 2
      : false;
    setIsLowPerformance(isOlderDevice);
  }, []);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % totalVideos) + 1);
    // Reload the next video with the new source
    if (nextVdRef.current) {
      nextVdRef.current.load();
      nextVdRef.current.play().catch((err) => console.error("Play error:", err));
    }
  };

  // Ensure background video plays after loading
  useEffect(() => {
    if (backgroundVdRef.current) {
      backgroundVdRef.current.play().catch((err) => {
        console.error("Background video playback error:", err);
      });
    }
  }, []);

  // Animate video on index change
  useGSAP(
    () => {
      if (hasClicked && nextVdRef.current) {
        const tl = gsap.timeline();
        tl.set("#next-video", { visibility: "visible" })
          .to("#next-video", {
            scale: 1,
            width: "100%",
            height: "100%",
            duration: isLowPerformance ? 0.4 : 0.6,
            ease: "power1.inOut",
            onStart: () => {
              nextVdRef.current.play().catch((err) => console.error("Play error:", err));
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
        {loading && (
          <img
            src="/img/contact-2.webp"
            alt="fallback background"
            className="absolute left-0 top-0 size-full object-cover z-0"
            decoding="async"
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
                  loop
                  muted
                  playsInline
                  preload={isLowPerformance ? "none" : "metadata"}
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover"
                  onLoadedMetadata={handleVideoLoad}
                  onError={handleVideoError}
                  onCanPlay={(e) => e.target.play().catch(console.error)}
                  disablePictureInPicture
                  poster="/img/contact-2.webp"
                >
                  <source
                    src={getVideoSrc((currentIndex % totalVideos) + 1)}
                    type="video/mp4"
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
            preload={isLowPerformance ? "none" : "metadata"}
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover will-change-transform"
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={(e) => e.target.play().catch(console.error)}
            disablePictureInPicture
            poster="/img/contact-2.webp"
          >
            <source src={getVideoSrc(currentIndex)} type="video/mp4" />
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
            onCanPlay={(e) => e.target.play().catch(console.error)}
            disablePictureInPicture
            poster="/img/contact-2.webp"
          >
            <source
              src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
              type="video/mp4"
            />
          </video>
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