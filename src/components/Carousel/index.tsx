"use client";
import React, { useState, useEffect, useRef } from "react";
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

  // Mini slider per project for mobile
  const MiniSlider: React.FC<{ items: { src: string; title: string; isPortrait: boolean }[] }>= ({ items }) => {
    const [idx, setIdx] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchDeltaX, setTouchDeltaX] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const measureRef = useRef<HTMLSpanElement | null>(null);
    const [shouldSplit, setShouldSplit] = useState(false);

    const handleNext = () => setIdx((prev) => (prev + 1) % items.length);
    const handlePrev = () => setIdx((prev) => (prev - 1 + items.length) % items.length);

    const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchDeltaX(0);
    };
    const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
      if (touchStartX === null) return;
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    };
    const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
      const threshold = 40; // pixels
      if (touchDeltaX > threshold) {
        handlePrev();
      } else if (touchDeltaX < -threshold) {
        handleNext();
      } else {
        // tap
        handleNext();
      }
      setTouchStartX(null);
      setTouchDeltaX(0);
    };

    const current = items[idx];
    const rawTitle = current.title || '';
    const bracketPos = rawTitle.indexOf('[');
    const line1 = bracketPos > -1 ? rawTitle.slice(0, bracketPos).trim() : rawTitle;
    const line2 = bracketPos > -1 ? rawTitle.slice(bracketPos).trim() : '';
    const mediaObjectClass = current.isPortrait ? 'object-contain' : 'object-cover';

    useEffect(() => {
      const el = containerRef.current;
      const measureEl = measureRef.current as HTMLSpanElement | null;
      if (!el || !measureEl) return;
      // Set text to measure and ensure no wrap
      measureEl.textContent = rawTitle;
      const containerWidth = el.clientWidth;
      const textWidth = measureEl.offsetWidth;
      setShouldSplit(bracketPos > -1 && textWidth > containerWidth);
    }, [rawTitle, idx, bracketPos]);

    return (
      <div className="mb-6" ref={containerRef}>
        <div
          className={`relative w-full ${current.isPortrait ? 'h-[60vh]' : 'h-[50vh]'} overflow-hidden bg-white flex items-center justify-start select-none`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {current.src.endsWith('.mp4') ? (
            <video
              className={`w-full h-full ${mediaObjectClass} object-left`}
              controls
              playsInline
              preload="metadata"
            >
              <source src={current.src} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={current.src}
              alt={current.title}
              fill
              className={`${mediaObjectClass} object-left`}
            />
          )}
        </div>
        <div className="relative mt-2 flex items-start justify-between gap-2">
          <p className="text-left leading-tight lg:text-xl font-marist flex-1">
            {shouldSplit ? (
              <>
                {line1}
                {line2 ? (<><br/>{line2}</>) : null}
              </>
            ) : (
              <span className="block truncate whitespace-nowrap">{rawTitle}</span>
            )}
          </p>
          <button
            type="button"
            aria-label="Next slide"
            className="shrink-0"
            onClick={handleNext}
          >
            <span className="font-marist text-2xl leading-none">→</span>
          </button>
          {/* Invisible measurer to detect overflow */}
          <span ref={measureRef} className="invisible absolute whitespace-nowrap lg:text-xl font-marist">{rawTitle}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="sm:w-[80%] w-[95%] relative">
      <div className="block sm:hidden pb-7">
        {slides.map((slide, index) => (
          <MiniSlider key={index} items={[slide.main, ...slide.other]} />
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
              <video autoPlay loop controls playsInline className="absolute inset-0 w-full h-full object-contain">
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
