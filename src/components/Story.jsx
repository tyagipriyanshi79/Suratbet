import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";
import ModelViewer from "./ModelViewer";

const Story = () => {
  const frameRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  const handleMouseLeave = () => {
    const element = frameRef.current;

    if (element) {
      gsap.to(element, {
        duration: 0.3,
        rotateX: 0,
        rotateY: 0,
        ease: "power1.inOut",
      });
    }
  };

  return (
    <div id="story" className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        {/* Title */}
        <AnimatedTitle
          title="H<b>a</b>kkımızd<b>a</b>"
          containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
        />

        {/* 3D Model Viewer */}
        <div className="story-img-container relative w-full">
          <div className="mt-10 flex justify-center w-full">
            <ModelViewer
              frameRef={frameRef}
              handleMouseMove={handleMouseMove}
              handleMouseLeave={handleMouseLeave}
            />
          </div>

          {/* Invisible SVG Filter */}
          <svg
            className="invisible absolute size-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="flt_tag">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="8"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="flt_tag"
                />
                <feComposite
                  in="SourceGraphic"
                  in2="flt_tag"
                  operator="atop"
                />
              </filter>
            </defs>
          </svg>
        </div>

        {/* Paragraphs Section */}
        <div className="mt-24 flex w-full justify-center md:mt-32">
  <div className="flex w-full max-w-6xl flex-col px-4 md:flex-row md:items-start md:justify-between md:gap-x-16">
    {/* Left Column */}
    <div className="w-full md:w-1/2 mt-10 md:mt-20">
      <p className="text-left font-circular-web text-violet-50">
        <strong>Süratbet Hakkında</strong>
        <br />
        Süratbet, online bahis ve casino sektöründe kullanıcılarına güvenli, hızlı ve avantajlarla dolu bir oyun deneyimi sunmak amacıyla kurulmuştur.
        Platformumuz, güçlü ve stabil Betco altyapısıyla çalışmakta olup, yüksek performanslı erişim ve sorunsuz oyun keyfi sağlamaktadır.
        Tobuque lisansı ile yasal çerçevede hizmet veren Süratbet, oyuncularına adil, şeffaf ve sürdürülebilir bir oyun ortamı sunmayı ilke edinmiştir.
      </p>
    </div>

    {/* Right Column */}
    <div className="w-full md:w-1/2 mt-10 md:mt-20">
      <p className="text-left font-circular-web text-violet-50">
        <strong>Sunduğumuz Ayrıcalıklar</strong>
        <br />
        • Güvenli ve hızlı ödeme sistemleri
        <br />
        • Düzenli olarak güncellenen bonus kampanyaları
        <br />
        • 7/24 aktif, Türkçe canlı destek hizmeti
        <br />
        • Mobil uyumlu, sade ve kullanıcı dostu arayüz
        <br />
        • Spor bahisleri, canlı bahis, slot, canlı casino ve daha fazlasını içeren geniş oyun yelpazesi
        <br />
        <br />
        Süratbet olarak hedefimiz; sadece oyun sunmak değil, aynı zamanda kullanıcılarımıza kazandıran,
        destekleyen ve keyifli bir ortam sağlamaktır. Gerçek kazanç, güçlü altyapı ve dürüst hizmet anlayışıyla Süratbet farkını şimdi sen de keşfet.
      </p>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default Story;
