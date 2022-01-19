import { Button, ButtonProps } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';

import { Link } from '@/components/Link';

export function CopyCalendarButton({ children, href, ...props }: ButtonProps) {
  return (
    <Button
      classes={{ label: 'space-x-1' }}
      className="px-0"
      component={href ? Link : 'button'}
      href={href}
      newTab={!!href}
      variant="text"
      {...props}
    >
      <AddCircle className="w-5 h-5" />
      <span className="underline">{children}</span>
    </Button>
  );
}
