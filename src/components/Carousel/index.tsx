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
    const measureRef = useRef<HTMLSpanElement | null>(null); // raw title measurer
    const measureLine1Ref = useRef<HTMLSpanElement | null>(null);
    const measureLine2Ref = useRef<HTMLSpanElement | null>(null);
    const arrowRef = useRef<HTMLButtonElement | null>(null);
    const [doSplit, setDoSplit] = useState(false);
    const [titleFontPx, setTitleFontPx] = useState<number>(18);

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
    const mediaObjectClass = current.isPortrait ? 'object-contain object-left' : 'object-cover object-center';

    useEffect(() => {
      const el = containerRef.current;
      const rawEl = measureRef.current as HTMLSpanElement | null;
      const l1El = measureLine1Ref.current as HTMLSpanElement | null;
      const l2El = measureLine2Ref.current as HTMLSpanElement | null;
      const arrowEl = arrowRef.current as HTMLButtonElement | null;
      if (!el || !rawEl) return;

      const arrowWidth = arrowEl?.offsetWidth ?? 0;
      const gapPx = 8; // gap-2
      const availableWidth = el.clientWidth - arrowWidth - gapPx;

      rawEl.textContent = rawTitle;
      rawEl.style.fontSize = `${titleFontPx}px`;
      const rawWidth = rawEl.offsetWidth;

      const needSplit = bracketPos > -1 && rawWidth > availableWidth;

      if (needSplit && l1El && l2El) {
        l1El.textContent = line1;
        l2El.textContent = line2;

        // Try to fit both lines on one row each by reducing font size
        let currentSize = titleFontPx;
        for (let i = 0; i < 12; i += 1) {
          l1El.style.fontSize = `${currentSize}px`;
          l2El.style.fontSize = `${currentSize}px`;
          const fits = l1El.offsetWidth <= availableWidth && l2El.offsetWidth <= availableWidth;
          if (fits || currentSize <= 14) {
            setTitleFontPx(currentSize);
            break;
          }
          currentSize -= 1;
        }
      }

      setDoSplit(needSplit);
    }, [rawTitle, idx, bracketPos, line1, line2, titleFontPx]);

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
              className={`${mediaObjectClass}`}
            />
          )}
        </div>
        <div className="relative mt-2 flex items-start justify-between gap-2">
          <p className="text-left leading-tight lg:text-xl font-marist flex-1" style={{ fontSize: `${titleFontPx}px` }}>
            {doSplit ? (
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
            ref={arrowRef}
          >
            <span className="font-marist text-2xl leading-none">→</span>
          </button>
          {/* Invisible measurer to detect overflow */}
          <span ref={measureRef} className="invisible absolute left-0 top-0 whitespace-nowrap lg:text-xl font-marist">{rawTitle}</span>
          <span ref={measureLine1Ref} className="invisible absolute left-0 top-0 whitespace-nowrap lg:text-xl font-marist">{line1}</span>
          <span ref={measureLine2Ref} className="invisible absolute left-0 top-0 whitespace-nowrap lg:text-xl font-marist">{line2}</span>
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
