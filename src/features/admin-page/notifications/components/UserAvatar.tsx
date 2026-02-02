
interface Props {
  src?: string;
  alt: string;
  size?: number;
}

export default function UserAvatar({
  src,
  alt,
  size = 36,
}: Props) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-full bg-neutral-300"
      style={{ width: size, height: size }}
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
