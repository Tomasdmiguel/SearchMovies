"use client";
import { useState } from "react";
import Carousel from "@/components/Carrusel/Carrusel";
import MEstrenos from "@/components/Movies/MEstrenos/MEstrenos";
import MPoular from "@/components/Movies/MPopular/MPopular";
import MThrilers from "@/components/Movies/MThrilers/MThrilers";
export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<
    "populares" | "estrenos"
  >("populares");
  return (
    <main>
      <Carousel />
      <div className="relative p-4">
        <div className="absolute top-0 left-0 w-full p-4 bg-white bg-opacity-75">
          <div className="flex space-x-4">
            <button
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-transform transform ${
                selectedCategory === "populares"
                  ? "bg-red-600 text-white scale-105 shadow-lg"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              } border border-red-600`}
              onClick={() => setSelectedCategory("populares")}>
              Populares
            </button>
            <button
              className={`px-6 py-3 rounded-full text-lg font-semibold transition-transform transform ${
                selectedCategory === "estrenos"
                  ? "bg-red-600 text-white scale-105 shadow-lg"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              } border border-red-600`}
              onClick={() => setSelectedCategory("estrenos")}>
              Estrenos
            </button>
          </div>
        </div>

        <div className="pt-20">
          <div className="transition-opacity duration-500 ease-in-out">
            {selectedCategory === "populares" && <MPoular />}
            {selectedCategory === "estrenos" && <MEstrenos />}
          </div>
        </div>
      </div>
      <MThrilers />
    </main>
  );
}
