"use client";

import Image from "next/image";

export default function BannerLogo(props) {
  const { color } = props;
  return (
    <>
      <div className="tailwind">
        <Image
          height={75}
          width={250}
          src={`/images/logos/logo-${color}.svg`}
          alt="Expertree Logo"
          className="w-[150px] h-[50px] sm:w-[200px] sm:h-[70px] md:w-[250px] md:h-[75px]"
        />
      </div>
    </>
  );
}
