"use client";

import Masonry from "react-masonry-css";
import PinCard from "./PinCard";

const breakpoints = {
  default: 5,
  1280: 4,
  1024: 3,
  768: 2,
  640: 2,
};

interface Pin {
  id: string;
  imageUrl: string;
  title: string;
  user: { name: string | null };
}

interface MasonryGridProps {
  pins: Pin[];
}

export default function MasonryGrid({ pins }: MasonryGridProps) {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-4 px-4"
      columnClassName="flex flex-col"
    >
      {pins.map((pin) => (
        <PinCard
          key={pin.id}
          imageUrl={pin.imageUrl}
          title={pin.title}
          username={pin.user.name ?? "unknown"}
        />
      ))}
    </Masonry>
  );
}