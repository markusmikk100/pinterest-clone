interface PinCardProps {
  imageUrl: string;
  title: string;
  username: string;
}

export default function PinCard({ imageUrl, title, username }: PinCardProps) {
  return (
    <div className="group relative mb-4 cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full object-cover"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <button className="absolute top-3 right-3 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
          Save
        </button>
      </div>
      <div className="mt-2 px-1">
        <p className="font-semibold text-sm">{title}</p>
        <p className="text-xs text-gray-500">{username}</p>
      </div>
    </div>
  );
}