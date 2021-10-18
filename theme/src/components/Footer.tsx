import clsx from 'clsx';
import { ComponentType, ReactNode } from 'react';

import {
  GitHub,
  IconColorProps,
  ImageSC,
  NapariHub,
  NapariLogo,
  Twitter,
  Zulip,
} from '@/components/icons';
import { Link } from '@/components/Link';

interface FooterItem {
  title: ReactNode | string;
  link: string;
  alt: string;
  icon: ComponentType<IconColorProps>;
  sameTab?: boolean;
  size?: string;
}

const FOOTER_LINKS: FooterItem[] = [
  {
    title: 'napari',
    link: '/',
    alt: 'Return to Home Page',
    icon: NapariLogo,
    sameTab: true,
  },
  {
    title: 'napari hub',
    link: 'https://napari-hub.org',
    alt: 'Visit napari hub',
    icon: NapariHub,
  },
  {
    title: 'GitHub',
    link: 'https://github.com/napari/napari',
    alt: 'Visit GitHub repository',
    icon: GitHub,
  },
  {
    title: 'Twitter',
    link: 'https://twitter.com/napari_imaging',
    alt: 'Visit Twitter page',
    icon: Twitter,
  },
  {
    title: 'image.sc',
    link: 'https://forum.image.sc/tag/napari',
    alt: 'Visit image.sc forum',
    icon: ImageSC,
    size: 'h-[1.25em] w-[1.25em]',
  },
  {
    title: 'Zulip',
    link: 'https://napari.zulipchat.com',
    alt: 'Visit Zulip chatroom',
    icon: Zulip,
  },
];

const STANDARD_ICON_SIZE = 'h-[1em] w-[1em]';

function FooterLinks() {
  return (
    <>
      {FOOTER_LINKS.map((item) => (
        <Link
          className={clsx(
            'text-white',
            'whitespace-nowrap',
            'mr-4 last:mr-0 mb-4', // TODO: when flex gap is more widely used, remove this (replaced by `gap-4` in parent)
            'flex flex-row items-center',
          )}
          key={item.link}
          href={item.link}
          newTab={!item.sameTab}
        >
          <item.icon
            className={clsx(
              item.size ? item.size : STANDARD_ICON_SIZE,
              'inline-block mr-1',
            )}
            color="white"
            alt={item.alt}
          />
          <span className="font-semibold text-[0.875em]">{item.title}</span>
        </Link>
      ))}
    </>
  );
}

export function Footer() {
  return (
    <div
      className={clsx(
        'flex flex-row flex-wrap',
        'items-center justify-start',
        'w-full',
        'pt-6 pb-2', // TODO: when flex gap is more widely used, replace this with `py-6 gap-4`
        'px-6 screen-495:px-12',
        'bg-black',
      )}
    >
      <FooterLinks />
    </div>
  );
}
