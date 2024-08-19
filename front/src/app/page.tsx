"use client";

import Carousel from "@/components/Carrusel/Carrusel";
import MEstrenos from "@/components/Movies/MEstrenos/MEstrenos";
import MPoular from "@/components/Movies/MPopular/MPopular";

export default function Home() {
  return (
    <main>
      <Carousel />
      <MEstrenos />

      <MPoular />
    </main>
  );
}
