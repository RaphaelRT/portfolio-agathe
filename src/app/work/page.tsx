"use client";

import Carousel from "@/components/Carousel";
import { slides } from "./projects";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";

export default function Work() {
  const [opacity, setOpacity] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("fromHome") === "true" ? "opacity-0" : "opacity-100";
    }
    return "opacity-100"
  });
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem("fromHome") === "true") {
        sessionStorage.removeItem("fromHome");
        setTimeout(() => {
          setOpacity("opacity-100");
        }, 50);
      }

    }
   
  }, []);

  return (
    <>
      <Header />
      <main
        className={`flex justify-center items-start w-full h-[calc(100vh-3rem)] transition-opacity duration-1500 ${opacity}`}
      >
        <Carousel slides={slides} />
      </main>
    </>
  );
}
