import { ThreeBackgroundClient } from "@/components/ThreeBackgroundClient";
import { Hero } from "@/components/sections/Hero";
import { Gas } from "@/components/sections/Gas";
import { Gateway } from "@/components/sections/Gateway";
import { Netting } from "@/components/sections/Netting";
import { EVM } from "@/components/sections/EVM";

export default function Home() {
  return (
    <>
      <ThreeBackgroundClient />
      <div className="relative w-full lg:w-[55vw] z-10 flex flex-col bg-bg/80 lg:bg-transparent lg:backdrop-blur-none backdrop-blur-md">
        <Hero />
        <Gas />
        <Gateway />
        <Netting />
        <EVM />
      </div>
    </>
  );
}
