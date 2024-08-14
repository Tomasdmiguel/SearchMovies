import Carousel from "@/components/Carrusel/Carrusel";
import MEstrenos from "@/components/Movies/MEstrenos/MEstrenos";
import MPoular from "@/components/Movies/MPopular/MPopular";
import MThrilers from "@/components/Movies/MThrilers/MThrilers";

export default function Home() {
  return (
    <main>
      <Carousel />
      <MPoular />
      <MEstrenos />
      <MThrilers />
    </main>
  );
}
