import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <div className="text-center">
        {/* Main animated text */}
        <div className="relative">
          <h1 className="text-5xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-100 via-white to-red-100 animate-pulse">
            Coming Soon
          </h1>
          
          {/* Animated dots */}
          <div className="inline-flex ml-2">
            <span className="text-6xl md:text-8xl font-bold text-green-100 animate-bounce animation-delay-0">.</span>
            <span className="text-6xl md:text-8xl font-bold text-white animate-bounce animation-delay-200">.</span>
            <span className="text-6xl md:text-8xl font-bold text-red-100 animate-bounce animation-delay-400">.</span>
          </div>
        </div>
        
        {/* Subtitle with typing effect */}
        <div className="mt-8 overflow-hidden">
          <p className="text-xl md:text-2xl text-gray-600 animate-typing">
            Stiamo Preparando Qualcosa di Speciale!
          </p>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="floating-circle absolute top-1/4 left-1/4 w-4 h-4 bg-green-100 rounded-full opacity-60"></div>
          <div className="floating-circle absolute top-1/3 right-1/3 w-6 h-6 bg-red-100 rounded-full opacity-40 animation-delay-1000"></div>
          <div className="floating-circle absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-100 rounded-full opacity-50 animation-delay-2000"></div>
          <div className="floating-circle absolute bottom-1/3 right-1/4 w-5 h-5 bg-white rounded-full opacity-30 animation-delay-3000"></div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes typing {
          0% { width: 0; }
          50% { width: 100%; }
          100% { width: 100%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        
        .animate-typing {
          animation: typing 3s steps(30) infinite;
          white-space: nowrap;
          overflow: hidden;
          border-right: 2px solid transparent;
        }
        
        .floating-circle {
          animation: float 6s ease-in-out infinite;
        }
        
        .animation-delay-0 { animation-delay: 0s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </div>
  );
};

export default ComingSoon;