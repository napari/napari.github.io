import { IconColorProps } from './icons.type';

export function Download({
  alt,
  className,
  color = '#686868',
}: IconColorProps) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {alt && <title>{alt}</title>}
      <path
        d="M24 13.6469V23.9998H2V13.6469"
        stroke={color}
        strokeWidth="2.5"
      />
      <path
        d="M17.9354 11.1941L13.055 16.0745L8.17453 11.1941"
        stroke={color}
        strokeWidth="2.5"
      />
      <path
        d="M13.055 16.0745L13.055 0.70582"
        stroke={color}
        strokeWidth="2.5"
      />
    </svg>
  );
}
