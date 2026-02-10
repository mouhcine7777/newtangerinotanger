import StickyMenu from "../../components/StickyMenu";
import PizzaHero from "./components/PizzaHero";
import PizzaMenu from "./components/PizzaMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <PizzaHero />
      <PizzaMenu />
    </main>
  );
}