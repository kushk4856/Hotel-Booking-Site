import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-4 z-10">
      <Image src={logo} height="60" width="60" quality={100} alt="The K&K Hotel logo" />
      <span className="text-xl font-semibold text-primary-100">
        The K&K Hotel
      </span>
    </a>
  );
}

export default Logo;
