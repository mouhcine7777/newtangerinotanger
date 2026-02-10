import StickyMenu from "../../components/StickyMenu";
import SpecialitesHero from "./components/SpecialitesHero";
import SpecialitesMenu from "./components/SpecialitesMenu";


export default function Home() {
  return (
    <main>
      <StickyMenu />
      <SpecialitesHero />
      <SpecialitesMenu />
    </main>
  );
}