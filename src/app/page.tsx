"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const homeSection1 = "/svg/WEB_Home Page-01.svg";
const homeSection2 = "/svg/WEB_Home Page-02.svg";
const homeSection3 = "/svg/WEB_Home Page-03.svg";
const homeSection4 = "/svg/WEB_Home Page-04.svg";
const homeSection5 = "/svg/WEB_Home Page-05.svg";
import { slides } from "./work/projects";

export default function Home() {
  const router = useRouter();
  const [fade, setFade] = useState(false);
  const [mainImage, setMainImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    //router.prefetch("/work");

    const getRandomHeadImage = async () => {
      try {
        const res = await fetch('/images/head/index.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load /images/head/index.json');
        const data: { items: string[] } = await res.json();
        const pool = (data?.items || []).filter((p) => !p.toLowerCase().endsWith('.mp4'));
        if (pool.length === 0) return null;
        const idx = Math.floor(Math.random() * pool.length);
        return { src: pool[idx], title: 'HEAD' };
      } catch {
        // fallback to previous logic if index.json not found
        const mainImages = slides
          .map((group) => (!group.main.src.includes("mp4") ? group.main : null))
          .filter(Boolean)
          .sort(() => Math.random() - 0.5);
        return mainImages[0] as { src: string; title: string } | null;
      }
    };

    getRandomHeadImage().then((img) => {
      if (img) setMainImage(img);
    });

    const fadeTimeout = setTimeout(() => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("fromHome", "true");
        setFade(true);
        const redirectTimeout = setTimeout(() => {
          router.push("/work");
        }, 500);
        return () => clearTimeout(redirectTimeout);
      }
     
    }, 2000); 
    
    return () => clearTimeout(fadeTimeout);
  }, [router]);

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center transition-opacity duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-[max-content]">
        <div className="h-[6vh] sm:h-[8vh] md:h-[11vh] lg:h-[16vh]">
          <Image priority className="h-full w-auto" src={homeSection1} alt="GRAPHIC" width={500} height={100}/>
        </div>
        <div className="h-[6vh] sm:h-[8vh] md:h-[11vh] lg:h-[16vh] w-full mt-1">
          <Image priority className="h-full w-auto" src={homeSection2} alt="DESIGNER" width={500} height={100}/>
        </div>
        <div className="h-[6vh] sm:h-[8vh] md:h-[11vh] lg:h-[16vh] w-full mt-2 flex flex-row">
          <Image priority className="h-full w-auto" src={homeSection3} alt="&" width={500} height={100}/>
          {mainImage?.src && mainImage?.title && (
            <div
              className="bg-black w-[30%] mx-[5%] bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url("${mainImage.src}")` }}
            ></div>
          )}
          <Image priority className="h-full w-auto" src={homeSection4} alt="ART" width={500} height={100}/>
        </div>
        <div className="h-[6vh] sm:h-[8vh] md:h-[11vh] lg:h-[16vh] w-full mt-1">
          <Image priority className="h-full w-auto" src={homeSection5} alt="DIRECTOR" width={500} height={100}/>
        </div>
        <h1 className="w-full text-center mt-2 lg:text-xl font-marist">
          AGATHE MINIER — PORTFOLIO 2025
        </h1>
      </div>
    </div>
  );
}
