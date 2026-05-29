import Image from "next/image";

export function MagnusLogo({ size = 26 }: { size?: number }) {
  return (
    <Image
      src="/magnus-mark.png"
      alt="Magnus"
      width={1428}
      height={1233}
      priority
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
