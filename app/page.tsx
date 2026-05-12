import { EVM } from "@/components/sections/EVM";
import { Gas } from "@/components/sections/Gas";
import { Gateway } from "@/components/sections/Gateway";
import { Hero } from "@/components/sections/Hero";
import { Netting } from "@/components/sections/Netting";

export default function Home() {
  return (
    <div className="w-full max-w-3xl px-6 md:px-12 mx-auto">
      <Hero />
      <Gas />
      <Gateway />
      <Netting />
      <EVM />
    </div>
  );
}
