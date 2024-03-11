import Image, { ImageProps } from 'next/image';
import Avatar from './extended/Avatar';

type Props = {
  src: string | null;
  alt: string | null;
  size: number;
  isRounded?: boolean;
};

export const RRAvatar = ({ src, alt, size, isRounded = true, ...props }: Props & ImageProps) => {
  // return src ? (
  //   <img
  //     {...props}
  //     src={src ?? ''}
  //     alt={alt ?? 'whoops'}
  //     aria-hidden="true"
  //     width={size}
  //     height={size}
  //     style={{ ...props.style, borderRadius: isRounded ? '50px' : 'initial' }}
  //   />
  // ) : (
  //   <Avatar
  //     {...props}
  //     style={{ ...props.style, margin: '0 auto', width: size, height: size, borderRadius: isRounded ? '50px' : 'initial' }}
  //   >
  //     A
  //   </Avatar>
  // );

  return src ? (
    <Image
      {...props}
      src={src ?? ''}
      aria-hidden="true"
      alt={alt ?? 'whoops'}
      width={size}
      height={size}
      style={{ ...props.style, borderRadius: isRounded ? '50px' : 'initial' }}
    />
  ) : (
    <Avatar
      {...props}
      style={{ ...props.style, margin: '0 auto', width: size, height: size, borderRadius: isRounded ? '50px' : 'initial' }}
    >
      A
    </Avatar>
  );
};
