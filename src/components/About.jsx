import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.1, // Reduced scrub for smoother mobile performance
                pin: true,
                pinSpacing: true,
            },
        });

        clipAnimation.to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
            ease: "power1.inOut", // Added easing for smoother transitions
            duration: 1, // Explicit duration for consistent timing
        });
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
                <p className="font-general text-sm uppercase md:text-[10px]">
                    suratbet
                </p>

                <AnimatedTitle
                    title="K<b>a</b>z<b>a</b>ncın Ye<b>n</b>i <b>A</b>dresi! <br /> Sur<b>a</b>tBet"
                    containerClass="mt-5 !text-black text-center"
                />
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image relative will-change-transform">
                    <img
                        src="img/about.webp"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"
                        decoding="async" // Optimize image decoding for mobile
                        loading="lazy" // Lazy load to improve performance
                    />
                </div>
            </div>
        </div>
    );
};

export default About;