import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 sm:translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 md:left-auto md:right-10 lg:top-20 lg:w-80 max-sm:top-1/2 max-sm:right-0 max-sm:scale-[60%] max-sm:-translate-y-48">
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase"></p>

          <AnimatedTitle
            title="su<b>a</b>rt<b>b</b>et"
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="GÜNCEL SİTE"
            containerClass="mt-10 cursor-pointer"
            onClick={() => window.open("https://www.suratbet234.com/tr/", "_blank")}
          />

          {/* Second image for mobile view */}
          <div className="mt-6 block sm:hidden">
            <ImageClipBox
              src="/img/contact-2.webp"
              clipClass="contact-clip-path-2 max-sm:w-60 max-sm:mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;