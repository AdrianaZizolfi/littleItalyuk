import React from 'react'

const About = () => {
  return (
    <div id='about'
    className="flex flex-col lg:flex-row items-center gap-8 p-8 max-w-6xl mx-auto">
      {/* Left column - 1/3 width with animated image */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <div className="relative">
          <div className="floating-container">
            <img 
              src="/images/little_italy_logo3.png"
              alt="About us" 
              className="w-72 h-72 rounded-full object-cover shadow-lg transition-all duration-300 transform hover:scale-105"
            />
          </div>
          <style jsx>{`
            .floating-container {
              animation: float 5.5s ease-in-out infinite;
            }
            
            @keyframes float {
              0%, 100% {
                transform: translateY(0px) rotate(0deg);
              }
              25% {
                transform: translateY(-10px) rotate(1deg);
              }
              50% {
                transform: translateY(-5px) rotate(0deg);
              }
              75% {
                transform: translateY(-15px) rotate(-1deg);
              }
            }
          `}</style>
        </div>
      </div>
      
      {/* Right column - 2/3 width with text content */}
      <div className="w-full lg:w-2/3 space-y-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-green-100 mb-4">
          Chi Siamo
        </h1>
        
        <p className="text-lg text-gray-600 leading-relaxed">
        Siamo una comunita' di italiani a Londra che ha voglia di ritrovarsi, conoscersi e far vivere la nostra cultura anche lontano da casa.
Non siamo event planners, ma crediamo che incontrarsi, davanti a un caffe`, durante un aperitivo o a un talk interessante, sia il modo più naturale per creare connessioni vere tra persone con interessi simili.
        </p>
        
        <p className="text-lg text-gray-600 leading-relaxed">
        Il nostro obiettivo e` costruire uno spazio aperto, dove chiunque condivida l'amore per l'Italia possa sentirsi parte di qualcosa.
        Organizziamo eventi gratuiti che diventano occasioni per fare networking, condividere idee, e magari trovare nuovi amici con cui sentirsi meno stranieri in citta`.
        </p>
        
        
      </div>
    </div>
  )
}

export default About