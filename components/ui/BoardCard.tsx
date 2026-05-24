interface BoardCardProps {
  name: string;
  pinCount: number;
  coverImages: string[];
}

export default function BoardCard({ name, pinCount, coverImages }: BoardCardProps) {
  return (
    <div className="cursor-pointer group">
      {/* Cover grid */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-square">
        {coverImages.length >= 3 ? (
          <div className="grid grid-cols-2 grid-rows-2 h-full gap-0.5">
            <img src={coverImages[0]} className="col-span-1 row-span-2 w-full h-full object-cover" />
            <img src={coverImages[1]} className="w-full h-full object-cover" />
            <img src={coverImages[2]} className="w-full h-full object-cover" />
          </div>
        ) : coverImages.length === 1 ? (
          <img src={coverImages[0]} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>

      {/* Info */}
      <div className="mt-2 px-1">
        <p className="font-semibold text-sm">{name}</p>
        <p className="text-xs text-gray-500">{pinCount} pins</p>
      </div>
    </div>
  );
}