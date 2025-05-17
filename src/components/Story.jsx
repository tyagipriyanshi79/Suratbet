import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import gsap from "gsap";
import RoundedCorners from "./RoundedCorners";
import Button from "./Button";

const Story = () => {
  const frameRef = useRef(null);

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

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };

  return (
    <section id="story" className="min-h-dvh w-screen bg-black">
      <div className="flex size-full flex-col items-center py-10 pb-24">
        <div className="relaative size-full">
          <AnimatedTitle
            title="HAKKIMIZDA"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />
          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/img/entrance.webp"
                  alt="entrance"
                  className="object-contain"
                />
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>

        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:justify-center">
  <div className="flex w-full max-w-6xl flex-col px-4 md:flex-row md:items-start md:justify-between md:gap-x-16">
    
    {/* Left Paragraph - Slightly Down */}
    <div className="w-full md:w-1/2 mt-10 md:mt-20">
      <p className="text-left font-circular-web text-violet-50">
        <strong>Süratbet Hakkında</strong>
        <br />
        Süratbet, online bahis ve casino sektöründe kullanıcılarına güvenli, hızlı ve avantajlarla dolu bir oyun deneyimi sunmak amacıyla kurulmuştur. Platformumuz, güçlü ve stabil Betco altyapısıyla çalışmakta olup, yüksek performanslı erişim ve sorunsuz oyun keyfi sağlamaktadır. Tobuque lisansı ile yasal çerçevede hizmet veren Süratbet, oyuncularına adil, şeffaf ve sürdürülebilir bir oyun ortamı sunmayı ilke edinmiştir.
      </p>
    </div>

    {/* Right Paragraph - On Right Side with Gap */}
    <div className="w-full md:w-1/2">
      <p className="text-left font-circular-web text-violet-50">
        <strong>Sunduğumuz Ayrıcalıklar</strong>
        <br />
        • Güvenli ve hızlı ödeme sistemleri<br />
        • Düzenli olarak güncellenen bonus kampanyaları<br />
        • 7/24 aktif, Türkçe canlı destek hizmeti<br />
        • Mobil uyumlu, sade ve kullanıcı dostu arayüz<br />
        • Spor bahisleri, canlı bahis, slot, canlı casino ve daha fazlasını içeren geniş oyun yelpazesi
        <br /><br />
        Süratbet olarak hedefimiz; sadece oyun sunmak değil, aynı zamanda kullanıcılarımıza kazandıran, destekleyen ve keyifli bir ortam sağlamaktır. Gerçek kazanç, güçlü altyapı ve dürüst hizmet anlayışıyla Süratbet farkını şimdi sen de keşfet.
      </p>
    </div>

  </div>
</div>

      </div>
    </section>
  );
};

export default Story;
