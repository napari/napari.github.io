import { IconColorProps } from './icons.type';

export function NapariHub({
  className,
  alt,
  color = '#009BF2',
}: IconColorProps) {
  return (
    <svg
      className={className}
      width="487"
      height="512"
      viewBox="0 0 487 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {alt && <title>{alt}</title>}
      <circle
        cx="243.036"
        cy="256"
        r="85.3333"
        fill={color}
        stroke={color}
        strokeWidth="56.8889"
      />
      <circle cx="243.036" cy="42.6667" r="42.6667" fill={color} />
      <circle cx="243.036" cy="469.333" r="42.6667" fill={color} />
      <path
        d="M243.036 28.4444L243.036 142.222"
        stroke={color}
        strokeWidth="56.8889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M243.036 369.778L243.036 483.556"
        stroke={color}
        strokeWidth="56.8889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="58.2838"
        cy="149.333"
        r="42.6667"
        transform="rotate(-60 58.2838 149.333)"
        fill={color}
      />
      <circle
        cx="427.788"
        cy="362.667"
        r="42.6667"
        transform="rotate(-60 427.788 362.667)"
        fill={color}
      />
      <path
        d="M45.967 142.222L144.501 199.111"
        stroke={color}
        strokeWidth="56.8889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M341.57 312.889L440.105 369.778"
        stroke={color}
        strokeWidth="56.8889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="58.2838"
        cy="362.667"
        r="42.6667"
        transform="rotate(-120 58.2838 362.667)"
        fill={color}
      />
      <circle
        cx="427.788"
        cy="149.333"
        r="42.6667"
        transform="rotate(-120 427.788 149.333)"
        fill={color}
      />
      <path
        d="M45.967 369.778L144.501 312.889"
        stroke={color}
        strokeWidth="56.8889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M341.57 199.111L440.105 142.222"
        stroke={color}
        strokeWidth="56.8889"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
