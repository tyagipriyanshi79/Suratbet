import gsap from "gsap";
import { useRef } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

const Story = () => {
  return (
    <div id="story" className="min-h-screen w-screen bg-black text-blue-50">
      <div className="flex size-full flex-col items-center py-6 sm:py-8">
        {/* Title */}
        <AnimatedTitle
          title="H<b>a</b>kkımızd<b>a</b>"
          containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
        />

        {/* Video Player */}
        <div className="story-img-container story-img-container-tight relative w-full mb-10 sm:mb-12">
          <div className="flex justify-center w-full">
            <video
              className="w-full max-w-[240px] sm:max-w-xl h-auto object-cover"
              src="videos/sonic.mp4" // Replace with your video file path
              autoPlay
              loop
              muted
              playsInline
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
        <div className="flex w-full justify-center mt-4 sm:mt-6 pt-6 sm:pt-0 relative z-10">
          <div className="flex w-full max-w-6xl flex-col px-4 sm:px-6 md:flex-row md:items-start md:justify-between md:gap-x-16">
            {/* Left Column */}
            <div className="w-full md:w-1/2 mt-4 sm:mt-6">
              <p className="text-left font-circular-web text-violet-50">
                <strong>Süratbet Hakkında</strong>
                <br />
                Süratbet, online bahis ve casino sektöründe kullanıcılarına
                güvenli, hızlı ve avantajlarla dolu bir oyun deneyimi sunmak
                amacıyla kurulmuştur. Platformumuz, güçlü ve stabil Betco
                altyapısıyla çalışmakta olup, yüksek performanslı erişim ve
                sorunsuz oyun keyfi sağlamaktadır. Tobuque lisansı ile yasal
                çerçevede hizmet veren Süratbet, oyuncularına adil, şeffaf ve
                sürdürülebilir bir oyun ortamı sunmayı ilke edinmiştir.
              </p>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 mt-4 sm:mt-6">
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
                • Spor bahisleri, canlı bahis, slot, canlı casino ve daha
                fazlasını içeren geniş oyun yelpazesi
                <br />
                <br />
                Süratbet olarak hedefimiz; sadece oyun sunmak değil, aynı
                zamanda kullanıcılarımıza kazandıran, destekleyen ve keyifli bir
                ortam sağlamaktır. Gerçek kazanç, güçlü altyapı ve dürüst hizmet
                anlayışıyla Süratbet farkını şimdi sen de keşfet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;