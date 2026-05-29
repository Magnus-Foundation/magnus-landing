import { Hero } from "@/components/sections/Hero";
import { Gas } from "@/components/sections/Gas";
import { Gateway } from "@/components/sections/Gateway";
import { Netting } from "@/components/sections/Netting";
import { EVM } from "@/components/sections/EVM";
import { BuildCTA } from "@/components/sections/BuildCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Gas />
      <Gateway />
      <Netting />
      <EVM />
      <BuildCTA />
    </>
  );
}
