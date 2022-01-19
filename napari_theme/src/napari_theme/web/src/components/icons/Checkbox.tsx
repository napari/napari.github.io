import { IconColorProps } from './icons.type';

interface Props extends IconColorProps {
  checked?: boolean;
}

export function Checkbox({
  alt,
  className,
  color = '#80d1ff',
  checked,
}: Props) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {alt && <title>{alt}</title>}
      <rect width="16" height="16" fill={checked ? color : ''} stroke="black" />
      {checked && (
        <path
          d="M5.375 10.4551L12.8789 2.95117L13.875 3.94727L5.375 12.4473L1.42383 8.49609L2.41992 7.5L5.375 10.4551Z"
          fill="black"
        />
      )}
    </svg>
  );
}
