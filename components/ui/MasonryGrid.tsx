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

const DUMMY_PINS = [
  { id: "1", imageUrl: "https://picsum.photos/seed/1/400/600", title: "Cozy Living Room", username: "interior.lover" },
  { id: "2", imageUrl: "https://picsum.photos/seed/2/400/300", title: "Morning Coffee", username: "caffeine.addict" },
  { id: "3", imageUrl: "https://picsum.photos/seed/3/400/500", title: "Mountain Hike", username: "adventure.time" },
  { id: "4", imageUrl: "https://picsum.photos/seed/4/400/700", title: "Fashion Inspo", username: "style.daily" },
  { id: "5", imageUrl: "https://picsum.photos/seed/5/400/400", title: "Healthy Bowl", username: "eat.clean" },
  { id: "6", imageUrl: "https://picsum.photos/seed/6/400/550", title: "City Lights", username: "urban.photo" },
  { id: "7", imageUrl: "https://picsum.photos/seed/7/400/350", title: "Minimal Desk", username: "work.setup" },
  { id: "8", imageUrl: "https://picsum.photos/seed/8/400/650", title: "Sunset Beach", username: "travel.vibes" },
  { id: "9", imageUrl: "https://picsum.photos/seed/9/400/450", title: "Book Nook", username: "read.more" },
  { id: "10", imageUrl: "https://picsum.photos/seed/10/400/500", title: "Street Art", username: "art.everywhere" },
  { id: "11", imageUrl: "https://picsum.photos/seed/11/400/300", title: "Puppy Love", username: "dog.mom" },
  { id: "12", imageUrl: "https://picsum.photos/seed/12/400/600", title: "Garden Goals", username: "plant.parent" },
];

export default function MasonryGrid() {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="flex gap-4 px-4"
      columnClassName="flex flex-col"
    >
      {DUMMY_PINS.map((pin) => (
        <PinCard key={pin.id} {...pin} />
      ))}
    </Masonry>
  );
}