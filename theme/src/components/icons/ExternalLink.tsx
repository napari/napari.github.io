import { IconColorProps } from './icons.type';

export function ExternalLink({
  alt,
  className,
  color = 'white',
}: IconColorProps) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {alt && <title>{alt}</title>}
      <path d="M10.6667 2H2V18H18V10" stroke={color} strokeWidth="2.5" />
      <path d="M12.6667 2H18V7.33333" stroke={color} strokeWidth="2.5" />
      <path d="M18 2L7.33333 12.6667" stroke={color} strokeWidth="2.5" />
    </svg>
  );
}
