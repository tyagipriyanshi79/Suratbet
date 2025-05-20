import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import gsap from "gsap";

const navItems = [
  { label: "Anasayfa", href: "hero" },
  { label: "Hakkımızda", href: "story" },
  { label: "S.S.S", href: "features" },
  { label: "İLETİŞİM", href: "footer" },
];

const Navbar = () => {
  const [isAudioPlaying, setisAudioPlaying] = useState(false);
  const [isIndicatorActive, setisIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
    });
  }, [isNavVisible]);

  const toggleAudioIndicator = () => {
    setisAudioPlaying((prev) => !prev);
    setisIndicatorActive((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    gsap.to(mobileMenuRef.current, {
      x: !isMenuOpen ? 0 : "100%",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img src="/img/logo.png" alt="logo" className="w-10" />
              <Button
                id="product-button"
                title="Giris"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
                onClick={() =>
                  window.open("https://www.suratbet234.com/tr/", "_blank")
                }
              />
              <Button
                id="mobile-product-button"
                title="Giris"
                rightIcon={<TiLocationArrow />}
                containerClass="bg-blue-50 md:hidden flex items-center justify-center gap-1 text-sm px-3 py-1"
                onClick={() =>
                  window.open("https://www.suratbet234.com/tr/", "_blank")
                }
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.href}`}
                  className="nav-hover-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById(item.href);
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {item.label}
                </a>
              ))}

              {/* Audio Button */}
              <button
                className="ml-10 flex items-center space-x-0.5"
                onClick={toggleAudioIndicator}
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`indicator-line ${
                      isIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))}
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button onClick={toggleMenu}>
                <GiHamburgerMenu className="text-white text-2xl" />
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 z-50 h-full w-72 translate-x-full bg-[#00aeef] text-white shadow-lg transition-transform duration-300"
      >
        <div className="flex justify-between items-center p-5">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={toggleMenu}>
            <IoClose className="text-2xl" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 px-6">
          {navItems.map((item, index) => (
            <li key={index} className="border-b border-white py-3">
              <a
                href={`#${item.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById(item.href);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                    toggleMenu();
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;