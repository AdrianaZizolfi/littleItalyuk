import Button from "../components/Button.jsx";
import { words } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

const Hero = () => {
  const { t } = useTranslation();

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
  });

  return (
    <section id="hero" className="relative overflow-hidden min-h-screen">
      <div className='hero-layout'>
        {/* LEFT: Hero Content */}
        <div className="hero-content">
          <header className="flex flex-col justify-center h-full px-5 md:px-12 lg:px-20">
            <div className="flex flex-col gap-7">
              <div className="hero-text">
                <h1>
                  {t("hero_heading_prefix")}
                  <span className="slide sm:h-[1.1em] max-sm:h-4">
                    <span className="wrapper ">
                      {words.map((word, index) => (
                          <span
                            key={index}
                            className="flex items-center md:gap-3 gap-1 pb-2"
                          >
                            <img
                              src={word.imgPath}
                              alt={t(word.text)} // translate alt text too
                              className="xl:size-14 md:size-12 size-7 md:p-2 p-0 rounded-full bg-white"
                            />
                            <span>{t(word.text)}</span> {/* translate displayed text */}
                          </span>
                        ))}
                    </span>
                  </span>
                </h1>
                
                <h1>{t("hero_heading_suffix2")}</h1>
              </div>

              <p className="text-blue-100 md:text-lg relative z-10 pointer-events-none">
                {t("hero_paragraph")}
              </p>

              <Button
                text={t("hero_button")}
                className="md:w-80 md:h-16 w-60 h-12"
                id="contatti"
              />
            </div>
          </header>
        </div>

        {/* RIGHT: Image */}
        <div className="hero-image">
          <img 
            src="/images/wallpaper1.png" 
            alt="Hero Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
