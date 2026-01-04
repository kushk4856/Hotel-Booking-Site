import Image from "next/image";
import bgImg from "@/public/bg.png";
import MagneticButton from "@/app/_components/MagneticButton";

export default function Home() {
  return (
    <div className="h-full flex justify-center items-center">
      <Image
        src={bgImg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top brightness-[0.7] -z-10 w-full h-full"
        alt="The K&K Hotel - Mountains and cabins"
      />

      <div className="relative z-10 text-center pt-40 space-y-8">
        <h1 className="text-8xl text-primary-50 tracking-tight font-normal font-serif">
          Welcome to paradise.
        </h1>
        
        <div className="flex justify-center">
          <MagneticButton 
            href="/cabins" 
            className="!bg-accent-500 !text-primary-950 px-8 py-4 text-lg hover:!bg-accent-600"
            isLight={false}
          >
            Explore luxury cabins
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
