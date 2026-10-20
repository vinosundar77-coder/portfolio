import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import WorkIndex from "@/components/WorkIndex";
import Koskii from "@/components/Koskii";
import Zouk from "@/components/Zouk";
import Nirvaa from "@/components/Nirvaa";
import Snitch from "@/components/Snitch";
import SkillKart from "@/components/SkillKart";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <div className="grain" aria-hidden />
      <main>
        <Hero />
        <Profile />
        <WorkIndex />
        <Koskii />
        <Zouk />
        <Nirvaa />
        <Snitch />
        <SkillKart />
        <Contact />
      </main>
    </>
  );
}
