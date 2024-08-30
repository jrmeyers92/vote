import Image from "next/image";
import { Button } from "./components/ui/button";

type HeroProps = {
  title: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
};

const Hero = ({ title, subtitle, image, imageAlt }: HeroProps) => {
  return (
    <section className="relative sm:max-h-[90vh] overflow-hidden">
      <Image
        src={image ? image : ""}
        alt={imageAlt || title}
        width={1920}
        height={1080}
        className="brightness-[25%] object-cover"
      />
      <div className="absolute text-white font-bold -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2">
        <h1 className="text-5xl lg:text-7xl">{title}</h1>
        <h2 className="text-2xl lg:text-5xl">{subtitle}</h2>
        <Button className="mx-auto block mt-6">See Today's Poll</Button>
      </div>
    </section>
  );
};

export default Hero;
