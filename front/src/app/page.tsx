import Carousel from "@/components/Carrusel/Carrusel";
import MPoular from "@/components/Movies/MPopular/MPopular";
import Nav from "@/components/Nav/Nav";


export default function Home() {
  return (
    <main>
      <Nav/>
      <Carousel />
      <MPoular/>
    </main>
  );
}
