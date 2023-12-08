import React from "react";
import birdimage from "./bird.gif";
import Image from "next/image";

type Props = {
  className?: string;
};

export default function BirdGif({ className }: Props) {
  return (
    <div className={className}>
      <Image src={birdimage} alt="bird" width={50} height={50} />
    </div>
  );
}
