import { UserIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

interface UserAvatarProps {
  avatar: string | null;
  username: string;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatar,
  username,
  size = 40,
  className = 'rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center',
}: UserAvatarProps) {
  const sizeClass = size === 40 ? 'size-10' : `w-${size / 4} h-${size / 4}`;
  const iconSizeClass = size === 40 ? 'size-6' : `w-${size / 6} h-${size / 6}`;

  return (
    <div className={`${sizeClass} ${className}`}>
      {avatar ? (
        <Image
          src={avatar}
          width={size}
          height={size}
          alt={username}
          className="object-cover"
        />
      ) : (
        <UserIcon className={`${iconSizeClass} text-neutral-400`} />
      )}
    </div>
  );
}
