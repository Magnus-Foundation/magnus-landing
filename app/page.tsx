import { Hero } from "@/components/sections/Hero";
import { Gas } from "@/components/sections/Gas";
import { Netting } from "@/components/sections/Netting";
import { SettlementFeed } from "@/components/sections/SettlementFeed";
import { Gateway } from "@/components/sections/Gateway";
import { EVM } from "@/components/sections/EVM";
import { BuildCTA } from "@/components/sections/BuildCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Gas />
      <Netting />
      <SettlementFeed />
      <Gateway />
      <EVM />
      <BuildCTA />
    </>
  );
}
