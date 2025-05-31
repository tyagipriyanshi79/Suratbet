import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

// Error Boundary Component to prevent app crash
const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const errorHandler = (error) => {
            console.error("Error in component:", error);
            setHasError(true);
        };
        window.addEventListener('error', errorHandler);
        return () => window.removeEventListener('error', errorHandler);
    }, []);

    if (hasError) {
        return <div>Error loading component. Please check the console for details.</div>;
    }
    return children;
};

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const [videoError, setVideoError] = useState(false);
    const hoverButtonRef = useRef(null);
    const videoRef = useRef(null);
    const cardRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    const autoPlay = () => {
        if (videoRef.current) {
            videoRef.current.play().catch((err) => {
                console.error("Video playback error:", err);
                setVideoError(true);
            });
        }
    };

    const pause = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleVideoError = (err) => {
        console.error("Error loading video:", err);
        setVideoError(true);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        autoPlay();
                    } else {
                        pause();
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of the card is visible
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative size-full overflow-hidden rounded-md"
        >
            {videoError ? (
                <div className="absolute left-0 top-0 size-full bg-gray-500 flex items-center justify-center text-white">
                    Video failed to load
                </div>
            ) : (
                <video
                    ref={videoRef}
                    src={src}
                    loop
                    muted
                    playsInline
                    webkit-playsinline="true"
                    preload="auto"
                    className="absolute left-0 top-0 size-full object-cover object-center pointer-events-none"
                    style={{ borderRadius: 'inherit' }}
                    onError={handleVideoError}
                />
            )}
            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features = () => (
    <ErrorBoundary>
        <section id="features" className="bg-black pb-52">
            <div className="container mx-auto px-3 md:px-10">
                <div className="px-5 py-32">
                    <img
                        src="/img/logo.png"
                        alt="logo"
                        className="w-10"
                        onError={(e) => {
                            console.error("Error loading logo image");
                            e.target.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="; // Fallback to transparent 1x1 pixel
                        }}
                    />
                    <p className="font-circular-web text-lg text-blue-50 opacity-50">
                        Süratbet'te Bonuslar Kademeli, Kazançlar Süratli! %300 hoş geldin bonusu, 333 freespin ve %100 risksiz slotla oyuna güçlü bir giriş yap! Kayıp mı yaşadın? Sorun değil! Aldığın kayıp bonusunun bile %50’si kadar ekstra bonus kazanma şansın var. Sürat Prime ayrıcalıkları, doğum günü sürprizleri, çevrimsiz spor bonusları ve anlık kazanç destekleriyle her anın dolu dolu geçecek. Süratbet’te kazandıran sistem hep yanında!
                    </p>
                </div>

                <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                    <BentoCard
                        src="videos/feature-1.mp4"
                        title={
                            <>
                                Sür<b>a</b>tbet’e n<b>a</b>sıl üye ol<b>a</b>bilirim?
                            </>
                        }
                        description="Ana sayfanın sağ üst köşesindeki butonuna tıklayarak üyelik işleminizi başlatabilirsiniz. Açılan formda ad, soyad, doğum tarihi, T.C. kimlik numarası, cep telefonu, kullanıcı adı, e-posta adresi ve şifre gibi temel bilgileri eksiksiz şekilde doldurmanız gerekir. Kayıt işlemi tamamlandıktan sonra hesabınız anında aktif hale gelir ve platformu kullanmaya başlayabilirsiniz."
                    />
                </BentoTilt>

                <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
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
                            description="Çekim talepleriniz, onay sonrası ortalama 15-30 dakika içinde tamamlanır. Yoğunluk durumuna göre bu süre değişebilir."
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

                    <BentoTilt className="bento-tilt_2">
                        <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
                            <h1 className="bento-title special-font max-w-64 text-black">
                                Kazancın Yeni Adresi! SüratBet
                            </h1>
                            <TiLocationArrow className="m-5 scale-[5] self-end" />
                        </div>
                    </BentoTilt>

                    <BentoTilt className="bento-tilt_2">
                        <img
                            src="/img/suratlogo.png"
                            alt="SüratBet Logo"
                            onError={(e) => {
                                console.error("Error loading SuratBet logo image");
                                e.target.src = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="; // Fallback to transparent 1x1 pixel
                            }}
                        />
                    </BentoTilt>
                </div>
            </div>
        </section>
    </ErrorBoundary>
);

export default Features;