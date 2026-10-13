import Image from "next/image";

import darkLogo from "../../assets/ga_gradient_icon_dark.svg";
import lightLogo from "../../assets/ga_gradient_icon_light.svg";

export default function Logo() {
  return (
    <>
      <Image src={lightLogo} alt="GA Logo" className="block dark:hidden" />
      <Image src={darkLogo} alt="GA Logo" className="hidden dark:block" />
    </>
  );
}
