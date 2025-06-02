import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TiLocationArrow } from "react-icons/ti";
import { useEffect, useRef, useState, useCallback } from "react";
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

  const getVideoSrc = (index) => {
    const basePath = isLowPerformance ? "videos/low-res/hero-" : "videos/hero-";
    return `${basePath}${index}.mp4`;
  };
  const getPosterSrc = (index) => `/img/hero-${index}.png`;

  const handleVideoLoad = (e) => {
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
        console.warn("Video loading timed out, showing fallback");
        setLoading(false);
        setVideoError(true);
      }
    }, 4000);

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleMiniVdClick = useCallback(() => {
    if (!hasClicked) {
      setHasClicked(true);
      setCurrentIndex((prev) => (prev % totalVideos) + 1);
      if (nextVdRef.current) {
        nextVdRef.current.src = getVideoSrc(currentIndex % totalVideos + 1);
        nextVdRef.current.load();
        nextVdRef.current.play().catch((err) => console.error("Next video play error:", err));
      }
      if (backgroundVdRef.current) {
        backgroundVdRef.current.src = getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex);
        backgroundVdRef.current.load();
        setTimeout(() => {
          backgroundVdRef.current.play().catch((err) => console.error("Background video play error:", err));
        }, 100);
      }
    }
  }, [hasClicked, currentIndex]);

  useEffect(() => {
    if (hasClicked) {
      const timer = setTimeout(() => setHasClicked(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [hasClicked]);

  useEffect(() => {
    const preloadNextVideo = () => {
      const nextIndex = (currentIndex % totalVideos) + 1;
      const nextVideo = document.createElement("video");
      nextVideo.src = getVideoSrc(nextIndex);
      nextVideo.preload = "auto";
      nextVideo.load();
    };

    if (!loading && backgroundVdRef.current) {
      preloadNextVideo();
    }
  }, [currentIndex, loading]);

  useGSAP(() => {
    if (hasClicked && nextVdRef.current) {
      const tl = gsap.timeline();
      tl.set("#next-video", { visibility: "visible", opacity: 0 })
        .to("#next-video", {
          opacity: 1,
          duration: isLowPerformance ? 0.3 : 0.5,
          ease: "power1.inOut",
          onStart: () => {
            if (nextVdRef.current) {
              nextVdRef.current.play().catch((err) => console.error("Next video play error:", err));
            }
          },
        })
        .to("#current-video", {
          opacity: 0,
          duration: isLowPerformance ? 0.3 : 0.5,
          ease: "power1.inOut",
        });
    }
  }, { dependencies: [currentIndex, hasClicked], revertOnUpdate: true });

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
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  id="current-video"
                  className="size-64 origin-center scale-150 object-cover opacity-0"
                  onLoadedMetadata={handleVideoLoad}
                  onError={handleVideoError}
                  onCanPlay={(e) => {
                    e.target.classList.remove("opacity-0");
                    e.target.play().catch(console.error);
                  }}
                  disablePictureInPicture
                  poster={getPosterSrc((currentIndex % totalVideos) + 1)}
                >
                  <source src={getVideoSrc((currentIndex % totalVideos) + 1)} type="video/mp4" />
                </video>
              </div>
            </VideoPreview>
          </div>

          <video
            ref={nextVdRef}
            loop
            muted
            playsInline
            preload="metadata"
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover will-change-transform opacity-0"
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={(e) => {
              e.target.classList.remove("opacity-0");
              e.target.play().catch(console.error);
            }}
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
            className="absolute left-0 top-0 size-full object-cover will-change-transform opacity-0"
            onLoadedMetadata={handleVideoLoad}
            onError={handleVideoError}
            onCanPlay={(e) => {
              e.target.classList.remove("opacity-0");
              e.target.play().catch(console.error);
            }}
            disablePictureInPicture
            poster={getPosterSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
          >
            <source src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)} type="video/mp4" />
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