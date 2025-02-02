"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Slide {
  main: { src: string; title: string, isPortrait: boolean };
  other: { src: string; title: string, isPortrait: boolean }[];
}

interface CarouselProps {
  slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides}) => {

  const [currentPosition, setCurrentPosition] = useState(0)
  const [randomSequence, setRandomSequence] = useState<{ slide: { src: string; title: string } }[]>([]);
  const [currentSlide, setCurrentSlide] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    const generateRandomSequence = () => {
      const allSlides = slides.flatMap((group) =>
        [group.main, ...group.other].map((slide) => ({ slide }))
      );
      return allSlides.sort(() => Math.random() - 0.5);
    };

    const shuffledSlides = generateRandomSequence();
    setRandomSequence(shuffledSlides);
    setCurrentSlide(shuffledSlides[0]?.slide || null);
  }, [slides]);

  const totalSlidesCount = randomSequence.length - 1;

  
  const updateCurrentPos = (pos :number) => {
    console.log({pos})
    setCurrentPosition(pos)
    setCurrentSlide(randomSequence[pos].slide)
  }

  const handleNavigation = (direction: "next" | "prev") => {
    console.log({direction, currentPosition})
    if (direction === "next") {
      if (currentPosition != totalSlidesCount){
        updateCurrentPos(currentPosition + 1)
      } else {
        updateCurrentPos(0)
      }
    } else {
      if (currentPosition > 0) {
        updateCurrentPos(currentPosition - 1)
      } else {
        updateCurrentPos(totalSlidesCount)
      }
    }
    
  }

  return (
    <div className="sm:w-[80%] w-[95%] relative">
      <div className="block sm:hidden pb-7">
        {slides.map((slide, index) => (
          <div key={index} className="mb-6">
            {slide.main.src.endsWith(".mp4") ? (
              <video controls autoPlay className="w-full h-auto">
                <source src={slide.main.src} type="video/mp4" />
              </video>
            ) : (
              <Image
                src={slide.main.src}
                alt={slide.main.title}
                width={800}
                height={400}
                className="object-contain mx-auto"
                style={{
                  width: slide.main.isPortrait === true ? '70%' : '100%',
                  marginLeft: slide.main.isPortrait === true ? '0' : 'auto',
                  height: 'auto',
                }}
              />
            )}
            <p className="mt-2 lg:text-xl font-marist ">{slide.main.title}</p>
          </div>
        ))}
      </div>

      <div className="hidden sm:block text-center">
        <div>
          <div className="relative w-full h-[80vh] cursor-pointer flex">
            <div
              className="w-1/2 h-full z-[100]"
              onClick={() => handleNavigation("prev")}
            />
            <div
              className="w-1/2 h-full z-[100]"
              onClick={() => handleNavigation("next")}
            />
            {currentSlide?.src.endsWith(".mp4") ? (
              <video autoPlay loop controls className="absolute inset-0 w-full h-full object-contain">
                <source src={currentSlide.src} type="video/mp4" />
              </video>
            ) : currentSlide?.src && currentSlide?.title ? (
              <Image
                src={currentSlide?.src || ""}
                alt={currentSlide?.title || ""}
                layout="fill"
                objectFit="contain"
                className="absolute inset-0"
              />
            ): "Loading..."}
          </div>
          <p className="mt-1 lg:text-xl font-marist">{currentSlide?.title}</p>
        </div>
        <p className="lg:text-xl font-marist mt-[-7px]">
          {currentPosition+1}/{totalSlidesCount+1}
        </p>
      </div>
    </div>
  );
};

export default Carousel;
