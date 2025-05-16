import { useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientX - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = (e) => {
    setTransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>
      </div>
      {title}
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-blue-50 pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <img src="/img/SuratLogo.png" alt="logo" className="w-60" />
          <p className="max-w-md font-circular-web text-lg text-white-75 opacity-50">
            Süratbet, spor bahisleri ve canlı casino alanında güvenilir hizmet
            sunmak üzere kurulmuş modern bir oyun platformudur. Betco altyapısı
            ile donatılmış sistemi ve Tobuque lisansı sayesinde kullanıcılarına
            yasal, hızlı ve kesintisiz bir bahis deneyimi sunar. Zengin oyun
            seçenekleri, avantajlı kampanyalar, kullanıcı dostu ara yüzü ve 7/24
            canlı destek ekibiyle fark yaratan bir deneyim sunar.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/feature-1.mp4"
            title={
              <>
                Süratbet’e nasıl üye olabilirim?
              </>
            }
            description="Ana sayfanın sağ üst köşesindeki butonuna tıklayarak üyelik işleminizi başlatabilirsiniz. Açılan formda ad, soyad, doğum tarihi, T.C. kimlik numarası, cep telefonu, kullanıcı adı, e-posta adresi ve şifre gibi temel bilgileri eksiksiz şekilde doldurmanız gerekir. Kayıt işlemi tamamlandıktan sonra hesabınız anında aktif hale gelir ve platformu kullanmaya başlayabilirsiniz."
          />
        </BentoTilt>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:grid-rows-4">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  Yatırım işlemleri ne kadar sürede tamamlanır?
                </>
              }
              description="Tüm yatırım yöntemleri anlık olarak işlenir. İşlem süresi genellikle 1 dakikadan kısa sürer."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  Çekim işlemleri ne kadar sürede sonuçlanır?
                </>
              }
              description="Çekim talepleriniz, onay sonrası ortalama 15-30 dakika içinde tamamlanır.
Yoğunluk durumuna göre bu süre değişebilir."
            />
          </BentoTilt>
          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  Hangi yöntemlerle yatırım yapabilirim?
                </>
              }
              description="Banka havalesi, Papara, Mefete, Kripto ve birçok güncel ödeme seçeneğiyle yatırım yapılabilir."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={
                <>
                  Bonuslardan nasıl faydalanabilirim?
                </>
              }
              description="Bonuslar otomatik olarak tanımlanmaz. Kampanyalardan faydalanmak için, hesabınıza giriş yaptıktan sonra Bonus Talep bölümünden ilgili bonusu seçmeniz gerekmektedir.
Dilerseniz canlı destek ekibinden de yardım alabilirsiniz."
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-5.mp4"
              title={
                <>
                  Mobilde oynayabilir miyim?
                </>
              }
              description="Evet, tüm cihazlara uyumlu yapısıyla Süratbet’e cep telefonunuzdan veya tabletinizden sorunsuz şekilde erişebilirsiniz."
            />
          </BentoTilt>
           <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-2.mp4"
              title={
                <>
                  Hangi oyunları oynayabilirim?
                </>
              }
              description="Spor bahisleri, canlı bahis, slot ve canlı casino gibi birçok farklı kategoriye erişebilirsiniz."
            />
          </BentoTilt>


          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={
                <>
                  Canlı destek hizmetiniz hangi saatlerde aktif?
                </>
              }
              description="Canlı destek ekibimiz haftanın 7 günü, günün 24 saati kesintisiz hizmet vermektedir."
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
