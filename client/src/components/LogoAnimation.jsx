import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const LogoAnimation = () => {
  useGSAP(() => {
    gsap.to(".logo-1", {
      y: "-50%",
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".logo-2", {
      y: "50%",
      duration: 6,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".logo-3", {
      y: "-50%",
      duration: 8,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".logo-4", {
      y: "50%",
      duration: 8,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const renderRepeatedLogos = (className, imageSrc) => (
    <div className={`logo-strip ${className} absolute top-0 left-0 w-full flex flex-col gap-y-10`} 
    style={className === 'logo-2' || className === 'logo-4' ? { transform: 'translateY(-50%)' } : {}}>
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="logo-item w-24 h-24 md:w-32 md:h-32 flex items-center justify-center "
        >
          <img src={imageSrc} />
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="w-full h-full hover:cursor-grab rounded-3xl overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, #059447 0%, #ffffff 50%, #ED1E24 100%)",
        minHeight: "384px",
      }}
    >
      <div className="flex justify-center items-center h-full gap-4 md:gap-7">
        <div className="logo-track relative w-32 h-full overflow-hidden">
          {renderRepeatedLogos("logo-1", "/images/can.png")}
        </div>

        <div className="logo-track relative w-32 h-full overflow-hidden">
          {renderRepeatedLogos("logo-2", "/images/place.png")}
        </div>

        <div className="logo-track relative w-32 h-full overflow-hidden">
          {renderRepeatedLogos("logo-3", "/images/pizza.png")}
        </div>

        <div className="logo-track relative w-32 h-full overflow-hidden">
          {renderRepeatedLogos("logo-4", "/images/vespa.png")}
        </div>
      </div>
    </div>
  );
};

export default LogoAnimation;
