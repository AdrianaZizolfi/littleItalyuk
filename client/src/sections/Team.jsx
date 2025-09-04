import { useGSAP } from "@gsap/react";
import { useTranslation } from 'react-i18next';
import TitleHeader from "../components/TitleHeader";
import { teamImgs, collabImgs } from "../constants";
import { gsap } from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const { t } = useTranslation();

  useGSAP(() => {
    // Scroll animation
    gsap.fromTo(
      ".team-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#team",
          start: "top center",
        },
      }
    );

    // Hover effect
    document.querySelectorAll(".team-card").forEach(card => {
      const img = card.querySelector("img");
      const desc = card.querySelector(".team-description");

      card.addEventListener("mouseenter", () => {
        gsap.to(img, { opacity: 0, duration: 0.4, ease: "power2.out" });
        gsap.to(desc, { opacity: 1, duration: 0.4, ease: "power2.out" });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(img, { opacity: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(desc, { opacity: 0, duration: 0.4, ease: "power2.out" });
      });
    });
  });

  return (
    <div id="team" className="flex flex-col items-center section-padding bg-gradient-to-br from-green-100 via-white to-red-100">
      
      {/* Fondatori Section */}
      <div className="w-full h-full p-10 md:px-10 px-5 flex flex-col items-center">
        <TitleHeader title={t("Fondatori")} />

        <div className="flex flex-wrap justify-center gap-12 mt-8">
          {teamImgs.map((icon) => (
            <div key={icon.name} className="card-border team-card overflow-hidden group xl:rounded-full rounded-lg w-56">
              <div className="team-card-animated-bg" />
              <div className="team-card-content flex flex-col items-center">
                <div className="tech-icon-wrapper">
                  <img src={icon.imgPath} alt={icon.name} className="xl:rounded-full" />
                  <div className="team-description absolute inset-0 flex items-center justify-center p-4 text-center bg-white/80 opacity-0">
                    <p className="text-gray-800 text-sm">{t(icon.descriptionKey)}</p>
                  </div>
                </div>
                <div className="padding-x w-full text-center">
                  <p className="font-semibold">{icon.name}</p>
                  <p className="text-xs text-gray-500 break-words whitespace-normal max-w-[60%] mx-auto">
                    {t(icon.roleKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaboratori Section */}
      <div className="w-full h-full p-10 md:px-10 px-5">
        <TitleHeader title={t("Collaboratori")} />

        <div className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6
          lg:flex lg:flex-wrap lg:justify-center lg:gap-10
        ">
          {collabImgs.map((icon) => (
            <div key={`${icon.name}-collab`} className="card-border team-card overflow-hidden group xl:rounded-full rounded-lg">
              <div className="team-card-animated-bg" />
              <div className="team-card-content">
                <div className="tech-icon-wrapper">
                  <img src={icon.imgPath} className="xl:rounded-full" />
                  <div className="team-description absolute inset-0 flex items-center justify-center p-4 text-center bg-white/80 opacity-0">
                    <p className="text-gray-800 text-sm">{t(icon.descriptionKey)}</p>
                  </div>
                </div>
                <div className="padding-x w-full text-center">
                  <p className="font-semibold">{icon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Team;
