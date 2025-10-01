"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

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
    setCurrentPosition(pos)
    setCurrentSlide(randomSequence[pos].slide)
  }

  const handleNavigation = (direction: "next" | "prev") => {
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

  const MiniSlider: React.FC<{ items: { src: string; title: string; isPortrait: boolean }[] }>= ({ items }) => {
    const [idx, setIdx] = useState(0);
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchDeltaX, setTouchDeltaX] = useState(0);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const measureRef = useRef<HTMLSpanElement | null>(null);
    const measureLine1Ref = useRef<HTMLSpanElement | null>(null);
    const measureLine2Ref = useRef<HTMLSpanElement | null>(null);
    const measureLine3Ref = useRef<HTMLSpanElement | null>(null);
    const arrowRef = useRef<HTMLButtonElement | null>(null);
    const [doSplit, setDoSplit] = useState(false);
    const [titleFontPx, setTitleFontPx] = useState<number>(18);
    const [allFontSizes, setAllFontSizes] = useState<number[]>(new Array(items.length).fill(18));
    const [globalFontSize, setGlobalFontSize] = useState<number>(18);
    const [imageRatio, setImageRatio] = useState<number>(1);
    const [containerHeight, setContainerHeight] = useState<string>('50vh');

    useEffect(() => {
      setAllFontSizes(new Array(items.length).fill(18));
      setGlobalFontSize(18);
    }, [items.length]);


    const handleNext = () => {
      const next = (idx + 1) % items.length;
      trackEvent('project_slide_next', { title: items[next]?.title });
      setIdx(next);
    };
    const handlePrev = () => {
      const prev = (idx - 1 + items.length) % items.length;
      trackEvent('project_slide_prev', { title: items[prev]?.title });
      setIdx(prev);
    };

    const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
      setTouchStartX(e.touches[0].clientX);
      setTouchDeltaX(0);
    };
    const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
      if (touchStartX === null) return;
      setTouchDeltaX(e.touches[0].clientX - touchStartX);
    };
    const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
      const threshold = 40;
      if (touchDeltaX > threshold) {
        handlePrev();
      } else if (touchDeltaX < -threshold) {
        handleNext();
      } else {
        handleNext();
      }
      setTouchStartX(null);
      setTouchDeltaX(0);
    };

    const current = items[idx];
    const rawTitle = current.title || '';
    
    const getCustomLineBreak = (title: string) => {
      const xPos = title.indexOf(' x ');
      const bracketPos = title.indexOf('[');
      
      if (xPos > -1 && bracketPos > -1) {
        return {
          line1: title.slice(0, xPos).trim(),
          line2: title.slice(xPos + 1, bracketPos).trim(),
          line3: title.slice(bracketPos).trim(),
          hasCustomBreak: true,
          isThreeLines: true
        };
      }
      
      if (xPos > -1) {
        return {
          line1: title.slice(0, xPos).trim(),
          line2: title.slice(xPos + 1).trim(),
          line3: '',
          hasCustomBreak: true,
          isThreeLines: false
        };
      }
      
      return {
        line1: bracketPos > -1 ? title.slice(0, bracketPos).trim() : title,
        line2: bracketPos > -1 ? title.slice(bracketPos).trim() : '',
        line3: '',
        hasCustomBreak: bracketPos > -1,
        isThreeLines: false
      };
    };
    
    const { line1, line2, line3, hasCustomBreak, isThreeLines } = getCustomLineBreak(rawTitle);
    const isVideo = useMemo(() => current.src.endsWith('.mp4'), [current.src]);
    const mediaObjectClass = useMemo(
      () => (current.isPortrait ? 'object-contain object-left' : 'object-contain object-bottom max-h-[50vh]'),
      [current.isPortrait]
    );

    useEffect(() => {
      const computeAndSetHeight = (ratio?: number, maxFactorOverride?: number) => {
        const effectiveRatio = ratio ?? imageRatio;
        if (!(effectiveRatio > 0)) return;
        const el = containerRef.current;
        if (!el) return;
        const containerWidth = el.clientWidth;
        const defaultMaxFactor = current.isPortrait ? 0.55 : 0.6;
        const maxFactor = maxFactorOverride ?? defaultMaxFactor;
        const calculatedHeight = Math.min(containerWidth / effectiveRatio, window.innerHeight * maxFactor);
        const heightVh = (calculatedHeight / window.innerHeight) * 100;
        setContainerHeight(`${Math.round(heightVh)}vh`);
      };

      if (isVideo) {
        const videoEl = videoRef.current;
        if (!videoEl) return;
        const maxFactorVideo = current.isPortrait ? 0.5 : 0.45;
        const onMeta = () => {
          const vw = videoEl.videoWidth || 0;
          const vh = videoEl.videoHeight || 0;
          const ratio = vw > 0 && vh > 0 ? vw / vh : 1;
          setImageRatio(ratio);
          computeAndSetHeight(ratio, maxFactorVideo);
        };
        if (videoEl.readyState >= 1) {
          onMeta();
        } else {
          videoEl.addEventListener('loadedmetadata', onMeta);
        }
        const handleResize = () => computeAndSetHeight(undefined, maxFactorVideo);
        window.addEventListener('resize', handleResize);
        return () => {
          videoEl.removeEventListener('loadedmetadata', onMeta);
          window.removeEventListener('resize', handleResize);
        };
      } else {
        const img = new window.Image();
        const maxFactorImage = current.isPortrait ? 0.55 : 0.6;
        img.onload = () => {
          const ratio = img.naturalWidth / img.naturalHeight;
          setImageRatio(ratio);
          computeAndSetHeight(ratio, maxFactorImage);
        };
        img.src = current.src;
        const handleResize = () => computeAndSetHeight(undefined, maxFactorImage);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }
    }, [current.src, current.isPortrait, idx, imageRatio, isVideo]);

    useEffect(() => {
      const el = containerRef.current;
      const rawEl = measureRef.current as HTMLSpanElement | null;
      const l1El = measureLine1Ref.current as HTMLSpanElement | null;
      const l2El = measureLine2Ref.current as HTMLSpanElement | null;
      const l3El = measureLine3Ref.current as HTMLSpanElement | null;
      const arrowEl = arrowRef.current as HTMLButtonElement | null;
      if (!el || !rawEl) return;

      const arrowWidth = arrowEl?.offsetWidth ?? 0;
      const gapPx = 8;
      const availableWidth = el.clientWidth - arrowWidth - gapPx;

      const calculateFontSizeForTitle = (title: string, line1: string, line2: string, line3: string, hasBreak: boolean, isThree: boolean) => {
        rawEl.textContent = title;
        rawEl.style.fontSize = `${titleFontPx}px`;
        const rawWidth = rawEl.offsetWidth;

        const needSplit = hasBreak && rawWidth > availableWidth;

        if (needSplit && l1El && l2El) {
          l1El.textContent = line1;
          l2El.textContent = line2;
          
          if (isThree && l3El) {
            l3El.textContent = line3;
          }

          let currentSize = titleFontPx;
          for (let i = 0; i < 12; i += 1) {
            l1El.style.fontSize = `${currentSize}px`;
            l2El.style.fontSize = `${currentSize}px`;
            if (isThree && l3El) {
              l3El.style.fontSize = `${currentSize}px`;
            }
            
            const fits = l1El.offsetWidth <= availableWidth && l2El.offsetWidth <= availableWidth && 
                        (!isThree || (l3El && l3El.offsetWidth <= availableWidth));
            if (fits || currentSize <= 14) {
              return currentSize;
            }
            currentSize -= 1;
          }
          return currentSize;
        }

        return titleFontPx;
      };

      const currentFontSize = calculateFontSizeForTitle(rawTitle, line1, line2, line3, hasCustomBreak, isThreeLines);
      
      setAllFontSizes(prev => {
        const newFontSizes = [...prev];
        newFontSizes[idx] = currentFontSize;
        return newFontSizes;
      });

      setDoSplit(hasCustomBreak && rawEl.offsetWidth > availableWidth);
    }, [rawTitle, idx, line1, line2, line3, hasCustomBreak, isThreeLines, titleFontPx]);

    useEffect(() => {
      if (allFontSizes.length === items.length && allFontSizes.every(size => size !== undefined)) {
        const minFontSize = Math.min(...allFontSizes);
        if (minFontSize !== globalFontSize) {
          setGlobalFontSize(minFontSize);
        }
      }
    }, [allFontSizes, items.length, globalFontSize]);

    return (
      <div className="mb-6" ref={containerRef}>
        <div
          className="relative w-full overflow-hidden bg-white flex items-center justify-start select-none"
          style={{ height: containerHeight }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {isVideo ? (
            <video
              ref={videoRef}
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
              onClick={() => trackEvent('project_media_click', { title: current.title, src: current.src })}
            />
          )}
        </div>
        <div className="relative mt-2 flex items-start justify-between gap-2">
          <p className="text-left leading-tight lg:text-xl font-marist flex-1" style={{ fontSize: `${globalFontSize}px` }}>
            {doSplit ? (
              <>
                {line1}
                {line2 ? (<><br/>{line2}</>) : null}
                {isThreeLines && line3 ? (<><br/>{line3}</>) : null}
              </>
            ) : (
              <span className="block truncate whitespace-nowrap">{rawTitle}</span>
            )}
          </p>
          {items.length > 1 && (
            <button
              type="button"
              aria-label="Next slide"
              className="shrink-0"
              onClick={handleNext}
              ref={arrowRef}
            >
              <span className="font-marist text-2xl leading-none">→</span>
            </button>
          )}
          <span ref={measureRef} className="invisible absolute left-0 top-0 whitespace-nowrap lg:text-xl font-marist">{rawTitle}</span>
          <span ref={measureLine1Ref} className="invisible absolute left-0 top-0 whitespace-nowrap lg:text-xl font-marist">{line1}</span>
          <span ref={measureLine2Ref} className="invisible absolute left-0 top-0 whitespace-nowrap lg:text-xl font-marist">{line2}</span>
          <span ref={measureLine3Ref} className="invisible absolute left-0 top-0 whitespace-nowrap lg:text-xl font-marist">{line3}</span>
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
              onClick={() => { trackEvent('project_slide', { title: currentSlide?.title }); handleNavigation("prev") }}
            />
            <div
              className="w-1/2 h-full z-[100]"
              onClick={() => { trackEvent('project_slide', { title: currentSlide?.title }); handleNavigation("next") }}
            />
            {currentSlide?.src.endsWith(".mp4") ? (
              <video autoPlay loop controls playsInline className="absolute inset-0 w-full h-full object-contain" onClick={() => trackEvent('desktop_media_click', { title: currentSlide?.title, src: currentSlide?.src })}>
                <source src={currentSlide.src} type="video/mp4" />
              </video>
            ) : currentSlide?.src && currentSlide?.title ? (
              <Image
                src={currentSlide?.src || ""}
                alt={currentSlide?.title || ""}
                layout="fill"
                objectFit="contain"
                className="absolute inset-0"
                onClick={() => trackEvent('desktop_media_click', { title: currentSlide?.title, src: currentSlide?.src })}
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
