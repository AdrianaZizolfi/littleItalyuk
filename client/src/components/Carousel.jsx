import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Sample images data - replace with your actual images
  const images = [
    {
      id: 1,
      src: "/images/DSC08055.jpg",
      title: "San Gennaro Fest 2024",
      alt: "San Gennaro Fest 2024"
    },
    {
      id: 2,
      src: "/images/DSC08190.jpg",
      title: "San Gennaro Fest 2024",
      alt: "San Gennaro Fest 2024"
    },
    {
      id: 3,
      src: "/images/DSC06808.jpg",
      title: "San Gennaro Fest 2024",
      alt: "San Gennaro Fest 2024"
    },
    {
      id: 4,
      src: "/images/IMG_1778.jpg",
      title: "Fashion Show 2024",
      alt: "Fashion Show 2024"
    },
    {
      id: 5,
      src: "/images/IMG_1642 (1).jpg",
      title: "Fashion Show 2024",
      alt: "Fashion Show 2024"
    },
    {
      id: 6,
      src: "/images/_LE_1884.jpg",
      title: "Fashion Show 2024",
      alt: "Fashion Show 2024"
    },
    {
      id: 7,
      src: "/images/IMG_1642 (1).jpg",
      title: "Fashion Show 2024",
      alt: "Fashion Show 2024"
    }
  ];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToSlide = (index) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const getPreviousIndex = () => {
    return (currentIndex - 1 + images.length) % images.length;
  };

  const getNextIndex = () => {
    return (currentIndex + 1) % images.length;
  };

  // Auto-play functionality (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div id='eventi' className="relative w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100 overflow-hidden">
      {/* Main Carousel Container */}
      <div className="relative w-full h-96 md:h-[500px] flex items-center justify-center px-4">
        
        {/* Background Images (Previous and Next) */}
        <div className="absolute inset-0 flex items-center justify-between px-8 md:px-16 lg:px-24">
          {/* Previous Image (Left) */}
          <div className="relative w-96 h-72 md:w-[600px] md:h-96 transform scale-75 transition-all duration-500 hover:opacity-60">
            <img
              src={images[getPreviousIndex()].src}
              alt={images[getPreviousIndex()].alt}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-opacity-20 rounded-lg"></div>
          </div>

          {/* Next Image (Right) */}
          <div className="relative w-96 h-72 md:w-[600px] md:h-96 transform scale-75 transition-all duration-500 hover:opacity-60">
            <img
              src={images[getNextIndex()].src}
              alt={images[getNextIndex()].alt}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-opacity-20 rounded-lg"></div>
          </div>
        </div>

        {/* Current Image (Center) */}
        <div className="relative z-10 w-96 h-72 md:w-[600px] md:h-96 transition-all duration-500 transform hover:scale-105">
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="w-full h-full object-cover rounded-xl shadow-2xl"
          />
          
          {/* Text Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 rounded-b-xl">
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2 transform translate-y-0 transition-all duration-300">
              {images[currentIndex].title}
            </h3>
            <p className="text-gray-300 text-sm md:text-base opacity-90">
              Image {currentIndex + 1} of {images.length}
            </p>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          className="absolute left-4 md:left-8 z-20 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* <span className="text-white text-xl font-bold">‹</span> */}
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          className="absolute right-4 md:right-8 z-20 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* <span className="text-white text-xl font-bold">›</span> */}
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex space-x-2 mt-8 mb-4">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white scale-125 shadow-lg'
                : 'bg-white/40 hover:bg-white/60'
            } disabled:cursor-not-allowed`}
          />
        ))}
      </div>

      {/* Progress Bar (Optional) */}
      {/* <div className="w-64 md:w-96 h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
        />
      </div> */}
    </div>
  );
};

export default ImageCarousel;