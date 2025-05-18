import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const Glance = () => {
    const [isHovering, setIsHovering] = useState(false);
    const cardRefs = useRef([]);


    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };


    const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
        const rect = currentTarget.getBoundingClientRect();

        const xOffset = clientX - (rect.left + rect.width / 2);
        const yOffset = clientY - (rect.top + rect.height / 2);

        if (isHovering) {

            gsap.to(currentTarget, {
                x: xOffset * 0.1,
                y: yOffset * 0.1,
                rotationY: xOffset / 15,
                rotationX: -yOffset / 15,
                transformPerspective: 600,
                duration: 0.6,
                ease: "power1.out",
            });


            // const content = currentTarget.querySelector('video, img'); 
            // if (content) {
            //     gsap.to(content, {
            //         x: -xOffset * 0.1, 
            //         y: -yOffset * 0.1, 
            //         duration: 0.6, 
            //         ease: "power1.out",
            //     });
            // }
        }
    };


    useEffect(() => {
        if (!isHovering) {
            cardRefs.current.forEach(card => {
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.6,
                    ease: "power1.out",
                });

                const content = card.querySelector('video, img');
                if (content) {
                    gsap.to(content, {
                        x: 0,
                        y: 0,
                        duration: 0.6,
                        ease: "power1.out",
                    });
                }
            });
        }
    }, [isHovering]);

    return (
    <section className='min-h-screen bg-black text-violet-100 p-5 md:p-10 space-y-10'>
        <h3 className='uppercase font-general text-xs pt-10'></h3>
        <h1 className='plain-heading special-font md:text-[10rem] text-5xl max-w-5xl md:leading-[8rem]'>
            K<b>a</b>z<b>a</b>ncın Ye<b>n</b>i A<b>d</b>resi!<br />Sür<b>a</b>tBet
        </h1>

        <div className='flex flex-col md:flex-row gap-10'>
            {/* Left 2 Cards */}
            <div className='flex flex-col w-full gap-10 items-end mt-28'>

                {/* Card 1 */}
                <div
                    ref={addToRefs}
                    className='flex border border-neutral-700 w-auto rounded-lg max-w-xl'
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className='p-5'>
                        <h2>Bonuslardan nasıl faydalanabilirim?</h2>
                        <h3 className='plain-heading special-font text-2xl md:text-1xl'>
                            Bonuslar otomatik olarak tanımlanmaz. Kampanyalardan faydalanmak için, hesabınıza giriş yaptıktan sonra Bonus Talep bölümünden ilgili bonusu seçmeniz gerekmektedir.
                            Dilerseniz canlı destek ekibinden de yardım alabilirsiniz.
                        </h3>
                    </div>
                    <div>
                        <video src='videos/card-1.webm' loop muted autoPlay className='h-auto' />
                    </div>
                </div>

                {/* Card 2 */}
                <div
  ref={addToRefs}
  className="flex flex-col justify-between border border-neutral-700 p-4 md:p-5 bg-yellow-300 rounded-lg w-full max-w-xl mx-auto
             h-auto md:h-[25rem]"
  onMouseMove={handleMouseMove}
  onMouseEnter={() => setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  <h1 className="plain-heading special-font text-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight md:leading-none">
    Mobilde oynayabilir miyim?
  </h1>
  <div className="mt-4 md:mt-6">
    <h3 className="text-black text-end font-semibold opacity-80 text-sm md:text-base lg:text-lg">
      Evet, tüm cihazlara uyumlu yapısıyla Süratbet’e cep telefonunuzdan veya tabletinizden sorunsuz şekilde erişebilirsiniz.
    </h3>
  </div>
</div>
            </div>

            {/* Right 2 Cards */}
            <div className='flex flex-col w-full gap-10 items-start'>

                {/* Card 3 */}
                <div
                    ref={addToRefs}
                    className='flex flex-col border border-neutral-700 bg-violet-300 rounded-lg'
                >
                    <div className='p-2 px-5'>
                        <div className='p-2'>
                            <h3 className='text-black text-start font-semibold opacity-70'>Hangi oyunları oynayabilirim?</h3>
                        </div>
                        <h1 className='plain-heading special-font text-black text-[2rem] md:text-[2rem] leading-none text-start '>
                            Spor bahisleri, canlı bahis, slot ve canlı casino gibi birçok farklı kategoriye erişebilirsiniz.
                        </h1>
                    </div>
                    <video src='videos/card-5.webm' loop muted autoPlay className='h-auto mx-14' />
                </div>

                {/* Card 4 */}
                <div
                    ref={addToRefs}
                    className='bg-violet-50 rounded-lg'
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    <div className='p-2'>
                        <div className='p-2'>
                            <h3 className='text-black text-start font-semibold opacity-70'>Canlı destek hizmetiniz hangi saatlerde aktif?</h3>
                        </div>
                        <h1 className='plain-heading special-font text-black text-[1rem] px-4 md:text-[rem] leading-none md:leading-[6rem] text-start '>
                            Canlı destek ekibimiz haftanın 7 günü, günün 24 saati kesintisiz hizmet vermektedir.
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
};

export default Glance;