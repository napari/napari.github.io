import clsx from 'clsx';
import { ComponentType, ReactNode } from 'react';

import {
  GitHub,
  IconColorProps,
  ImageSC,
  NapariHub,
  Twitter,
  Zulip,
} from '@/components/icons';
import { Link } from '@/components/Link';

interface FooterItem {
  title: ReactNode | string;
  link: string;
  alt: string;
  icon: ComponentType<IconColorProps>;
  size?: string;
}

const FOOTER_LINKS: FooterItem[] = [
  {
    title: (
      <>
        <span className="font-normal">napari</span> hub
      </>
    ),
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
            'whitespace-nowrap mr-4 last:mr-0',
            'flex flex-row items-center',
          )}
          href={item.link}
          newTab
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
        'flex flex-row items-center justify-start',
        'h-[4.6875em] w-full',
        'px-6 screen-495:px-12',
        'bg-black',
      )}
    >
      <FooterLinks />
    </div>
  );
}
