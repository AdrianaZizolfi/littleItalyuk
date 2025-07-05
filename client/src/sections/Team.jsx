import { useGSAP } from "@gsap/react";
import TitleHeader from "../components/TitleHeader";
import { teamImgs } from "../constants";
import { gsap } from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
    // Animate the tech cards in the skills section
    useGSAP(() => {
      // This animation is triggered when the user scrolls to the #skills wrapper
      // The animation starts when the top of the wrapper is at the center of the screen
      // The animation is staggered, meaning each card will animate in sequence
      // The animation ease is set to "power2.inOut", which is a slow-in fast-out ease
      gsap.fromTo(
        ".team-card",
        {
          // Initial values
          y: 50, // Move the cards down by 50px
          opacity: 0, // Set the opacity to 0
        },
        {
          // Final values
          y: 0, // Move the cards back to the top
          opacity: 1, // Set the opacity to 1
          duration: 1, // Duration of the animation
          ease: "power2.inOut", // Ease of the animation
          stagger: 0.2, // Stagger the animation by 0.2 seconds
          scrollTrigger: {
            trigger: "#team", // Trigger the animation when the user scrolls to the #skills wrapper
            start: "top center", // Start the animation when the top of the wrapper is at the center of the screen
          },
        }
      );
    });
  return (
    <div id='team' className='flex-center section-padding bg-gradient-to-br from-green-100 via-white to-red-100'>
        <div className='w-full h-full p-10 md:px-10 px-5'>
            <TitleHeader 
            title="Il Team"
            
            />

            <div className='tech-grid'>
            {teamImgs.map((icon) =>
            <div key={icon.name} className="card-border team-card overflow-hidden group xl:rounded-full rounded-lg">
                <div className="team-card-animated-bg"/>
                <div className="team-card-content">
                    <div className="tech-icon-wrapper">
                     <img src={icon.imgPath} className="xl:rounded-full"/>  
                    </div>
                    <div className="padding-x w-full">
                        <p>{icon.name}</p>
                    </div>
                </div>
            </div>
            )}
            </div>
        </div>
      
    </div>
  )
}

export default Team
