import { SVGProps } from 'react';

type SocialSvgNames = 'ya' | 'mailru' | 'vk';
type SvgNames = SocialSvgNames;

type PrefixNames = 'social';

interface Props {
  height: number;
  width: number;
  name: SvgNames;
  prefix?: PrefixNames;
}

// default value social => global
export const RRSvgIcon = ({ name, prefix = 'social', ...props }: SVGProps<SVGSVGElement> & Props) => (
  <svg {...props}>
    <use href={`/assets/icons/${prefix}-sprite.svg#${name}`} />
  </svg>
);
