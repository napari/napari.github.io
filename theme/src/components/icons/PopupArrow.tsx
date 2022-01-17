import { IconProps } from './icons.type';

export function PopupArrow({ alt, className }: IconProps) {
  return (
    <svg
      width="39"
      height="17"
      viewBox="0 0 39 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {alt && <title>{alt}</title>}
      <g clipPath="url(#clip0_1_5)">
        <path
          d="M1.25515 18.25L19.5 0.693888L37.7448 18.25H1.25515Z"
          fill="white"
          stroke="#686868"
        />
      </g>

      <defs>
        <clipPath id="clip0_1_5">
          <rect width="39" height="17" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
